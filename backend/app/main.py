from fastapi import FastAPI, HTTPException, Query, Body
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid

from .models import (
    Patient, FollowUpTask, Appointment, HelpRequest, AuditLogEntry,
    TaskStatus, AppointmentStatus, HelpRequestStatus, LanguageEnum,
    AIInstructionRequest, AIInstructionDraft, LocalizedText
)
from .database import db
from .services.ai_service import simplify_and_translate_instruction
from .services.document_parser import extract_actions_from_document
from .services.audit_service import audit_service


app = FastAPI(
    title="CareBridge NCG API",
    description="Multilingual Cancer-Care Follow-up & Care-Instruction Closure Platform",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health_check():
    return {"status": "ok", "platform": "CareBridge NCG", "mode": "assistive_followup_closure"}


# --- Patients ---
@app.get("/api/patients", response_model=List[Patient])
def list_patients():
    return db.get_patients()


@app.get("/api/patients/{patient_id}", response_model=Patient)
def get_patient(patient_id: str):
    patient = db.get_patient(patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient


# --- Tasks / Follow-ups ---
@app.get("/api/tasks", response_model=List[FollowUpTask])
def list_tasks(patient_id: Optional[str] = None):
    return db.get_tasks(patient_id=patient_id)


@app.post("/api/tasks", response_model=FollowUpTask)
def create_task(task_data: Dict[str, Any] = Body(...)):
    new_id = f"TASK-{uuid.uuid4().hex[:4].upper()}"
    now_str = datetime.now().strftime("%d %b %H:%M")

    task = FollowUpTask(
        id=new_id,
        patient_id=task_data["patient_id"],
        title=task_data.get("title", "Clinical Follow-up Task"),
        category=task_data.get("category", "Blood Test"),
        department=task_data.get("department", "Medical Oncology"),
        due_date=task_data.get("due_date", "18 September 2026"),
        clinical_instruction=task_data["clinical_instruction"],
        simplified_instruction=LocalizedText(
            en=task_data.get("simplified_en", task_data["clinical_instruction"]),
            te=task_data.get("translated_te", ""),
            hi=task_data.get("translated_hi", "")
        ),
        why_explanation=LocalizedText(
            en=task_data.get("why_en", "Your oncologist has scheduled this follow-up."),
            te=task_data.get("why_te", "మీ క్యాన్సర్ సంరక్షణలో భాగంగా దీనిని సూచించారు."),
            hi=task_data.get("why_hi", "आपकी देखभाल योजना के अनुसार यह सलाह दी गई है।")
        ),
        what_to_do=LocalizedText(
            en=task_data.get("what_en", "Complete this action before your review visit."),
            te=task_data.get("what_te", "మీ రివ్యూ విజిట్‌కు ముందు దీనిని పూర్తి చేయండి."),
            hi=task_data.get("what_hi", "अपनी समीक्षा मुलाकात से पहले इसे पूरा करें।")
        ),
        where_location=LocalizedText(
            en=task_data.get("where_en", "Hospital Central Laboratory"),
            te=task_data.get("where_te", "ఆసుపత్రి ప్రయోగశాల"),
            hi=task_data.get("where_hi", "अस्पताल की लैब")
        ),
        status=TaskStatus.SENT if task_data.get("approved_immediately") else TaskStatus.CREATED,
        created_at=now_str,
        created_by=task_data.get("created_by", "Dr. K. Rao (Medical Oncology)"),
        approved_by=task_data.get("created_by") if task_data.get("approved_immediately") else None,
        approved_at=now_str if task_data.get("approved_immediately") else None,
        sent_at=now_str if task_data.get("approved_immediately") else None,
        is_urgent=task_data.get("is_urgent", False),
        requires_staff_attention=task_data.get("requires_staff_attention", False)
    )

    db.add_task(task)

    # Audit logging
    audit_service.log(
        actor=task.created_by,
        role="Medical Oncologist",
        action="Created follow-up instruction",
        patient_id=task.patient_id,
        task_id=task.id,
        details=f"Clinical text: '{task.clinical_instruction}'"
    )
    if task_data.get("approved_immediately"):
        audit_service.log(
            actor=task.created_by,
            role="Medical Oncologist",
            action="Approved & Dispatched instruction",
            patient_id=task.patient_id,
            task_id=task.id,
            details=f"Clinician signed off and dispatched in English, Telugu & Hindi"
        )

    return task


@app.post("/api/tasks/{task_id}/status")
def update_task_status(
    task_id: str,
    payload: Dict[str, Any] = Body(...)
):
    status_str = payload.get("status")
    actor = payload.get("actor", "System")
    role = payload.get("role", "User")
    
    try:
        new_status = TaskStatus(status_str)
    except ValueError:
        raise HTTPException(status_code=400, detail=f"Invalid status: {status_str}")

    updated = db.update_task_status(task_id, new_status, actor=actor, role=role)
    if not updated:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated


# --- Appointments ---
@app.get("/api/appointments", response_model=List[Appointment])
def list_appointments(patient_id: Optional[str] = None):
    return db.get_appointments(patient_id=patient_id)


@app.post("/api/appointments/{appt_id}/confirm")
def confirm_appointment(appt_id: str, payload: Dict[str, Any] = Body(default={})):
    actor = payload.get("actor", "Patient")
    appt = db.confirm_appointment(appt_id, actor=actor)
    if not appt:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return appt


@app.post("/api/appointments/{appt_id}/reschedule")
def request_reschedule(appt_id: str, payload: Dict[str, Any] = Body(...)):
    reason = payload.get("reason", "Patient requested reschedule via app")
    actor = payload.get("actor", "Patient")
    appt = db.request_reschedule(appt_id, reason=reason, actor=actor)
    if not appt:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return appt


# --- Help Requests ---
@app.get("/api/help-requests", response_model=List[HelpRequest])
def list_help_requests():
    return db.get_help_requests()


@app.post("/api/help-requests", response_model=HelpRequest)
def create_help_request(req_data: Dict[str, Any] = Body(...)):
    new_id = f"HLP-{uuid.uuid4().hex[:4].upper()}"
    now_str = datetime.now().strftime("%d %b %H:%M")

    req = HelpRequest(
        id=new_id,
        patient_id=req_data["patient_id"],
        patient_name=req_data.get("patient_name", "Patient"),
        language=LanguageEnum(req_data.get("language", "te")),
        reason=req_data["reason"],
        details=req_data.get("details", ""),
        status=HelpRequestStatus.OPEN,
        created_at=now_str
    )
    return db.add_help_request(req)


@app.post("/api/help-requests/{req_id}/resolve")
def resolve_help_request(req_id: str, payload: Dict[str, Any] = Body(...)):
    resolution = payload.get("resolution", "Resolved by care staff")
    handler = payload.get("handler", "Care Coordinator")
    resolved = db.resolve_help_request(req_id, resolution_notes=resolution, handler=handler)
    if not resolved:
        raise HTTPException(status_code=404, detail="Help request not found")
    return resolved


# --- Assistive AI Endpoints ---
@app.post("/api/ai/simplify", response_model=AIInstructionDraft)
def ai_simplify_instruction(request: AIInstructionRequest):
    draft = simplify_and_translate_instruction(
        clinical_text=request.clinical_text,
        due_date=request.due_date or "Before next visit"
    )
    return draft


# --- Document Upload & OCR Action Extraction ---
@app.post("/api/documents/extract")
def extract_document(payload: Dict[str, Any] = Body(default={})):
    doc_type = payload.get("doc_type", "discharge_summary")
    custom_note = payload.get("custom_note", "")
    return extract_actions_from_document(doc_type=doc_type, custom_note=custom_note)


# --- Audit Logs ---
@app.get("/api/audit-logs", response_model=List[AuditLogEntry])
def get_audit_logs(patient_id: Optional[str] = None):
    return audit_service.get_all(patient_id=patient_id)


# --- Metrics / KPIs ---
@app.get("/api/metrics")
def get_metrics():
    return db.get_metrics()
