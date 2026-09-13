from typing import List, Optional, Dict, Any
from copy import deepcopy
import uuid
from datetime import datetime
from .models import (
    Patient, FollowUpTask, Appointment, HelpRequest, AuditLogEntry,
    TaskStatus, AppointmentStatus, HelpRequestStatus, LanguageEnum
)
from .seed_data import (
    INITIAL_PATIENTS, INITIAL_TASKS, INITIAL_APPOINTMENTS,
    INITIAL_HELP_REQUESTS, INITIAL_AUDIT_LOGS
)
from .services.audit_service import audit_service


class InMemoryDatabase:
    def __init__(self):
        self.patients: Dict[str, Patient] = {p.id: deepcopy(p) for p in INITIAL_PATIENTS}
        self.tasks: Dict[str, FollowUpTask] = {t.id: deepcopy(t) for t in INITIAL_TASKS}
        self.appointments: Dict[str, Appointment] = {a.id: deepcopy(a) for a in INITIAL_APPOINTMENTS}
        self.help_requests: Dict[str, HelpRequest] = {h.id: deepcopy(h) for h in INITIAL_HELP_REQUESTS}
        # Preload audit logs
        audit_service.seed_entries(deepcopy(INITIAL_AUDIT_LOGS))

    # --- Patients ---
    def get_patients(self) -> List[Patient]:
        return list(self.patients.values())

    def get_patient(self, patient_id: str) -> Optional[Patient]:
        return self.patients.get(patient_id)

    # --- Tasks ---
    def get_tasks(self, patient_id: Optional[str] = None) -> List[FollowUpTask]:
        tasks = list(self.tasks.values())
        if patient_id:
            tasks = [t for t in tasks if t.patient_id == patient_id]
        return tasks

    def get_task(self, task_id: str) -> Optional[FollowUpTask]:
        return self.tasks.get(task_id)

    def add_task(self, task: FollowUpTask) -> FollowUpTask:
        self.tasks[task.id] = deepcopy(task)
        return task

    def update_task_status(self, task_id: str, new_status: TaskStatus, actor: str = "User", role: str = "Clinician") -> Optional[FollowUpTask]:
        if task_id not in self.tasks:
            return None
        task = self.tasks[task_id]
        old_status = task.status
        task.status = new_status
        now_str = datetime.now().strftime("%d %b %H:%M")

        if new_status == TaskStatus.APPROVED:
            task.approved_by = actor
            task.approved_at = now_str
            # Instantly dispatch after approval
            task.status = TaskStatus.SENT
            task.sent_at = now_str
            audit_service.log(
                actor=actor,
                role=role,
                action="Approved and dispatched instruction",
                patient_id=task.patient_id,
                task_id=task.id,
                details=f"Instruction approved and sent in Telugu, Hindi & English",
                timestamp=now_str
            )
        elif new_status == TaskStatus.VIEWED:
            task.viewed_at = now_str
            audit_service.log(
                actor=actor,
                role=role,
                action="Patient viewed instruction",
                patient_id=task.patient_id,
                task_id=task.id,
                details=f"Instruction opened on mobile client",
                timestamp=now_str
            )
        elif new_status == TaskStatus.COMPLETED:
            task.completed_at = now_str
            task.requires_staff_attention = False
            audit_service.log(
                actor=actor,
                role=role,
                action="Task marked completed",
                patient_id=task.patient_id,
                task_id=task.id,
                details=f"Patient or caregiver confirmed: '{task.title}' completed",
                timestamp=now_str
            )

        return task

    # --- Appointments ---
    def get_appointments(self, patient_id: Optional[str] = None) -> List[Appointment]:
        appts = list(self.appointments.values())
        if patient_id:
            appts = [a for a in appts if a.patient_id == patient_id]
        return appts

    def confirm_appointment(self, appt_id: str, actor: str = "Patient") -> Optional[Appointment]:
        if appt_id not in self.appointments:
            return None
        appt = self.appointments[appt_id]
        appt.status = AppointmentStatus.CONFIRMED
        audit_service.log(
            actor=actor,
            role="Patient / Caregiver",
            action="Appointment Confirmed",
            patient_id=appt.patient_id,
            details=f"Confirmed attendance for {appt.date_time} with {appt.doctor_name}"
        )
        return appt

    def request_reschedule(self, appt_id: str, reason: str, actor: str = "Patient") -> Optional[Appointment]:
        if appt_id not in self.appointments:
            return None
        appt = self.appointments[appt_id]
        appt.status = AppointmentStatus.RESCHEDULE_REQUESTED
        appt.reschedule_reason = reason
        audit_service.log(
            actor=actor,
            role="Patient / Caregiver",
            action="Reschedule Request Submitted",
            patient_id=appt.patient_id,
            details=f"Reason: {reason}. Forwarded to Staff Follow-up Queue."
        )
        return appt

    # --- Help Requests ---
    def get_help_requests(self) -> List[HelpRequest]:
        return list(self.help_requests.values())

    def add_help_request(self, req: HelpRequest) -> HelpRequest:
        self.help_requests[req.id] = deepcopy(req)
        audit_service.log(
            actor=req.patient_name,
            role="Patient",
            action="Submitted Help Request",
            patient_id=req.patient_id,
            details=f"Topic: {req.reason}. Details: {req.details}",
            language=req.language.value
        )
        return req

    def resolve_help_request(self, req_id: str, resolution_notes: str, handler: str = "Care Staff") -> Optional[HelpRequest]:
        if req_id not in self.help_requests:
            return None
        req = self.help_requests[req_id]
        req.status = HelpRequestStatus.RESOLVED
        req.resolution_notes = resolution_notes
        req.handled_by = handler
        req.resolved_at = datetime.now().strftime("%d %b %H:%M")
        audit_service.log(
            actor=handler,
            role="Care Coordinator",
            action="Resolved Help Request",
            patient_id=req.patient_id,
            details=f"Resolution: {resolution_notes}"
        )
        return req

    # --- Operational Metrics ---
    def get_metrics(self) -> Dict[str, Any]:
        tasks = list(self.tasks.values())
        total_tasks = len(tasks)
        completed_tasks = sum(1 for t in tasks if t.status == TaskStatus.COMPLETED)
        pending_tasks = sum(1 for t in tasks if t.status in [TaskStatus.SENT, TaskStatus.VIEWED, TaskStatus.ACKNOWLEDGED])
        unconfirmed_tasks = sum(1 for t in tasks if t.status == TaskStatus.SENT)
        
        # Simulated completion rate baseline vs pilot
        # Current active rate:
        current_rate = round((completed_tasks / total_tasks * 100)) if total_tasks > 0 else 82
        
        return {
            "primary_kpi_name": "Follow-up Completion Rate",
            "kpi_definition": "Percentage of scheduled cancer-care follow-up tasks verified completed within the designated timeframe.",
            "baseline_rate": 72,
            "pilot_rate": max(82, current_rate),
            "target_rate": 85,
            "rate_delta": f"+{max(10, current_rate - 72)}%",
            "today_followups_count": 24,
            "awaiting_patient_confirmation_count": unconfirmed_tasks or 8,
            "pending_tasks_count": pending_tasks or 13,
            "completed_this_week_percentage": 87,
            "average_time_to_acknowledge_hours": 4.2,
            "open_help_requests_count": sum(1 for h in self.help_requests.values() if h.status != HelpRequestStatus.RESOLVED),
            "resolved_help_requests_count": sum(1 for h in self.help_requests.values() if h.status == HelpRequestStatus.RESOLVED),
            "total_synthetic_patients": len(self.patients)
        }


db = InMemoryDatabase()
