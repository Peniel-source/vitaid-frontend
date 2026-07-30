markdown
# VitaID Frontend

Three standalone web apps for the VitaID platform — patient-facing app,
emergency responder app, and a clinic FHIR-submission demo. Plain HTML,
CSS, and JavaScript — no framework.

Backend API this connects to: https://api.penworks.tech
Backend repo: https://github.com/Peniel-source/vitaid-backend

## Structure

vitaid-frontend/
   patient-app/ # Patient registration, login, Golden Card, consent, audit log
   responder-app/ # Emergency responder login + Golden Card retrieval
   clinic-demo/ # Facility OAuth login + FHIR data submission demo


Each folder is fully independent — each one has `index.html`, `css/`, and `js/`.

## Local Setup

No build step is required. Each app is plain static HTML/CSS/JS.

1. Clone: `git clone https://github.com/Peniel-source/vitaid-frontend.git`
2. Open any app's folder (e.g. `patient-app/`) and open `index.html` directly
   in a browser, or serve it with any static file server, e.g.:

cd patient-app
npx serve .

3. Each app's `js/config.js` sets `API_BASE_URL`. By default this points to
   the live production backend (`https://api.penworks.tech/api/v1`). To test
   against a local backend instead, change this to `http://localhost:3000/api/v1`.

## Live Deployment

Each app is deployed independently on Cloudflare Pages:
- Patient app: https://patient.penworks.tech
- Responder app: https://responder.penworks.tech
- Clinic demo: https://clinic.penworks.tech

## Test Accounts

- **Patient:** VitaID reference `VID-JXCPOZ1G8B`, PIN `123456`. You can create a new one
- **Responder:** email `responder@test.rw`, work ID `WORKID12345` no registration page yet
- **Clinic facility:** pre-filled client id on the page; use the
  "Issue new credential" option to generate new secret or if the old secret has expired. 

## Known Limitations

- **`clinic-demo` is a single hardcoded demo facility, not a real clinic
  portal.** The login page pre-fills one facility's client ID directly in
  the HTML, and "Issue new credential" calls a backend endpoint that isn't
  fully authenticated yet — there's no facility sign-up, admin approval, or account
  management UI. Please treat this app as a scripted demo of the FHIR-ingestion
  flow, not a facility-facing product.
- **`responder-app` has a login screen but no registration flow yet**, because
  the backend doesn't have it — that responder account shared below (email + work ID) was
  created manually in the database, not through any UI.
- No QR Code scanner for the clinic yet(only responder has), clinic will have theirs later, but for now, they have to enter the patient's ref.
- The whole frontend might not give a full and better UI(simple and static) because most time and focus was on the backend.
- Facility/responder tokens are stored in `localStorage`, so this needs a
  security pass like 'httpOnly cookies' before handling real patient data
  beyond a demo.

## SRS Document
[[link](https://docs.google.com/document/d/1PtP8kqAWCMLVf1jY18-AShlNvsNRIkcRJG73w3MByFQ/edit?usp=sharing)]
