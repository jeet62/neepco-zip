import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  try {
    const row = db.prepare('SELECT COUNT(*) as count FROM employees').get();
    res.json({ status: 'ok', database: 'connected', totalEmployees: row.count });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { role, username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username/Employee Number and Password are required.' });
    }

    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    if (role === 'admin' || role === 'hr_admin') {
      const admin = db.prepare('SELECT * FROM admin_users WHERE username = ? AND password = ?').get(trimmedUser, trimmedPass);
      if (!admin) {
        return res.status(401).json({ error: 'Invalid HR Administrator credentials.' });
      }

      return res.json({
        success: true,
        userType: 'hr_admin',
        role: admin.role,
        user: {
          username: admin.username,
          name: admin.name,
          role: admin.role,
          designation: admin.designation,
          officeId: admin.station_id,
          officeName: admin.station_name
        }
      });
    } else {
      const empRow = db.prepare('SELECT data_json FROM employees WHERE emp_no = ? AND password = ?').get(trimmedUser, trimmedPass);
      if (!empRow) {
        return res.status(401).json({ error: 'Invalid Employee Number or Password.' });
      }

      const emp = JSON.parse(empRow.data_json);
      return res.json({
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
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/locations', (req, res) => {
  try {
    const locations = db.prepare('SELECT * FROM locations').all();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/employee/me', (req, res) => {
  try {
    const { employeeId } = req.query;
    if (!employeeId) {
      return res.status(400).json({ error: 'Employee ID is required' });
    }

    const row = db.prepare('SELECT data_json FROM employees WHERE emp_no = ?').get(employeeId);
    if (!row) {
      return res.status(404).json({ error: 'Employee record not found' });
    }

    res.json(JSON.parse(row.data_json));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/admin/employees', (req, res) => {
  try {
    const {
      officeId = 'ALL',
      search = '',
      gender = '',
      genders = '',
      caste = '',
      categories = '',
      cadre = '',
      cadres = '',
      gradeCode = '',
      gradeCodes = '',
      department = '',
      departments = '',
      designation = '',
      designations = '',
      station = '',
      stations = '',
      status = '',
      statuses = '',
      aparGrade = '',
      aparGrades = '',
      employeeType = '',
      employeeTypes = '',
      sortBy = 'empNo',
      sortOrder = 'asc',
      page = '1',
      pageSize = '25'
    } = req.query;

    let query = 'SELECT data_json, emp_no, name, cadre, grade_code, designation, department, location_id, gender, caste, status, apar_grade FROM employees WHERE 1=1';
    const params = [];

    if (officeId && officeId !== 'ALL') {
      query += ' AND location_id = ?';
      params.push(officeId);
    }

    const rows = db.prepare(query).all(...params);
    let filteredEmployees = rows.map(r => JSON.parse(r.data_json));

    const selectedGenders = (genders || gender || '').split(',').map(s => s.trim()).filter(Boolean);
    if (selectedGenders.length > 0 && !selectedGenders.includes('ALL')) {
      filteredEmployees = filteredEmployees.filter(e => selectedGenders.includes(e.gender));
    }

    const selectedCategories = (categories || caste || '').split(',').map(s => s.trim()).filter(Boolean);
    if (selectedCategories.length > 0 && !selectedCategories.includes('ALL')) {
      filteredEmployees = filteredEmployees.filter(e => 
        selectedCategories.some(cat => e.caste && e.caste.includes(cat.split(' ')[0]))
      );
    }

    const selectedCadres = (cadres || cadre || '').split(',').map(s => s.trim()).filter(Boolean);
    if (selectedCadres.length > 0 && !selectedCadres.includes('ALL')) {
      filteredEmployees = filteredEmployees.filter(e => 
        selectedCadres.some(c => e.cadre && (e.cadre.includes(c) || c.includes(e.cadre)))
      );
    }

    const selectedGrades = (gradeCodes || gradeCode || '').split(',').map(s => s.trim()).filter(Boolean);
    if (selectedGrades.length > 0 && !selectedGrades.includes('ALL')) {
      filteredEmployees = filteredEmployees.filter(e => selectedGrades.includes(e.gradeCode));
    }

    const selectedDepts = (departments || department || '').split(',').map(s => s.trim()).filter(Boolean);
    if (selectedDepts.length > 0 && !selectedDepts.includes('ALL')) {
      filteredEmployees = filteredEmployees.filter(e => 
        selectedDepts.some(dept => e.department && (e.department.includes(dept) || dept.includes(e.department)))
      );
    }

    const selectedDesigs = (designations || designation || '').split(',').map(s => s.trim()).filter(Boolean);
    if (selectedDesigs.length > 0 && !selectedDesigs.includes('ALL')) {
      filteredEmployees = filteredEmployees.filter(e => 
        selectedDesigs.some(desig => e.designation && e.designation.toLowerCase().includes(desig.toLowerCase()))
      );
    }

    const selectedStations = (stations || station || '').split(',').map(s => s.trim()).filter(Boolean);
    if (selectedStations.length > 0 && !selectedStations.includes('ALL') && officeId === 'ALL') {
      filteredEmployees = filteredEmployees.filter(e => selectedStations.includes(e.locationId));
    }

    const selectedStatuses = (statuses || status || '').split(',').map(s => s.trim()).filter(Boolean);
    if (selectedStatuses.length > 0 && !selectedStatuses.includes('ALL')) {
      filteredEmployees = filteredEmployees.filter(e => selectedStatuses.includes(e.status || 'Active'));
    }

    const selectedApar = (aparGrades || aparGrade || '').split(',').map(s => s.trim()).filter(Boolean);
    if (selectedApar.length > 0 && !selectedApar.includes('ALL')) {
      filteredEmployees = filteredEmployees.filter(e => 
        selectedApar.includes(e.aparGrade) || (e.aparRatings && e.aparRatings.some(a => selectedApar.includes(a.grade)))
      );
    }

    const selectedEmpTypes = (employeeTypes || employeeType || '').split(',').map(s => s.trim()).filter(Boolean);
    if (selectedEmpTypes.length > 0 && !selectedEmpTypes.includes('ALL')) {
      filteredEmployees = filteredEmployees.filter(e => selectedEmpTypes.includes(e.employeeType || 'Regular'));
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      filteredEmployees = filteredEmployees.filter(emp => 
        (emp.empNo && emp.empNo.toLowerCase().includes(q)) ||
        (emp.name && emp.name.toLowerCase().includes(q)) ||
        (emp.panNo && emp.panNo.toLowerCase().includes(q)) ||
        (emp.aadharNo && emp.aadharNo.toLowerCase().includes(q)) ||
        (emp.department && emp.department.toLowerCase().includes(q)) ||
        (emp.designation && emp.designation.toLowerCase().includes(q)) ||
        (emp.locationName && emp.locationName.toLowerCase().includes(q)) ||
        (emp.cadre && emp.cadre.toLowerCase().includes(q)) ||
        (emp.gradeCode && emp.gradeCode.toLowerCase().includes(q)) ||
        (emp.grade && emp.grade.toLowerCase().includes(q))
      );
    }

    const isDesc = sortOrder.toLowerCase() === 'desc';
    filteredEmployees.sort((a, b) => {
      let valA = a[sortBy] || '';
      let valB = b[sortBy] || '';

      if (sortBy === 'empNo') {
        const numA = parseInt(valA, 10) || 0;
        const numB = parseInt(valB, 10) || 0;
        return isDesc ? numB - numA : numA - numB;
      }

      if (sortBy === 'gradeCode') {
        const rank = (code) => {
          if (!code) return 0;
          if (code.startsWith('E')) return 100 + parseInt(code.slice(1), 10);
          if (code.startsWith('S')) return 50 + parseInt(code.slice(1), 10);
          if (code.startsWith('W')) return 10 + parseInt(code.slice(1), 10);
          return 0;
        };
        const rA = rank(a.gradeCode);
        const rB = rank(b.gradeCode);
        return isDesc ? rA - rB : rB - rA;
      }

      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (valA < valB) return isDesc ? 1 : -1;
      if (valA > valB) return isDesc ? -1 : 1;
      return 0;
    });

    const totalCount = filteredEmployees.length;
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const size = Math.max(1, parseInt(pageSize, 10) || 25);
    const totalPages = Math.ceil(totalCount / size) || 1;
    const startIndex = (pageNum - 1) * size;
    const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + size);

    const stats = {
      totalMatches: totalCount,
      maleCount: filteredEmployees.filter(e => e.gender === 'Male').length,
      femaleCount: filteredEmployees.filter(e => e.gender === 'Female').length,
      stCount: filteredEmployees.filter(e => e.caste && e.caste.includes('ST')).length,
      scCount: filteredEmployees.filter(e => e.caste && e.caste.includes('SC')).length,
      obcCount: filteredEmployees.filter(e => e.caste && e.caste.includes('OBC')).length,
      generalCount: filteredEmployees.filter(e => e.caste && e.caste.includes('General')).length,
      executiveCount: filteredEmployees.filter(e => e.cadre && e.cadre.includes('Executive')).length,
      supervisoryCount: filteredEmployees.filter(e => e.cadre && e.cadre.includes('Supervisory')).length,
      workmenCount: filteredEmployees.filter(e => e.cadre && e.cadre.includes('Workmen')).length
    };

    res.json({
      officeId,
      count: totalCount,
      totalPages,
      currentPage: pageNum,
      pageSize: size,
      stats,
      employees: paginatedEmployees
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/employees', (req, res) => {
  try {
    const rows = db.prepare('SELECT data_json FROM employees ORDER BY emp_no ASC').all();
    const employeesMap = {};
    rows.forEach(r => {
      const parsed = JSON.parse(r.data_json);
      employeesMap[parsed.empNo] = parsed;
    });
    res.json(employeesMap);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/employees/:empNo', (req, res) => {
  try {
    const { empNo } = req.params;
    const row = db.prepare('SELECT data_json FROM employees WHERE emp_no = ?').get(empNo);
    if (!row) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(JSON.parse(row.data_json));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/employees/:empNo', (req, res) => {
  try {
    const { empNo } = req.params;
    const { updatedFields, adminUser } = req.body;

    if (!adminUser) {
      return res.status(403).json({ error: 'Authorization error: HR Administrator identity required.' });
    }

    const row = db.prepare('SELECT location_id, data_json FROM employees WHERE emp_no = ?').get(empNo);
    if (!row) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const adminOffice = adminUser.officeId || adminUser.stationId;
    if (adminUser.role !== 'superadmin' && adminOffice !== 'ALL' && adminOffice !== row.location_id) {
      return res.status(403).json({ 
        error: `Permission Denied: HR Administrator from ${adminOffice} cannot modify records for office ${row.location_id}.`
      });
    }

    const oldRecord = JSON.parse(row.data_json);
    const now = new Date();
    const timeStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newAuditEntries = [];
    const insertAudit = db.prepare('INSERT INTO audit_logs (id, emp_no, timestamp, updated_by, station, field, old_value, new_value) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');

    Object.keys(updatedFields).forEach((key) => {
      if (oldRecord[key] !== undefined && JSON.stringify(oldRecord[key]) !== JSON.stringify(updatedFields[key])) {
        const auditId = `A-LOG-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
        const updatedByStr = `${adminUser.name} (${adminUser.designation})`;
        const stationStr = adminUser.officeName || adminUser.stationName || 'NEEPCO Admin';
        const oldValStr = typeof oldRecord[key] === 'object' ? JSON.stringify(oldRecord[key]) : String(oldRecord[key]);
        const newValStr = typeof updatedFields[key] === 'object' ? JSON.stringify(updatedFields[key]) : String(updatedFields[key]);

        newAuditEntries.push({
          id: auditId,
          timestamp: timeStr,
          updatedBy: updatedByStr,
          station: stationStr,
          field: key,
          oldValue: oldValStr,
          newValue: newValStr
        });

        insertAudit.run(auditId, empNo, timeStr, updatedByStr, stationStr, key, oldValStr, newValStr);
      }
    });

    const updatedRecord = {
      ...oldRecord,
      ...updatedFields,
      auditLog: [...newAuditEntries, ...(oldRecord.auditLog || [])]
    };

    const updateStmt = db.prepare(`
      UPDATE employees SET
        name = ?,
        designation = ?,
        department = ?,
        location_id = ?,
        location_name = ?,
        dob = ?,
        gender = ?,
        caste = ?,
        caste_benefit_taken = ?,
        joining_date = ?,
        email = ?,
        phone = ?,
        permanent_address = ?,
        present_address = ?,
        aadhar_no = ?,
        pan_no = ?,
        family_planning_benefit = ?,
        status = ?,
        cadre = ?,
        grade_code = ?,
        grade = ?,
        basic_salary = ?,
        apar_score = ?,
        apar_grade = ?,
        employee_type = ?,
        data_json = ?
      WHERE emp_no = ?
    `);

    updateStmt.run(
      updatedRecord.name,
      updatedRecord.designation,
      updatedRecord.department,
      updatedRecord.locationId,
      updatedRecord.locationName,
      updatedRecord.dob,
      updatedRecord.gender,
      updatedRecord.caste,
      updatedRecord.casteBenefitTaken || '',
      updatedRecord.joiningDate,
      updatedRecord.email,
      updatedRecord.phone,
      updatedRecord.permanentAddress,
      updatedRecord.presentAddress,
      updatedRecord.aadharNo,
      updatedRecord.panNo,
      updatedRecord.familyPlanningBenefit || '',
      updatedRecord.status || 'Active',
      updatedRecord.cadre || 'Executive Cadre',
      updatedRecord.gradeCode || 'E4',
      updatedRecord.grade || 'E4 — Deputy Manager',
      updatedRecord.basicSalary || 80000,
      updatedRecord.aparScore || '9.2 / 10',
      updatedRecord.aparGrade || 'Outstanding',
      updatedRecord.employeeType || 'Regular',
      JSON.stringify(updatedRecord),
      empNo
    );

    res.json({ success: true, employee: updatedRecord });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/workflows/promotion', (req, res) => {
  try {
    const { empId, promotionData, adminUser } = req.body;
    if (!adminUser) return res.status(403).json({ error: 'HR Administrator authorization required.' });

    const row = db.prepare('SELECT location_id, data_json FROM employees WHERE emp_no = ?').get(empId);
    if (!row) return res.status(404).json({ error: 'Employee not found' });

    const adminOffice = adminUser.officeId || adminUser.stationId;
    if (adminUser.role !== 'superadmin' && adminOffice !== 'ALL' && adminOffice !== row.location_id) {
      return res.status(403).json({ error: `Permission Denied: HR Administrator from ${adminOffice} cannot promote employees at ${row.location_id}.` });
    }

    const emp = JSON.parse(row.data_json);
    const now = new Date();
    const timeStr = now.toLocaleDateString();
    const timestampFull = timeStr + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const orderNo = `NEEPCO/HR/PROM/${now.getFullYear()}/${Math.floor(100 + Math.random() * 900)}`;

    const newPromotion = {
      orderNo,
      orderDate: timeStr,
      fromGrade: promotionData.fromGrade || emp.designation,
      toGrade: promotionData.toGrade,
      effectiveDate: promotionData.effectiveDate || timeStr,
      sanctionedBy: `${adminUser.name} (${adminUser.designation})`,
      documentAvailable: true
    };

    const updatedEmp = {
      ...emp,
      designation: promotionData.toGrade,
      promotionHistory: [newPromotion, ...(emp.promotionHistory || [])],
      timeline: [{ id: `T-PROM-${Date.now()}`, date: timeStr, type: "Promotion", title: `Promoted to ${promotionData.toGrade}`, detail: `Order #${orderNo}` }, ...(emp.timeline || [])],
      auditLog: [{ id: `A-PROM-${Date.now()}`, timestamp: timestampFull, updatedBy: `${adminUser.name}`, station: adminUser.officeName || adminUser.stationName, field: "Promotion & Designation", oldValue: emp.designation, newValue: promotionData.toGrade }, ...(emp.auditLog || [])]
    };

    db.prepare('UPDATE employees SET designation = ?, data_json = ? WHERE emp_no = ?')
      .run(updatedEmp.designation, JSON.stringify(updatedEmp), empId);

    res.json({ success: true, order: newPromotion, employee: updatedEmp });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/workflows/transfer', (req, res) => {
  try {
    const { empId, transferData, adminUser } = req.body;
    if (!adminUser) return res.status(403).json({ error: 'HR Administrator authorization required.' });

    const row = db.prepare('SELECT location_id, data_json FROM employees WHERE emp_no = ?').get(empId);
    if (!row) return res.status(404).json({ error: 'Employee not found' });

    const adminOffice = adminUser.officeId || adminUser.stationId;
    if (adminUser.role !== 'superadmin' && adminOffice !== 'ALL' && adminOffice !== row.location_id) {
      return res.status(403).json({ error: `Permission Denied: HR Administrator from ${adminOffice} cannot transfer employees from ${row.location_id}.` });
    }

    const emp = JSON.parse(row.data_json);
    const now = new Date();
    const timeStr = now.toLocaleDateString();
    const orderNo = `NEEPCO/HR/TRF/${now.getFullYear()}/${Math.floor(100 + Math.random() * 900)}`;

    const newPlacement = {
      orderNo,
      postingStation: transferData.postingStation,
      department: transferData.department || emp.department,
      specializedSkillArea: transferData.specializedSkillArea || "Power Systems & Operations",
      specializedSkillSubArea: transferData.specializedSkillSubArea || "General Hydroelectric Operations",
      duration: `${timeStr} to Present`,
      reportingOfficer: transferData.reportingOfficer || "Executive Director (Operations)",
      documentAvailable: true
    };

    const updatedEmp = {
      ...emp,
      locationName: transferData.postingStation,
      placementHistory: [newPlacement, ...(emp.placementHistory || [])],
      presentPosting: { ...emp.presentPosting, station: transferData.postingStation, dateOfJoinCurrentPosting: timeStr },
      timeline: [{ id: `T-TRF-${Date.now()}`, date: timeStr, type: "Transfer", title: `Transferred to ${transferData.postingStation}`, detail: `Order #${orderNo}` }, ...(emp.timeline || [])]
    };

    db.prepare('UPDATE employees SET location_name = ?, data_json = ? WHERE emp_no = ?')
      .run(updatedEmp.locationName, JSON.stringify(updatedEmp), empId);

    res.json({ success: true, order: newPlacement, employee: updatedEmp });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`⚡ NEEPCO HRIS SQLite Backend Server running on http://localhost:${PORT}`);
});
