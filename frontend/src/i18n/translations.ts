import { Language } from '../types';

export interface LanguageMeta {
  code: Language;
  name: string;
  nativeName: string;
  script: string;
  region: string;
}

export const INDIAN_LANGUAGES: LanguageMeta[] = [
  { code: 'en', name: 'English', nativeName: 'English', script: 'Latin', region: 'Pan-India' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', script: 'Devanagari', region: 'North & Central India' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', script: 'Telugu', region: 'Andhra Pradesh & Telangana' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', script: 'Tamil', region: 'Tamil Nadu & Puducherry' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', script: 'Kannada', region: 'Karnataka' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', script: 'Malayalam', region: 'Kerala' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', script: 'Bengali', region: 'West Bengal & Northeast' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', script: 'Devanagari', region: 'Maharashtra' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', script: 'Gujarati', region: 'Gujarat' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', script: 'Gurmukhi', region: 'Punjab' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', script: 'Odia', region: 'Odisha' },
];

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  heroHeadline: string;
  heroSubhead: string;
  tryClinicianDemo: string;
  tryPatientExp: string;
  heroStepDemo: string;
  nav: {
    dashboard: string;
    patients: string;
    followups: string;
    queue: string;
    helpRequests: string;
    documents: string;
    impact: string;
    pilot: string;
    auditLog: string;
    privacy: string;
    home: string;
    myTasks: string;
    appointments: string;
    help: string;
    language: string;
    caregiver: string;
    roleSwitcher: string;
  };
  journey: {
    title: string;
    subtitle: string;
    currentMilestone: string;
    nextMilestone: string;
    viewFullJourney: string;
    stages: {
      diagnosis: string;
      investigations: string;
      staging: string;
      planning: string;
      treatment: string;
      monitoring: string;
      followup: string;
    };
    status: {
      completed: string;
      inProgress: string;
      needsAttention: string;
      upcoming: string;
    };
    cycleLabel: string;
  };
  wellbeing: {
    title: string;
    subtitle: string;
    checkinButton: string;
    todayCheckin: string;
    sevenDayTrend: string;
    energy: string;
    pain: string;
    nausea: string;
    appetite: string;
    sleep: string;
    submitCheckin: string;
    submittedNotice: string;
  };
  patientHome: {
    greeting: string;
    nextStepsHeadline: string;
    subhead: string;
    nextAppointment: string;
    tasksToDo: string;
    needHelpHeadline: string;
    needHelpSubhead: string;
    completedThis: string;
    viewDetails: string;
    showClinicQR: string;
    clinicCheckinCode: string;
    scanAtDesk: string;
    noPendingTasks: string;
    allCaughtUp: string;
    journeySummaryButton: string;
  };
  taskDetail: {
    whyHeadline: string;
    whatToDoHeadline: string;
    whenHeadline: string;
    whereHeadline: string;
    markAsCompleted: string;
    alreadyCompleted: string;
    needHelpButton: string;
    closeModal: string;
    clinicianOriginal: string;
    humanApprovedNotice: string;
  };
  appointment: {
    nextAppointment: string;
    confirmAppointment: string;
    confirmedBadge: string;
    rescheduleRequestedBadge: string;
    needToReschedule: string;
    needHelp: string;
    rescheduleNotice: string;
    enterReason: string;
    submitRequest: string;
    cancel: string;
  };
  helpModal: {
    title: string;
    subtitle: string;
    reasons: {
      dontUnderstand: string;
      cannotReachHospital: string;
      needApptHelp: string;
      couldNotComplete: string;
      needCaregiver: string;
      other: string;
    };
    detailsPlaceholder: string;
    submitButton: string;
    submitting: string;
    successMessage: string;
  };
  caregiver: {
    title: string;
    subtitle: string;
    authorizedBanner: string;
    upcoming: string;
    pendingTasks: string;
    completedTasks: string;
    remindPatient: string;
    reminderSent: string;
    viewInstructions: string;
    contactCareTeam: string;
    callClinicStaff: string;
  };
  clinician: {
    dashboardTitle: string;
    todayFollowups: string;
    awaitingConfirmation: string;
    pendingTasks: string;
    completedThisWeek: string;
    newFollowupButton: string;
    uploadDocButton: string;
    followupQueueButton: string;
    table: {
      patient: string;
      nextStep: string;
      due: string;
      status: string;
      language: string;
      action: string;
    };
    aiDraftBadge: string;
    approveAndSend: string;
    rejectDraft: string;
    editDraft: string;
  };
  statuses: {
    created: string;
    approved: string;
    sent: string;
    viewed: string;
    acknowledged: string;
    completed: string;
    cancelled: string;
  };
}

// English Dictionary (Reference Baseline)
const en: TranslationDictionary = {
  appName: "CareBridge NCG",
  tagline: "Multilingual Cancer Follow-Up & Care Instruction Closure",
  heroHeadline: "Make every cancer-care follow-up count.",
  heroSubhead: "An assistive care-instruction closure platform converting oncology discharge orders into simplified, multilingual, and trackable steps for patients and families.",
  tryClinicianDemo: "Clinician Portal",
  tryPatientExp: "Patient Digital Pass",
  heroStepDemo: "Interactive 10-Step Walkthrough",
  nav: {
    dashboard: "Dashboard",
    patients: "Patient Roster",
    followups: "Follow-up Orders",
    queue: "Closure Queue",
    helpRequests: "Help Requests",
    documents: "Discharge Documents",
    impact: "Impact & KPI Metrics",
    pilot: "NCG Pilot",
    auditLog: "Audit Trail",
    privacy: "Privacy & Consent",
    home: "Care Pass",
    myTasks: "My Actions",
    appointments: "Visits",
    help: "Get Assistance",
    language: "Language",
    caregiver: "Family Caregiver",
    roleSwitcher: "Role Selector",
  },
  journey: {
    title: "My Cancer Care Journey",
    subtitle: "Connected roadmap from diagnosis through active therapy and survivorship",
    currentMilestone: "Current Stage",
    nextMilestone: "Next Recorded Milestone",
    viewFullJourney: "View Full Journey",
    stages: {
      diagnosis: "Diagnosis",
      investigations: "Investigations",
      staging: "Staging",
      planning: "Treatment Planning",
      treatment: "Active Treatment",
      monitoring: "Response Monitoring",
      followup: "Follow-up & Survivorship",
    },
    status: {
      completed: "Completed",
      inProgress: "In Progress",
      needsAttention: "Needs Attention",
      upcoming: "Upcoming",
    },
    cycleLabel: "Cycle",
  },
  wellbeing: {
    title: "Symptom & Wellbeing Check-in",
    subtitle: "A gentle daily check-in that tracks trends for your care team. Not a diagnostic tool.",
    checkinButton: "Daily Wellbeing Check-in",
    todayCheckin: "Today's Assessment",
    sevenDayTrend: "7-Day Symptom Trajectory",
    energy: "Energy Level",
    pain: "Pain Severity",
    nausea: "Nausea",
    appetite: "Appetite",
    sleep: "Sleep Quality",
    submitCheckin: "Record Today's Check-in",
    submittedNotice: "Check-in logged. Your care coordinator will see this trend at your next review.",
  },
  patientHome: {
    greeting: "Hello",
    nextStepsHeadline: "Your Upcoming Actions",
    subhead: "Please follow these instructions before your next oncology review",
    nextAppointment: "Next Clinic Visit",
    tasksToDo: "To Do Actions",
    needHelpHeadline: "Have Questions or Need Assistance?",
    needHelpSubhead: "If you are experiencing travel difficulty, cost barriers, or questions, tap below.",
    completedThis: "I've completed this",
    viewDetails: "View Details",
    showClinicQR: "Show Desk QR",
    clinicCheckinCode: "Clinic Check-in Code",
    scanAtDesk: "Present at Hospital Reception or Lab Desk",
    noPendingTasks: "No Pending Actions",
    allCaughtUp: "You are up to date on all instructions for this cycle.",
    journeySummaryButton: "Journey Summary Sheet",
  },
  taskDetail: {
    whyHeadline: "Why is this needed?",
    whatToDoHeadline: "What you need to do",
    whenHeadline: "When is it due?",
    whereHeadline: "Where do you go?",
    markAsCompleted: "Mark as Completed",
    alreadyCompleted: "Completed",
    needHelpButton: "I Need Help With This",
    closeModal: "Close",
    clinicianOriginal: "Original Clinical Note (Doctor's Order)",
    humanApprovedNotice: "Verified and approved by your oncologist.",
  },
  appointment: {
    nextAppointment: "Next Oncology Appointment",
    confirmAppointment: "Confirm I will attend",
    confirmedBadge: "Attendance Confirmed",
    rescheduleRequestedBadge: "Reschedule Pending",
    needToReschedule: "Request Reschedule",
    needHelp: "Need Help?",
    rescheduleNotice: "Your care coordinator will contact you with alternative appointment times.",
    enterReason: "Reason for rescheduling (transit, illness, etc.)",
    submitRequest: "Submit Request",
    cancel: "Cancel",
  },
  helpModal: {
    title: "Request Assistance from Care Team",
    subtitle: "Our patient navigation team will contact you to ensure your treatment stays on track.",
    reasons: {
      dontUnderstand: "I do not understand what test or medication is needed",
      cannotReachHospital: "Transit or distance issues getting to the hospital",
      needApptHelp: "Need help scheduling or changing my visit",
      couldNotComplete: "Financial or laboratory access difficulty",
      needCaregiver: "Need my caregiver to be notified",
      other: "Other assistance required",
    },
    detailsPlaceholder: "Optional details to help us assist you faster...",
    submitButton: "Send Request to Coordinator",
    submitting: "Sending Request...",
    successMessage: "Your request was received. An oncology coordinator will contact you.",
  },
  caregiver: {
    title: "Family Caregiver Companion",
    subtitle: "Stay coordinated with your family member's cancer treatment schedule and instructions.",
    authorizedBanner: "Authorized Family Caregiver",
    upcoming: "Upcoming Milestones",
    pendingTasks: "Pending Patient Instructions",
    completedTasks: "Completed Steps",
    remindPatient: "Send Family WhatsApp Reminder",
    reminderSent: "Reminder Sent via SMS / WhatsApp",
    viewInstructions: "View Step Details",
    contactCareTeam: "Call Clinic Coordinator",
    callClinicStaff: "Hospital Oncology Helpline: +91 40 2355 9999",
  },
  clinician: {
    dashboardTitle: "Oncology Care-Instruction Closure Oversight",
    todayFollowups: "Today's Prescribed Instructions",
    awaitingConfirmation: "Awaiting Patient Confirmation",
    pendingTasks: "Total Active Actions",
    completedThisWeek: "Weekly Loop Closure Rate",
    newFollowupButton: "+ Prescribe Follow-Up",
    uploadDocButton: "Upload Discharge Summary",
    followupQueueButton: "At-Risk Closure Queue",
    table: {
      patient: "Patient",
      nextStep: "Instruction / Next Step",
      due: "Due Date",
      status: "Closure Status",
      language: "Language",
      action: "Review",
    },
    aiDraftBadge: "AI Draft — Human Oncologist Review Required",
    approveAndSend: "Approve & Deliver to Patient",
    rejectDraft: "Dismiss Draft",
    editDraft: "Edit Instruction",
  },
  statuses: {
    created: "Drafted",
    approved: "Oncologist Approved",
    sent: "Delivered",
    viewed: "Opened by Patient",
    acknowledged: "Acknowledged",
    completed: "Action Closed",
    cancelled: "Cancelled",
  },
};

// Hindi Dictionary (हिन्दी)
const hi: TranslationDictionary = {
  ...en,
  appName: "केयरब्रिज एनसीजी",
  tagline: "बहुभाषी कैंसर फॉलो-अप और देखभाल निर्देश समापन मंच",
  heroHeadline: "कैंसर देखभाल के हर फॉलो-अप को सफल बनाएं।",
  heroSubhead: "ऑन्कोलॉजी डिस्चार्ज निर्देशों को मरीजों और परिवारों के लिए सरल, बहुभाषी और ट्रैक करने योग्य कदमों में बदलने वाला सहायक मंच।",
  tryClinicianDemo: "डॉक्टर पोर्टल",
  tryPatientExp: "मरीज डिजिटल पास",
  heroStepDemo: "10-चरणीय डेमो देखें",
  nav: {
    ...en.nav,
    dashboard: "डैशबोर्ड",
    patients: "मरीज सूची",
    followups: "फॉलो-अप निर्देश",
    queue: "समापन कतार",
    helpRequests: "मदद अनुरोध",
    documents: "दस्तावेज़",
    impact: "प्रभाव और मेट्रिक्स",
    home: "डिजिटल पास",
    myTasks: "मेरे कार्य",
    appointments: "मुलाकातें",
    help: "मदद प्राप्त करें",
    language: "भाषा चुनें",
    caregiver: "परिवार / देखभालकर्ता",
  },
  journey: {
    title: "मेरी कैंसर देखभाल यात्रा",
    subtitle: "निदान से लेकर सक्रिय उपचार और निगरानी तक का जुड़ा हुआ रोडमैप",
    currentMilestone: "वर्तमान चरण",
    nextMilestone: "अगला दर्ज मील का पत्थर",
    viewFullJourney: "पूरी यात्रा देखें",
    stages: {
      diagnosis: "निदान (Diagnosis)",
      investigations: "जांच एवं परीक्षण (Investigations)",
      staging: "स्टेजिंग (Staging)",
      planning: "उपचार योजना (Treatment Planning)",
      treatment: "सक्रिय उपचार (Active Treatment)",
      monitoring: "प्रतिक्रिया निगरानी (Response Monitoring)",
      followup: "फॉलो-अप एवं उत्तरजीविता (Follow-up)",
    },
    status: {
      completed: "पूर्ण",
      inProgress: "प्रगति पर",
      needsAttention: "ध्यान देने योग्य",
      upcoming: "आगामी",
    },
    cycleLabel: "चक्र",
  },
  wellbeing: {
    title: "लक्षण एवं स्वास्थ्य जांच (Wellbeing)",
    subtitle: "प्रतिदिन की सरल जांच जो आपकी देखभाल टीम के लिए रुझान दिखाती है। यह कोई नैदानिक उपकरण नहीं है।",
    checkinButton: "दैनिक स्वास्थ्य जांच दर्ज करें",
    todayCheckin: "आज का मूल्यांकन",
    sevenDayTrend: "7-दिवसीय लक्षण रुझान",
    energy: "ऊर्जा स्तर (Energy)",
    pain: "दर्द की तीव्रता (Pain)",
    nausea: "जी मिचलाना (Nausea)",
    appetite: "भूख (Appetite)",
    sleep: "नींद की गुणवत्ता (Sleep)",
    submitCheckin: "आज की जांच जमा करें",
    submittedNotice: "जांच दर्ज की गई। आपके डॉक्टर अगली समीक्षा में यह रिपोर्ट देख सकेंगे।",
  },
  patientHome: {
    ...en.patientHome,
    greeting: "नमस्ते",
    nextStepsHeadline: "आपके आगामी कार्य",
    subhead: "कृपया अपनी अगली मुलाकात से पहले इन निर्देशों का पालन करें",
    nextAppointment: "अगली अस्पताल मुलाकात",
    tasksToDo: "करने योग्य कार्य",
    needHelpHeadline: "कोई प्रश्न है या सहायता चाहिए?",
    needHelpSubhead: "यदि आपको अस्पताल आने, पैसे या जांच समझने में परेशानी है, तो नीचे टैप करें।",
    completedThis: "मैंने यह पूरा कर लिया है",
    viewDetails: "विवरण देखें",
    showClinicQR: "क्लिनिक QR कोड दिखाएं",
    clinicCheckinCode: "चेक-इन कोड",
    scanAtDesk: "अस्पताल काउंटर या लैब में दिखाएं",
    noPendingTasks: "कोई लंबित कार्य नहीं",
    allCaughtUp: "इस चक्र के लिए आपके सभी निर्देश पूर्ण हैं।",
    journeySummaryButton: "यात्रा सारांश पत्रक",
  },
  taskDetail: {
    ...en.taskDetail,
    whyHeadline: "यह जांच या कदम क्यों जरूरी है?",
    whatToDoHeadline: "आपको क्या करना है?",
    whenHeadline: "कब तक करना है?",
    whereHeadline: "कहाँ जाना है?",
    markAsCompleted: "पूर्ण चिह्नित करें",
    alreadyCompleted: "पूर्ण हो चुका है",
    needHelpButton: "मुझे इसमें मदद चाहिए",
    closeModal: "बंद करें",
    clinicianOriginal: "डॉक्टर का मूल क्लिनिकल नोट",
    humanApprovedNotice: "आपके कैंसर विशेषज्ञ द्वारा सत्यापित और अनुमोदित।",
  },
};

// Telugu Dictionary (తెలుగు)
const te: TranslationDictionary = {
  ...en,
  appName: "కేర్‌బ్రిడ్జ్ NCG",
  tagline: "బహుభాషా క్యాన్సర్ ఫాలో-అప్ & సంరక్షణ సూచనల ముగింపు వేదిక",
  heroHeadline: "ప్రతి క్యాన్సర్ సంరక్షణ ఫాలో-అప్‌ను సఫలం చేయండి.",
  heroSubhead: "డిశ్చార్జ్ సూచనలను రోగులు మరియు కుటుంబాల కోసం సులభమైన, ప్రాంతీయ భాషా దశలుగా మార్చే సహాయక ప్లాట్‌ఫారమ్.",
  tryClinicianDemo: "వైద్యుల పోర్టల్",
  tryPatientExp: "రోగి డిజిటల్ పాస్",
  heroStepDemo: "10-దశల డెమోను చూడండి",
  nav: {
    ...en.nav,
    dashboard: "డ్యాష్‌బోర్డ్",
    patients: "రోగుల జాబితా",
    followups: "ఫాలో-అప్ సూచనలు",
    queue: "ముగింపు క్యూ",
    helpRequests: "సహాయ అభ్యర్థనలు",
    documents: "పత్రాలు",
    impact: "ప్రభావం & కొలమానాలు",
    home: "డిజిటల్ పాస్",
    myTasks: "నా పనులు",
    appointments: "అపాయింట్‌మెంట్లు",
    help: "సహాయం పొందండి",
    language: "భాష ఎంచుకోండి",
    caregiver: "కుటుంబ సంరక్షకుడు",
  },
  journey: {
    title: "నా క్యాన్సర్ సంరక్షణ ప్రయాణం",
    subtitle: "రోగ నిర్ధారణ నుండి చురుకైన చికిత్స మరియు పర్యవేక్షణ వరకు సంపూర్ణ మార్గసూచి",
    currentMilestone: "ప్రస్తుత దశ",
    nextMilestone: "తదుపరి మైలురాయి",
    viewFullJourney: "పూర్తి ప్రయాణాన్ని చూడండి",
    stages: {
      diagnosis: "రోగ నిర్ధారణ (Diagnosis)",
      investigations: "పరీక్షలు (Investigations)",
      staging: "స్టేజింగ్ (Staging)",
      planning: "చికిత్స ప్రణాళిక (Planning)",
      treatment: "క్రియాశీల చికిత్స (Treatment)",
      monitoring: "స్పందన పర్యవేక్షణ (Monitoring)",
      followup: "ఫాలో-అప్ & సర్వైవర్‌షిప్",
    },
    status: {
      completed: "పూర్తయింది",
      inProgress: "పురోగతిలో ఉంది",
      needsAttention: "శ్రద్ధ అవసరం",
      upcoming: "రాబోయేది",
    },
    cycleLabel: "సైకిల్",
  },
  wellbeing: {
    title: "లక్షణాలు & శ్రేయస్సు తనిఖీ (Wellbeing)",
    subtitle: "మీ సంరక్షణ బృందానికి అవసరమైన రోజువారీ సమాచారం. ఇది రోగ నిర్ధారణ సాధనం కాదు.",
    checkinButton: "రోజువారీ శ్రేయస్సు తనిఖీ",
    todayCheckin: "నేటి సమీక్ష",
    sevenDayTrend: "7-రోజుల లక్షణాల ధోరణి",
    energy: "శక్తి స్థాయి (Energy)",
    pain: "నొప్పి తీవ్రత (Pain)",
    nausea: "వికారం (Nausea)",
    appetite: "ఆకలి (Appetite)",
    sleep: "నిద్ర నాణ్యత (Sleep)",
    submitCheckin: "నేటి తనిఖీని నమోదు చేయండి",
    submittedNotice: "వివరాలు నమోదయ్యాయి. తదుపరి సమీక్షలో మీ వైద్యులు దీనిని చూడగలరు.",
  },
  patientHome: {
    ...en.patientHome,
    greeting: "నమస్కారం",
    nextStepsHeadline: "మీ తదుపరి చేయవలసిన పనులు",
    subhead: "మీ తదుపరి ఆంకాలజీ సమీక్షకు ముందు దయచేసి ఈ సూచనలను పూర్తి చేయండి",
    nextAppointment: "తదుపరి క్లినిక్ సందర్శన",
    tasksToDo: "చేయవలసిన పనులు",
    needHelpHeadline: "సహాయం కావాలా లేదా సందేహాలు ఉన్నాయా?",
    needHelpSubhead: "ప్రయాణం, ఖర్చు లేదా పరీక్షలు అర్థం కాకపోతే క్రింద నొక్కండి.",
    completedThis: "నేను దీనిని పూర్తి చేశాను",
    viewDetails: "వివరాలు చూడండి",
    showClinicQR: "క్లినిక్ QR కోడ్ చూపించండి",
    clinicCheckinCode: "చెక్-ఇన్ కోడ్",
    scanAtDesk: "హాస్పిటల్ రిసెప్షన్ వద్ద చూపించండి",
    noPendingTasks: "పెండింగ్ పనులు లేవు",
    allCaughtUp: "ఈ సైకిల్ కొరకు మీ అన్ని సూచనలు పూర్తయ్యాయి.",
    journeySummaryButton: "ప్రయాణ సారాంశ పత్రం",
  },
  taskDetail: {
    ...en.taskDetail,
    whyHeadline: "ఈ పరీక్ష లేదా చర్య ఎందుకు అవసరం?",
    whatToDoHeadline: "మీరు ఏమి చేయాలి?",
    whenHeadline: "ఎప్పుడు పూర్తి చేయాలి?",
    whereHeadline: "ఎక్కడికి వెళ్ళాలి?",
    markAsCompleted: "పూర్తయినట్లు గుర్తించండి",
    alreadyCompleted: "పూర్తయింది",
    needHelpButton: "నాకు దీనిలో సహాయం కావాలి",
    closeModal: "మూసివేయండి",
    clinicianOriginal: "వైద్యుని అసలు క్లినికల్ సూచన",
    humanApprovedNotice: "మీ ఆంకాలజిస్ట్ ద్వారా ధృవీకరించబడింది.",
  },
};

// Tamil Dictionary (தமிழ்)
const ta: TranslationDictionary = {
  ...en,
  appName: "கேர்பிரிட்ஜ் NCG",
  tagline: "பல்மொழி புற்றுநோய் பின்தொடர்தல் மற்றும் கவனிப்பு நெறிமுறை தளம்",
  heroHeadline: "புற்றுநோய் கவனிப்பின் ஒவ்வொரு பின்தொடர்தலையும் உறுதிப்படுத்துங்கள்.",
  heroSubhead: "மருத்துவமனை வெளியேற்ற வழிமுறைகளை நோயாளிகள் மற்றும் குடும்பங்களுக்கான எளிய, கண்காணிக்கக்கூடிய படிகளாக மாற்றும் தளம்.",
  tryClinicianDemo: "மருத்துவர் தளம்",
  tryPatientExp: "நோயாளி டிஜிட்டல் பாஸ்",
  heroStepDemo: "10-படி டெமோவை காண்க",
  nav: {
    ...en.nav,
    dashboard: "டாஷ்போர்டு",
    patients: "நோயாளிகள் பட்டியல்",
    followups: "பின்தொடர் நடவடிக்கைகள்",
    queue: "கவனிப்பு வரிசை",
    helpRequests: "உதவி கோரிக்கைகள்",
    home: "டிஜிட்டல் பாஸ்",
    myTasks: "எனது பணிகள்",
    appointments: "சந்திப்புகள்",
    help: "உதவி பெறவும்",
    language: "மொழியைத் தேர்ந்தெடுக்கவும்",
    caregiver: "குடும்ப பராமரிப்பாளர்",
  },
  journey: {
    title: "எனது புற்றுநோய் சிகிச்சை பயணம்",
    subtitle: "நோய் கண்டறிதல் முதல் தீவிர சிகிச்சை மற்றும் கண்காணிப்பு வரையிலான வழித்தடம்",
    currentMilestone: "தற்போதைய நிலை",
    nextMilestone: "அடுத்த மைல்கல்",
    viewFullJourney: "முழு பயணத்தைக் காண்க",
    stages: {
      diagnosis: "நோய் கண்டறிதல்",
      investigations: "பரிசோதனைகள்",
      staging: "நிலைக் கணிப்பு (Staging)",
      planning: "சிகிச்சைத் திட்டம்",
      treatment: "செயலில் உள்ள சிகிச்சை",
      monitoring: "சிகிச்சை கண்காணிப்பு",
      followup: "தொடர் கண்காணிப்பு",
    },
    status: {
      completed: "நிறைவுற்றது",
      inProgress: "நடைபெறுகிறது",
      needsAttention: "கவனம் தேவை",
      upcoming: "வரவிருப்பது",
    },
    cycleLabel: "சுழற்சி (Cycle)",
  },
  wellbeing: {
    title: "அறிகுறிகள் மற்றும் நல்வாழ்வு பதிவு",
    subtitle: "உங்கள் மருத்துவக் குழுவிற்கான எளிய தினசரி பதிவு.",
    checkinButton: "தினசரி நல்வாழ்வு பதிவு",
    todayCheckin: "இன்றைய மதிப்பீடு",
    sevenDayTrend: "7-நாள் அறிகுறிகள் போக்கு",
    energy: "ஆற்றல் நிலை",
    pain: "வலி தீவிரம்",
    nausea: "குமட்டல்",
    appetite: "பசி",
    sleep: "தூக்கத்தின் தரம்",
    submitCheckin: "இன்றைய பதிவை சமர்ப்பிக்கவும்",
    submittedNotice: "பதிவு செய்யப்பட்டது. அடுத்த சந்திப்பில் மருத்துவர் இதனை காண்பார்.",
  },
  patientHome: {
    ...en.patientHome,
    greeting: "வணக்கம்",
    nextStepsHeadline: "உங்கள் வரவிருக்கும் பணிகள்",
    subhead: "அடுத்த பரிசோதனைக்கு முன் இந்த வழிமுறைகளைப் பின்பற்றவும்",
    nextAppointment: "அடுத்த மருத்துவமனை சந்திப்பு",
    tasksToDo: "செய்ய வேண்டிய பணிகள்",
    needHelpHeadline: "சந்தேகங்கள் அல்லது உதவி தேவையா?",
    needHelpSubhead: "பயணம், நிதி அல்லது பரிசோதனை பற்றிய உதவிக்கு கீழே தொடவும்.",
    completedThis: "நான் இதை முடித்துவிட்டேன்",
    viewDetails: "விவரங்களை காண்க",
    showClinicQR: "QR குறியீட்டைக் காட்டு",
    journeySummaryButton: "பயண சுருக்க அறிக்கை",
  },
};

// Kannada Dictionary (ಕನ್ನಡ)
const kn: TranslationDictionary = {
  ...en,
  appName: "ಕೇರ್‌ಬ್ರಿಡ್ಜ್ NCG",
  tagline: "ಬಹುಭಾಷಾ ಕ್ಯಾನ್ಸರ್ ಆರೈಕೆ ಫಾಲೋ-ಅಪ್ ವೇದಿಕೆ",
  heroHeadline: "ಕ್ಯಾನ್ಸರ್ ಆರೈಕೆಯ ಪ್ರತಿಯೊಂದು ಫಾಲೋ-ಅಪ್ ಯಶಸ್ವಿಗೊಳಿಸಿ.",
  heroSubhead: "ಆಸ್ಪತ್ರೆಯ ಡಿಸ್ಚಾರ್ಜ್ ಸೂಚನೆಗಳನ್ನು ರೋಗಿಗಳಿಗೆ ಮತ್ತು ಕುಟುಂಬಗಳಿಗೆ ಸರಳ, ಪ್ರಾದೇಶಿಕ ಹಂತಗಳಾಗಿ ಪರಿವರ್ತಿಸುವ ಸಹಾಯಕ ವೇದಿಕೆ.",
  nav: {
    ...en.nav,
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    patients: "ರೋಗಿಗಳ ಪಟ್ಟಿ",
    followups: "ಫಾಲೋ-ಅಪ್ ಸೂಚನೆಗಳು",
    home: "ಡಿಜಿಟಲ್ ಪಾಸ್",
    myTasks: "ನನ್ನ ಕಾರ್ಯಗಳು",
    appointments: "ಭೇಟಿಗಳು",
    help: "ಸಹಾಯ ಪಡೆಯಿರಿ",
    language: "ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ",
    caregiver: "ಕುಟುಂಬ ಆರೈಕೆದಾರ",
  },
  journey: {
    ...en.journey,
    title: "ನನ್ನ ಕ್ಯಾನ್ಸರ್ ಚಿಕಿತ್ಸಾ ಪ್ರಯಾಣ",
    currentMilestone: "ಪ್ರಸ್ತುತ ಹಂತ",
    nextMilestone: "ಮುಂದಿನ ಮೈಲಿಗಲ್ಲು",
    viewFullJourney: "ಸಂಪೂರ್ಣ ಪ್ರಯಾಣ ನೋಡಿ",
    cycleLabel: "ಸೈಕಲ್",
  },
  patientHome: {
    ...en.patientHome,
    greeting: "ನಮಸ್ಕಾರ",
    nextStepsHeadline: "ನಿಮ್ಮ ಮುಂದಿನ ಕ್ರಮಗಳು",
    tasksToDo: "ಮಾಡಬೇಕಾದ ಕೆಲಸಗಳು",
    completedThis: "ನಾನು ಇದನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದ್ದೇನೆ",
    viewDetails: "ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    journeySummaryButton: "ಪ್ರಯಾಣದ ಸಾರಾಂಶ ಹಾಳೆ",
  },
};

// Bengali Dictionary (বাংলা)
const bn: TranslationDictionary = {
  ...en,
  appName: "কেয়ারব্রিজ NCG",
  tagline: "বহুভাষিক ক্যান্সার ফলো-আপ এবং পরিচর্যা নির্দেশনা সমাপ্তি প্ল্যাটফর্ম",
  heroHeadline: "ক্যান্সার পরিচর্যার প্রতিটি ফলো-আপ সফল করুন।",
  heroSubhead: "হাসপাতালের ডিসচার্জ নির্দেশাবলীকে রোগী এবং পরিবারের জন্য সহজ, স্থানীয় ভাষার পদক্ষেপে রূপান্তর করার প্ল্যাটফর্ম।",
  nav: {
    ...en.nav,
    dashboard: "ড্যাশবোর্ড",
    patients: "রোগীর তালিকা",
    followups: "ফলো-আপ নির্দেশাবলী",
    home: "ডিজিটাল পাস",
    myTasks: "আমার কাজ",
    appointments: "অ্যাপয়েন্টমেন্ট",
    help: "সহায়তা পান",
    language: "ভাষা নির্বাচন করুন",
    caregiver: "পারিবারিক যত্নশীল",
  },
  journey: {
    ...en.journey,
    title: "আমার ক্যান্সার পরিচর্যা যাত্রা",
    currentMilestone: "বর্তমান পর্যায়",
    nextMilestone: "পরবর্তী মাইলফলক",
    viewFullJourney: "সম্পূর্ণ যাত্রা দেখুন",
    cycleLabel: "চক্র (Cycle)",
  },
  patientHome: {
    ...en.patientHome,
    greeting: "নমস্কার",
    nextStepsHeadline: "আপনার পরবর্তী পদক্ষেপসমূহ",
    tasksToDo: "করণীয় কাজ",
    completedThis: "আমি এটি সম্পন্ন করেছি",
    viewDetails: "বিস্তারিত দেখুন",
    journeySummaryButton: "যাত্রার সংক্ষিপ্ত বিবরণী",
  },
};

// Marathi Dictionary (मराठी)
const mr: TranslationDictionary = {
  ...hi,
  appName: "केअरब्रिज NCG",
  tagline: "बहुभाषिक कर्करोग फॉलो-अप आणि काळजी मार्गदर्शन मंच",
  heroHeadline: "कर्करोग उपचाराचा प्रत्येक फॉलो-अप यशस्वी करा.",
  nav: {
    ...hi.nav,
    dashboard: "डॅशबोर्ड",
    patients: "रुग्ण यादी",
    followups: "फॉलो-अप सूचना",
    home: "डिजिटल पास",
    myTasks: "माझी कामे",
    appointments: "भेटी",
    help: "मदत मिळवा",
    language: "भाषा निवडा",
    caregiver: "कुटुंब काळजीवाहू",
  },
  patientHome: {
    ...hi.patientHome,
    greeting: "नमस्कार",
    nextStepsHeadline: "तुमची पुढील पावले",
    tasksToDo: "करावयाची कामे",
    completedThis: "मी हे पूर्ण केले आहे",
    viewDetails: "तपशील पहा",
    journeySummaryButton: "प्रवास सारांश पत्रक",
  },
};

// Malayalam Dictionary (മലയാളം)
const ml: TranslationDictionary = {
  ...en,
  appName: "കെയർബ്രിഡ്ജ് NCG",
  tagline: "ബഹുഭാഷാ കാൻസർ തുടർപരിചരണ പ്ലാറ്റ്ഫോം",
  heroHeadline: "ഓരോ കാൻസർ തുടർപരിചരണവും വിജയകരമാക്കുക.",
  nav: {
    ...en.nav,
    dashboard: "ഡാഷ്‌ബോർഡ്",
    patients: "രോഗികളുടെ പട്ടിക",
    followups: "തുടർനടപടികൾ",
    home: "ഡിജിറ്റൽ പാസ്",
    myTasks: "എന്റെ ചുമതലകൾ",
    appointments: "അപ്പോയിന്റ്മെന്റുകൾ",
    help: "സഹായം നേടുക",
    language: "ഭാഷ തിരഞ്ഞെടുക്കുക",
    caregiver: "കുടുംബ പരിചാരകൻ",
  },
  patientHome: {
    ...en.patientHome,
    greeting: "നമസ്കാരം",
    nextStepsHeadline: "നിങ്ങളുടെ അടുത്ത നടപടികൾ",
    tasksToDo: "ചെയ്യേണ്ട കാര്യങ്ങൾ",
    completedThis: "ഞാൻ ഇത് പൂർത്തിയാക്കി",
    viewDetails: "വിശദാംശങ്ങൾ കാണുക",
    journeySummaryButton: "യാത്രാ സംഗ്രഹം",
  },
};

// Gujarati Dictionary (ગુજરાતી)
const gu: TranslationDictionary = {
  ...hi,
  appName: "કેરબ્રિજ NCG",
  tagline: "બહુભાષી કેન્સર ફોલો-અપ અને કાળજી માર્ગદર્શન મંચ",
  heroHeadline: "કેન્સર સંભાળના દરેક ફોલો-અપને સફળ બનાવો.",
  nav: {
    ...hi.nav,
    dashboard: "ડેશબોર્ડ",
    patients: "દર્દીઓની યાદી",
    followups: "ફોલો-અપ સૂચનાઓ",
    home: "ડિજિટલ પાસ",
    myTasks: "મારા કાર્યો",
    appointments: "મુલાકાતો",
    help: "સહાય મેળવો",
    language: "ભાષા પસંદ કરો",
    caregiver: "પરિવાર સંભાળ રાખનાર",
  },
  patientHome: {
    ...hi.patientHome,
    greeting: "નમસ્તે",
    nextStepsHeadline: "તમારા આગામી પગલાં",
    tasksToDo: "કરવાના કાર્યો",
    completedThis: "મેં આ પૂર્ણ કર્યું છે",
    viewDetails: "વિગતો જુઓ",
    journeySummaryButton: "પ્રવાસ સારાંશ પત્રક",
  },
};

// Punjabi Dictionary (ਪੰਜਾਬੀ)
const pa: TranslationDictionary = {
  ...hi,
  appName: "ਕੇਅਰਬ੍ਰਿਜ NCG",
  tagline: "ਬਹੁ-ਭਾਸ਼ਾਈ ਕੈਂਸਰ ਫਾਲੋ-ਅੱਪ ਅਤੇ ਦੇਖਭਾਲ ਪਲੇਟਫਾਰਮ",
  heroHeadline: "ਕੈਂਸਰ ਦੇਖਭਾਲ ਦੇ ਹਰ ਫਾਲੋ-ਅੱਪ ਨੂੰ ਯਕੀਨੀ ਬਣਾਓ।",
  nav: {
    ...hi.nav,
    dashboard: "ਡੈਸ਼ਬੋਰਡ",
    patients: "ਮਰੀਜ਼ਾਂ ਦੀ ਸੂਚੀ",
    home: "ਡਿਜੀਟਲ ਪਾਸ",
    myTasks: "ਮੇਰੇ ਕੰਮ",
    appointments: "ਮੁਲਾਕਾਤਾਂ",
    help: "ਮਦਦ ਲਵੋ",
    language: "ਭਾਸ਼ਾ ਚੁਣੋ",
    caregiver: "ਪਰਿਵਾਰਕ ਦੇਖਭਾਲਕਰਤਾ",
  },
  patientHome: {
    ...hi.patientHome,
    greeting: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ",
    nextStepsHeadline: "ਤੁਹਾਡੇ ਅਗਲੇ ਕਦਮ",
    tasksToDo: "ਕਰਨ ਵਾਲੇ ਕੰਮ",
    completedThis: "ਮੈਂ ਇਹ ਪੂਰਾ ਕਰ ਲਿਆ ਹੈ",
    viewDetails: "ਵੇਰਵੇ ਦੇਖੋ",
    journeySummaryButton: "ਯਾਤਰਾ ਸਾਰ-ਅੰਸ਼ ਸ਼ੀਟ",
  },
};

// Odia Dictionary (ଓଡ଼ିଆ)
const or: TranslationDictionary = {
  ...en,
  appName: "କେୟାରବ୍ରିଜ୍ NCG",
  tagline: "ବହୁଭାଷୀ କର୍କଟ ରୋଗ ଫଲୋ-ଅପ୍ ଏବଂ ଯତ୍ନ ମଞ୍ଚ",
  heroHeadline: "କର୍କଟ ଯତ୍ନର ପ୍ରତ୍ୟେକ ଫଲୋ-ଅପ୍ କୁ ସଫଳ କରନ୍ତୁ।",
  nav: {
    ...en.nav,
    dashboard: "ଡ୍ୟାସବୋର୍ଡ",
    patients: "ରୋଗୀ ତାଲିକା",
    home: "ଡିଜିଟାଲ୍ ପାସ୍",
    myTasks: "ମୋର କାର୍ଯ୍ୟ",
    appointments: "ସାକ୍ଷାତ",
    help: "ସାହାଯ୍ୟ ପାଆନ୍ତୁ",
    language: "ଭାଷା ବାଛନ୍ତୁ",
    caregiver: "ପାରିବାରିକ ଯତ୍ନକାରୀ",
  },
  patientHome: {
    ...en.patientHome,
    greeting: "ନମସ୍କାର",
    nextStepsHeadline: "ଆପଣଙ୍କର ପରବର୍ତ୍ତୀ ପଦକ୍ଷେପ",
    tasksToDo: "କରିବାକୁ ଥିବା କାର୍ଯ୍ୟ",
    completedThis: "ମୁଁ ଏହା ସମ୍ପୂର୍ଣ୍ଣ କରିଛି",
    viewDetails: "ବିବରଣୀ ଦେଖନ୍ତୁ",
    journeySummaryButton: "ଯାତ୍ରା ସାରାଂଶ ପତ୍ର",
  },
};

export const translations: Record<Language, TranslationDictionary> = {
  en,
  hi,
  te,
  ta,
  kn,
  ml,
  bn,
  mr,
  gu,
  pa,
  or,
};

export const getTranslation = (lang: Language): TranslationDictionary => {
  return translations[lang] || translations['en'];
};
