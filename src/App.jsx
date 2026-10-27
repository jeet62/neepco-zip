import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import HeaderBar from './components/HeaderBar';
import ServiceRecordWorkspace from './components/ServiceRecordWorkspace';
import AdminPortal from './components/AdminPortal';
import NotAvailablePage from './components/NotAvailablePage';
import LandingHero from './components/LandingHero';
import LoginModal from './components/LoginModal';
import DocumentModal from './components/DocumentModal';
import DocumentVaultModal from './components/DocumentVaultModal';
import OrderDocumentModal from './components/OrderDocumentModal';
import { EMPLOYEES_DATA, fetchEmployeesFromDB } from './data/employeesData';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogoutAnimating, setIsLogoutAnimating] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userRole, setUserRole] = useState('employee');
  const [activeNav, setActiveNav] = useState('service-record');

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isVaultModalOpen, setIsVaultModalOpen] = useState(false);
  const [activeDocument, setActiveDocument] = useState(null);
  const [orderModalData, setOrderModalData] = useState(null);
  const [selectedEmp, setSelectedEmp] = useState(null);

  useEffect(() => {
    fetchEmployeesFromDB();
  }, []);

  const handleLoginSuccess = (userObj, role = 'employee', userType = 'employee') => {
    setLoggedInUser(userObj);
    setUserRole(role);
    setIsLoggedIn(true);

    if (userType === 'hr_admin' || role === 'admin' || role === 'superadmin') {
      setActiveNav('directory');
      setSelectedEmp(null);
    } else {
      setActiveNav('service-record');
      setSelectedEmp(userObj);
    }
  };

  const handleLogout = () => {
    setIsLogoutAnimating(true);
    setTimeout(() => {
      setIsLoggedIn(false);
      setLoggedInUser(null);
      setUserRole('employee');
      setSelectedEmp(null);
      setActiveNav('service-record');
      setIsLogoutAnimating(false);
    }, 750);
  };

  const handleViewDocument = (docObj) => {
    if (docObj) {
      setActiveDocument(docObj);
    }
  };

  const handleGenerateOrder = (orderData, orderType) => {
    setOrderModalData({
      orderData,
      orderType,
      employee: selectedEmp || loggedInUser || EMPLOYEES_DATA["1024"]
    });
  };

  const isHRAdmin = userRole === 'admin' || userRole === 'superadmin' || userRole === 'hr_admin';
  const currentEmpToDisplay = isHRAdmin ? (selectedEmp || EMPLOYEES_DATA["1024"]) : loggedInUser;

  const navLabels = {
    'directory': 'Employee Directory',
    'dashboard': 'Executive HR Dashboard',
    'records': 'Employee Records Management',
    'leave': 'Leave & Attendance Module',
    'service-records': 'Service Records & Cadre Books',
    'departments': 'Departmental Organization & Cadres',
    'reports': 'MIS Reports & Rosters',
    'settings': 'System Settings & Security'
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col font-sans selection:bg-slate-900 selection:text-white">
      <LandingHero
        isLoggedIn={isLoggedIn}
        isLogoutAnimating={isLogoutAnimating}
        loggedInUser={loggedInUser}
        userRole={userRole}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
        onOpenLogin={() => setIsLoginModalOpen(true)}
      />

      {isLoggedIn && !isLogoutAnimating ? (
        <div className="flex flex-1 min-h-[calc(100vh-200px)] bg-[#F4F5F7] border-t border-slate-200 animate-fade-in">
          <Sidebar
            activeNav={activeNav}
            onSelectNav={(navId) => setActiveNav(navId)}
            loggedInUser={loggedInUser}
            userRole={userRole}
            onLogout={handleLogout}
            onOpenDocumentVault={() => setIsVaultModalOpen(true)}
          />

          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <HeaderBar
              breadcrumb={
                isHRAdmin
                  ? `HR Administration / ${navLabels[activeNav] || 'Employee Directory'}`
                  : `Personnel Records / Official Service Book`
              }
              loggedInUser={loggedInUser}
              userRole={userRole}
              onSearchSelect={(empObj) => {
                if (isHRAdmin) {
                  setSelectedEmp(empObj);
                  setActiveNav('directory');
                }
              }}
              onLogout={handleLogout}
              onOpenLogin={() => setIsLoginModalOpen(true)}
            />

            <main className="flex-1 overflow-y-auto bg-[#F4F5F7]">
              {isHRAdmin ? (
                activeNav === 'directory' ? (
                  <AdminPortal
                    adminUser={loggedInUser}
                    onViewDocument={handleViewDocument}
                    onGenerateOrder={handleGenerateOrder}
                  />
                ) : (
                  <NotAvailablePage
                    navTitle={navLabels[activeNav] || 'Module'}
                    onBackToDirectory={() => setActiveNav('directory')}
                  />
                )
              ) : (
                <div className="p-6 sm:p-8 max-w-[1560px] mx-auto">
                  <ServiceRecordWorkspace
                    employee={loggedInUser}
                    userRole="employee"
                    adminUser={null}
                    onViewDocument={handleViewDocument}
                    onGenerateOrder={handleGenerateOrder}
                  />
                </div>
              )}
            </main>
          </div>
        </div>
      ) : (
        <main className="flex-1 max-w-[1600px] mx-auto px-4 py-8 text-center text-slate-400 text-xs font-medium">
          <p>© 2026 North Eastern Electric Power Corporation Ltd. • Internal HRIS Portal • Authorized Access Only</p>
        </main>
      )}

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <DocumentVaultModal
        isOpen={isVaultModalOpen}
        onClose={() => setIsVaultModalOpen(false)}
        employee={currentEmpToDisplay}
        onViewDocument={handleViewDocument}
      />

      <DocumentModal
        doc={activeDocument}
        isOpen={!!activeDocument}
        onClose={() => setActiveDocument(null)}
      />

      <OrderDocumentModal
        orderData={orderModalData?.orderData}
        orderType={orderModalData?.orderType}
        employee={orderModalData?.employee}
        onClose={() => setOrderModalData(null)}
      />
    </div>
  );
}
