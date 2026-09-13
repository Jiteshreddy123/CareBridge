from datetime import datetime
from enum import Enum
from typing import Dict, List, Optional
from pydantic import BaseModel, Field


class LanguageEnum(str, Enum):
    EN = "en"
    TE = "te"
    HI = "hi"


class TaskStatus(str, Enum):
    CREATED = "Created"
    APPROVED = "Clinician Approved"
    SENT = "Sent"
    VIEWED = "Viewed"
    ACKNOWLEDGED = "Acknowledged"
    COMPLETED = "Completed"
    CANCELLED = "Cancelled"


class TaskCategory(str, Enum):
    BLOOD_TEST = "Blood Test"
    IMAGING_SCAN = "Imaging / Scan"
    CHEMO_REVIEW = "Chemotherapy Review"
    RADIATION_CHECK = "Radiation Check"
    MEDICATION_REFILL = "Medication Refill"
    STOMA_WOUND_CARE = "Wound & Stoma Care"
    CONSULTATION = "Doctor Consultation"


class AppointmentStatus(str, Enum):
    CONFIRMED = "Confirmed"
    AWAITING_CONFIRMATION = "Awaiting Confirmation"
    RESCHEDULE_REQUESTED = "Reschedule Requested"
    CANCELLED = "Cancelled"


class HelpRequestStatus(str, Enum):
    OPEN = "Open"
    IN_PROGRESS = "In Progress"
    RESOLVED = "Resolved"


class LocalizedText(BaseModel):
    en: str
    te: str
    hi: str


class Patient(BaseModel):
    id: str  # e.g. "P-1001"
    mrn: str  # e.g. "NCG-HYD-1001" (Synthetic)
    name: str
    age: int
    gender: str
    diagnosis: str
    department: str
    primary_oncologist: str
    preferred_language: LanguageEnum
    phone: str
    caregiver_name: Optional[str] = None
    caregiver_relation: Optional[str] = None
    caregiver_phone: Optional[str] = None
    caregiver_authorized: bool = True
    next_appointment_date: Optional[str] = None


class FollowUpTask(BaseModel):
    id: str
    patient_id: str
    title: str
    category: TaskCategory
    department: str
    due_date: str  # ISO date or display date e.g. "18 September 2026"
    clinical_instruction: str
    simplified_instruction: LocalizedText
    why_explanation: LocalizedText
    what_to_do: LocalizedText
    where_location: LocalizedText
    status: TaskStatus = TaskStatus.CREATED
    created_at: str
    created_by: str = "Dr. K. Rao (Medical Oncology)"
    approved_by: Optional[str] = None
    approved_at: Optional[str] = None
    sent_at: Optional[str] = None
    viewed_at: Optional[str] = None
    completed_at: Optional[str] = None
    is_urgent: bool = False
    requires_staff_attention: bool = False
    attention_reason: Optional[str] = None


class Appointment(BaseModel):
    id: str
    patient_id: str
    patient_name: str
    department: str
    doctor_name: str
    date_time: str
    hospital_name: str = "NCG Partner Regional Cancer Center"
    room_or_floor: str = "OPD Block B, 2nd Floor"
    status: AppointmentStatus = AppointmentStatus.AWAITING_CONFIRMATION
    reschedule_reason: Optional[str] = None
    notes: Optional[str] = None


class HelpRequest(BaseModel):
    id: str
    patient_id: str
    patient_name: str
    language: LanguageEnum
    reason: str
    details: Optional[str] = ""
    status: HelpRequestStatus = HelpRequestStatus.OPEN
    created_at: str
    resolved_at: Optional[str] = None
    resolution_notes: Optional[str] = None
    handled_by: Optional[str] = None


class AuditLogEntry(BaseModel):
    id: str
    timestamp: str
    actor: str
    role: str
    action: str
    patient_id: str
    task_id: Optional[str] = None
    details: str
    language: Optional[str] = None


class AIInstructionRequest(BaseModel):
    clinical_text: str
    patient_id: Optional[str] = None
    category: Optional[str] = None
    due_date: Optional[str] = None


class AIInstructionDraft(BaseModel):
    clinical_text: str
    simplified_en: str
    translated_te: str
    translated_hi: str
    why_en: str
    why_te: str
    why_hi: str
    what_en: str
    what_te: str
    what_hi: str
    suggested_category: str
    suggested_due_date: str
    suggested_location: str
