from typing import List, Dict, Any
import uuid


SAMPLE_DOCUMENTS = {
    "discharge_summary": {
        "title": "Post-Chemotherapy Cycle 2 Discharge Order (Anonymized)",
        "source": "Medical Oncology Inpatient Unit",
        "extracted_items": [
            {
                "title": "Complete CBC & Serum Creatinine",
                "category": "Blood Test",
                "department": "Medical Oncology",
                "due_date": "18 September 2026",
                "raw_text": "Patient advised to report for CBC and Serum Creatinine 48 hours prior to Cycle 3 follow-up.",
                "simplified_en": "Please get your blood test (CBC & Kidney function) done before your next doctor visit on 18 September.",
                "translated_te": "దయచేసి సెప్టెంబర్ 18న మీ తదుపరి డాక్టర్ సందర్శనకు ముందు రక్త పరీక్ష చేయించుకోండి.",
                "translated_hi": "कृपया 18 सितंबर को अपनी अगली डॉक्टर मुलाकात से पहले रक्त परीक्षण करवाएं।"
            },
            {
                "title": "Review with Medical Oncologist OPD",
                "category": "Doctor Consultation",
                "department": "Medical Oncology",
                "due_date": "20 September 2026",
                "raw_text": "Follow-up in Daycare OPD Room 12 with fresh CBC results for cycle assessment.",
                "simplified_en": "Visit Dr. Rao at Daycare OPD Room 12 with your fresh blood test report.",
                "translated_te": "మీ తాజా రక్త పరీక్ష నివేదికతో డేకేర్ ఓపీడీ రూమ్ 12లో డాక్టర్ రావు గారిని కలవండి.",
                "translated_hi": "अपनी ताजा रक्त जांच रिपोर्ट के साथ डेकेयर ओपीडी रूम 12 में डॉ. राव से मिलें।"
            }
        ]
    },
    "radiology_requisition": {
        "title": "Restaging CECT Requisition Slip (Anonymized)",
        "source": "Department of Radiology & Imaging",
        "extracted_items": [
            {
                "title": "Contrast-Enhanced CT Abdomen & Pelvis",
                "category": "Imaging / Scan",
                "department": "Radiology",
                "due_date": "22 September 2026",
                "raw_text": "Schedule CECT abdomen-pelvis with 4 hr fasting and eGFR report prior to surgical review.",
                "simplified_en": "Complete your CT scan of abdomen & pelvis. Maintain 4 hours fasting before the scan.",
                "translated_te": "కడుపు మరియు పెల్విస్ సిటి స్కాన్ పూర్తి చేయండి. స్కాన్‌కు ముందు 4 గంటల ఉపవాసం పాటించండి.",
                "translated_hi": "पेट और पेल्विस का सीटी स्कैन करवाएं। स्कैन से पहले 4 घंटे भूखे पेट रहें।"
            }
        ]
    },
    "radiation_prescription": {
        "title": "Weekly Radiation Toxicity Review Sheet (Anonymized)",
        "source": "Radiation Oncology Clinic",
        "extracted_items": [
            {
                "title": "Radiation Skin Assessment & Hydration Check",
                "category": "Radiation Check",
                "department": "Radiation Oncology",
                "due_date": "15 September 2026",
                "raw_text": "Weekly RT review for radiation dermatitis check. Emphasize oral hydration and skin care protocol.",
                "simplified_en": "Visit Radiation OPD for skin check. Drink at least 2 liters of water daily.",
                "translated_te": "చర్మ తనిఖీ కోసం రేడియేషన్ ఓపీడీకి రండి. ప్రతిరోజూ కనీసం 2 లీటర్ల నీరు త్రాగండి.",
                "translated_hi": "त्वचा की जांच के लिए रेडिएशन ओपीडी आएं। रोजाना कम से कम 2 लीटर पानी पिएं।"
            }
        ]
    }
}


def extract_actions_from_document(doc_type: str = "discharge_summary", custom_note: str = "") -> Dict[str, Any]:
    """
    Simulates AI Document Action Item Extraction from clinical PDFs, scans, or handwritten notes.
    Every item is marked as an unapproved AI Draft.
    """
    doc_info = SAMPLE_DOCUMENTS.get(doc_type, SAMPLE_DOCUMENTS["discharge_summary"])
    
    extracted_actions = []
    for item in doc_info["extracted_items"]:
        extracted_actions.append({
            "id": f"DRAFT-{uuid.uuid4().hex[:6].upper()}",
            "title": item["title"],
            "category": item["category"],
            "department": item["department"],
            "due_date": item["due_date"],
            "clinical_text": item["raw_text"],
            "simplified_en": item["simplified_en"],
            "translated_te": item["translated_te"],
            "translated_hi": item["translated_hi"],
            "status": "AI Draft (Pending Clinician Approval)",
            "confidence_score": 0.94
        })

    if custom_note:
        extracted_actions.append({
            "id": f"DRAFT-{uuid.uuid4().hex[:6].upper()}",
            "title": "Additional Note Follow-up",
            "category": "Doctor Consultation",
            "department": "Medical Oncology",
            "due_date": "Within 7 days",
            "clinical_text": custom_note,
            "simplified_en": f"Please follow doctor's advice: {custom_note}",
            "translated_te": f"దయచేసి వైద్యుల సలహాను పాటించండి: {custom_note}",
            "translated_hi": f"कृपया डॉक्टर की सलाह का पालन करें: {custom_note}",
            "status": "AI Draft (Pending Clinician Approval)",
            "confidence_score": 0.89
        })

    return {
        "document_title": doc_info["title"],
        "source_department": doc_info["source"],
        "total_extracted": len(extracted_actions),
        "actions": extracted_actions
    }
