markdown
# VitaID Frontend

Three standalone web apps for the VitaID platform — patient-facing app,
emergency responder app, and a clinic FHIR-submission demo. Plain HTML,
CSS, and JavaScript — no framework, no build step.

Backend API this connects to: https://api.penworks.tech
Backend repo: https://github.com/<your-username>/vitaid-backend

## Structure

vitaid-frontend/
patient-app/ # Patient registration, login, Golden Card, consent, audit log
responder-app/ # Emergency responder login + Golden Card retrieval
clinic-demo/ # Facility OAuth login + FHIR data submission demo


Each folder is fully independent — its own `index.html`, `css/`, and `js/`.

## Local Setup

No build step is required. Each app is plain static HTML/CSS/JS.

1. Clone: `git clone https://github.com/<your-username>/vitaid-frontend.git`
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

- **Patient:** VitaID reference `VID-JXCPOZ1G8B`, PIN `123456`
- **Responder:** email `responder@test.rw`, work ID `WORKID12345`
- **Clinic facility:** pre-filled in the clinic demo login screen; use the
  "Issue new credential" option if the stored secret has expired

## Known Limitations

- No QR Code scanner for the clinic app yet
- No build tooling, bundling, or minification — intentionally kept simple
  for a static, no-dependency deployment.
- Native browser dialogs (`alert`/`confirm`) are used for some feedback and
  confirmations rather than custom in-app components.

## SRS Document
[[link](https://docs.google.com/document/d/1PtP8kqAWCMLVf1jY18-AShlNvsNRIkcRJG73w3MByFQ/edit?usp=sharing)]
