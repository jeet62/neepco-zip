# North Eastern Electric Power Corporation Limited (NEEPCO) — HRIS Personnel Portal

An official, enterprise-grade digital service book and personnel portal designed for the **North Eastern Electric Power Corporation Ltd. (A Government of India Enterprise, Ministry of Power)**. It provides digitized employee service records, institutional document repositories, DPC promotion workflows, station placement orders, training deputation sanctions, and tamper-evident audit logs backed by a native **Node.js Express + SQLite Database Engine (980+ records)** with strict Role-Based Access Control (RBAC).

---

## 1. Enterprise HR Administrator Architecture

The HR Administrator portal is built as a single, cohesive enterprise workspace:

- **Restrained Sidebar Navigation (230px)**:
  - Official NEEPCO crest and branding.
  - Line icon navigation: `Employee Directory` (default), `Dashboard`, `Employee Records`, `Leave & Attendance`, `Service Records`, `Departments`, `Reports`, `Settings`.
  - Subtle left border active indicator.
  - Bottom identification: `Signed in` / `Shri H. K. Nath` / `Senior HR Officer` with `Profile` and `Logout`.
- **Top Application Header**:
  - Title: **Employee Directory** with breadcrumb `HR Administration / Employee Directory`.
  - Scoped search input, notifications bell, user avatar, and session actions.
- **Context Bar**:
  - Clean text bar: **Headquarters Office, Shillong** | Jurisdiction: Assigned Power Station | HR Administrator: Shri H. K. Nath.

---

## 2. Flipkart-Inspired Multi-Criteria & Hierarchy Filter Experience

The employee directory features an e-commerce-style left filter drawer / sidebar:

- **Dedicated Employee Hierarchy Filter**:
  - **Executive Cadre**: `E9 — Executive Director`, `E8 — Chief General Manager / General Manager`, `E7 — Deputy General Manager`, `E6 — Senior Manager`, `E5 — Manager`, `E4 — Deputy Manager`, `E3 — Assistant Manager`, `E2 — Engineer / Officer / Executive Trainee`, `E1 — Assistant Engineer / Assistant Officer / Junior Executive`.
  - **Supervisory Cadre**: `S3 — Senior Supervisor`, `S2 — Supervisor`, `S1 — Junior Supervisor`.
  - **Non-Executive / Workmen**: `W8` to `W1` special grade technicians, clerks, and attendants.
- **Other Collapsible Filter Categories**:
  - **Gender**: All Genders, Male, Female.
  - **Category / Caste**: General / Unreserved, SC — Scheduled Caste, ST — Scheduled Tribe, OBC — Other Backward Class.
  - **Department**: Searchable multi-select for 19 NEEPCO departments.
  - **Office / Station**: Searchable multi-select across all 9 stations.
  - **Status**: Active, On Leave, Transferred, Retired, Separated.
  - **APAR Rating**: Outstanding, Very Good, Good, Average, Below Average.
  - **Employee Type**: Regular, Contract, Trainee, Executive Trainee.
- **Active Filter Chips & Clear All**: Displays removable tags for every active filter.
- **Mobile Responsive Experience**: Quick action buttons `[ FILTERS ]` and `[ SORT BY ]` opening a full-screen drawer with `APPLY FILTERS` and `CLEAR ALL`.

---

## 3. High-Density Employee Data Table

- **Table Columns**:
  - `Employee ID` (monospace font)
  - `Employee` (Avatar initial + full legal name bold)
  - `Grade` (e.g. `E8`, `E6`, `S2`, `W4`)
  - `Designation`
  - `Department`
  - `Station`
  - `Gender`
  - `Category`
  - `Status` (subtle status dots: Active in green, On Leave in amber, Separated in red, Retired in gray)
  - `Action` (`⋮` menu triggering *View Employee*, *Edit Employee*, *Service History*, *Leave & Attendance*, *APAR*, *Documents*)
- **Sorting**: Multi-field sorting by Employee ID, Name (A–Z), Grade (High to Low), Designation, Department, and Joining Date.
- **Pagination**: Configurable page size (25, 50, 100 per page) with page number buttons and record counts.

---

## 4. SQLite Database & Scale (980+ Records)

- **Total Records**: 981 realistic employees seeded across all 9 NEEPCO power stations (>= 100 in each location):
  - Shillong HQ (`HQ_SHL`): 133 employees
  - Kameng HES (`KAM_HES`): 111 employees
  - Kopili HEP (`KOP_HEP`): 106 employees
  - Ranganadi HEP (`RAN_HEP`): 106 employees
  - Agartala GTP (`AGA_GTP`): 105 employees
  - Doyang HES (`DOY_HES`): 105 employees
  - Khandong HEP (`KHA_HEP`): 105 employees
  - Pare HES (`PAR_HES`): 105 employees
  - Tuirial HES (`TUI_HES`): 105 employees

---

## 5. Test Credentials

- **HR Administrator Accounts**:
  - `admin_shillong` / `password123` (Office: Shillong HQ `HQ_SHL` — 133 employees)
  - `admin_kameng` / `password123` (Office: Kameng HES `KAM_HES` — 111 employees)
  - `admin_ranganadi` / `password123` (Office: Ranganadi HEP `RAN_HEP` — 106 employees)
  - `admin_kopili` / `password123` (Office: Kopili HEP `KOP_HEP` — 106 employees)
  - `superadmin` / `password123` (Office: All Stations `ALL` — 981 employees)
- **Employee Accounts**:
  - `1024` / `password123` (Er. Rajesh Kumar Sharma — Shillong HQ)
  - `5821` / `password123` (Smt. Anita Roy — Shillong HQ)
  - `7392` / `password123` (Er. Vikram Singh Tanti — Kameng HES)
  - `8410` / `password123` (Smt. Sunita Tanti — Ranganadi HEP)
  - `9102` / `password123` (Er. Mary Lyngdoh — Shillong HQ)
  - `4312` / `password123` (Er. Priya Devi — Kopili HEP)

---

## 6. Local Execution

```bash
# Install dependencies
npm install

# Start Express SQLite Backend Server (Port 5000)
npm run server

# Start Vite Frontend Dev Server (Port 5173)
npm run dev
```