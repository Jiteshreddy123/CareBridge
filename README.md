# CareBridge NCG

> **Multilingual Cancer Follow-up & Care-Instruction Closure Platform**  
> *Closing the loop between oncology discharge slips and patient homes.*

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🌟 Live Interactive Demo

You can view and interact with the live platform immediately in your browser:
* **[🚀 Live Web Demo (GitHub Pages)](https://<your-username>.github.io/<your-repo-name>/)**
* **[📺 Video Walkthrough](#-video-walkthrough)** *(Replace with your YouTube/Loom link)*

---

## 🎯 The Problem

In high-volume public cancer centers and regional hospitals across India:
1. **Clinical Jargon & Language Barriers:** Discharge summaries are written in complex, abbreviated English medical terminology. Over 70% of patients and family caregivers speak regional languages (Hindi, Telugu, Bengali, Tamil, etc.).
2. **Post-Discharge Disconnect:** Patients leave with handwritten slips. Misunderstanding crucial preparatory steps (e.g., fasting for a PET-CT, scheduling a CBC count 48 hours before chemotherapy) leads to delayed cycles, avoidable toxicity, and elevated treatment dropout rates.
3. **Lack of Closed-Loop Tracking:** Hospital care coordinators have little visibility into whether patients completed tests or encountered side effects until they miss their next appointment.

---

## 💡 The Solution

**CareBridge NCG** is an assistive, human-in-the-loop digital health platform tailored for the **National Cancer Grid (NCG)** ecosystem:

- **Assistive Clinician Ingestion:** Converts dense discharge notes into actionable, structured follow-up tasks.
- **Mandatory Oncologist Approval:** 1-click clinician review ensures no AI instruction is shared without doctor sign-off.
- **11 Regional Languages:** Native, culturally validated translations (Hindi, Telugu, Tamil, Bengali, Kannada, Malayalam, Marathi, Gujarati, Punjabi, Odia, English).
- **Patient-Centric Action Cards:** Strips ambiguity by structuring every task into:
  - **What:** Clear, simple instructions (e.g., *"Take your complete blood test"*).
  - **Why:** The clinical rationale (*"Your doctor needs to verify counts before giving chemotherapy"*).
  - **Where & When:** Floor, room, arrival time, and fasting/medication rules.
- **One-Tap Help & Caregiver Delegation:** Integrated audio readouts, WhatsApp-ready card sharing, and instant escalation for side effects.
- **Closed-Loop Follow-up Queue:** Real-time tracking of pending, completed, and overdue tasks to proactively identify dropout risks.
- **Audit & Governance:** Immutable timestamped logs of every clinician verification for clinical accountability.

---

## 🛠️ Architecture & Tech Stack

```
Cliniquex / CareBridge NCG
├── carebridge_final.html      # Standalone zero-dependency interactive demo
├── index.html                 # GitHub Pages entrypoint
├── frontend/                  # Modern React SPA
│   ├── src/
│   │   ├── components/        # Reusable UI, Clinician & Patient modules
│   │   ├── views/             # Dashboard, Patient View, Queue, Audit, etc.
│   │   └── context/           # Global state & language localization context
│   ├── package.json
│   └── vite.config.ts
└── backend/                   # FastAPI Python Services
    └── app/
        ├── services/          # AI simplification, document parsing & audit logs
        ├── models.py          # Pydantic schemas
        ├── database.py        # Mock/in-memory oncology datastore
        └── main.py            # REST API endpoints
```

* **Frontend:** React 19, TypeScript, Tailwind CSS, Lucide Icons, Canvas Confetti.
* **Backend:** FastAPI (Python 3.10+), Uvicorn, Pydantic, Regularized Clinical NLP parser.
* **Hosting:** GitHub Pages (Instant static demo) / Vercel / Netlify.

---

## 🚀 Quick Start (Running Locally)

### Option 1: Instant Browser Demo (No Setup Required)
Simply open `index.html` (or `carebridge_final.html`) directly in any web browser!

---

### Option 2: Full Stack Development (Frontend + Backend)

#### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

#### 2. Start the Backend (FastAPI)
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
API Documentation will be available at `http://localhost:8000/docs`.

#### 3. Start the Frontend (React + Vite)
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` to explore the full application.

---

## 🔒 Clinical Safety Disclaimer

> **Note:** CareBridge NCG is an assistive care-coordination and follow-up closure tool. It is **non-diagnostic** and does not formulate medical treatment plans autonomously. All patient care cards require direct review and validation by treating clinicians before distribution.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
