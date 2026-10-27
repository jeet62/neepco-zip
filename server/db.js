import { DatabaseSync as Database } from 'node:sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'neepco_hris.db');
const db = new Database(dbPath);

db.exec('PRAGMA journal_mode = WAL');

db.exec(`
  DROP TABLE IF EXISTS locations;
  DROP TABLE IF EXISTS admin_users;
  DROP TABLE IF EXISTS employees;

  CREATE TABLE locations (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    state TEXT NOT NULL
  );

  CREATE TABLE admin_users (
    username TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    designation TEXT NOT NULL,
    station_id TEXT NOT NULL,
    station_name TEXT NOT NULL
  );

  CREATE TABLE employees (
    emp_no TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    department TEXT NOT NULL,
    location_id TEXT NOT NULL,
    location_name TEXT NOT NULL,
    dob TEXT NOT NULL,
    gender TEXT NOT NULL,
    caste TEXT NOT NULL,
    caste_benefit_taken TEXT,
    joining_date TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    permanent_address TEXT NOT NULL,
    present_address TEXT NOT NULL,
    aadhar_no TEXT NOT NULL,
    pan_no TEXT NOT NULL,
    family_planning_benefit TEXT,
    photo_url TEXT,
    status TEXT DEFAULT 'Active',
    cadre TEXT NOT NULL,
    grade_code TEXT NOT NULL,
    grade TEXT NOT NULL,
    basic_salary INTEGER DEFAULT 80000,
    apar_score TEXT DEFAULT '9.2 / 10',
    apar_grade TEXT DEFAULT 'Outstanding',
    employee_type TEXT DEFAULT 'Regular',
    data_json TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS audit_logs (
    id TEXT PRIMARY KEY,
    emp_no TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    updated_by TEXT NOT NULL,
    station TEXT NOT NULL,
    field TEXT NOT NULL,
    old_value TEXT,
    new_value TEXT
  );
`);

export const HIERARCHY_STRUCTURE = [
  {
    cadre: "Executive Cadre",
    grades: [
      { code: "E9", title: "Executive Director", baseSalary: 180000, weight: 1 },
      { code: "E8", title: "Chief General Manager / General Manager", baseSalary: 150000, weight: 2 },
      { code: "E7", title: "Deputy General Manager", baseSalary: 125000, weight: 4 },
      { code: "E6", title: "Senior Manager", baseSalary: 105000, weight: 6 },
      { code: "E5", title: "Manager", baseSalary: 90000, weight: 8 },
      { code: "E4", title: "Deputy Manager", baseSalary: 80000, weight: 10 },
      { code: "E3", title: "Assistant Manager", baseSalary: 70000, weight: 12 },
      { code: "E2", title: "Engineer / Officer / Executive Trainee", baseSalary: 60000, weight: 16 },
      { code: "E1", title: "Assistant Engineer / Assistant Officer / Junior Executive", baseSalary: 50000, weight: 18 }
    ]
  },
  {
    cadre: "Supervisory Cadre",
    grades: [
      { code: "S3", title: "Senior Supervisor", baseSalary: 45000, weight: 4 },
      { code: "S2", title: "Supervisor", baseSalary: 38000, weight: 8 },
      { code: "S1", title: "Junior Supervisor", baseSalary: 32000, weight: 10 }
    ]
  },
  {
    cadre: "Non-Executive / Workmen",
    grades: [
      { code: "W8", title: "Special Grade Technician / Head Attendant", baseSalary: 30000, weight: 2 },
      { code: "W7", title: "Master Technician / Senior Driver", baseSalary: 28000, weight: 3 },
      { code: "W6", title: "Senior Technician / Selection Grade Clerk", baseSalary: 26000, weight: 4 },
      { code: "W5", title: "Technician Grade I / Senior Clerk", baseSalary: 24000, weight: 6 },
      { code: "W4", title: "Technician Grade II / Upper Division Clerk", baseSalary: 22000, weight: 8 },
      { code: "W3", title: "Technician Grade III / Lower Division Clerk", baseSalary: 20000, weight: 10 },
      { code: "W2", title: "Junior Technician / Assistant Attendant", baseSalary: 18000, weight: 12 },
      { code: "W1", title: "Attendant Grade I / Helper / Trainee Workman", baseSalary: 16000, weight: 14 }
    ]
  }
];

function seedDatabase() {
  const insertLocation = db.prepare('INSERT INTO locations (id, name, code, state) VALUES (?, ?, ?, ?)');
  const locations = [
    ["HQ_SHL", "Headquarters Office, Shillong", "SHL-HQ", "Meghalaya"],
    ["KOP_HEP", "Kopili Hydro Electric Plant, Umrongso", "KOP-HEP", "Assam"],
    ["RAN_HEP", "Ranganadi Hydro Electric Plant, Yazali", "RAN-HEP", "Arunachal Pradesh"],
    ["AGA_GTP", "Agartala Gas Turbine Power Plant, Ramchandra Nagar", "AGA-GTP", "Tripura"],
    ["KAM_HES", "Kameng Hydro Electric Station, West Kameng", "KAM-HES", "Arunachal Pradesh"],
    ["DOY_HES", "Doyang Hydro Electric Station, Wokha", "DOY-HES", "Nagaland"],
    ["KHA_HEP", "Khandong Hydro Electric Plant, Dima Hasao", "KHA-HEP", "Assam"],
    ["PAR_HES", "Pare Hydro Electric Plant, Doimukh", "PAR-HES", "Arunachal Pradesh"],
    ["TUI_HES", "Tuirial Hydro Electric Station, Aizawl", "TUI-HES", "Mizoram"]
  ];
  locations.forEach(loc => insertLocation.run(...loc));

  const insertAdmin = db.prepare('INSERT INTO admin_users (username, password, name, role, designation, station_id, station_name) VALUES (?, ?, ?, ?, ?, ?, ?)');
  const admins = [
    ["admin_shillong", "password123", "Shri H. K. Nath", "admin", "Senior HR Officer", "HQ_SHL", "Headquarters Office, Shillong"],
    ["admin_kameng", "password123", "Smt. L. Riba", "admin", "Manager (HR & Administration)", "KAM_HES", "Kameng Hydro Electric Station, West Kameng"],
    ["admin_ranganadi", "password123", "Shri B. K. Chutia", "admin", "Assistant Manager (HR)", "RAN_HEP", "Ranganadi Hydro Electric Plant, Yazali"],
    ["admin_kopili", "password123", "Shri D. C. Barman", "admin", "Manager (Personnel)", "KOP_HEP", "Kopili Hydro Electric Plant, Umrongso"],
    ["admin_doyang", "password123", "Shri T. Lotha", "admin", "Senior HR Executive", "DOY_HES", "Doyang Hydro Electric Station, Wokha"],
    ["admin_agartala", "password123", "Shri P. Debbarma", "admin", "Manager (HR & Administration)", "AGA_GTP", "Agartala Gas Turbine Power Plant"],
    ["superadmin", "password123", "Shri P. C. Sharma", "superadmin", "Chief General Manager (HR & Corporate Admin)", "ALL", "All NEEPCO Stations & Offices"]
  ];
  admins.forEach(adm => insertAdmin.run(...adm));

  const insertEmp = db.prepare(`
    INSERT INTO employees (
      emp_no, password, name, designation, department, location_id, location_name,
      dob, gender, caste, caste_benefit_taken, joining_date, email, phone,
      permanent_address, present_address, aadhar_no, pan_no, family_planning_benefit,
      photo_url, status, cadre, grade_code, grade, basic_salary, apar_score, apar_grade,
      employee_type, data_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const coreEmployees = [
    {
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
      casteBenefitTaken: "Yes",
      joiningDate: "12 May 2006",
      email: "rajesh.sharma@neepco.co.in",
      phone: "+91 94361 88412",
      permanentAddress: "House No. 42, Pine Ridge Colony, Upper Shillong, Meghalaya – 793005",
      presentAddress: "NEEPCO Executive Quarters, Type-V/B4, Brookeneck, Shillong – 793001",
      aadharNo: "4589-2104-9832",
      panNo: "ABCPS9481K",
      status: "Active",
      employeeType: "Regular",
      basicSalary: 145000,
      aparScore: "9.6 / 10",
      aparGrade: "Outstanding",
      dependants: [
        { id: "DEP-1", name: "Sunita Sharma", relation: "Spouse", gender: "Female", dob: "22 November 1985" },
        { id: "DEP-2", name: "Aarav Sharma", relation: "Son", gender: "Male", dob: "05 September 2012" }
      ],
      educationalQualifications: [
        { slNo: 1, degree: "B.Tech in Electrical Engineering", institution: "NIT Silchar", passingYear: "2004", percentage: "84.2%", division: "First Class" }
      ],
      promotionHistory: [
        { orderNo: "NEEPCO/HR/PROM/2022/412", orderDate: "01 April 2022", fromGrade: "E7", toGrade: "E8", effectiveDate: "01 April 2022", sanctionedBy: "Director (HR)" }
      ],
      placementHistory: [
        { orderNo: "NEEPCO/HR/TRF/2023/889", postingStation: "Headquarters Office, Shillong", department: "Hydro Engineering", duration: "15 Jan 2023 to Present", reportingOfficer: "Er. B. C. Das" }
      ],
      aparRatings: [{ year: "2024-2025", score: "9.6 / 10", grade: "Outstanding", remark: "Exceptional grid stability management." }]
    },
    {
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
      casteBenefitTaken: "No",
      joiningDate: "18 September 2003",
      email: "anita.roy@neepco.co.in",
      phone: "+91 94363 77102",
      permanentAddress: "Flat 302, Green View Apartments, Laitumkhrah, Shillong – 793003",
      presentAddress: "Flat 302, Green View Apartments, Laitumkhrah, Shillong – 793003",
      aadharNo: "8821-4401-1923",
      panNo: "AFTPR3329L",
      status: "Active",
      employeeType: "Regular",
      basicSalary: 128000,
      aparScore: "9.8 / 10",
      aparGrade: "Outstanding",
      dependants: [{ id: "DEP-5821-1", name: "Subir Roy", relation: "Spouse", gender: "Male", dob: "12 January 1976" }],
      educationalQualifications: [{ slNo: 1, degree: "Chartered Accountant (CA)", institution: "ICAI", passingYear: "2002", percentage: "First Attempt", division: "Fellow CA" }],
      promotionHistory: [{ orderNo: "NEEPCO/HR/PROM/2021/804", orderDate: "01 April 2021", fromGrade: "E6", toGrade: "E7", effectiveDate: "01 April 2021", sanctionedBy: "Director (Finance)" }],
      placementHistory: [{ orderNo: "NEEPCO/HR/TRF/2021/119", postingStation: "Headquarters Office, Shillong", department: "Finance & Accounts", duration: "01 April 2021 to Present", reportingOfficer: "Shri S. K. Mitra" }],
      aparRatings: [{ year: "2024-2025", score: "9.8 / 10", grade: "Outstanding", remark: "Flawless CAG audit clearance." }]
    },
    {
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
      status: "Active",
      employeeType: "Regular",
      basicSalary: 108000,
      aparScore: "9.7 / 10",
      aparGrade: "Outstanding",
      dependants: [],
      educationalQualifications: [{ slNo: 1, degree: "B.Tech in Electronics & Instrumentation", institution: "NIT Meghalaya", passingYear: "2013", percentage: "86.0%", division: "First Class" }],
      promotionHistory: [{ orderNo: "NEEPCO/HR/PROM/2021/309", orderDate: "01 April 2021", fromGrade: "E5", toGrade: "E6", effectiveDate: "01 April 2021", sanctionedBy: "General Manager (HR)" }],
      placementHistory: [{ orderNo: "NEEPCO/HR/TRF/2020/220", postingStation: "Headquarters Office, Shillong", department: "Control & SCADA", duration: "01 Sept 2020 to Present", reportingOfficer: "Er. B. C. Das" }],
      aparRatings: [{ year: "2024-2025", score: "9.7 / 10", grade: "Outstanding", remark: "Led HQ SCADA upgrade." }]
    },
    {
      empNo: "7392",
      password: "password123",
      name: "Er. Vikram Singh Tanti",
      cadre: "Executive Cadre",
      gradeCode: "E5",
      grade: "E5 — Manager",
      designation: "Executive Engineer",
      department: "Civil Hydro Design & Dam Maintenance",
      locationId: "KAM_HES",
      locationName: "Kameng Hydro Electric Station, West Kameng",
      dob: "29 May 1988",
      gender: "Male",
      caste: "ST — Scheduled Tribe",
      casteBenefitTaken: "Yes",
      joiningDate: "10 November 2012",
      email: "vikram.tanti@neepco.co.in",
      phone: "+91 94022 11984",
      permanentAddress: "Village Bhalukpong, West Kameng District, Arunachal Pradesh – 790114",
      presentAddress: "NEEPCO Township Quarter C-12, Kameng HEP Site, Arunachal Pradesh – 790114",
      aadharNo: "7741-9920-3381",
      panNo: "BKSPS1104M",
      status: "Active",
      employeeType: "Regular",
      basicSalary: 92000,
      aparScore: "9.3 / 10",
      aparGrade: "Outstanding",
      dependants: [{ id: "DEP-7392-1", name: "Maya Tanti", relation: "Spouse", gender: "Female", dob: "14 April 1990" }],
      educationalQualifications: [{ slNo: 1, degree: "B.E. in Civil Engineering", institution: "Jorhat Engineering College", passingYear: "2011", percentage: "81.0%", division: "First Class" }],
      promotionHistory: [{ orderNo: "NEEPCO/HR/PROM/2020/221", orderDate: "01 April 2020", fromGrade: "E4", toGrade: "E5", effectiveDate: "01 April 2020", sanctionedBy: "General Manager (HR)" }],
      placementHistory: [{ orderNo: "NEEPCO/HR/TRF/2019/501", postingStation: "Kameng Hydro Electric Station", department: "Civil Hydro Design & Dam Maintenance", duration: "01 May 2019 to Present", reportingOfficer: "Shri T. K. Sarma" }],
      aparRatings: [{ year: "2024-2025", score: "9.3 / 10", grade: "Outstanding", remark: "Excellent dam maintenance." }]
    },
    {
      empNo: "8410",
      password: "password123",
      name: "Smt. Sunita Tanti",
      cadre: "Executive Cadre",
      gradeCode: "E6",
      grade: "E6 — Senior Manager",
      designation: "Senior Manager",
      department: "Hydro Engineering & Power Generation",
      locationId: "RAN_HEP",
      locationName: "Ranganadi Hydro Electric Plant, Yazali",
      dob: "18 June 1986",
      gender: "Female",
      caste: "ST — Scheduled Tribe",
      casteBenefitTaken: "Yes",
      joiningDate: "14 August 2010",
      email: "sunita.tanti@neepco.co.in",
      phone: "+91 94360 44321",
      permanentAddress: "Sector 4, Yazali Township, Lower Subansiri, Arunachal Pradesh – 791119",
      presentAddress: "NEEPCO Officers Colony, Yazali Site, Arunachal Pradesh – 791119",
      aadharNo: "3310-8842-1092",
      panNo: "STPRS4412P",
      status: "Active",
      employeeType: "Regular",
      basicSalary: 106000,
      aparScore: "9.5 / 10",
      aparGrade: "Outstanding",
      dependants: [{ id: "DEP-8410-1", name: "Rohan Tanti", relation: "Son", gender: "Male", dob: "10 March 2014" }],
      educationalQualifications: [{ slNo: 1, degree: "B.Tech in Electrical Engineering", institution: "NERIST Itanagar", passingYear: "2008", percentage: "82.5%", division: "First Class" }],
      promotionHistory: [{ orderNo: "NEEPCO/HR/PROM/2023/102", orderDate: "01 April 2023", fromGrade: "E5", toGrade: "E6", effectiveDate: "01 April 2023", sanctionedBy: "Director (HR)" }],
      placementHistory: [{ orderNo: "NEEPCO/HR/TRF/2018/402", postingStation: "Ranganadi Hydro Electric Plant, Yazali", department: "Hydro Engineering & Power Generation", duration: "10 June 2018 to Present", reportingOfficer: "Er. P. K. Hazarika" }],
      aparRatings: [{ year: "2024-2025", score: "9.5 / 10", grade: "Outstanding", remark: "Superior SCADA integration." }]
    },
    {
      empNo: "4312",
      password: "password123",
      name: "Er. Priya Devi",
      cadre: "Executive Cadre",
      gradeCode: "E3",
      grade: "E3 — Assistant Manager",
      designation: "Assistant Executive Engineer",
      department: "Electrical Maintenance & Substation",
      locationId: "KOP_HEP",
      locationName: "Kopili Hydro Electric Plant, Umrongso",
      dob: "12 March 1993",
      gender: "Female",
      caste: "SC — Scheduled Caste",
      casteBenefitTaken: "Yes",
      joiningDate: "15 November 2017",
      email: "priya.devi@neepco.co.in",
      phone: "+91 94350 22104",
      permanentAddress: "House 18, MG Road, Nagaon, Assam – 782001",
      presentAddress: "Kopili HEP Officers Colony, Umrongso, Assam – 788931",
      aadharNo: "4410-7782-9901",
      panNo: "PDVPS4419M",
      status: "Active",
      employeeType: "Regular",
      basicSalary: 72000,
      aparScore: "9.2 / 10",
      aparGrade: "Outstanding",
      dependants: [],
      educationalQualifications: [{ slNo: 1, degree: "B.Tech in Mechanical Engineering", institution: "AEC Guwahati", passingYear: "2016", percentage: "83.1%", division: "First Class" }],
      promotionHistory: [],
      placementHistory: [{ orderNo: "NEEPCO/HR/TRF/2017/801", postingStation: "Kopili Hydro Electric Plant, Umrongso", department: "Electrical Maintenance & Substation", duration: "15 Nov 2017 to Present", reportingOfficer: "Shri R. K. Dutta" }],
      aparRatings: [{ year: "2024-2025", score: "9.2 / 10", grade: "Outstanding", remark: "High efficiency maintenance." }]
    }
  ];

  const firstNamesMale = [
    "Bipul", "Debashis", "Kento", "Tshering", "Imtitemsu", "Zonunsanga", "Hemanta", "Pradip", "Subhash", "Dipankar",
    "Ranjan", "Sanjoy", "Taba", "Lobsang", "Tsering", "Dhaneswar", "Manoj", "Arup", "Kangkan", "Tarun",
    "Pranab", "Naveen", "Gautam", "Alok", "Suraj", "Amitabh", "Jiten", "Nongthombam", "Chongtham", "Bikash",
    "Anirban", "Siddharth", "Manash", "Nayan", "Partha", "Bhaskar", "Joydeep", "Sourav", "Debojit", "Diganta",
    "Binod", "Haren", "Kamal", "Lalit", "Mridul", "Nilim", "Pankaj", "Ratan", "Satyen", "Utpal"
  ];

  const firstNamesFemale = [
    "Ibakordor", "Daphisha", "Wanpli", "Nangsal", "Pema", "Yomgam", "Kenei", "Toshimanen", "Lalrinmawii", "Malsawmtluangi",
    "Rupali", "Madhuri", "Mousumi", "Barnali", "Pallabi", "Nabanita", "Sangeeta", "Meenakshi", "Pooja", "Dipali",
    "Ananya", "Rinchen", "Kavita", "Sarmistha", "Bandana", "Joyshree", "Bhaswati", "Kakoli", "Swapna", "Runu",
    "Sutapa", "Nilakshi", "Pranati", "Geetanjali", "Indrani", "Monika", "Lipika", "Shikha", "Rima", "Jharna",
    "Anamika", "Chitralekha", "Devika", "Gitashree", "Haimanti", "Kalyani", "Maitreyi", "Pratibha", "Snigdha", "Tanushree"
  ];

  const lastNames = [
    "Lyngdoh", "Nongrum", "Kharbhih", "Marbaniang", "Syiem", "Mukhim", "Sutnga", "Riba", "Basar", "Ete",
    "Taram", "Dorjee", "Wangsu", "Ao", "Jamir", "Kikon", "Lotha", "Ralte", "Zadeng", "Sailo",
    "Brahma", "Boro", "Rabha", "Saikia", "Gogoi", "Baruah", "Hazarika", "Das", "Deka", "Choudhury",
    "Bhattacharjee", "Debnath", "Chakraborty", "Sarma", "Dutta", "Nath", "Roy", "Sharma", "Singh", "Paul",
    "Barman", "Chutia", "Medhi", "Daimary", "Narzary", "Sangma", "Marak", "Momin", "Shadap", "Pariat"
  ];

  const departmentList = [
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

  const categories = [
    "General / Unreserved",
    "ST — Scheduled Tribe",
    "SC — Scheduled Caste",
    "OBC — Other Backward Class"
  ];

  const statuses = [
    "Active", "Active", "Active", "Active", "Active", "Active", "Active", "Active",
    "On Leave", "Transferred", "Retired", "Separated"
  ];

  const empTypes = ["Regular", "Regular", "Regular", "Regular", "Contract", "Executive Trainee", "Trainee"];
  const aparGrades = ["Outstanding", "Very Good", "Good", "Average", "Below Average"];

  const gradePool = [];
  HIERARCHY_STRUCTURE.forEach(cadreObj => {
    cadreObj.grades.forEach(g => {
      for (let i = 0; i < g.weight; i++) {
        gradePool.push({
          cadre: cadreObj.cadre,
          gradeCode: g.code,
          grade: `${g.code} — ${g.title}`,
          designation: g.title.split(' / ')[0],
          baseSalary: g.baseSalary
        });
      }
    });
  });

  const stationDistributions = [
    { id: "HQ_SHL", name: "Headquarters Office, Shillong", targetCount: 130 },
    { id: "KOP_HEP", name: "Kopili Hydro Electric Plant, Umrongso", targetCount: 105 },
    { id: "RAN_HEP", name: "Ranganadi Hydro Electric Plant, Yazali", targetCount: 105 },
    { id: "AGA_GTP", name: "Agartala Gas Turbine Power Plant, Ramchandra Nagar", targetCount: 105 },
    { id: "KAM_HES", name: "Kameng Hydro Electric Station, West Kameng", targetCount: 110 },
    { id: "DOY_HES", name: "Doyang Hydro Electric Station, Wokha", targetCount: 105 },
    { id: "KHA_HEP", name: "Khandong Hydro Electric Plant, Dima Hasao", targetCount: 105 },
    { id: "PAR_HES", name: "Pare Hydro Electric Plant, Doimukh", targetCount: 105 },
    { id: "TUI_HES", name: "Tuirial Hydro Electric Station, Aizawl", targetCount: 105 }
  ];

  let currentEmpNo = 2001;

  coreEmployees.forEach(emp => {
    insertEmp.run(
      emp.empNo,
      emp.password,
      emp.name,
      emp.designation,
      emp.department,
      emp.locationId,
      emp.locationName,
      emp.dob,
      emp.gender,
      emp.caste,
      emp.casteBenefitTaken || '',
      emp.joiningDate,
      emp.email,
      emp.phone,
      emp.permanentAddress,
      emp.presentAddress,
      emp.aadharNo,
      emp.panNo,
      'No',
      '',
      emp.status || 'Active',
      emp.cadre,
      emp.gradeCode,
      emp.grade,
      emp.basicSalary,
      emp.aparScore,
      emp.aparGrade,
      emp.employeeType,
      JSON.stringify(emp)
    );
  });

  stationDistributions.forEach(stn => {
    const needed = stn.targetCount;
    for (let i = 0; i < needed; i++) {
      const isMale = (i % 2 === 0);
      const gender = isMale ? "Male" : "Female";
      const fn = isMale ? firstNamesMale[(i * 3 + currentEmpNo) % firstNamesMale.length] : firstNamesFemale[(i * 3 + currentEmpNo) % firstNamesFemale.length];
      const ln = lastNames[(i * 7 + currentEmpNo) % lastNames.length];
      const fullName = (gender === "Female" ? (i % 4 === 0 ? "Dr. " : "Smt. ") : (i % 4 === 0 ? "Er. " : "Shri ")) + fn + " " + ln;
      
      const gradeSelection = gradePool[(i * 11 + currentEmpNo) % gradePool.length];
      const dept = departmentList[(i * 5 + currentEmpNo) % departmentList.length];
      const caste = categories[(i + (isMale ? 1 : 2)) % categories.length];
      const status = statuses[(i * 3) % statuses.length];
      const empType = empTypes[(i * 2) % empTypes.length];
      const aparG = aparGrades[(i + currentEmpNo) % aparGrades.length];
      const aparS = aparG === "Outstanding" ? "9.5 / 10" : (aparG === "Very Good" ? "8.7 / 10" : (aparG === "Good" ? "7.6 / 10" : (aparG === "Average" ? "6.4 / 10" : "5.1 / 10")));

      const birthYear = 1968 + (i % 30);
      const birthMonth = 1 + (i % 12);
      const birthDay = 1 + (i % 28);
      const dobStr = `${birthDay < 10 ? '0' + birthDay : birthDay}-${birthMonth < 10 ? '0' + birthMonth : birthMonth}-${birthYear}`;
      
      const joinYear = birthYear + 22 + (i % 6);
      const joinMonth = 1 + ((i * 2) % 12);
      const joinDay = 1 + ((i * 3) % 28);
      const joinStr = `${joinDay < 10 ? '0' + joinDay : joinDay}-${joinMonth < 10 ? '0' + joinMonth : joinMonth}-${joinYear}`;

      const empIdStr = String(currentEmpNo++);
      const emailStr = `${fn.toLowerCase()}.${ln.toLowerCase()}${empIdStr.slice(-2)}@neepco.co.in`;
      const phoneStr = `+91 ${94000 + (currentEmpNo % 5000)} ${String(10000 + (currentEmpNo * 19) % 90000)}`;
      const aadharStr = `${3000 + (currentEmpNo % 6000)}-${4000 + ((currentEmpNo * 3) % 5000)}-${5000 + ((currentEmpNo * 7) % 4000)}`;
      const panStr = `${ln.slice(0, 3).toUpperCase()}PS${1000 + (currentEmpNo % 9000)}K`;

      const empObj = {
        empNo: empIdStr,
        password: "password123",
        name: fullName,
        cadre: gradeSelection.cadre,
        gradeCode: gradeSelection.gradeCode,
        grade: gradeSelection.grade,
        designation: gradeSelection.designation,
        department: dept,
        locationId: stn.id,
        locationName: stn.name,
        dob: dobStr,
        gender: gender,
        caste: caste,
        casteBenefitTaken: caste.includes("ST") || caste.includes("SC") ? "Yes" : "No",
        joiningDate: joinStr,
        email: emailStr,
        phone: phoneStr,
        permanentAddress: `House No. ${10 + (i % 90)}, Ward ${1 + (i % 8)}, ${stn.name}`,
        presentAddress: `NEEPCO Staff Quarters Type-${String.fromCharCode(65 + (i % 5))}-${1 + (i % 25)}, ${stn.name}`,
        aadharNo: aadharStr,
        panNo: panStr,
        status: status,
        employeeType: empType,
        basicSalary: gradeSelection.baseSalary + (i % 6) * 1500,
        aparScore: aparS,
        aparGrade: aparG,
        dependants: [
          { id: `DEP-${empIdStr}-1`, name: isMale ? `Smt. Kamala ${ln}` : `Shri P. ${ln}`, relation: "Spouse", gender: isMale ? "Female" : "Male", dob: `15-08-${birthYear + 1}` }
        ],
        educationalQualifications: [
          { slNo: 1, degree: `Degree / Diploma in ${dept.split(' ')[0]}`, institution: "NIT / State Technical Board", passingYear: String(joinYear - 1), percentage: "79.2%", division: "First Class" }
        ],
        promotionHistory: joinYear < 2019 ? [
          { orderNo: `NEEPCO/HR/PROM/${joinYear + 5}/${100 + (i % 800)}`, orderDate: `01-04-${joinYear + 5}`, fromGrade: "Previous Grade", toGrade: gradeSelection.gradeCode, effectiveDate: `01-04-${joinYear + 5}`, sanctionedBy: "Director (HR)" }
        ] : [],
        placementHistory: [
          { orderNo: `NEEPCO/HR/TRF/${joinYear}/${100 + (i % 800)}`, postingStation: stn.name, department: dept, duration: `${joinStr} to Present`, reportingOfficer: "General Manager (Operations)" }
        ],
        aparRatings: [{ year: "2024-2025", score: aparS, grade: aparG, remark: "Annual assessment logged in records." }]
      };

      insertEmp.run(
        empObj.empNo,
        empObj.password,
        empObj.name,
        empObj.designation,
        empObj.department,
        empObj.locationId,
        empObj.locationName,
        empObj.dob,
        empObj.gender,
        empObj.caste,
        empObj.casteBenefitTaken,
        empObj.joiningDate,
        empObj.email,
        empObj.phone,
        empObj.permanentAddress,
        empObj.presentAddress,
        empObj.aadharNo,
        empObj.panNo,
        'No',
        '',
        empObj.status,
        empObj.cadre,
        empObj.gradeCode,
        empObj.grade,
        empObj.basicSalary,
        empObj.aparScore,
        empObj.aparGrade,
        empObj.employeeType,
        JSON.stringify(empObj)
      );
    }
  });
}

seedDatabase();

export default db;
