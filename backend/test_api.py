import sys
from app.main import app
from app.database import db
from app.services.ai_service import simplify_and_translate_instruction
from app.services.document_parser import extract_actions_from_document

def test_backend_components():
    print("Testing Patients...")
    patients = db.get_patients()
    assert len(patients) >= 18, f"Expected >= 18 patients, got {len(patients)}"
    p1001 = db.get_patient("P-1001")
    assert p1001 is not None and p1001.name == "Ramesh Varma"
    print(f"[OK] Seeded {len(patients)} synthetic oncology patients successfully.")

    print("Testing AI Simplification & Translation...")
    draft = simplify_and_translate_instruction("Patient advised to report for CBC prior to follow-up on 18 Sept.")
    assert "blood test" in draft.simplified_en.lower()
    assert len(draft.translated_te) > 5
    assert len(draft.translated_hi) > 5
    print(f"[OK] AI draft simplification: {draft.simplified_en}")
    print(f"[OK] Telugu length: {len(draft.translated_te)}, Hindi length: {len(draft.translated_hi)}")

    print("Testing Document Parsing...")
    extracted = extract_actions_from_document("discharge_summary")
    assert extracted["total_extracted"] >= 2
    print(f"[OK] Extracted {extracted['total_extracted']} draft actions from sample clinical discharge summary.")

    print("Testing Metrics...")
    metrics = db.get_metrics()
    assert metrics["primary_kpi_name"] == "Follow-up Completion Rate"
    assert metrics["baseline_rate"] == 72
    print(f"[OK] Primary KPI: {metrics['primary_kpi_name']} (Baseline: {metrics['baseline_rate']}%, Pilot: {metrics['pilot_rate']}%)")

    print("All backend component tests passed successfully!")

if __name__ == "__main__":
    test_backend_components()
