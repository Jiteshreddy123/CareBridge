from typing import List
from .models import (
    Patient, FollowUpTask, Appointment, HelpRequest, AuditLogEntry,
    LanguageEnum, TaskStatus, TaskCategory, AppointmentStatus, HelpRequestStatus, LocalizedText
)

INITIAL_PATIENTS: List[Patient] = [
    Patient(
        id="P-1001",
        mrn="NCG-HYD-9910",
        name="Ramesh Varma",
        age=58,
        gender="Male",
        diagnosis="Stage II Colorectal Carcinoma (Post-op Adjuvant)",
        department="Medical Oncology",
        primary_oncologist="Dr. K. Rao",
        preferred_language=LanguageEnum.TE,
        phone="+91 98490 12345",
        caregiver_name="Suresh Varma (Son)",
        caregiver_relation="Son",
        caregiver_phone="+91 98490 54321",
        caregiver_authorized=True,
        next_appointment_date="18 September 2026, 10:30 AM"
    ),
    Patient(
        id="P-1002",
        mrn="NCG-HYD-9912",
        name="Sunita Sharma",
        age=52,
        gender="Female",
        diagnosis="Invasive Ductal Carcinoma Breast (HER2 Positive)",
        department="Medical Oncology",
        primary_oncologist="Dr. S. Mukherjee",
        preferred_language=LanguageEnum.HI,
        phone="+91 97110 88231",
        caregiver_name="Amit Sharma (Husband)",
        caregiver_relation="Spouse",
        caregiver_phone="+91 97110 88232",
        caregiver_authorized=True,
        next_appointment_date="13 September 2026, 11:00 AM"
    ),
    Patient(
        id="P-1003",
        mrn="NCG-HYD-9914",
        name="David Fernandez",
        age=61,
        gender="Male",
        diagnosis="Oropharyngeal Squamous Cell Carcinoma (T2N1)",
        department="Radiation Oncology",
        primary_oncologist="Dr. P. Reddy",
        preferred_language=LanguageEnum.EN,
        phone="+91 98200 44109",
        caregiver_name="Maria Fernandez (Daughter)",
        caregiver_relation="Daughter",
        caregiver_phone="+91 98200 44110",
        caregiver_authorized=True,
        next_appointment_date="14 September 2026, 09:30 AM"
    ),
    Patient(
        id="P-1004",
        mrn="NCG-HYD-9918",
        name="Lakshmi Devi",
        age=49,
        gender="Female",
        diagnosis="Carcinoma Cervix Stage IIB (Concurrent Chemo-RT)",
        department="Radiation Oncology",
        primary_oncologist="Dr. P. Reddy",
        preferred_language=LanguageEnum.TE,
        phone="+91 94401 77234",
        caregiver_name="Venkatesh (Husband)",
        caregiver_relation="Spouse",
        caregiver_phone="+91 94401 77235",
        caregiver_authorized=True,
        next_appointment_date="15 September 2026, 02:00 PM"
    ),
    Patient(
        id="P-1005",
        mrn="NCG-HYD-9921",
        name="Rajesh Kumar Patel",
        age=64,
        gender="Male",
        diagnosis="Non-Small Cell Lung Cancer (EGFR Exon 19)",
        department="Medical Oncology",
        primary_oncologist="Dr. K. Rao",
        preferred_language=LanguageEnum.HI,
        phone="+91 99250 11982",
        caregiver_name="Pooja Patel (Daughter)",
        caregiver_relation="Daughter",
        caregiver_phone="+91 99250 11983",
        caregiver_authorized=True,
        next_appointment_date="19 September 2026, 11:30 AM"
    ),
    Patient(
        id="P-1006",
        mrn="NCG-HYD-9925",
        name="Ananya Roy",
        age=37,
        gender="Female",
        diagnosis="Hodgkin Lymphoma (ABVD Protocol)",
        department="Medical Oncology",
        primary_oncologist="Dr. S. Mukherjee",
        preferred_language=LanguageEnum.EN,
        phone="+91 98310 99420",
        caregiver_name="Subhash Roy (Father)",
        caregiver_relation="Father",
        caregiver_phone="+91 98310 99421",
        caregiver_authorized=True,
        next_appointment_date="16 September 2026, 10:00 AM"
    ),
    Patient(
        id="P-1007",
        mrn="NCG-HYD-9930",
        name="M. Satyanarayana",
        age=66,
        gender="Male",
        diagnosis="Carcinoma Stomach (Post-Gastrectomy Surveillance)",
        department="Surgical Oncology",
        primary_oncologist="Dr. A. Sharma",
        preferred_language=LanguageEnum.TE,
        phone="+91 98480 33119",
        caregiver_name="Radha (Wife)",
        caregiver_relation="Spouse",
        caregiver_phone="+91 98480 33120",
        caregiver_authorized=True,
        next_appointment_date="17 September 2026, 12:00 PM"
    ),
    Patient(
        id="P-1008",
        mrn="NCG-HYD-9934",
        name="Fatima Begum",
        age=55,
        gender="Female",
        diagnosis="Epithelial Ovarian Carcinoma Stage IIIC",
        department="Medical Oncology",
        primary_oncologist="Dr. K. Rao",
        preferred_language=LanguageEnum.HI,
        phone="+91 94190 66521",
        caregiver_name="Zeeshan (Son)",
        caregiver_relation="Son",
        caregiver_phone="+91 94190 66522",
        caregiver_authorized=True,
        next_appointment_date="20 September 2026, 09:30 AM"
    ),
    Patient(
        id="P-1009",
        mrn="NCG-HYD-9941",
        name="K. Venkateswarlu",
        age=71,
        gender="Male",
        diagnosis="Prostate Adenocarcinoma (Hormonal Therapy + RT)",
        department="Radiation Oncology",
        primary_oncologist="Dr. P. Reddy",
        preferred_language=LanguageEnum.TE,
        phone="+91 98660 55102",
        caregiver_name="K. Srinivas (Son)",
        caregiver_relation="Son",
        caregiver_phone="+91 98660 55103",
        caregiver_authorized=True,
        next_appointment_date="21 September 2026, 03:00 PM"
    ),
    Patient(
        id="P-1010",
        mrn="NCG-HYD-9945",
        name="Meera Chandran",
        age=43,
        gender="Female",
        diagnosis="Papillary Thyroid Carcinoma (Post-Thyroidectomy)",
        department="Surgical Oncology",
        primary_oncologist="Dr. A. Sharma",
        preferred_language=LanguageEnum.EN,
        phone="+91 94440 88204",
        caregiver_name="K. Chandran (Husband)",
        caregiver_relation="Spouse",
        caregiver_phone="+91 94440 88205",
        caregiver_authorized=True,
        next_appointment_date="22 September 2026, 11:00 AM"
    ),
    Patient(
        id="P-1011",
        mrn="NCG-HYD-9950",
        name="Bhanu Prakash",
        age=59,
        gender="Male",
        diagnosis="Squamous Cell Carcinoma Buccal Mucosa (Stoma Care)",
        department="Surgical Oncology",
        primary_oncologist="Dr. A. Sharma",
        preferred_language=LanguageEnum.TE,
        phone="+91 99890 22314",
        caregiver_name="Padma (Wife)",
        caregiver_relation="Spouse",
        caregiver_phone="+91 99890 22315",
        caregiver_authorized=True,
        next_appointment_date="23 September 2026, 10:30 AM"
    ),
    Patient(
        id="P-1012",
        mrn="NCG-HYD-9955",
        name="Geeta Devi",
        age=62,
        gender="Female",
        diagnosis="Multiple Myeloma (Bortezomib Maintenance)",
        department="Medical Oncology",
        primary_oncologist="Dr. S. Mukherjee",
        preferred_language=LanguageEnum.HI,
        phone="+91 98100 77192",
        caregiver_name="Ravi (Son)",
        caregiver_relation="Son",
        caregiver_phone="+91 98100 77193",
        caregiver_authorized=True,
        next_appointment_date="24 September 2026, 11:30 AM"
    ),
    Patient(
        id="P-1013",
        mrn="NCG-HYD-9960",
        name="Narasimha Rao",
        age=68,
        gender="Male",
        diagnosis="Rectal Carcinoma (Post Hartmann's Stoma)",
        department="Surgical Oncology",
        primary_oncologist="Dr. A. Sharma",
        preferred_language=LanguageEnum.TE,
        phone="+91 98499 11002",
        caregiver_name="Vani (Daughter-in-law)",
        caregiver_relation="Family",
        caregiver_phone="+91 98499 11003",
        caregiver_authorized=True,
        next_appointment_date="25 September 2026, 09:30 AM"
    ),
    Patient(
        id="P-1014",
        mrn="NCG-HYD-9965",
        name="Vandana Joshi",
        age=47,
        gender="Female",
        diagnosis="Triple Negative Breast Cancer (Neoadjuvant Phase)",
        department="Medical Oncology",
        primary_oncologist="Dr. K. Rao",
        preferred_language=LanguageEnum.HI,
        phone="+91 98220 55198",
        caregiver_name="Deepak Joshi (Husband)",
        caregiver_relation="Spouse",
        caregiver_phone="+91 98220 55199",
        caregiver_authorized=True,
        next_appointment_date="26 September 2026, 10:00 AM"
    ),
    Patient(
        id="P-1015",
        mrn="NCG-HYD-9970",
        name="K. Subbaiah",
        age=73,
        gender="Male",
        diagnosis="Esophageal Carcinoma (Palliative Stent Follow-up)",
        department="Palliative Care",
        primary_oncologist="Dr. P. Reddy",
        preferred_language=LanguageEnum.TE,
        phone="+91 94411 33445",
        caregiver_name="V. K. Subbaiah (Son)",
        caregiver_relation="Son",
        caregiver_phone="+91 94411 33446",
        caregiver_authorized=True,
        next_appointment_date="27 September 2026, 02:30 PM"
    ),
    Patient(
        id="P-1016",
        mrn="NCG-HYD-9975",
        name="Asha Joseph",
        age=50,
        gender="Female",
        diagnosis="Glioblastoma Multiforme (Concurrent Temozolomide)",
        department="Radiation Oncology",
        primary_oncologist="Dr. P. Reddy",
        preferred_language=LanguageEnum.EN,
        phone="+91 94470 66100",
        caregiver_name="Joseph Mathew (Husband)",
        caregiver_relation="Spouse",
        caregiver_phone="+91 94470 66101",
        caregiver_authorized=True,
        next_appointment_date="28 September 2026, 11:00 AM"
    ),
    Patient(
        id="P-1017",
        mrn="NCG-HYD-9980",
        name="Md. Shakeel",
        age=56,
        gender="Male",
        diagnosis="Renal Cell Carcinoma (Immunotherapy Protocol)",
        department="Medical Oncology",
        primary_oncologist="Dr. K. Rao",
        preferred_language=LanguageEnum.HI,
        phone="+91 98400 33211",
        caregiver_name="Salma Begum (Wife)",
        caregiver_relation="Spouse",
        caregiver_phone="+91 98400 33212",
        caregiver_authorized=True,
        next_appointment_date="29 September 2026, 12:00 PM"
    ),
    Patient(
        id="P-1018",
        mrn="NCG-HYD-9985",
        name="G. Tirupathi Rao",
        age=63,
        gender="Male",
        diagnosis="Chronic Myeloid Leukemia (Tyrosine Kinase Inhibitor Review)",
        department="Medical Oncology",
        primary_oncologist="Dr. S. Mukherjee",
        preferred_language=LanguageEnum.TE,
        phone="+91 98492 44556",
        caregiver_name="G. Madhavi (Daughter)",
        caregiver_relation="Daughter",
        caregiver_phone="+91 98492 44557",
        caregiver_authorized=True,
        next_appointment_date="30 September 2026, 10:30 AM"
    )
]

INITIAL_TASKS: List[FollowUpTask] = [
    FollowUpTask(
        id="TASK-201",
        patient_id="P-1001",
        title="Complete Blood Test (CBC & Creatinine)",
        category=TaskCategory.BLOOD_TEST,
        department="Medical Oncology",
        due_date="18 September 2026",
        clinical_instruction="Complete CBC and Serum Creatinine prior to Cycle 3 follow-up on 18 Sept.",
        simplified_instruction=LocalizedText(
            en="Please get your blood test done before your next visit on 18 September.",
            te="దయచేసి సెప్టెంబర్ 18న మీ తదుపరి సందర్శనకు ముందు రక్త పరీక్ష చేయించుకోండి.",
            hi="कृपया 18 सितंबर को अपनी अगली मुलाकात से पहले अपना रक्त परीक्षण करवाएं।"
        ),
        why_explanation=LocalizedText(
            en="Your doctor asked you to complete this before your next visit to check your blood cell counts.",
            te="మీ రక్త కణాల సంఖ్యను తనిఖీ చేయడానికి తదుపరి సందర్శనకు ముందు దీనిని పూర్తి చేయాలని మీ వైద్యులు కోరారు.",
            hi="आपके रक्त कोशिकाओं की जांच के लिए अगली मुलाकात से पहले इसे पूरा करने की सलाह दी गई है।"
        ),
        what_to_do=LocalizedText(
            en="Visit the hospital laboratory on Ground Floor and complete the blood test.",
            te="గ్రౌండ్ ఫ్లోర్‌లోని ఆసుపత్రి ప్రయోగశాలకు వెళ్లి రక్త పరీక్ష పూర్తి చేయండి.",
            hi="ग्राउंड फ्लोर पर अस्पताल की लैब में जाएं और रक्त जांच करवाएं।"
        ),
        where_location=LocalizedText(
            en="Hospital Central Laboratory, Ground Floor",
            te="హాస్పిటల్ సెంట్రల్ లాబొరేటరీ, గ్రౌండ్ ఫ్లోర్",
            hi="अस्पताल सेंट्रल लैबोरेटरी, ग्राउंड फ्लोर"
        ),
        status=TaskStatus.SENT,
        created_at="09 Sep 10:42",
        created_by="Dr. K. Rao (Medical Oncology)",
        approved_by="Dr. K. Rao",
        approved_at="09 Sep 10:45",
        sent_at="09 Sep 10:46",
        is_urgent=True,
        requires_staff_attention=True,
        attention_reason="Due tomorrow - patient has not confirmed"
    ),
    FollowUpTask(
        id="TASK-202",
        patient_id="P-1002",
        title="Echocardiogram (2D Echo)",
        category=TaskCategory.IMAGING_SCAN,
        department="Medical Oncology",
        due_date="13 September 2026",
        clinical_instruction="Baseline 2D Echo report required before Trastuzumab continuation.",
        simplified_instruction=LocalizedText(
            en="Complete your heart scan (Echo) and keep the report ready for your doctor visit.",
            te="మీ గుండె స్కాన్ (ఎకో) పూర్తి చేసి, డాక్టర్ విజిట్ కోసం నివేదికను సిద్ధంగా ఉంచుకోండి.",
            hi="अपनी हृदय जांच (इको) करवाएं और डॉक्टर मुलाकात के लिए रिपोर्ट तैयार रखें।"
        ),
        why_explanation=LocalizedText(
            en="Ensures your heart is working safely during targeted cancer therapy.",
            te="టార్గెటెడ్ థెరపీ సమయంలో మీ గుండె పనితీరు క్షేమంగా ఉందని నిర్ధారించుకోవడానికి.",
            hi="लक्षित थेरेपी के दौरान यह सुनिश्चित करना कि हृदय सुरक्षित रूप से काम कर रहा है।"
        ),
        what_to_do=LocalizedText(
            en="Visit the Cardiology Department Room 104 with previous test documents.",
            te="గత రిపోర్టులతో కార్డియాలజీ విభాగం రూమ్ 104 వద్దకు వెళ్లండి.",
            hi="पिछली रिपोर्टों के साथ कार्डियोलॉजी विभाग कमरा 104 में जाएं।"
        ),
        where_location=LocalizedText(
            en="Cardiology Diagnostics, 1st Floor",
            te="కార్డియాలజీ విభాగం, 1వ అంతస్తు",
            hi="कार्डियोलॉजी विभाग, पहली मंजिल"
        ),
        status=TaskStatus.COMPLETED,
        created_at="07 Sep 09:15",
        created_by="Dr. S. Mukherjee",
        approved_by="Dr. S. Mukherjee",
        approved_at="07 Sep 09:18",
        sent_at="07 Sep 09:20",
        completed_at="10 Sep 14:10"
    ),
    FollowUpTask(
        id="TASK-203",
        patient_id="P-1003",
        title="Restaging CECT Neck & Thorax",
        category=TaskCategory.IMAGING_SCAN,
        department="Radiation Oncology",
        due_date="14 September 2026",
        clinical_instruction="CECT Neck and Thorax required prior to completion assessment.",
        simplified_instruction=LocalizedText(
            en="Get your CT scan done with 4 hours fasting before the scan.",
            te="స్కాన్‌కు 4 గంటల ముందు ఉపవాసం ఉండి సిటి స్కాన్ చేయించుకోండి.",
            hi="स्कैन से 4 घंटे पहले भूखे पेट रहकर अपना सीटी स्कैन करवाएं।"
        ),
        why_explanation=LocalizedText(
            en="To check tumor response after radiation sessions.",
            te="రేడియేషన్ సెషన్ల తర్వాత కణితి తగ్గుదలను తనిఖీ చేయడానికి.",
            hi="रेडिएशन के बाद ट्यूमर के असर की जांच करने के लिए।"
        ),
        what_to_do=LocalizedText(
            en="Arrive at Radiology basement 30 minutes early.",
            te="30 నిమిషాల ముందుగా రేడియాలజీ బేస్‌మెంట్‌కు చేరుకోండి.",
            hi="30 मिनट पहले रेडियोलॉजी बेसमेंट में पहुंचें।"
        ),
        where_location=LocalizedText(
            en="Department of Radiology, Basement 1",
            te="రేడియాలజీ విభాగం, బేస్‌మెంట్ 1",
            hi="रेडियोलॉजी विभाग, बेसमेंट 1"
        ),
        status=TaskStatus.ACKNOWLEDGED,
        created_at="08 Sep 11:30",
        created_by="Dr. P. Reddy",
        approved_by="Dr. P. Reddy",
        approved_at="08 Sep 11:35",
        sent_at="08 Sep 11:40"
    ),
    FollowUpTask(
        id="TASK-204",
        patient_id="P-1004",
        title="Weekly Radiation Toxicity Review",
        category=TaskCategory.RADIATION_CHECK,
        department="Radiation Oncology",
        due_date="15 September 2026",
        clinical_instruction="Weekly RT toxicity assessment and skin check.",
        simplified_instruction=LocalizedText(
            en="Visit the clinic for your weekly skin and hydration check.",
            te="మీ వారంవారీ చర్మ తనిఖీ కోసం క్లినిక్‌కి రండి.",
            hi="अपनी साप्ताहिक त्वचा जांच के लिए क्लिनिक आएं।"
        ),
        why_explanation=LocalizedText(
            en="Ensures your skin is healing well and hydration is sufficient.",
            te="చర్మం ఆరోగ్యంగా ఉందని మరియు తగినంత నీరు తాగుతున్నారని నిర్ధారించడానికి.",
            hi="यह देखने के लिए कि त्वचा ठीक है और पर्याप्त पानी पी रहे हैं।"
        ),
        what_to_do=LocalizedText(
            en="Report to Radiation OPD Room 6.",
            te="రేడియేషన్ ఓపీడీ రూమ్ 6కి రండి.",
            hi="रेडिएशन ओपीडी कमरा 6 में आएं।"
        ),
        where_location=LocalizedText(
            en="Radiation OPD, Room 6",
            te="రేడియేషన్ ఓపీడీ, రూమ్ 6",
            hi="रेडिएशन ओपीडी, कमरा 6"
        ),
        status=TaskStatus.SENT,
        created_at="09 Sep 15:00",
        created_by="Dr. P. Reddy",
        approved_by="Dr. P. Reddy",
        approved_at="09 Sep 15:05",
        sent_at="09 Sep 15:10",
        requires_staff_attention=True,
        attention_reason="Patient requested clarification on appointment timing"
    ),
    FollowUpTask(
        id="TASK-205",
        patient_id="P-1007",
        title="Post-Gastrectomy Surgical Wound Inspection",
        category=TaskCategory.STOMA_WOUND_CARE,
        department="Surgical Oncology",
        due_date="17 September 2026",
        clinical_instruction="Post-op day 21 wound evaluation, suture line check.",
        simplified_instruction=LocalizedText(
            en="Visit the surgical dressing room for wound inspection.",
            te="గాయం తనిఖీ కోసం సర్జికల్ డ్రెస్సింగ్ గదికి రండి.",
            hi="घाव की जांच के लिए सर्जिकल ड्रेसिंग रूम में आएं।"
        ),
        why_explanation=LocalizedText(
            en="To ensure surgical stitches have healed properly without infection.",
            te="ఇన్ఫెక్షన్ లేకుండా కుట్లు బాగా మానినట్లు నిర్ధారించుకోవడానికి.",
            hi="यह सुनिश्चित करने के लिए कि टांके बिना किसी संक्रमण के ठीक हो गए हैं।"
        ),
        what_to_do=LocalizedText(
            en="Keep wound dry and visit the nurse in Room 102.",
            te="గాయాన్ని పొడిగా ఉంచి రూమ్ 102లో నర్సును కలవండి.",
            hi="घाव को सूखा रखें और कमरा 102 में नर्स से मिलें।"
        ),
        where_location=LocalizedText(
            en="Surgical Nursing Station, 1st Floor",
            te="సర్జికల్ నర్సింగ్ స్టేషన్, 1వ అంతస్తు",
            hi="सर्जिकल नर्सिंग स्टेशन, पहली मंजिल"
        ),
        status=TaskStatus.COMPLETED,
        created_at="06 Sep 10:00",
        created_by="Dr. A. Sharma",
        approved_by="Dr. A. Sharma",
        approved_at="06 Sep 10:10",
        sent_at="06 Sep 10:15",
        completed_at="10 Sep 11:20"
    ),
    FollowUpTask(
        id="TASK-206",
        patient_id="P-1011",
        title="Stoma Appliance & Skin Barrier Review",
        category=TaskCategory.STOMA_WOUND_CARE,
        department="Surgical Oncology",
        due_date="23 September 2026",
        clinical_instruction="Stoma skin barrier check, counsel patient and caregiver on bag change technique.",
        simplified_instruction=LocalizedText(
            en="Visit the stoma care nurse for bag check and skin advice.",
            te="బ్యాగ్ తనిఖీ మరియు చర్మ సంరక్షణ సలహాల కోసం స్టోమా కేర్ నర్సును కలవండి.",
            hi="बैग की जांच और त्वचा की देखभाल के लिए स्टोमा केयर नर्स से मिलें।"
        ),
        why_explanation=LocalizedText(
            en="Prevents skin irritation and ensures easy pouch changes.",
            te="చర్మపు చికాకు రాకుండా సౌకర్యవంతంగా బ్యాగ్ మార్చడానికి సహాయపడుతుంది.",
            hi="त्वचा में जलन से बचाव और पाउच बदलने में आसानी के लिए।"
        ),
        what_to_do=LocalizedText(
            en="Bring extra bag and meet Nurse Srilatha.",
            te="అదనపు బ్యాగ్ వెంట తీసుకుని నర్స్ శ్రీలతను కలవండి.",
            hi="अतिरिक्त बैग साथ लाएं और नर्स श्रीलता से मिलें।"
        ),
        where_location=LocalizedText(
            en="Stoma Care Clinic, Room 108",
            te="స్టోమా కేర్ క్లినిక్, రూమ్ 108",
            hi="स्टोमा केयर क्लिनिक, कमरा 108"
        ),
        status=TaskStatus.SENT,
        created_at="08 Sep 14:00",
        created_by="Dr. A. Sharma",
        approved_by="Dr. A. Sharma",
        approved_at="08 Sep 14:15",
        sent_at="08 Sep 14:20"
    )
]

INITIAL_APPOINTMENTS: List[Appointment] = [
    Appointment(
        id="APT-301",
        patient_id="P-1001",
        patient_name="Ramesh Varma",
        department="Medical Oncology",
        doctor_name="Dr. K. Rao",
        date_time="18 September 2026, 10:30 AM",
        hospital_name="NCG Partner Regional Cancer Center",
        room_or_floor="OPD Block B, Room 14",
        status=AppointmentStatus.AWAITING_CONFIRMATION
    ),
    Appointment(
        id="APT-302",
        patient_id="P-1002",
        patient_name="Sunita Sharma",
        department="Medical Oncology",
        doctor_name="Dr. S. Mukherjee",
        date_time="13 September 2026, 11:00 AM",
        hospital_name="NCG Partner Regional Cancer Center",
        room_or_floor="OPD Block A, Room 08",
        status=AppointmentStatus.CONFIRMED
    ),
    Appointment(
        id="APT-303",
        patient_id="P-1004",
        patient_name="Lakshmi Devi",
        department="Radiation Oncology",
        doctor_name="Dr. P. Reddy",
        date_time="15 September 2026, 02:00 PM",
        hospital_name="NCG Partner Regional Cancer Center",
        room_or_floor="Radiation Linac Unit 2",
        status=AppointmentStatus.RESCHEDULE_REQUESTED,
        reschedule_reason="Family bus transit unavailable on Tuesday afternoon. Requested Wednesday morning."
    )
]

INITIAL_HELP_REQUESTS: List[HelpRequest] = [
    HelpRequest(
        id="HLP-401",
        patient_id="P-1001",
        patient_name="Ramesh Varma",
        language=LanguageEnum.TE,
        reason="I cannot reach the hospital",
        details="RTC bus strike announced on rural route to Hyderabad on 18th Sept. Need assistance arranging patient transport or postponing blood test by 1 day.",
        status=HelpRequestStatus.OPEN,
        created_at="09 Sep 16:20",
        handled_by=None
    ),
    HelpRequest(
        id="HLP-402",
        patient_id="P-1004",
        patient_name="Lakshmi Devi",
        language=LanguageEnum.TE,
        reason="I need help with my appointment",
        details="Husband working daily wage shifts. Requests rescheduling to morning slot 10 AM.",
        status=HelpRequestStatus.IN_PROGRESS,
        created_at="09 Sep 12:45",
        handled_by="Care Coordinator Anita"
    ),
    HelpRequest(
        id="HLP-403",
        patient_id="P-1005",
        patient_name="Rajesh Kumar Patel",
        language=LanguageEnum.HI,
        reason="I don't understand the instruction",
        details="Confused whether liver function test requires overnight fasting or simple blood draw.",
        status=HelpRequestStatus.RESOLVED,
        created_at="08 Sep 14:10",
        resolved_at="08 Sep 15:30",
        resolution_notes="Called patient caregiver Pooja in Hindi and explained no fasting required.",
        handled_by="Nurse Coordinator Priya"
    )
]

INITIAL_AUDIT_LOGS: List[AuditLogEntry] = [
    AuditLogEntry(
        id="AUD-101",
        timestamp="09 Sep 10:42",
        actor="Dr. K. Rao",
        role="Medical Oncologist",
        action="Created follow-up instruction",
        patient_id="P-1001",
        task_id="TASK-201",
        details="Input: 'Complete CBC and Serum Creatinine prior to Cycle 3 follow-up on 18 Sept.'"
    ),
    AuditLogEntry(
        id="AUD-102",
        timestamp="09 Sep 10:44",
        actor="Assistive AI Engine",
        role="System Service",
        action="Generated patient-friendly draft",
        patient_id="P-1001",
        task_id="TASK-201",
        details="Created simplified English, Telugu, and Hindi drafts for clinician review"
    ),
    AuditLogEntry(
        id="AUD-103",
        timestamp="09 Sep 10:45",
        actor="Dr. K. Rao",
        role="Medical Oncologist",
        action="Approved instruction version",
        patient_id="P-1001",
        task_id="TASK-201",
        details="Verified clinical safety and authorized multilingual dispatch"
    ),
    AuditLogEntry(
        id="AUD-104",
        timestamp="09 Sep 10:46",
        actor="CareBridge Delivery Queue",
        role="System Service",
        action="Dispatched instruction",
        patient_id="P-1001",
        task_id="TASK-201",
        details="Instruction sent to patient app & caregiver SMS in Telugu (Primary)",
        language="te"
    ),
    AuditLogEntry(
        id="AUD-105",
        timestamp="09 Sep 16:20",
        actor="Ramesh Varma",
        role="Patient",
        action="Submitted Help Request",
        patient_id="P-1001",
        task_id="TASK-201",
        details="Reason: Cannot reach hospital due to rural bus strike",
        language="te"
    )
]
