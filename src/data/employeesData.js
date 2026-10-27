export const NEEPCO_LOCATIONS = [
  { id: "HQ_SHL", name: "Headquarters Office, Shillong (Meghalaya)", code: "SHL-HQ" },
  { id: "KOP_HEP", name: "Kopili Hydro Electric Plant, Umrongso (Assam)", code: "KOP-HEP" },
  { id: "RAN_HEP", name: "Ranganadi Hydro Electric Plant, Yazali (Arunachal Pradesh)", code: "RAN-HEP" },
  { id: "AGA_GTP", name: "Agartala Gas Turbine Power Plant, Ramchandra Nagar (Tripura)", code: "AGA-GTP" },
  { id: "KAM_HES", name: "Kameng Hydro Electric Station, West Kameng (Arunachal Pradesh)", code: "KAM-HES" },
  { id: "DOY_HES", name: "Doyang Hydro Electric Station, Wokha (Nagaland)", code: "DOY-HES" },
  { id: "KHA_HEP", name: "Khandong Hydro Electric Plant, Dima Hasao (Assam)", code: "KHA-HEP" },
  { id: "PAR_HES", name: "Pare Hydro Electric Plant, Doimukh (Arunachal Pradesh)", code: "PAR-HES" },
  { id: "TUI_HES", name: "Tuirial Hydro Electric Station, Aizawl (Mizoram)", code: "TUI-HES" }
];

export const HIERARCHY_STRUCTURE = [
  {
    cadre: "Executive Cadre",
    grades: [
      { code: "E9", title: "Executive Director" },
      { code: "E8", title: "Chief General Manager / General Manager" },
      { code: "E7", title: "Deputy General Manager" },
      { code: "E6", title: "Senior Manager" },
      { code: "E5", title: "Manager" },
      { code: "E4", title: "Deputy Manager" },
      { code: "E3", title: "Assistant Manager" },
      { code: "E2", title: "Engineer / Officer / Executive Trainee" },
      { code: "E1", title: "Assistant Engineer / Assistant Officer / Junior Executive" }
    ]
  },
  {
    cadre: "Supervisory Cadre",
    grades: [
      { code: "S3", title: "Senior Supervisor" },
      { code: "S2", title: "Supervisor" },
      { code: "S1", title: "Junior Supervisor" }
    ]
  },
  {
    cadre: "Non-Executive / Workmen",
    grades: [
      { code: "W8", title: "Special Grade Technician / Head Attendant" },
      { code: "W7", title: "Master Technician / Senior Driver" },
      { code: "W6", title: "Senior Technician / Selection Grade Clerk" },
      { code: "W5", title: "Technician Grade I / Senior Clerk" },
      { code: "W4", title: "Technician Grade II / Upper Division Clerk" },
      { code: "W3", title: "Technician Grade III / Lower Division Clerk" },
      { code: "W2", title: "Junior Technician / Assistant Attendant" },
      { code: "W1", title: "Attendant Grade I / Helper / Trainee Workman" }
    ]
  }
];

export const ALL_DEPARTMENTS = [
  "Hydro Engineering & Power Generation",
  "Civil Hydro Design & Dam Maintenance",
  "Electrical Maintenance & Substation",
  "Control & SCADA",
  "Mechanical",
  "Finance & Accounts",
  "Personnel & Administration",
  "Human Resources",
  "IT / Information Technology",
  "Procurement",
  "Contracts",
  "Legal",
  "Vigilance",
  "Corporate Planning",
  "Environment",
  "Safety",
  "Security",
  "Medical",
  "Stores"
];

export const ADMIN_USERS = {
  "admin_shillong": {
    username: "admin_shillong",
    password: "password123",
    name: "Shri H. K. Nath",
    role: "admin",
    designation: "Senior HR Officer",
    stationId: "HQ_SHL",
    stationName: "Headquarters Office, Shillong (Meghalaya)",
    officeId: "HQ_SHL",
    officeName: "Headquarters Office, Shillong"
  },
  "admin_kameng": {
    username: "admin_kameng",
    password: "password123",
    name: "Smt. L. Riba",
    role: "admin",
    designation: "Manager (HR & Administration)",
    stationId: "KAM_HES",
    stationName: "Kameng Hydro Electric Station, West Kameng",
    officeId: "KAM_HES",
    officeName: "Kameng Hydro Electric Station, West Kameng"
  },
  "admin_ranganadi": {
    username: "admin_ranganadi",
    password: "password123",
    name: "Shri B. K. Chutia",
    role: "admin",
    designation: "Assistant Manager (HR)",
    stationId: "RAN_HEP",
    stationName: "Ranganadi Hydro Electric Plant, Yazali",
    officeId: "RAN_HEP",
    officeName: "Ranganadi Hydro Electric Plant, Yazali"
  },
  "admin_kopili": {
    username: "admin_kopili",
    password: "password123",
    name: "Shri D. C. Barman",
    role: "admin",
    designation: "Manager (Personnel)",
    stationId: "KOP_HEP",
    stationName: "Kopili Hydro Electric Plant, Umrongso",
    officeId: "KOP_HEP",
    officeName: "Kopili Hydro Electric Plant, Umrongso"
  },
  "superadmin": {
    username: "superadmin",
    password: "password123",
    name: "Shri P. C. Sharma",
    role: "superadmin",
    designation: "Chief General Manager (HR & Corporate Admin)",
    stationId: "ALL",
    stationName: "All NEEPCO Stations & Offices",
    officeId: "ALL",
    officeName: "All NEEPCO Stations & Offices"
  }
};

export const INITIAL_EMPLOYEES_DATA = {
  "1024": {
    empNo: "1024",
    password: "password123",
    name: "Er. Rajesh Kumar Sharma",
    cadre: "Executive Cadre",
    gradeCode: "E8",
    grade: "E8 — Chief General Manager / General Manager",
    designation: "Senior Executive Engineer",
    department: "Hydro Engineering & Power Generation",
    locationId: "HQ_SHL",
    locationName: "Headquarters Office, Shillong",
    dob: "14 August 1982",
    gender: "Male",
    caste: "OBC — Other Backward Class",
    casteBenefitTaken: "Yes (Age Relaxation applied during recruitment entry in 2006)",
    joiningDate: "12 May 2006",
    email: "rajesh.sharma@neepco.co.in",
    phone: "+91 94361 88412",
    permanentAddress: "House No. 42, Pine Ridge Colony, Upper Shillong, Meghalaya – 793005",
    presentAddress: "NEEPCO Executive Quarters, Type-V/B4, Brookeneck, Shillong – 793001",
    aadharNo: "4589-2104-9832",
    panNo: "ABCPS9481K",
    familyPlanningBenefit: "Yes (Incentive increment sanctioned vide Office Order No. NEEPCO/FP/2014/104)",
    photoUrl: null,
    status: "Active",
    employeeType: "Regular",
    basicSalary: 145000,
    aparScore: "9.6 / 10",
    aparGrade: "Outstanding",
    dobDoc: { name: "Birth Certificate & Class 10 Admit Card", type: "pdf", date: "15-05-2006", id: "DOC-DOB-1024", size: "1.4 MB" },
    aadharDoc: { name: "Aadhaar Card Copy (Verified)", type: "pdf", id: "DOC-AADHAR-1024", size: "850 KB" },
    panDoc: { name: "PAN Card Copy", type: "pdf", id: "DOC-PAN-1024", size: "620 KB" },
    casteDoc: { name: "Central OBC Certificate (Meghalaya Govt)", type: "pdf", id: "DOC-CASTE-1024", size: "1.1 MB" },
    appointmentDoc: { name: "NEEPCO Appointment Letter Ref: NEEPCO/HR/REC/2006/884", type: "pdf", id: "DOC-APPT-1024", size: "2.2 MB" },
    permanentAddressDoc: { name: "Domicile & Permanent Residence Certificate", type: "pdf", id: "DOC-PRM-1024", size: "1.8 MB" },
    presentAddressDoc: { name: "Quarter Allocation Order & Utility Bill", type: "pdf", id: "DOC-PRS-1024", size: "1.3 MB" },
    dependants: [
      { id: "DEP-1", name: "Sunita Sharma", relation: "Spouse", gender: "Female", dob: "22 November 1985", dobDoc: { name: "Marriage Certificate & Aadhaar", id: "DOC-DEP1-1024", size: "1.2 MB" } },
      { id: "DEP-2", name: "Aarav Sharma", relation: "Son", gender: "Male", dob: "05 September 2012", dobDoc: { name: "Birth Certificate Shillong Municipal", id: "DOC-DEP2-1024", size: "980 KB" } }
    ],
    educationalQualifications: [
      { slNo: 1, degree: "B.Tech in Electrical Engineering", institution: "National Institute of Technology (NIT) Silchar", passingYear: "2004", percentage: "84.2%", division: "First Class with Distinction", doc: { name: "B.Tech Degree Certificate & Transcripts", id: "DOC-EDU-BTECH", size: "3.4 MB" } }
    ],
    promotionHistory: [
      { orderNo: "NEEPCO/HR/PROM/2022/412", orderDate: "01 April 2022", fromGrade: "E7", toGrade: "E8", effectiveDate: "01 April 2022", sanctionedBy: "Director (Human Resources), NEEPCO HQ", documentAvailable: true }
    ],
    placementHistory: [
      { orderNo: "NEEPCO/HR/TRF/2023/889", postingStation: "Headquarters Office, Shillong", department: "Hydro Operations & Technical Cell", specializedSkillArea: "Hydro Generation & Substation Grid Systems", specializedSkillSubArea: "High Voltage Transformer Diagnostics & SCADA Monitoring", duration: "15 January 2023 to Present", reportingOfficer: "Er. B. C. Das, Executive Director (Technical)", documentAvailable: true }
    ],
    aparRatings: [{ year: "2024-2025", score: "9.6 / 10", grade: "Outstanding", remark: "Exceptional grid stability management during monsoon peak load." }],
    timeline: [{ id: "T-1", date: "15-01-2023", type: "Transfer", title: "Transferred to HQ Shillong (Hydro Technical Cell)", detail: "Posted to HQ Shillong vide Order #NEEPCO/HR/TRF/2023/889" }],
    auditLog: [{ id: "A-1", timestamp: "06-08-2026 10:15 AM", updatedBy: "Shri H. K. Nath (HR Shillong)", station: "Shillong HQ", field: "Present Address", oldValue: "Quarters B3, Shillong", newValue: "NEEPCO Executive Quarters Type-V/B4, Brookeneck, Shillong" }]
  },

  "5821": {
    empNo: "5821",
    password: "password123",
    name: "Smt. Anita Roy",
    cadre: "Executive Cadre",
    gradeCode: "E7",
    grade: "E7 — Deputy General Manager",
    designation: "Deputy General Manager",
    department: "Finance & Accounts",
    locationId: "HQ_SHL",
    locationName: "Headquarters Office, Shillong",
    dob: "04 November 1979",
    gender: "Female",
    caste: "General / Unreserved",
    casteBenefitTaken: "No (Recruited under General Merit)",
    joiningDate: "18 September 2003",
    email: "anita.roy@neepco.co.in",
    phone: "+91 94363 77102",
    permanentAddress: "Flat 302, Green View Apartments, Laitumkhrah, Shillong – 793003",
    presentAddress: "Flat 302, Green View Apartments, Laitumkhrah, Shillong – 793003",
    aadharNo: "8821-4401-1923",
    panNo: "AFTPR3329L",
    familyPlanningBenefit: "No",
    photoUrl: null,
    status: "Active",
    employeeType: "Regular",
    basicSalary: 128000,
    aparScore: "9.8 / 10",
    aparGrade: "Outstanding",
    dobDoc: { name: "Class 10 Certificate & Passport", type: "pdf", id: "DOC-DOB-5821", size: "1.2 MB" },
    aadharDoc: { name: "Aadhaar Card Copy", type: "pdf", id: "DOC-AADHAR-5821", size: "780 KB" },
    panDoc: { name: "PAN Card Copy", type: "pdf", id: "DOC-PAN-5821", size: "550 KB" },
    casteDoc: { name: "General Category Self-Declaration", type: "pdf", id: "DOC-CASTE-5821", size: "900 KB" },
    appointmentDoc: { name: "NEEPCO Appointment Order NEEPCO/FIN/2003/301", type: "pdf", id: "DOC-APPT-5821", size: "1.9 MB" },
    permanentAddressDoc: { name: "Electricity Bill & Municipal Lease", type: "pdf", id: "DOC-PRM-5821", size: "1.5 MB" },
    presentAddressDoc: { name: "Address Certificate", type: "pdf", id: "DOC-PRS-5821", size: "1.1 MB" },
    dependants: [{ id: "DEP-5821-1", name: "Subir Roy", relation: "Spouse", gender: "Male", dob: "12 January 1976", dobDoc: { name: "Marriage Certificate", id: "DOC-DEP1-5821", size: "1.1 MB" } }],
    educationalQualifications: [{ slNo: 1, degree: "Chartered Accountant (CA)", institution: "ICAI", passingYear: "2002", percentage: "First Attempt", division: "Fellow CA (FCA)", doc: { name: "ICAI Membership Certificate", id: "DOC-EDU-CA", size: "2.5 MB" } }],
    promotionHistory: [{ orderNo: "NEEPCO/HR/PROM/2021/804", orderDate: "01 April 2021", fromGrade: "E6", toGrade: "E7", effectiveDate: "01 April 2021", sanctionedBy: "Director (Finance), NEEPCO HQ", documentAvailable: true }],
    placementHistory: [{ orderNo: "NEEPCO/HR/TRF/2021/119", postingStation: "Headquarters Office, Shillong", department: "Finance & Accounts", duration: "01 April 2021 to Present", reportingOfficer: "Shri S. K. Mitra, General Manager (Finance)", documentAvailable: true }],
    aparRatings: [{ year: "2024-2025", score: "9.8 / 10", grade: "Outstanding", remark: "Flawless CAG audit clearance." }],
    timeline: [{ id: "T-5821-1", date: "01-04-2021", type: "Promotion", title: "Promoted to E7 DGM", detail: "Order #NEEPCO/HR/PROM/2021/804" }],
    auditLog: [{ id: "A-5821-1", timestamp: "10-01-2025 11:20 AM", updatedBy: "Shri H. K. Nath (HR Shillong)", station: "Shillong HQ", field: "Property Return FY 2024-25", oldValue: "Pending", newValue: "Submitted & Accepted" }]
  },

  "9102": {
    empNo: "9102",
    password: "password123",
    name: "Er. Mary Lyngdoh",
    cadre: "Executive Cadre",
    gradeCode: "E6",
    grade: "E6 — Senior Manager",
    designation: "Executive Engineer",
    department: "Control & SCADA",
    locationId: "HQ_SHL",
    locationName: "Headquarters Office, Shillong",
    dob: "25 October 1990",
    gender: "Female",
    caste: "ST — Scheduled Tribe",
    casteBenefitTaken: "Yes",
    joiningDate: "01 July 2014",
    email: "mary.lyngdoh@neepco.co.in",
    phone: "+91 94361 55901",
    permanentAddress: "Mawkhar Main Road, Shillong, Meghalaya – 793001",
    presentAddress: "Mawkhar Main Road, Shillong, Meghalaya – 793001",
    aadharNo: "9901-4412-8823",
    panNo: "MLYPS9910K",
    familyPlanningBenefit: "No",
    photoUrl: null,
    status: "Active",
    employeeType: "Regular",
    basicSalary: 108000,
    aparScore: "9.7 / 10",
    aparGrade: "Outstanding",
    dobDoc: { name: "Class 10 Board Certificate", type: "pdf", id: "DOC-DOB-9102", size: "1.1 MB" },
    aadharDoc: { name: "Aadhaar Card Copy", type: "pdf", id: "DOC-AADHAR-9102", size: "800 KB" },
    panDoc: { name: "PAN Card Copy", type: "pdf", id: "DOC-PAN-9102", size: "610 KB" },
    casteDoc: { name: "Meghalaya ST Certificate", type: "pdf", id: "DOC-CASTE-9102", size: "1.3 MB" },
    appointmentDoc: { name: "NEEPCO Appointment Order", type: "pdf", id: "DOC-APPT-9102", size: "2.0 MB" },
    permanentAddressDoc: { name: "ST Domicile Certificate", type: "pdf", id: "DOC-PRM-9102", size: "1.6 MB" },
    presentAddressDoc: { name: "Address Proof", type: "pdf", id: "DOC-PRS-9102", size: "1.0 MB" },
    dependants: [],
    educationalQualifications: [{ slNo: 1, degree: "B.Tech in Electronics & Instrumentation", institution: "NIT Meghalaya", passingYear: "2013", percentage: "86.0%", division: "First Class with Distinction", doc: { name: "B.Tech Degree", id: "DOC-EDU-9102", size: "3.1 MB" } }],
    promotionHistory: [{ orderNo: "NEEPCO/HR/PROM/2021/309", orderDate: "01 April 2021", fromGrade: "E5", toGrade: "E6", effectiveDate: "01 April 2021", sanctionedBy: "General Manager (HR)" }],
    placementHistory: [{ orderNo: "NEEPCO/HR/TRF/2020/220", postingStation: "Headquarters Office, Shillong", department: "Control & SCADA", duration: "01 Sept 2020 to Present", reportingOfficer: "Er. B. C. Das" }],
    aparRatings: [{ year: "2024-2025", score: "9.7 / 10", grade: "Outstanding", remark: "Led HQ SCADA upgrade." }],
    timeline: [{ id: "T-9102-1", date: "01-04-2021", type: "Promotion", title: "Promoted to E6 Senior Manager", detail: "Order #NEEPCO/HR/PROM/2021/309" }],
    auditLog: []
  }
};

export let EMPLOYEES_DATA = { ...INITIAL_EMPLOYEES_DATA };

export async function loginAuthAPI(role, username, password) {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, username, password })
    });

    if (res.ok) {
      return await res.json();
    } else {
      const err = await res.json();
      throw new Error(err.error || 'Authentication failed');
    }
  } catch (err) {
    if (err.message && err.message.includes('Invalid')) {
      throw err;
    }

    if (role === 'admin' || role === 'hr_admin') {
      const admin = ADMIN_USERS[username.trim()];
      if (admin && admin.password === password.trim()) {
        return {
          success: true,
          userType: 'hr_admin',
          role: admin.role,
          user: {
            username: admin.username,
            name: admin.name,
            role: admin.role,
            designation: admin.designation,
            officeId: admin.stationId,
            officeName: admin.stationName
          }
        };
      }
      throw new Error('Invalid HR Administrator credentials.');
    } else {
      const emp = EMPLOYEES_DATA[username.trim()];
      if (emp && emp.password === password.trim()) {
        return {
          success: true,
          userType: 'employee',
          role: 'employee',
          user: {
            employeeId: emp.empNo,
            empNo: emp.empNo,
            name: emp.name,
            designation: emp.designation,
            locationId: emp.locationId,
            locationName: emp.locationName,
            email: emp.email,
            department: emp.department
          },
          employee: emp
        };
      }
      throw new Error('Invalid Employee Number or Password.');
    }
  }
}

export async function fetchAdminOfficeEmployees(officeId = 'ALL', filters = {}) {
  try {
    const params = new URLSearchParams({ officeId, ...filters });
    const res = await fetch(`/api/admin/employees?${params.toString()}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Backend admin API offline, filtering locally:', err.message);
  }

  let filtered = Object.values(EMPLOYEES_DATA);
  if (officeId && officeId !== 'ALL') {
    filtered = filtered.filter(e => e.locationId === officeId);
  }
  if (filters.gender && filters.gender !== 'ALL') {
    filtered = filtered.filter(e => e.gender === filters.gender);
  }
  if (filters.caste && filters.caste !== 'ALL') {
    filtered = filtered.filter(e => e.caste && e.caste.includes(filters.caste));
  }
  if (filters.department && filters.department !== 'ALL') {
    filtered = filtered.filter(e => e.department === filters.department);
  }
  if (filters.search && filters.search.trim()) {
    const q = filters.search.trim().toLowerCase();
    filtered = filtered.filter(e => 
      e.empNo.toLowerCase().includes(q) ||
      e.name.toLowerCase().includes(q) ||
      e.panNo.toLowerCase().includes(q) ||
      e.department.toLowerCase().includes(q)
    );
  }

  return {
    officeId,
    count: filtered.length,
    totalPages: 1,
    currentPage: 1,
    pageSize: filtered.length,
    stats: {
      totalMatches: filtered.length,
      maleCount: filtered.filter(e => e.gender === 'Male').length,
      femaleCount: filtered.filter(e => e.gender === 'Female').length,
      stCount: filtered.filter(e => e.caste && e.caste.includes('ST')).length,
      scCount: filtered.filter(e => e.caste && e.caste.includes('SC')).length,
      obcCount: filtered.filter(e => e.caste && e.caste.includes('OBC')).length,
      generalCount: filtered.filter(e => e.caste && e.caste.includes('General')).length
    },
    employees: filtered
  };
}

export async function fetchMyEmployeeProfile(employeeId) {
  try {
    const res = await fetch(`/api/employee/me?employeeId=${employeeId}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Backend API offline, loading locally:', err.message);
  }
  return EMPLOYEES_DATA[employeeId] || EMPLOYEES_DATA["1024"];
}

export async function fetchEmployeesFromDB() {
  try {
    const res = await fetch('/api/employees');
    if (res.ok) {
      const data = await res.json();
      if (Object.keys(data).length > 0) {
        EMPLOYEES_DATA = data;
        return data;
      }
    }
  } catch (err) {
    console.warn('Backend API offline, using in-memory dataset:', err.message);
  }
  return EMPLOYEES_DATA;
}

export async function updateEmployeeRecord(empId, updatedFields, adminUser) {
  if (!EMPLOYEES_DATA[empId]) return false;

  const oldRecord = EMPLOYEES_DATA[empId];
  const now = new Date();
  const timeStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const newAuditEntries = [];
  Object.keys(updatedFields).forEach((key) => {
    if (oldRecord[key] !== undefined && JSON.stringify(oldRecord[key]) !== JSON.stringify(updatedFields[key])) {
      newAuditEntries.push({
        id: `A-LOG-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        timestamp: timeStr,
        updatedBy: `${adminUser.name} (${adminUser.designation})`,
        station: adminUser.officeName || adminUser.stationName || "NEEPCO Admin",
        field: key,
        oldValue: typeof oldRecord[key] === 'object' ? JSON.stringify(oldRecord[key]) : String(oldRecord[key]),
        newValue: typeof updatedFields[key] === 'object' ? JSON.stringify(updatedFields[key]) : String(updatedFields[key])
      });
    }
  });

  const updatedRecord = {
    ...oldRecord,
    ...updatedFields,
    auditLog: [...newAuditEntries, ...(oldRecord.auditLog || [])]
  };

  EMPLOYEES_DATA[empId] = updatedRecord;

  try {
    await fetch(`/api/employees/${empId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updatedFields, adminUser })
    });
  } catch (err) {
    console.warn('Backend API update failed, saved locally:', err.message);
  }

  return true;
}

export async function executePromotionWorkflow(empId, promotionData, adminUser) {
  const emp = EMPLOYEES_DATA[empId];
  if (!emp) return false;

  const now = new Date();
  const timeStr = now.toLocaleDateString();
  const timestampFull = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const orderNo = `NEEPCO/HR/PROM/${now.getFullYear()}/${Math.floor(100 + Math.random() * 900)}`;

  const newPromotion = {
    orderNo: orderNo,
    orderDate: timeStr,
    fromGrade: promotionData.fromGrade || emp.designation,
    toGrade: promotionData.toGrade,
    effectiveDate: promotionData.effectiveDate || timeStr,
    sanctionedBy: `${adminUser.name} (${adminUser.designation})`,
    documentAvailable: true
  };

  const updatedRecord = {
    ...emp,
    designation: promotionData.toGrade,
    promotionHistory: [newPromotion, ...(emp.promotionHistory || [])],
    timeline: [{ id: `T-PROM-${Date.now()}`, date: timeStr, type: "Promotion", title: `Promoted to ${promotionData.toGrade}`, detail: `Official System Order #${orderNo}` }, ...(emp.timeline || [])],
    auditLog: [{ id: `A-PROM-${Date.now()}`, timestamp: timestampFull, updatedBy: `${adminUser.name}`, station: adminUser.officeName || adminUser.stationName, field: "Promotion & Designation", oldValue: emp.designation, newValue: promotionData.toGrade }, ...(emp.auditLog || [])]
  };

  EMPLOYEES_DATA[empId] = updatedRecord;

  try {
    await fetch('/api/workflows/promotion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ empId, promotionData, adminUser })
    });
  } catch (err) {
    console.warn('Backend workflow failed, saved locally:', err.message);
  }

  return newPromotion;
}

export async function executeTransferWorkflow(empId, transferData, adminUser) {
  const emp = EMPLOYEES_DATA[empId];
  if (!emp) return false;

  const now = new Date();
  const timeStr = now.toLocaleDateString();
  const orderNo = `NEEPCO/HR/TRF/${now.getFullYear()}/${Math.floor(100 + Math.random() * 900)}`;

  const newPlacement = {
    orderNo: orderNo,
    postingStation: transferData.postingStation,
    department: transferData.department || emp.department,
    specializedSkillArea: transferData.specializedSkillArea || "Power Systems & Operations",
    specializedSkillSubArea: transferData.specializedSkillSubArea || "General Hydroelectric Operations",
    duration: `${timeStr} to Present`,
    reportingOfficer: transferData.reportingOfficer || "Executive Director (Operations)",
    documentAvailable: true
  };

  const updatedRecord = {
    ...emp,
    locationName: transferData.postingStation,
    placementHistory: [newPlacement, ...(emp.placementHistory || [])],
    presentPosting: { ...emp.presentPosting, station: transferData.postingStation, dateOfJoinCurrentPosting: timeStr },
    timeline: [{ id: `T-TRF-${Date.now()}`, date: timeStr, type: "Transfer", title: `Transferred to ${transferData.postingStation}`, detail: `Official Order #${orderNo}` }, ...(emp.timeline || [])]
  };

  EMPLOYEES_DATA[empId] = updatedRecord;

  try {
    await fetch('/api/workflows/transfer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ empId, transferData, adminUser })
    });
  } catch (err) {
    console.warn('Backend workflow failed, saved locally:', err.message);
  }

  return newPlacement;
}

export async function executeTrainingWorkflow(empId, trainingData, adminUser) {
  const emp = EMPLOYEES_DATA[empId];
  if (!emp) return false;

  const now = new Date();
  const timeStr = now.toLocaleDateString();
  const orderNo = `NEEPCO/TRG/${trainingData.type.includes('Foreign') ? 'FOREIGN' : 'DOM'}/${now.getFullYear()}/${Math.floor(10 + Math.random() * 90)}`;

  const newTraining = {
    orderNo: orderNo,
    courseTitle: trainingData.courseTitle,
    type: trainingData.type || "Domestic Training",
    institution: trainingData.institution,
    duration: trainingData.duration || "5 Days",
    location: trainingData.location,
    status: trainingData.status || "Sanctioned / In Progress",
    documentAvailable: true
  };

  const updatedRecord = {
    ...emp,
    trainingHistory: [newTraining, ...(emp.trainingHistory || [])],
    timeline: [{ id: `T-TRG-${Date.now()}`, date: timeStr, type: "Training", title: `Deputed for Training: ${trainingData.courseTitle}`, detail: `Sanction Order #${orderNo}` }, ...(emp.timeline || [])]
  };

  EMPLOYEES_DATA[empId] = updatedRecord;

  return newTraining;
}
