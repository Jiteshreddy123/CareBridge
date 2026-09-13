import re
from typing import Dict, Any
from ..models import AIInstructionDraft


# Specialized healthcare oncology simplification & translation lexicon
CLINICAL_SIMPLIFICATIONS = [
    {
        "pattern": r"(cbc|complete blood count|hematolog|hemogram)",
        "category": "Blood Test",
        "simplified_en": "Please get your complete blood test done before your next visit.",
        "translated_te": "దయచేసి మీ తదుపరి సందర్శనకు ముందు రక్త పరీక్ష (CBC) చేయించుకోండి.",
        "translated_hi": "कृपया अपनी अगली मुलाकात से पहले अपना रक्त परीक्षण (CBC) करवाएं।",
        "why_en": "Your doctor needs to check your blood cell counts before giving the next treatment.",
        "why_te": "తదుపరి చికిత్స ఇవ్వడానికి ముందు మీ వైద్యుడికి మీ రక్త కణాల సంఖ్యను తనిఖీ చేయాలి.",
        "why_hi": "अगला इलाज शुरू करने से पहले डॉक्टर को आपके रक्त कोशिकाओं की जांच करनी है।",
        "what_en": "Visit the hospital laboratory in the morning. Fasting is not required unless specified.",
        "what_te": "ఉదయం ఆసుపత్రి ప్రయోగశాలకు వెళ్లండి. ప్రత్యేకంగా చెప్పకపోతే ఖాళీ కడుపుతో ఉండనవసరం లేదు.",
        "what_hi": "सुबह अस्पताल की लैब में जाएं। जब तक अलग से न कहा जाए, भूखे पेट रहने की आवश्यकता नहीं है।",
        "where_en": "Hospital Central Laboratory, Ground Floor",
        "where_te": "హాస్పిటల్ సెంట్రల్ లాబొరేటరీ, గ్రౌండ్ ఫ్లోర్",
        "where_hi": "अस्पताल सेंट्रल लैबोरेटरी, ग्राउंड फ्लोर"
    },
    {
        "pattern": r"(ct scan|pet-ct|pet scan|mri|contrast-enhanced)",
        "category": "Imaging / Scan",
        "simplified_en": "Complete your imaging scan and collect the report before your review appointment.",
        "translated_te": "మీ సమీక్ష అపాయింట్‌మెంట్‌కు ముందు మీ స్కానింగ్ పూర్తి చేసి రిపోర్ట్ తీసుకోండి.",
        "translated_hi": "अपनी डॉक्टर मुलाकात से पहले स्कैन पूरा करवाएं और रिपोर्ट प्राप्त करें।",
        "why_en": "The scan helps your care team check how well the cancer is responding to treatment.",
        "why_te": "చికిత్స ఎలా పనిచేస్తుందో తనిఖీ చేయడానికి ఈ స్కాన్ మీ వైద్య బృందానికి సహాయపడుతుంది.",
        "why_hi": "यह स्कैन आपकी देखभाल टीम को यह देखने में मदद करता है कि इलाज का कितना असर हो रहा है।",
        "what_en": "Arrive 30 minutes early at the Radiology desk. Keep 4 hours of fasting if contrast is required.",
        "what_te": "రేడియాలజీ డెస్క్ వద్దకు 30 నిమిషాల ముందుగా చేరుకోండి. కాంట్రాస్ట్ అవసరమైతే 4 గంటల ఉపవాసం పాటించండి.",
        "what_hi": "रेडियोलॉजी काउंटर पर 30 मिनट पहले पहुंचें। यदि कंट्रास्ट जांच है तो 4 घंटे भूखे पेट रहें।",
        "where_en": "Department of Radiology & Imaging, Basement 1",
        "where_te": "రేడియాలజీ విభాగం, బేస్‌మెంట్ 1",
        "where_hi": "रेडियोलॉजी एवं इमेजिंग विभाग, बेसमेंट 1"
    },
    {
        "pattern": r"(chemo|chemotherapy|cycle|capecitabine|paclitaxel|carboplatin)",
        "category": "Chemotherapy Review",
        "simplified_en": "Report for pre-chemotherapy fitness check and doctor evaluation.",
        "translated_te": "కీమోథెరపీకి ముందు శారీరక తనిఖీ మరియు వైద్యుల పరీక్ష కోసం రండి.",
        "translated_hi": "कीमोथेरेपी से पहले शारीरिक जांच और डॉक्टर मूल्यांकन के लिए रिपोर्ट करें।",
        "why_en": "Your doctor will verify blood counts and overall fitness before safely giving the next cycle.",
        "why_te": "తదుపరి కీమో సైకిల్ సురక్షితంగా ఇవ్వడానికి మీ ఆరోగ్యం మరియు రక్త నివేదికలను డాక్టర్ పరిశీలిస్తారు.",
        "why_hi": "अगला कीमो चक्र सुरक्षित रूप से देने से पहले डॉक्टर आपके स्वास्थ्य और रक्त रिपोर्ट की पुष्टि करेंगे।",
        "what_en": "Have a light breakfast, bring all recent lab reports, and take regular morning medicines.",
        "what_te": "తేలికపాటి అల్పాహారం తీసుకోండి, అన్ని తాజా ల్యాబ్ రిపోర్టులు వెంట తీసుకురండి.",
        "what_hi": "हल्का नाश्ता करें, हाल ही की सभी जांच रिपोर्ट साथ लाएं और सुबह की नियमित दवाएं लें।",
        "where_en": "Day Care Chemotherapy Unit, 3rd Floor",
        "where_te": "డే కేర్ కీమోథెరపీ యూనిట్, 3వ అంతస్తు",
        "where_hi": "डे केयर कीमोथेरेपी यूनिट, तीसरी मंजिल"
    },
    {
        "pattern": r"(radiation|radiotherapy|rt skin|erythema)",
        "category": "Radiation Check",
        "simplified_en": "Visit the radiation oncology clinic for skin assessment and weekly review.",
        "translated_te": "చర్మ తనిఖీ మరియు వారంవారీ సమీక్ష కోసం రేడియేషన్ ఆంకాలజీ క్లినిక్‌కి రండి.",
        "translated_hi": "त्वचा की जांच और साप्ताहिक समीक्षा के लिए रेडिएशन ऑन्कोलॉजी क्लिनिक आएं।",
        "why_en": "Radiation doctors need to ensure the treatment area skin remains healthy and safe.",
        "why_te": "రేడియేషన్ పొందుతున్న చర్మం సురక్షితంగా మరియు ఆరోగ్యంగా ఉందని నిర్ధారించుకోవాలి.",
        "why_hi": "रेडिएशन डॉक्टर यह सुनिश्चित करेंगे कि उपचार क्षेत्र की त्वचा सुरक्षित और स्वस्थ है।",
        "what_en": "Do not apply lotions or oils on the treatment area within 2 hours of your appointment.",
        "what_te": "అపాయింట్‌మెంట్‌కు 2 గంటల ముందు చికిత్స భాగంపై ఎలాంటి లోషన్లు లేదా నూనెలు రాయవద్దు.",
        "what_hi": "मुलाकात से 2 घंटे पहले उपचार वाले हिस्से पर कोई क्रीम या तेल न लगाएं।",
        "where_en": "Radiation Oncology OPD, Ground Floor Wing A",
        "where_te": "రేడియేషన్ ఆంకాలజీ ఓపీడీ, గ్రౌండ్ ఫ్లోర్ వింగ్ ఎ",
        "where_hi": "रेडिएशन ऑन्कोलॉजी ओपीडी, ग्राउंड फ्लोर विंग ए"
    },
    {
        "pattern": r"(stoma|wound|dressing|seroma|drain|catheter)",
        "category": "Wound & Stoma Care",
        "simplified_en": "Visit the surgical stoma and wound care nurse for dressing change and review.",
        "translated_te": "డ్రెస్సింగ్ మార్చడం మరియు తనిఖీ కోసం స్టోమా కేర్ నర్సు వద్దకు రండి.",
        "translated_hi": "ड्रेसिंग बदलने और जांच के लिए स्टोमा व घाव देखभाल नर्स से मिलें।",
        "why_en": "Regular dressing checks prevent infection and ensure proper surgical wound healing.",
        "why_te": "రెగ్యులర్ డ్రెస్సింగ్ తనిఖీలు ఇన్ఫెక్షన్ రాకుండా సర్జరీ గాయం త్వరగా మానడానికి సహాయపడతాయి.",
        "why_hi": "नियमित ड्रेसिंग जांच संक्रमण से बचाती है और सर्जिकल घाव को ठीक से भरने में मदद करती है।",
        "what_en": "Keep the dressing clean and dry. Report immediately if you notice redness or high fever.",
        "what_te": "డ్రెస్సింగ్‌ను శుభ్రంగా మరియు పొడిగా ఉంచండి. జ్వరం లేదా ఎరుపు కనిపిస్తే వెంటనే చెప్పండి.",
        "what_hi": "ड्रेसिंग को साफ और सूखा रखें। यदि लाली या बुखार दिखे तो तुरंत सूचित करें।",
        "where_en": "Surgical Nursing Station & Stoma Clinic, 1st Floor",
        "where_te": "సర్జికల్ నర్సింగ్ స్టేషన్, 1వ అంతస్తు",
        "where_hi": "सर्जिकल नर्सिंग स्टेशन एवं स्टोमा क्लिनिक, पहली मंजिल"
    }
]


def simplify_and_translate_instruction(clinical_text: str, due_date: str = "Before next visit") -> AIInstructionDraft:
    """
    Assistive AI module: Converts doctor-entered technical text into clear,
    patient-friendly language in English, Telugu, and Hindi.
    Always flags output as an AI Draft requiring human clinician signoff.
    """
    text_lower = clinical_text.lower()
    matched = None
    for entry in CLINICAL_SIMPLIFICATIONS:
        if re.search(entry["pattern"], text_lower):
            matched = entry
            break

    if matched:
        return AIInstructionDraft(
            clinical_text=clinical_text,
            simplified_en=matched["simplified_en"],
            translated_te=matched["translated_te"],
            translated_hi=matched["translated_hi"],
            why_en=matched["why_en"],
            why_te=matched["why_te"],
            why_hi=matched["why_hi"],
            what_en=matched["what_en"],
            what_te=matched["what_te"],
            what_hi=matched["what_hi"],
            suggested_category=matched["category"],
            suggested_due_date=due_date or "Before next visit",
            suggested_location=matched["where_en"]
        )

    # General fallback for arbitrary instructions
    clean_prompt = clinical_text.strip().rstrip(".")
    return AIInstructionDraft(
        clinical_text=clinical_text,
        simplified_en=f"Please complete this follow-up step: {clean_prompt}.",
        translated_te=f"దయచేసి మీ వైద్యులు సూచించిన ఈ తదుపరి పనిని పూర్తి చేయండి: {clean_prompt}.",
        translated_hi=f"कृपया अपने डॉक्टर द्वारा बताए गए इस अगले कदम को पूरा करें: {clean_prompt}।",
        why_en="Your oncologist has requested this action as part of your ongoing care plan.",
        why_te="మీ నిరంతర సంరక్షణ ప్రణాళికలో భాగంగా మీ క్యాన్సర్ వైద్యులు దీనిని సూచించారు.",
        why_hi="आपकी देखभाल योजना के हिस्से के रूप में आपके कैंसर डॉक्टर ने यह सलाह दी है।",
        what_en="Follow the instructions given above or contact your care coordinator if you have questions.",
        what_te="పైన తెలిపిన సూచనలను పాటించండి లేదా సందేహాలుంటే సంప్రదించండి.",
        what_hi="ऊपर दिए गए निर्देशों का पालन करें या सहायता के लिए संपर्क करें।",
        suggested_category="Doctor Consultation",
        suggested_due_date=due_date or "Before next visit",
        suggested_location="NCG Partner Oncology OPD"
    )
