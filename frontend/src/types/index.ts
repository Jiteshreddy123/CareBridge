export type Language =
  | 'en' // English
  | 'hi' // हिन्दी (Hindi)
  | 'te' // తెలుగు (Telugu)
  | 'ta' // தமிழ் (Tamil)
  | 'kn' // ಕನ್ನಡ (Kannada)
  | 'ml' // മലയാളം (Malayalam)
  | 'bn' // বাংলা (Bengali)
  | 'mr' // मराठी (Marathi)
  | 'gu' // ગુજરાતી (Gujarati)
  | 'pa' // ਪੰਜਾਬੀ (Punjabi)
  | 'or'; // ଓଡ଼ିଆ (Odia)

export type UserRole = 'clinician' | 'patient' | 'caregiver' | 'coordinator';

export type TaskStatus =
  | 'Created'
  | 'Clinician Approved'
  | 'Sent'
  | 'Viewed'
  | 'Acknowledged'
  | 'Completed'
  | 'Cancelled';

export type TaskCategory =
  | 'Blood Test'
  | 'Imaging / Scan'
  | 'Chemotherapy Review'
  | 'Radiation Check'
  | 'Medication Refill'
  | 'Wound & Stoma Care'
  | 'Doctor Consultation';

export type AppointmentStatus =
  | 'Confirmed'
  | 'Awaiting Confirmation'
  | 'Reschedule Requested'
  | 'Cancelled';

export type HelpRequestStatus = 'Open' | 'In Progress' | 'Resolved';

export type LocalizedText = {
  en: string;
  te?: string;
  hi?: string;
  [lang: string]: string | undefined;
};

export type JourneyStageStatus = 'done' | 'current' | 'attn' | 'pending';

export interface JourneyStage {
  id: string;
  label: string;
  sublabel?: string;
  status: JourneyStageStatus;
  order: number;
}

export interface WellbeingScore {
  date: string;
  energy: number;   // 1 - 5
  pain: number;     // 1 - 5
  nausea: number;   // 1 - 5
  appetite: number; // 1 - 5
  sleep: number;    // 1 - 5
  notes?: string;
}

export interface Patient {
  id: string; // e.g. "P-1001"
  mrn: string;
  name: string;
  age: number;
  gender: string;
  diagnosis: string;
  department: string;
  primary_oncologist: string;
  preferred_language: Language;
  phone: string;
  caregiver_name?: string;
  caregiver_relation?: string;
  caregiver_phone?: string;
  caregiver_authorized: boolean;
  next_appointment_date?: string;
}

export interface FollowUpTask {
  id: string;
  patient_id: string;
  title: string;
  category: TaskCategory;
  department: string;
  due_date: string;
  clinical_instruction: string;
  simplified_instruction: LocalizedText;
  why_explanation: LocalizedText;
  what_to_do: LocalizedText;
  where_location: LocalizedText;
  status: TaskStatus;
  created_at: string;
  created_by: string;
  approved_by?: string;
  approved_at?: string;
  sent_at?: string;
  viewed_at?: string;
  completed_at?: string;
  is_urgent?: boolean;
  requires_staff_attention?: boolean;
  attention_reason?: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  patient_name: string;
  department: string;
  doctor_name: string;
  date_time: string;
  hospital_name: string;
  room_or_floor: string;
  status: AppointmentStatus;
  reschedule_reason?: string;
  notes?: string;
}

export interface HelpRequest {
  id: string;
  patient_id: string;
  patient_name: string;
  language: Language;
  reason: string;
  details?: string;
  status: HelpRequestStatus;
  created_at: string;
  resolved_at?: string;
  resolution_notes?: string;
  handled_by?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  patient_id: string;
  task_id?: string;
  details: string;
  language?: string;
}

export interface AIInstructionDraft {
  clinical_text: string;
  simplified_en: string;
  translated_te: string;
  translated_hi: string;
  why_en: string;
  why_te: string;
  why_hi: string;
  what_en: string;
  what_te: string;
  what_hi: string;
  suggested_category: string;
  suggested_due_date: string;
  suggested_location: string;
}

export interface Metrics {
  primary_kpi_name: string;
  kpi_definition: string;
  baseline_rate: number;
  pilot_rate: number;
  target_rate: number;
  rate_delta: string;
  today_followups_count: number;
  awaiting_patient_confirmation_count: number;
  pending_tasks_count: number;
  completed_this_week_percentage: number;
  average_time_to_acknowledge_hours: number;
  open_help_requests_count: number;
  resolved_help_requests_count: number;
  total_synthetic_patients: number;
}
