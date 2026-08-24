# Product Requirements Document (PRD)
## Chartered Accountant Firm Website

**Document Version:** 1.0
**Date:** August 14, 2026
**Prepared For:** B.T. Naik & Company
**Prepared By:** Bhau's

---

## 1. Overview

### 1.1 Purpose
This document defines the requirements for a website for B.T. Naik & Company, a Chartered Accountancy practice. The site will serve as the firm's primary digital presence — providing service information, self-service tools, and a secure channel for client document exchange — while adhering to ICAI's website guidelines for CA firms.

### 1.2 Background
CA firms in India are permitted to maintain websites, but must follow ICAI's regulatory framework, which requires content to be informational ("pull" model) rather than promotional ("push" model). This PRD is scoped to stay within that framework while still giving the firm a modern, useful, client-friendly site.

### 1.3 Goals
- Establish a professional, ICAI-compliant online presence
- Reduce manual client communication load (document collection, FAQs, rate lookups)
- Provide a secure channel for exchanging sensitive financial documents
- Serve as a reference resource for clients (due dates, rates, forms)

### 1.4 Non-Goals
- No promotional content, testimonials, discount offers, or marketing banners (ICAI restricted)
- No public blog/news feed in this phase (can be a future addition)
- No payment gateway / billing module in this phase

---

## 2. Target Users

| User Type | Description | Primary Needs |
|---|---|---|
| Prospective Client | Visiting to evaluate the firm | Understand services offered, credentials, how to get in touch |
| Existing Client | Regular client of the firm | Upload/download documents, check due dates, contact support |
| Firm Staff/Admin | Partners and staff managing the site | Manage content, view/respond to uploaded documents and contact requests |

---

## 3. Functional Requirements

### 3.1 Services Pages
**Description:** Dedicated pages describing each service line offered by the firm.

**Requirements:**
- Individual page (or section) for each service:
  - Auditing & Assurance
  - Direct Tax
  - Indirect Tax (GST)
  - Company Law / ROC Compliance
  - International Taxation
  - NRI Taxation
  - Valuation Services
  - Accounts Outsourcing
- Each page includes: short factual description (2–4 paragraphs), scope of service, relevant regulatory references (e.g., which Act/section applies), and a link to the contact form
- Content must be factual and descriptive — no comparative or promotional claims ("best," "No. 1," etc.)
- Content should be easily editable by firm admin without developer involvement (CMS-backed)

**Acceptance Criteria:**
- All 8 service pages live with unique URLs
- Each page loads in under 3 seconds
- Content is editable via CMS by an authorized admin user

---

### 3.2 About / Team Page
**Description:** Page introducing the firm and its partners/staff.

**Requirements:**
- Firm overview: founding year, mission, areas of practice
- Partner/team profiles: name, qualification (e.g., ACA/FCA, additional certifications), years of experience, specialization area
- Optional professional photo per team member
- No client testimonials or achievement-based promotional language (ICAI restriction)

**Acceptance Criteria:**
- Page displays firm summary + minimum 1 team profile
- Admin can add/edit/remove team members via CMS

---

### 3.3 Contact Form + Office Locations/Map
**Description:** Way for prospective and existing clients to reach the firm, with location details for physical visits.

**Requirements:**
- Contact form fields: Name, Email, Phone, Subject/Query Type (dropdown), Message
- Form submissions routed to firm's designated email/inbox (and optionally logged in an admin dashboard)
- Basic spam protection (CAPTCHA or equivalent)
- Office location(s) listed with address, phone number, email, working hours
- Embedded map (e.g., Google Maps) for each office location
- If multiple branches exist, allow location selection/filtering

**Acceptance Criteria:**
- Form submission triggers email notification within 1 minute
- Map correctly pins each listed office address
- Form validates required fields before submission

---

### 3.4 Downloadable Resources
**Description:** Repository of commonly needed forms, checklists, and reference charts.

**Requirements:**
- Categorized resource library (e.g., "Income Tax Forms," "GST Forms," "Checklists," "Due Date Charts")
- Each resource: title, short description, file type/size, download button
- Admin can upload/replace/remove files via CMS
- Search/filter by category
- File formats supported: PDF, DOCX, XLSX

**Acceptance Criteria:**
- Minimum 10 resources available at launch
- Files downloadable without login requirement
- Admin can upload a new resource in under 2 minutes via CMS

---

### 3.5 Rate Charts
**Description:** Reference tables for tax rates clients frequently need to look up.

**Requirements:**
- GST rate chart (by HSN/SAC category or goods/service type)
- TDS rate chart (by section, nature of payment, threshold)
- Depreciation rate chart (as per Income Tax Act / Companies Act, where applicable)
- Tables should be sortable/searchable where practical
- Clear "last updated on [date]" label per chart, with a disclaimer that rates are subject to change and clients should confirm with the firm for specific cases
- Admin-editable so rates can be updated when regulations change

**Acceptance Criteria:**
- All 3 rate charts live and publicly accessible
- Each chart shows a last-updated date
- Admin can update chart values without developer support

---

### 3.6 Secure Document Upload/Download (Client Portal)
**Description:** Login-gated area where clients can securely exchange documents with the firm.

**Requirements:**
- Client authentication supporting **both** login methods: email/password **and** OTP-based login (client can choose either at login)
- Each client sees only their own documents (data isolation between clients)
- Upload functionality: clients can upload invoices, bank statements, Form 16, etc., categorized by document type and financial year
- Download functionality: firm can share back processed documents (e.g., computed tax returns, audit reports) for the client to download
- File size limit and supported formats clearly indicated (e.g., PDF, JPG, XLSX, up to 10MB per file)
- All files encrypted at rest and in transit (HTTPS + encrypted storage)
- Admin-side dashboard for staff to view, download, and organize documents by client
- Audit trail: log of who uploaded/downloaded what and when
- **Document retention:** Uploaded documents are retained for a maximum of **6 months** from upload date, after which they are auto-archived or purged per the firm's retention policy (see Section 6). Clients should be notified in advance of scheduled deletion.

**Acceptance Criteria:**
- Client can log in and upload a file in under 3 steps
- Uploaded files are encrypted and not accessible by unauthorized users
- Staff can view all documents for a given client in one place
- System maintains an audit log of all uploads/downloads

**Security Note:** Given the sensitivity of financial documents, this module requires stronger security review than the rest of the site — see Section 6 (Non-Functional Requirements).

---

### 3.7 FAQ Section
**Description:** Answers to commonly asked client questions.

**Requirements:**
- Organized by category (e.g., "GST Registration," "ITR Filing," "Company Registration," "NRI Taxation")
- Expandable/collapsible accordion format
- Search bar to filter FAQs by keyword
- Admin can add/edit/remove FAQ entries via CMS

**Acceptance Criteria:**
- Minimum 15 FAQs live at launch across at least 4 categories
- Search returns relevant results based on keyword match

---

### 3.8 WhatsApp / Chat Widget
**Description:** Quick-access chat channel for visitor queries.

**Requirements:**
- Floating WhatsApp chat button visible on all pages
- Clicking opens a pre-filled WhatsApp message (e.g., "Hi, I'd like to know more about [service]") directed to the firm's official WhatsApp Business number
- Widget should not auto-trigger or pop up unsolicited (visitor-initiated only, to stay within ICAI's "pull" model)

**Acceptance Criteria:**
- Widget visible and functional on desktop and mobile
- Clicking opens WhatsApp (app or web) with firm's number pre-loaded

---

## 4. Compliance Requirements (ICAI Guidelines)

- All content must follow the "pull" model — informational, not promotional
- No advertisements, discount offers, or promotional schemes
- No unsolicited circulation of website content via email or bulk messaging
- No superlative or comparative claims about the firm's services
- No client testimonials or case-study style achievement promotion
- Site should carry a disclaimer footer noting compliance with ICAI guidelines and limitation of liability for content errors
- Legal/compliance review recommended before launch and after any major content update

---

## 5. Information Architecture (Site Map)

```
Home
├── About Us / Team
├── Services
│   ├── Auditing & Assurance
│   ├── Direct Tax
│   ├── Indirect Tax (GST)
│   ├── Company Law / ROC
│   ├── International Taxation
│   ├── NRI Taxation
│   ├── Valuation Services
│   └── Accounts Outsourcing
├── Resources
│   ├── Downloadable Forms & Checklists
│   └── Rate Charts (GST / TDS / Depreciation)
├── FAQ
├── Client Portal (Login)
│   ├── Upload Documents
│   ├── Download Documents
│   └── Document History
├── Contact Us
│   ├── Contact Form
│   └── Office Locations / Map
└── [WhatsApp widget — persistent across all pages]
```

---

## 6. Non-Functional Requirements

| Category | Requirement |
|---|---|
| Performance | Pages load within 2–3 seconds on standard broadband/4G |
| Security | HTTPS across entire site; encrypted storage for client portal documents; role-based access control (client vs admin) |
| Availability | 99.5% uptime target |
| Responsiveness | Fully functional on mobile, tablet, and desktop |
| Accessibility | WCAG 2.1 AA compliance where feasible |
| Data Privacy | Compliance with applicable Indian data protection regulations (DPDP Act) for client document handling |
| Backup | Daily backup of client portal data |
| Document Retention | Uploaded client documents retained for a maximum of 6 months, after which they are auto-archived/purged; advance notice sent to client before deletion |
| Browser Support | Latest 2 versions of Chrome, Safari, Edge, Firefox |

---

## 7. Admin/CMS Requirements

- Admin login with role-based permissions (Super Admin, Content Editor, Document Manager)
- Ability to edit: service pages, team profiles, FAQs, rate charts, downloadable resources
- Ability to view and manage client portal documents and contact form submissions
- Activity log of admin actions (who changed what, when)

---

## 8. Success Metrics

| Metric | Target (first 6 months post-launch) |
|---|---|
| Contact form submissions | Baseline TBD — track month-over-month |
| Client portal adoption | % of active clients using portal vs. email/WhatsApp for documents |
| Resource downloads | Track most-downloaded resources to guide content priorities |
| Site uptime | ≥ 99.5% |
| Average page load time | ≤ 3 seconds |
| FAQ search usage | Track top search terms to identify content gaps |

---

## 9. Assumptions & Dependencies

- Firm will provide official content (service descriptions, team bios, credentials) for initial population
- Firm has (or will set up) a WhatsApp Business account
- Rate charts and due-date data will require periodic manual updates by firm staff as regulations change
- Hosting/domain to be finalized separately
- Legal review of content for ICAI compliance to be conducted before launch

---

## 10. Out of Scope (Phase 1)

- Blog / news / articles section
- Online payment/billing integration
- Multi-language support
- Client-facing financial dashboards (P&L, ratios, etc.)
- Automated tax calculators
- Articleship/careers listing page

*(These can be considered for a Phase 2 roadmap.)*

---

## 11. Open Questions

**Resolved:**
- ~~Will the client portal require OTP-based login or standard email/password?~~ **Answered:** Both options will be supported; clients can choose either method at login.
- ~~Should document uploads have a maximum retention period, or be retained indefinitely?~~ **Answered:** Maximum retention period of 6 months from upload date.

**Still open:**
- Who will be responsible for keeping rate charts and due-date data current?
- Is a single office location or multiple branches to be supported at launch?

---

*End of Document*