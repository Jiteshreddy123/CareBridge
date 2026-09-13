from datetime import datetime
from typing import List, Optional
import uuid
from ..models import AuditLogEntry


class AuditService:
    def __init__(self):
        self._entries: List[AuditLogEntry] = []

    def log(
        self,
        actor: str,
        role: str,
        action: str,
        patient_id: str,
        details: str,
        task_id: Optional[str] = None,
        language: Optional[str] = None,
        timestamp: Optional[str] = None
    ) -> AuditLogEntry:
        now_str = timestamp or datetime.now().strftime("%d %b %H:%M")
        entry = AuditLogEntry(
            id=f"AUD-{uuid.uuid4().hex[:6].upper()}",
            timestamp=now_str,
            actor=actor,
            role=role,
            action=action,
            patient_id=patient_id,
            task_id=task_id,
            details=details,
            language=language
        )
        self._entries.insert(0, entry)  # Prepend newest first
        return entry

    def get_all(self, patient_id: Optional[str] = None) -> List[AuditLogEntry]:
        if patient_id:
            return [e for e in self._entries if e.patient_id == patient_id]
        return self._entries

    def seed_entries(self, entries: List[AuditLogEntry]):
        self._entries.extend(entries)


audit_service = AuditService()
