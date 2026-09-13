import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Patient, FollowUpTask, Appointment, HelpRequest, AuditLogEntry,
  Metrics, Language, UserRole, TaskStatus, AIInstructionDraft, AppointmentStatus,
  WellbeingScore
} from '../types';
import { translations, TranslationDictionary, getTranslation } from '../i18n/translations';

// Default preloaded dataset matching the backend seed
const DEFAULT_PATIENTS: Patient[] = [
  {
    id: "P-1001",
    mrn: "NCG-HYD-9910",
    name: "Ramesh Varma",
    age: 58,
    gender: "Male",
    diagnosis: "Stage II Colorectal Carcinoma (Post-op Adjuvant)",
    department: "Medical Oncology",
    primary_oncologist: "Dr. K. Rao",
    preferred_language: "te",
    phone: "+91 98490 12345",
    caregiver_name: "Suresh Varma (Son)",
    caregiver_relation: "Son",
    caregiver_phone: "+91 98490 54321",
    caregiver_authorized: true,
    next_appointment_date: "18 September 2026, 10:30 AM"
  },
  {
    id: "P-1002",
    mrn: "NCG-HYD-9912",
    name: "Sunita Sharma",
    age: 52,
    gender: "Female",
    diagnosis: "Invasive Ductal Carcinoma Breast (HER2 Positive)",
    department: "Medical Oncology",
    primary_oncologist: "Dr. S. Mukherjee",
    preferred_language: "hi",
    phone: "+91 97110 88231",
    caregiver_name: "Amit Sharma (Husband)",
    caregiver_relation: "Spouse",
    caregiver_phone: "+91 97110 88232",
    caregiver_authorized: true,
    next_appointment_date: "13 September 2026, 11:00 AM"
  },
  {
    id: "P-1003",
    mrn: "NCG-HYD-9914",
    name: "David Fernandez",
    age: 61,
    gender: "Male",
    diagnosis: "Oropharyngeal Squamous Cell Carcinoma (T2N1)",
    department: "Radiation Oncology",
    primary_oncologist: "Dr. P. Reddy",
    preferred_language: "en",
    phone: "+91 98200 44109",
    caregiver_name: "Maria Fernandez (Daughter)",
    caregiver_relation: "Daughter",
    caregiver_phone: "+91 98200 44110",
    caregiver_authorized: true,
    next_appointment_date: "14 September 2026, 09:30 AM"
  },
  {
    id: "P-1004",
    mrn: "NCG-HYD-9918",
    name: "Lakshmi Devi",
    age: 49,
    gender: "Female",
    diagnosis: "Carcinoma Cervix Stage IIB (Concurrent Chemo-RT)",
    department: "Radiation Oncology",
    primary_oncologist: "Dr. P. Reddy",
    preferred_language: "te",
    phone: "+91 94401 77234",
    caregiver_name: "Venkatesh (Husband)",
    caregiver_relation: "Spouse",
    caregiver_phone: "+91 94401 77235",
    caregiver_authorized: true,
    next_appointment_date: "15 September 2026, 02:00 PM"
  },
  {
    id: "P-1005",
    mrn: "NCG-HYD-9921",
    name: "Rajesh Kumar Patel",
    age: 64,
    gender: "Male",
    diagnosis: "Non-Small Cell Lung Cancer (EGFR Exon 19)",
    department: "Medical Oncology",
    primary_oncologist: "Dr. K. Rao",
    preferred_language: "hi",
    phone: "+91 99250 11982",
    caregiver_name: "Pooja Patel (Daughter)",
    caregiver_relation: "Daughter",
    caregiver_phone: "+91 99250 11983",
    caregiver_authorized: true,
    next_appointment_date: "19 September 2026, 11:30 AM"
  },
  {
    id: "P-1006",
    mrn: "NCG-HYD-9925",
    name: "Ananya Roy",
    age: 37,
    gender: "Female",
    diagnosis: "Hodgkin Lymphoma (ABVD Protocol)",
    department: "Medical Oncology",
    primary_oncologist: "Dr. S. Mukherjee",
    preferred_language: "en",
    phone: "+91 98310 99420",
    caregiver_name: "Subhash Roy (Father)",
    caregiver_relation: "Father",
    caregiver_phone: "+91 98310 99421",
    caregiver_authorized: true,
    next_appointment_date: "16 September 2026, 10:00 AM"
  },
  {
    id: "P-1007",
    mrn: "NCG-HYD-9930",
    name: "M. Satyanarayana",
    age: 66,
    gender: "Male",
    diagnosis: "Carcinoma Stomach (Post-Gastrectomy Surveillance)",
    department: "Surgical Oncology",
    primary_oncologist: "Dr. A. Sharma",
    preferred_language: "te",
    phone: "+91 98480 33119",
    caregiver_name: "Radha (Wife)",
    caregiver_relation: "Spouse",
    caregiver_phone: "+91 98480 33120",
    caregiver_authorized: true,
    next_appointment_date: "17 September 2026, 12:00 PM"
  },
  {
    id: "P-1008",
    mrn: "NCG-HYD-9934",
    name: "Fatima Begum",
    age: 55,
    gender: "Female",
    diagnosis: "Epithelial Ovarian Carcinoma Stage IIIC",
    department: "Medical Oncology",
    primary_oncologist: "Dr. K. Rao",
    preferred_language: "hi",
    phone: "+91 94190 66521",
    caregiver_name: "Zeeshan (Son)",
    caregiver_relation: "Son",
    caregiver_phone: "+91 94190 66522",
    caregiver_authorized: true,
    next_appointment_date: "20 September 2026, 09:30 AM"
  },
  {
    id: "P-1009",
    mrn: "NCG-HYD-9941",
    name: "K. Venkateswarlu",
    age: 71,
    gender: "Male",
    diagnosis: "Prostate Adenocarcinoma (Hormonal Therapy + RT)",
    department: "Radiation Oncology",
    primary_oncologist: "Dr. P. Reddy",
    preferred_language: "te",
    phone: "+91 98660 55102",
    caregiver_name: "K. Srinivas (Son)",
    caregiver_relation: "Son",
    caregiver_phone: "+91 98660 55103",
    caregiver_authorized: true,
    next_appointment_date: "21 September 2026, 03:00 PM"
  },
  {
    id: "P-1010",
    mrn: "NCG-HYD-9945",
    name: "Meera Chandran",
    age: 43,
    gender: "Female",
    diagnosis: "Papillary Thyroid Carcinoma (Post-Thyroidectomy)",
    department: "Surgical Oncology",
    primary_oncologist: "Dr. A. Sharma",
    preferred_language: "en",
    phone: "+91 94440 88204",
    caregiver_name: "K. Chandran (Husband)",
    caregiver_relation: "Spouse",
    caregiver_phone: "+91 94440 88205",
    caregiver_authorized: true,
    next_appointment_date: "22 September 2026, 11:00 AM"
  },
  {
    id: "P-1011",
    mrn: "NCG-HYD-9950",
    name: "Bhanu Prakash",
    age: 59,
    gender: "Male",
    diagnosis: "Squamous Cell Carcinoma Buccal Mucosa (Stoma Care)",
    department: "Surgical Oncology",
    primary_oncologist: "Dr. A. Sharma",
    preferred_language: "te",
    phone: "+91 99890 22314",
    caregiver_name: "Padma (Wife)",
    caregiver_relation: "Spouse",
    caregiver_phone: "+91 99890 22315",
    caregiver_authorized: true,
    next_appointment_date: "23 September 2026, 10:30 AM"
  },
  {
    id: "P-1012",
    mrn: "NCG-HYD-9955",
    name: "Geeta Devi",
    age: 62,
    gender: "Female",
    diagnosis: "Multiple Myeloma (Bortezomib Maintenance)",
    department: "Medical Oncology",
    primary_oncologist: "Dr. S. Mukherjee",
    preferred_language: "hi",
    phone: "+91 98100 77192",
    caregiver_name: "Ravi (Son)",
    caregiver_relation: "Son",
    caregiver_phone: "+91 98100 77193",
    caregiver_authorized: true,
    next_appointment_date: "24 September 2026, 11:30 AM"
  }
];

const DEFAULT_TASKS: FollowUpTask[] = [
  {
    id: "TASK-201",
    patient_id: "P-1001",
    title: "Complete Blood Test (CBC & Creatinine)",
    category: "Blood Test",
    department: "Medical Oncology",
    due_date: "18 September 2026",
    clinical_instruction: "Complete CBC and Serum Creatinine prior to Cycle 3 follow-up on 18 Sept.",
    simplified_instruction: {
      en: "Please get your blood test done before your next visit on 18 September.",
      te: "దయచేసి సెప్టెంబర్ 18న మీ తదుపరి సందర్శనకు ముందు రక్త పరీక్ష చేయించుకోండి.",
      hi: "कृपया 18 सितंबर को अपनी अगली मुलाकात से पहले अपना रक्त परीक्षण करवाएं।"
    },
    why_explanation: {
      en: "Your doctor asked you to complete this before your next visit to check your blood cell counts.",
      te: "మీ రక్త కణాల సంఖ్యను తనిఖీ చేయడానికి తదుపరి సందర్శనకు ముందు దీనిని పూర్తి చేయాలని మీ వైద్యులు కోరారు.",
      hi: "आपके रक्त कोशिकाओं की जांच के लिए अगली मुलाकात से पहले इसे पूरा करने की सलाह दी गई है।"
    },
    what_to_do: {
      en: "Visit the hospital laboratory on Ground Floor and complete the blood test.",
      te: "గ్రౌండ్ ఫ్లోర్‌లోని ఆసుపత్రి ప్రయోగశాలకు వెళ్లి రక్త పరీక్ష పూర్తి చేయండి.",
      hi: "ग्राउंड फ्लोर पर अस्पताल की लैब में जाएं और रक्त जांच करवाएं।"
    },
    where_location: {
      en: "Hospital Central Laboratory, Ground Floor",
      te: "హాస్పిటల్ సెంట్రల్ లాబొరేటరీ, గ్రౌండ్ ఫ్లోర్",
      hi: "अस्पताल सेंट्रल लैबोरेटरी, ग्राउंड फ्लोर"
    },
    status: "Sent",
    created_at: "09 Sep 10:42",
    created_by: "Dr. K. Rao (Medical Oncology)",
    approved_by: "Dr. K. Rao",
    approved_at: "09 Sep 10:45",
    sent_at: "09 Sep 10:46",
    is_urgent: true,
    requires_staff_attention: true,
    attention_reason: "Due tomorrow - patient has not confirmed"
  },
  {
    id: "TASK-202",
    patient_id: "P-1002",
    title: "Echocardiogram (2D Echo)",
    category: "Imaging / Scan",
    department: "Medical Oncology",
    due_date: "13 September 2026",
    clinical_instruction: "Baseline 2D Echo report required before Trastuzumab continuation.",
    simplified_instruction: {
      en: "Complete your heart scan (Echo) and keep the report ready for your doctor visit.",
      te: "మీ గుండె స్కాన్ (ఎకో) పూర్తి చేసి, డాక్టర్ విజిట్ కోసం నివేదికను సిద్ధంగా ఉంచుకోండి.",
      hi: "अपनी हृदय जांच (इको) करवाएं और डॉक्टर मुलाकात के लिए रिपोर्ट तैयार रखें।"
    },
    why_explanation: {
      en: "Ensures your heart is working safely during targeted cancer therapy.",
      te: "టార్గెటెడ్ థెరపీ సమయంలో మీ గుండె పనితీరు క్షేమంగా ఉందని నిర్ధారించుకోవడానికి.",
      hi: "लक्षित थेरेपी के दौरान यह सुनिश्चित करना कि हृदय सुरक्षित रूप से काम कर रहा है।"
    },
    what_to_do: {
      en: "Visit the Cardiology Department Room 104 with previous test documents.",
      te: "గత రిపోర్టులతో కార్డియాలజీ విభాగం రూమ్ 104 వద్దకు వెళ్లండి.",
      hi: "पिछली रिपोर्टों के साथ कार्डियोलॉजी विभाग कमरा 104 में जाएं।"
    },
    where_location: {
      en: "Cardiology Diagnostics, 1st Floor",
      te: "కార్డియాలజీ విభాగం, 1వ అంతస్తు",
      hi: "कार्डियोलॉजी विभाग, पहली मंजिल"
    },
    status: "Completed",
    created_at: "07 Sep 09:15",
    created_by: "Dr. S. Mukherjee",
    approved_by: "Dr. S. Mukherjee",
    approved_at: "07 Sep 09:18",
    sent_at: "07 Sep 09:20",
    completed_at: "10 Sep 14:10"
  },
  {
    id: "TASK-203",
    patient_id: "P-1003",
    title: "Restaging CECT Neck & Thorax",
    category: "Imaging / Scan",
    department: "Radiation Oncology",
    due_date: "14 September 2026",
    clinical_instruction: "CECT Neck and Thorax required prior to completion assessment.",
    simplified_instruction: {
      en: "Get your CT scan done with 4 hours fasting before the scan.",
      te: "స్కాన్‌కు 4 గంటల ముందు ఉపవాసం ఉండి సిటి స్కాన్ చేయించుకోండి.",
      hi: "स्कैन से 4 घंटे पहले भूखे पेट रहकर अपना सीटी स्कैन करवाएं।"
    },
    why_explanation: {
      en: "To check tumor response after radiation sessions.",
      te: "రేడియేషన్ సెషన్ల తర్వాత కణితి తగ్గుదలను తనిఖీ చేయడానికి.",
      hi: "रेडिएशन के बाद ट्यूमर के असर की जांच करने के लिए।"
    },
    what_to_do: {
      en: "Arrive at Radiology basement 30 minutes early.",
      te: "30 నిమిషాల ముందుగా రేడియాలజీ బేస్‌మెంట్‌కు చేరుకోండి.",
      hi: "30 मिनट पहले रेडियोलॉजी बेसमेंट में पहुंचें।"
    },
    where_location: {
      en: "Department of Radiology, Basement 1",
      te: "రేడియాలజీ విభాగం, బేస్‌మెంట్ 1",
      hi: "रेडियोलॉजी विभाग, बेसमेंट 1"
    },
    status: "Acknowledged",
    created_at: "08 Sep 11:30",
    created_by: "Dr. P. Reddy",
    approved_by: "Dr. P. Reddy",
    approved_at: "08 Sep 11:35",
    sent_at: "08 Sep 11:40"
  },
  {
    id: "TASK-204",
    patient_id: "P-1004",
    title: "Weekly Radiation Toxicity Review",
    category: "Radiation Check",
    department: "Radiation Oncology",
    due_date: "15 September 2026",
    clinical_instruction: "Weekly RT toxicity assessment and skin check.",
    simplified_instruction: {
      en: "Visit the clinic for your weekly skin and hydration check.",
      te: "మీ వారంవారీ చర్మ తనిఖీ కోసం క్లినిక్‌కి రండి.",
      hi: "अपनी साप्ताहिक त्वचा जांच के लिए क्लिनिक आएं।"
    },
    why_explanation: {
      en: "Ensures your skin is healing well and hydration is sufficient.",
      te: "చర్మం ఆరోగ్యంగా ఉందని మరియు తగినంత నీరు తాగుతున్నారని నిర్ధారించడానికి.",
      hi: "यह देखने के लिए कि त्वचा ठीक है और पर्याप्त पानी पी रहे हैं।"
    },
    what_to_do: {
      en: "Report to Radiation OPD Room 6.",
      te: "రేడియేషన్ ఓపీడీ రూమ్ 6కి రండి.",
      hi: "रेडिएशन ओपीडी कमरा 6 में आएं।"
    },
    where_location: {
      en: "Radiation OPD, Room 6",
      te: "రేడియేషన్ ఓపీడీ, రూమ్ 6",
      hi: "रेडिएशन ओपीडी, कमरा 6"
    },
    status: "Sent",
    created_at: "09 Sep 15:00",
    created_by: "Dr. P. Reddy",
    approved_by: "Dr. P. Reddy",
    approved_at: "09 Sep 15:05",
    sent_at: "09 Sep 15:10",
    requires_staff_attention: true,
    attention_reason: "Patient requested clarification on appointment timing"
  }
];

const DEFAULT_APPOINTMENTS: Appointment[] = [
  {
    id: "APT-301",
    patient_id: "P-1001",
    patient_name: "Ramesh Varma",
    department: "Medical Oncology",
    doctor_name: "Dr. K. Rao",
    date_time: "18 September 2026, 10:30 AM",
    hospital_name: "NCG Partner Regional Cancer Center",
    room_or_floor: "OPD Block B, Room 14",
    status: "Awaiting Confirmation"
  },
  {
    id: "APT-302",
    patient_id: "P-1002",
    patient_name: "Sunita Sharma",
    department: "Medical Oncology",
    doctor_name: "Dr. S. Mukherjee",
    date_time: "13 September 2026, 11:00 AM",
    hospital_name: "NCG Partner Regional Cancer Center",
    room_or_floor: "OPD Block A, Room 08",
    status: "Confirmed"
  },
  {
    id: "APT-303",
    patient_id: "P-1004",
    patient_name: "Lakshmi Devi",
    department: "Radiation Oncology",
    doctor_name: "Dr. P. Reddy",
    date_time: "15 September 2026, 02:00 PM",
    hospital_name: "NCG Partner Regional Cancer Center",
    room_or_floor: "Radiation Linac Unit 2",
    status: "Reschedule Requested",
    reschedule_reason: "Family bus transit unavailable on Tuesday afternoon. Requested Wednesday morning."
  }
];

const DEFAULT_HELP_REQUESTS: HelpRequest[] = [
  {
    id: "HLP-401",
    patient_id: "P-1001",
    patient_name: "Ramesh Varma",
    language: "te",
    reason: "I cannot reach the hospital",
    details: "RTC bus strike announced on rural route to Hyderabad on 18th Sept. Need assistance arranging patient transport or postponing blood test by 1 day.",
    status: "Open",
    created_at: "09 Sep 16:20"
  },
  {
    id: "HLP-402",
    patient_id: "P-1004",
    patient_name: "Lakshmi Devi",
    language: "te",
    reason: "I need help with my appointment",
    details: "Husband working daily wage shifts. Requests rescheduling to morning slot 10 AM.",
    status: "In Progress",
    created_at: "09 Sep 12:45",
    handled_by: "Care Coordinator Anita"
  }
];

const DEFAULT_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "AUD-101",
    timestamp: "09 Sep 10:42",
    actor: "Dr. K. Rao",
    role: "Medical Oncologist",
    action: "Created follow-up instruction",
    patient_id: "P-1001",
    task_id: "TASK-201",
    details: "Input: 'Complete CBC and Serum Creatinine prior to Cycle 3 follow-up on 18 Sept.'"
  },
  {
    id: "AUD-102",
    timestamp: "09 Sep 10:44",
    actor: "Assistive AI Engine",
    role: "System Service",
    action: "Generated patient-friendly draft",
    patient_id: "P-1001",
    task_id: "TASK-201",
    details: "Created simplified English, Telugu, and Hindi drafts for clinician review"
  },
  {
    id: "AUD-103",
    timestamp: "09 Sep 10:45",
    actor: "Dr. K. Rao",
    role: "Medical Oncologist",
    action: "Approved instruction version",
    patient_id: "P-1001",
    task_id: "TASK-201",
    details: "Verified clinical safety and authorized multilingual dispatch"
  },
  {
    id: "AUD-104",
    timestamp: "09 Sep 10:46",
    actor: "CareBridge Delivery Queue",
    role: "System Service",
    action: "Dispatched instruction",
    patient_id: "P-1001",
    task_id: "TASK-201",
    details: "Instruction sent to patient app & caregiver SMS in Telugu (Primary)",
    language: "te"
  },
  {
    id: "AUD-105",
    timestamp: "09 Sep 16:20",
    actor: "Ramesh Varma",
    role: "Patient",
    action: "Submitted Help Request",
    patient_id: "P-1001",
    task_id: "TASK-201",
    details: "Reason: Cannot reach hospital due to rural bus strike",
    language: "te"
  }
];

interface CareBridgeContextType {
  // Navigation & Role
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentLanguage: Language;
  setCurrentLanguage: (lang: Language) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  deviceMode: 'desktop' | 'mobile_frame';
  setDeviceMode: (mode: 'desktop' | 'mobile_frame') => void;
  t: TranslationDictionary;

  // Data
  patients: Patient[];
  selectedPatientId: string;
  setSelectedPatientId: (id: string) => void;
  selectedPatient: Patient;
  tasks: FollowUpTask[];
  appointments: Appointment[];
  helpRequests: HelpRequest[];
  auditLogs: AuditLogEntry[];
  metrics: Metrics;

  // Wellbeing & Symptom Tracking
  wellbeingScores: WellbeingScore[];
  addWellbeingScore: (score: WellbeingScore) => void;

  // Hero Demo 10-step wizard
  heroDemoStep: number;
  setHeroDemoStep: (step: number) => void;
  advanceHeroDemo: () => void;
  runFullHeroDemo: () => void;

  // Actions
  createTask: (data: Partial<FollowUpTask> & { approvedImmediately?: boolean }) => Promise<FollowUpTask>;
  approveTask: (taskId: string) => void;
  completeTask: (taskId: string) => void;
  confirmAppointment: (apptId: string) => void;
  requestReschedule: (apptId: string, reason: string) => void;
  submitHelpRequest: (reason: string, details?: string) => void;
  resolveHelpRequest: (reqId: string, notes: string) => void;
  simplifyInstruction: (clinicalText: string, dueDate?: string) => Promise<AIInstructionDraft>;
  resetToHeroState: () => void;
}

const DEFAULT_WELLBEING_SCORES: WellbeingScore[] = [
  { date: "05 Sep", energy: 2, pain: 3, nausea: 2, appetite: 3, sleep: 3 },
  { date: "06 Sep", energy: 3, pain: 3, nausea: 2, appetite: 3, sleep: 3 },
  { date: "07 Sep", energy: 3, pain: 2, nausea: 1, appetite: 4, sleep: 4 },
  { date: "08 Sep", energy: 2, pain: 2, nausea: 2, appetite: 3, sleep: 3 },
  { date: "09 Sep", energy: 3, pain: 2, nausea: 1, appetite: 4, sleep: 4 },
  { date: "10 Sep", energy: 4, pain: 1, nausea: 1, appetite: 4, sleep: 4 },
];

const CareBridgeContext = createContext<CareBridgeContextType | undefined>(undefined);

export const CareBridgeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('clinician');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('te');
  const [currentView, setCurrentView] = useState<string>('landing');
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile_frame'>('desktop');

  const [patients, setPatients] = useState<Patient[]>(DEFAULT_PATIENTS);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('P-1001');
  const [tasks, setTasks] = useState<FollowUpTask[]>(DEFAULT_TASKS);
  const [appointments, setAppointments] = useState<Appointment[]>(DEFAULT_APPOINTMENTS);
  const [helpRequests, setHelpRequests] = useState<HelpRequest[]>(DEFAULT_HELP_REQUESTS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(DEFAULT_AUDIT_LOGS);
  const [wellbeingScores, setWellbeingScores] = useState<WellbeingScore[]>(DEFAULT_WELLBEING_SCORES);
  const [heroDemoStep, setHeroDemoStep] = useState<number>(0);

  const selectedPatient = patients.find(p => p.id === selectedPatientId) || patients[0];
  const t = getTranslation(currentLanguage);

  const addWellbeingScore = (score: WellbeingScore) => {
    setWellbeingScores(prev => [...prev.slice(-13), score]);
    addAuditLog(
      "Patient submitted symptom check-in",
      `Energy: ${score.energy}/5, Pain: ${score.pain}/5, Nausea: ${score.nausea}/5`,
      undefined,
      selectedPatient.name,
      "Patient"
    );
  };

  // Calculated live metrics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const currentCompletionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 82;
  const pilotRate = Math.max(82, currentCompletionRate);

  const metrics: Metrics = {
    primary_kpi_name: "Follow-up Completion Rate",
    kpi_definition: "Percentage of scheduled follow-up tasks completed within the defined time window.",
    baseline_rate: 72,
    pilot_rate: pilotRate,
    target_rate: 85,
    rate_delta: `+${pilotRate - 72}%`,
    today_followups_count: 24,
    awaiting_patient_confirmation_count: tasks.filter(t => t.status === 'Sent').length,
    pending_tasks_count: tasks.filter(t => t.status !== 'Completed' && t.status !== 'Cancelled').length,
    completed_this_week_percentage: 87,
    average_time_to_acknowledge_hours: 3.8,
    open_help_requests_count: helpRequests.filter(h => h.status !== 'Resolved').length,
    resolved_help_requests_count: helpRequests.filter(h => h.status === 'Resolved').length,
    total_synthetic_patients: patients.length,
  };

  const addAuditLog = (action: string, details: string, taskId?: string, actor?: string, role?: string, lang?: string) => {
    const now = new Date();
    const timeStr = `${String(now.getDate()).padStart(2, '0')} Sep ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newEntry: AuditLogEntry = {
      id: `AUD-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      timestamp: timeStr,
      actor: actor || (currentRole === 'clinician' ? 'Dr. K. Rao' : currentRole === 'patient' ? selectedPatient.name : 'Care Coordinator Anita'),
      role: role || (currentRole === 'clinician' ? 'Medical Oncologist' : currentRole === 'patient' ? 'Patient' : 'Care Coordinator'),
      action,
      patient_id: selectedPatient.id,
      task_id: taskId,
      details,
      language: lang || currentLanguage
    };
    setAuditLogs(prev => [newEntry, ...prev]);
  };

  const createTask = async (data: Partial<FollowUpTask> & { approvedImmediately?: boolean }): Promise<FollowUpTask> => {
    const now = new Date();
    const timeStr = `${String(now.getDate()).padStart(2, '0')} Sep ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newId = `TASK-${Math.floor(100 + Math.random() * 900)}`;

    const newTask: FollowUpTask = {
      id: newId,
      patient_id: selectedPatient.id,
      title: data.title || "Clinical Follow-up Task",
      category: data.category || "Blood Test",
      department: data.department || selectedPatient.department,
      due_date: data.due_date || "18 September 2026",
      clinical_instruction: data.clinical_instruction || "",
      simplified_instruction: data.simplified_instruction || {
        en: data.clinical_instruction || "",
        te: "దయచేసి మీ తదుపరి డాక్టర్ సందర్శనకు ముందు ఈ పరీక్షను పూర్తి చేయండి.",
        hi: "कृपया अपनी अगली डॉक्टर मुलाकात से पहले यह जांच पूरी करें।"
      },
      why_explanation: data.why_explanation || {
        en: "Your oncologist requested this to monitor your health progress safely.",
        te: "మీ ఆరోగ్యం సురక్షితంగా ఉందని పరిశీలించడానికి మీ వైద్యులు దీనిని సూచించారు.",
        hi: "आपके स्वास्थ्य की सुरक्षित निगरानी के लिए डॉक्टर ने यह सलाह दी है।"
      },
      what_to_do: data.what_to_do || {
        en: "Visit the hospital laboratory desk in the morning.",
        te: "ఉదయం ఆసుపత్రి ప్రయోగశాల కౌంటర్ వద్దకు రండి.",
        hi: "सुबह अस्पताल की लैब काउंटर पर जाएं।"
      },
      where_location: data.where_location || {
        en: "Hospital Central Laboratory, Ground Floor",
        te: "హాస్పిటల్ సెంట్రల్ లాబొరేటరీ, గ్రౌండ్ ఫ్లోర్",
        hi: "अस्पताल सेंट्रल लैबोरेटरी, ग्राउंड फ्लोर"
      },
      status: data.approvedImmediately ? "Sent" : "Created",
      created_at: timeStr,
      created_by: "Dr. K. Rao (Medical Oncology)",
      approved_by: data.approvedImmediately ? "Dr. K. Rao" : undefined,
      approved_at: data.approvedImmediately ? timeStr : undefined,
      sent_at: data.approvedImmediately ? timeStr : undefined,
      is_urgent: data.is_urgent || false,
      requires_staff_attention: false,
    };

    setTasks(prev => [newTask, ...prev]);

    addAuditLog(
      "Created follow-up instruction",
      `Order: "${newTask.clinical_instruction}" for ${selectedPatient.name}`,
      newTask.id,
      "Dr. K. Rao",
      "Medical Oncologist"
    );

    if (data.approvedImmediately) {
      addAuditLog(
        "Approved and dispatched instruction",
        `Instruction sent in Telugu, Hindi & English to patient and caregiver`,
        newTask.id,
        "Dr. K. Rao",
        "Medical Oncologist"
      );
    }

    return newTask;
  };

  const approveTask = (taskId: string) => {
    const now = new Date();
    const timeStr = `${String(now.getDate()).padStart(2, '0')} Sep ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          status: "Sent",
          approved_by: "Dr. K. Rao",
          approved_at: timeStr,
          sent_at: timeStr
        };
      }
      return t;
    }));

    addAuditLog(
      "Approved instruction version",
      `Dr. Rao verified clinical intent and approved multilingual patient cards`,
      taskId,
      "Dr. K. Rao",
      "Medical Oncologist"
    );
  };

  const completeTask = (taskId: string) => {
    const now = new Date();
    const timeStr = `${String(now.getDate()).padStart(2, '0')} Sep ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0d9488', '#14b8a6', '#22c55e', '#38bdf8']
      });
    } catch {
      // safe fallback if not supported
    }

    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          status: "Completed",
          completed_at: timeStr,
          requires_staff_attention: false
        };
      }
      return t;
    }));

    addAuditLog(
      "Patient marked task completed",
      `Task marked completed via mobile patient portal. Loop closed successfully!`,
      taskId,
      selectedPatient.name,
      "Patient",
      currentLanguage
    );
  };

  const confirmAppointment = (apptId: string) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === apptId) {
        return { ...a, status: "Confirmed" as AppointmentStatus };
      }
      return a;
    }));

    addAuditLog(
      "Appointment Confirmed",
      `Patient confirmed attendance for next oncology appointment`,
      undefined,
      selectedPatient.name,
      "Patient"
    );
  };

  const requestReschedule = (apptId: string, reason: string) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === apptId) {
        return { ...a, status: "Reschedule Requested" as AppointmentStatus, reschedule_reason: reason };
      }
      return a;
    }));

    addAuditLog(
      "Reschedule Request Submitted",
      `Reason: ${reason}. Forwarded to care coordinator queue.`,
      undefined,
      selectedPatient.name,
      "Patient"
    );
  };

  const submitHelpRequest = (reason: string, details?: string) => {
    const now = new Date();
    const timeStr = `${String(now.getDate()).padStart(2, '0')} Sep ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newReq: HelpRequest = {
      id: `HLP-${Math.floor(100 + Math.random() * 900)}`,
      patient_id: selectedPatient.id,
      patient_name: selectedPatient.name,
      language: currentLanguage,
      reason,
      details: details || "",
      status: "Open",
      created_at: timeStr
    };

    setHelpRequests(prev => [newReq, ...prev]);

    addAuditLog(
      "Submitted Help Request",
      `Topic: "${reason}". Care team notified in Follow-up Queue.`,
      undefined,
      selectedPatient.name,
      "Patient",
      currentLanguage
    );
  };

  const resolveHelpRequest = (reqId: string, notes: string) => {
    const now = new Date();
    const timeStr = `${String(now.getDate()).padStart(2, '0')} Sep ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setHelpRequests(prev => prev.map(h => {
      if (h.id === reqId) {
        return {
          ...h,
          status: "Resolved",
          resolution_notes: notes,
          resolved_at: timeStr,
          handled_by: "Care Coordinator Anita"
        };
      }
      return h;
    }));

    addAuditLog(
      "Resolved Help Request",
      `Action taken: ${notes}`,
      undefined,
      "Care Coordinator Anita",
      "Care Coordinator"
    );
  };

  const simplifyInstruction = async (clinicalText: string, dueDate: string = "Before next visit"): Promise<AIInstructionDraft> => {
    // Check if FastAPI is responsive
    try {
      const res = await fetch("http://localhost:8000/api/ai/simplify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clinical_text: clinicalText, due_date: dueDate })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Use built-in offline engine
    }

    const textLower = clinicalText.toLowerCase();
    if (textLower.includes("cbc") || textLower.includes("blood") || textLower.includes("creatinine")) {
      return {
        clinical_text: clinicalText,
        simplified_en: "Please get your complete blood test done before your next visit on 18 September.",
        translated_te: "దయచేసి సెప్టెంబర్ 18న మీ తదుపరి సందర్శనకు ముందు రక్త పరీక్ష (CBC) చేయించుకోండి.",
        translated_hi: "कृपया 18 सितंबर को अपनी अगली मुलाकात से पहले अपना रक्त परीक्षण (CBC) करवाएं।",
        why_en: "Your doctor needs to check your blood cell counts before giving the next chemotherapy cycle.",
        why_te: "తదుపరి కీమోథెరపీ సైకిల్ ఇవ్వడానికి ముందు మీ రక్త కణాల సంఖ్యను తనిఖీ చేయడానికి వైద్యులకు ఈ రిపోర్ట్ అవసరం.",
        why_hi: "अगला कीमोथेरेपी चक्र शुरू करने से पहले डॉक्टर को आपके रक्त कोशिकाओं की जांच करनी है।",
        what_en: "Visit the hospital central lab on Ground Floor in the morning. Fasting is not required.",
        what_te: "ఉదయం గ్రౌండ్ ఫ్లోర్‌లోని హాస్పిటల్ సెంట్రల్ ల్యాబ్‌కు వెళ్లండి. ఖాళీ కడుపుతో ఉండనవసరం లేదు.",
        what_hi: "सुबह ग्राउंड फ्लोर पर अस्पताल की सेंट्रल लैब में जाएं। भूखे पेट रहने की आवश्यकता नहीं है।",
        suggested_category: "Blood Test",
        suggested_due_date: dueDate || "18 September 2026",
        suggested_location: "Hospital Central Laboratory, Ground Floor"
      };
    } else if (textLower.includes("scan") || textLower.includes("ct") || textLower.includes("pet") || textLower.includes("mri")) {
      return {
        clinical_text: clinicalText,
        simplified_en: "Complete your CT scan and collect the report before your review appointment.",
        translated_te: "మీ సమీక్ష అపాయింట్‌మెంట్‌కు ముందు మీ స్కానింగ్ పూర్తి చేసి రిపోర్ట్ తీసుకోండి.",
        translated_hi: "अपनी डॉक्टर मुलाकात से पहले स्कैन पूरा करवाएं और रिपोर्ट प्राप्त करें।",
        why_en: "The scan helps your care team check how well the cancer is responding to treatment.",
        why_te: "చికిత్స ఎలా పనిచేస్తుందో తనిఖీ చేయడానికి ఈ స్కాన్ మీ వైద్య బృందానికి సహాయపడుతుంది.",
        why_hi: "यह स्कैन आपकी देखभाल टीम को यह देखने में मदद करता है कि इलाज का कितना असर हो रहा है।",
        what_en: "Arrive 30 minutes early at the Radiology desk. Keep 4 hours fasting before the scan.",
        what_te: "రేడియాలజీ డెస్క్ వద్దకు 30 నిమిషాల ముందుగా చేరుకోండి. స్కాన్‌కు 4 గంటల ముందు ఉపవాసం ఉండండి.",
        what_hi: "रेडियोलॉजी काउंटर पर 30 मिनट पहले पहुंचे। स्कैन से 4 घंटे पहले भूखे पेट रहें।",
        suggested_category: "Imaging / Scan",
        suggested_due_date: dueDate || "22 September 2026",
        suggested_location: "Department of Radiology & Imaging, Basement 1"
      };
    }

    return {
      clinical_text: clinicalText,
      simplified_en: `Please complete this follow-up step: ${clinicalText.trim()}`,
      translated_te: `దయచేసి మీ వైద్యులు సూచించిన ఈ తదుపరి పనిని పూర్తి చేయండి: ${clinicalText.trim()}`,
      translated_hi: `कृपया अपने डॉक्टर द्वारा बताए गए इस अगले कदम को पूरा करें: ${clinicalText.trim()}`,
      why_en: "Your oncologist has scheduled this follow-up as part of your active cancer care plan.",
      why_te: "మీ నిరంతర క్యాన్సర్ సంరక్షణ ప్రణాళికలో భాగంగా మీ వైద్యులు దీనిని సూచించారు.",
      why_hi: "आपकी सक्रिय कैंसर देखभाल योजना के हिस्से के रूप में डॉक्टर ने यह सलाह दी है।",
      what_en: "Follow the instructions given above or contact your care coordinator if you need help.",
      what_te: "పైన తెలిపిన సూచనలను పాటించండి లేదా సందేహాలుంటే సమన్వయకర్తను సంప్రదించండి.",
      what_hi: "ऊपर दिए गए निर्देशों का पालन करें या आवश्यकता पड़ने पर संपर्क करें।",
      suggested_category: "Doctor Consultation",
      suggested_due_date: dueDate || "Before next visit",
      suggested_location: "OPD Oncology Unit"
    };
  };

  const advanceHeroDemo = () => {
    setHeroDemoStep(prev => {
      const next = prev + 1;
      if (next === 1) {
        setSelectedPatientId("P-1001");
        setCurrentRole("clinician");
        setCurrentView("dashboard");
      } else if (next === 5) {
        setCurrentLanguage("te");
      } else if (next === 6) {
        setCurrentRole("patient");
        setDeviceMode("mobile_frame");
        setCurrentView("patient-home");
      } else if (next === 7) {
        // Complete task-201
        completeTask("TASK-201");
      } else if (next === 8) {
        setCurrentRole("clinician");
        setDeviceMode("desktop");
        setCurrentView("dashboard");
      } else if (next === 9) {
        setCurrentView("audit");
      } else if (next === 10) {
        setCurrentView("impact");
      }
      return next > 10 ? 1 : next;
    });
  };

  const runFullHeroDemo = () => {
    setHeroDemoStep(1);
    setSelectedPatientId("P-1001");
    setCurrentRole("clinician");
    setCurrentView("dashboard");
  };

  const resetToHeroState = () => {
    setTasks(DEFAULT_TASKS);
    setAppointments(DEFAULT_APPOINTMENTS);
    setHelpRequests(DEFAULT_HELP_REQUESTS);
    setAuditLogs(DEFAULT_AUDIT_LOGS);
    setSelectedPatientId("P-1001");
    setHeroDemoStep(0);
    setCurrentLanguage("te");
  };

  return (
    <CareBridgeContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        currentLanguage,
        setCurrentLanguage,
        currentView,
        setCurrentView,
        deviceMode,
        setDeviceMode,
        t,
        patients,
        selectedPatientId,
        setSelectedPatientId,
        selectedPatient,
        tasks,
        appointments,
        helpRequests,
        auditLogs,
        wellbeingScores,
        addWellbeingScore,
        metrics,
        heroDemoStep,
        setHeroDemoStep,
        advanceHeroDemo,
        runFullHeroDemo,
        createTask,
        approveTask,
        completeTask,
        confirmAppointment,
        requestReschedule,
        submitHelpRequest,
        resolveHelpRequest,
        simplifyInstruction,
        resetToHeroState,
      }}
    >
      {children}
    </CareBridgeContext.Provider>
  );
};

export const useCareBridge = () => {
  const context = useContext(CareBridgeContext);
  if (!context) {
    throw new Error("useCareBridge must be used within a CareBridgeProvider");
  }
  return context;
};
