/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserRole, Assignment, Notice, StudyMaterial } from './types';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { LoginModal } from './components/common/LoginModal';

// Student Components
import { StudentDashboard } from './components/student/StudentDashboard';
import { StudentTimetable } from './components/student/StudentTimetable';
import { StudentSubjects } from './components/student/StudentSubjects';
import { StudentAssignments } from './components/student/StudentAssignments';
import { StudentMaterials } from './components/student/StudentMaterials';
import { StudentEvents } from './components/student/StudentEvents';
import { StudentJourney } from './components/student/StudentJourney';
import { StudentProfile } from './components/student/StudentProfile';
import { AssignmentUploadModal } from './components/student/AssignmentUploadModal';
import { DigitalLectureModal } from './components/student/DigitalLectureModal';
import { ParticipantBadgeModal } from './components/student/ParticipantBadgeModal';

// Faculty Components
import { FacultyPortal } from './components/faculty/FacultyPortal';
import { CreateAssignmentModal } from './components/faculty/CreateAssignmentModal';
import { UploadMaterialModal } from './components/faculty/UploadMaterialModal';
import { NewAnnouncementModal } from './components/faculty/NewAnnouncementModal';
import { ReviewSubmissionsModal } from './components/faculty/ReviewSubmissionsModal';

// Admin Components
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AttendanceCorrections } from './components/admin/AttendanceCorrections';
import { UserManagement } from './components/admin/UserManagement';
import { InstitutionalSettings } from './components/admin/InstitutionalSettings';
import { AcademicStructure } from './components/admin/AcademicStructure';
import { EmergencyLockdownModal } from './components/admin/EmergencyLockdownModal';

import { ShieldAlert, AlertTriangle, X } from 'lucide-react';

export default function App() {
  // Role & Navigation State
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [activeSemester, setActiveSemester] = useState<string>('Fall 2026 • Sem 5');

  // Emergency DEFCON State
  const [isDefconArmed, setIsDefconArmed] = useState<boolean>(false);
  const [defconReason, setDefconReason] = useState<string>('');

  // Modals State
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [uploadTargetAssignment, setUploadTargetAssignment] = useState<Assignment | null>(null);
  const [isDigitalLectureOpen, setIsDigitalLectureOpen] = useState<boolean>(false);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState<boolean>(false);
  const [isDefconModalOpen, setIsDefconModalOpen] = useState<boolean>(false);

  // Faculty Modals
  const [isCreateAssignmentOpen, setIsCreateAssignmentOpen] = useState<boolean>(false);
  const [isUploadMaterialOpen, setIsUploadMaterialOpen] = useState<boolean>(false);
  const [isNewAnnouncementOpen, setIsNewAnnouncementOpen] = useState<boolean>(false);
  const [isReviewSubmissionsOpen, setIsReviewSubmissionsOpen] = useState<boolean>(false);
  const [reviewAssignmentTitle, setReviewAssignmentTitle] = useState<string>('Raft Consensus State Machine');

  // Mobile Drawer State
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Switch role handler: resets tab to the default tab of that role
  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'student') {
      setCurrentTab('dashboard');
    } else if (role === 'teacher') {
      setCurrentTab('teaching-console');
    } else if (role === 'admin') {
      setCurrentTab('admin-dashboard');
    }
  };

  // Student action handlers
  const handleOpenUploadModal = (asg?: Assignment) => {
    setUploadTargetAssignment(asg || null);
    setIsUploadModalOpen(true);
  };

  const handleAssignmentUploadSuccess = (asgId: string, version: string) => {
    // Handled in modal
  };

  // Faculty action handlers
  const handleOpenReviewSubmissions = (title: string) => {
    setReviewAssignmentTitle(title);
    setIsReviewSubmissionsOpen(true);
  };

  // Admin DEFCON handlers
  const handleConfirmLockdown = (reason: string) => {
    setIsDefconArmed(true);
    setDefconReason(reason);
  };

  const handleLiftLockdown = () => {
    setIsDefconArmed(false);
    setDefconReason('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans antialiased">
      {/* Sidebar Navigation */}
      <Sidebar
        currentRole={currentRole}
        currentTab={currentTab}
        onTabChange={(tab) => {
          if (tab === 'emergency-lockdown') {
            setIsDefconModalOpen(true);
          } else {
            setCurrentTab(tab);
          }
        }}
        isDefconArmed={isDefconArmed}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* DEFCON Global Emergency Banner */}
        {isDefconArmed && (
          <div className="bg-rose-600 text-white px-6 py-2.5 flex items-center justify-between text-xs font-semibold shadow-md animate-pulse">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              <span>
                <strong>CRITICAL INSTITUTIONAL LOCKDOWN ARMED:</strong> {defconReason}. All timetable sessions, roll calls, and campus turnstiles are suspended.
              </span>
            </div>
            <button
              onClick={() => setIsDefconModalOpen(true)}
              className="rounded bg-rose-800 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-rose-900 transition"
            >
              Manage DEFCON
            </button>
          </div>
        )}

        {/* Global Header */}
        <Header
          currentRole={currentRole}
          onRoleChange={handleRoleChange}
          onOpenLoginModal={() => setIsLoginModalOpen(true)}
          isEmergencyDefconActive={isDefconArmed}
          onOpenEmergencyModal={() => setIsDefconModalOpen(true)}
          activeSemester={activeSemester}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        {/* Main Routed Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          {/* STUDENT VIEWS */}
          {currentRole === 'student' && (
            <>
              {currentTab === 'dashboard' && (
                <StudentDashboard
                  onNavigateTab={(tab) => setCurrentTab(tab)}
                  onOpenUploadModal={handleOpenUploadModal}
                  onOpenDigitalLecture={() => setIsDigitalLectureOpen(true)}
                  onOpenBadgeModal={() => setIsBadgeModalOpen(true)}
                />
              )}

              {currentTab === 'timetable' && <StudentTimetable />}

              {currentTab === 'subjects' && <StudentSubjects />}

              {currentTab === 'assignments' && (
                <StudentAssignments onOpenUploadModal={handleOpenUploadModal} />
              )}

              {currentTab === 'materials' && <StudentMaterials />}

              {currentTab === 'events' && (
                <StudentEvents onOpenBadgeModal={() => setIsBadgeModalOpen(true)} />
              )}

              {currentTab === 'journey' && <StudentJourney />}

              {currentTab === 'profile' && <StudentProfile />}
            </>
          )}

          {/* FACULTY VIEWS */}
          {currentRole === 'teacher' && (
            <FacultyPortal
              currentTab={currentTab}
              onNavigateTab={(tab) => setCurrentTab(tab)}
              onOpenCreateAssignment={() => setIsCreateAssignmentOpen(true)}
              onOpenUploadMaterial={() => setIsUploadMaterialOpen(true)}
              onOpenNewAnnouncement={() => setIsNewAnnouncementOpen(true)}
              onOpenReviewSubmissions={handleOpenReviewSubmissions}
            />
          )}

          {/* ADMIN VIEWS */}
          {currentRole === 'admin' && (
            <>
              {currentTab === 'admin-dashboard' && (
                <AdminDashboard
                  onNavigateTab={(tab) => setCurrentTab(tab)}
                  onOpenDefconModal={() => setIsDefconModalOpen(true)}
                  isDefconActive={isDefconArmed}
                />
              )}

              {currentTab === 'attendance-corrections' && (
                <AttendanceCorrections
                  onOpenDefconModal={() => setIsDefconModalOpen(true)}
                />
              )}

              {currentTab === 'user-management' && <UserManagement />}

              {currentTab === 'academic-structure' && <AcademicStructure />}

              {currentTab === 'institutional-settings' && <InstitutionalSettings />}

              {/* Other admin views fall back gracefully to Attendance Corrections or Dashboard */}
              {['timetable-scheduling', 'examination-registry', 'campus-events-notices'].includes(currentTab) && (
                <AttendanceCorrections
                  onOpenDefconModal={() => setIsDefconModalOpen(true)}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Global Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginAsRole={(role) => handleRoleChange(role)}
      />

      <AssignmentUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        assignment={uploadTargetAssignment}
        onSuccessSubmit={handleAssignmentUploadSuccess}
      />

      <DigitalLectureModal
        isOpen={isDigitalLectureOpen}
        onClose={() => setIsDigitalLectureOpen(false)}
      />

      <ParticipantBadgeModal
        isOpen={isBadgeModalOpen}
        onClose={() => setIsBadgeModalOpen(false)}
      />

      <CreateAssignmentModal
        isOpen={isCreateAssignmentOpen}
        onClose={() => setIsCreateAssignmentOpen(false)}
        onCreate={(asg) => {
          // Handled
        }}
      />

      <UploadMaterialModal
        isOpen={isUploadMaterialOpen}
        onClose={() => setIsUploadMaterialOpen(false)}
        onUpload={(mat) => {
          // Handled
        }}
      />

      <NewAnnouncementModal
        isOpen={isNewAnnouncementOpen}
        onClose={() => setIsNewAnnouncementOpen(false)}
        onCreate={(not) => {
          // Handled
        }}
      />

      <ReviewSubmissionsModal
        isOpen={isReviewSubmissionsOpen}
        onClose={() => setIsReviewSubmissionsOpen(false)}
        assignmentTitle={reviewAssignmentTitle}
      />

      <EmergencyLockdownModal
        isOpen={isDefconModalOpen}
        onClose={() => setIsDefconModalOpen(false)}
        onConfirmLockdown={handleConfirmLockdown}
        isCurrentlyLocked={isDefconArmed}
        onLiftLockdown={handleLiftLockdown}
      />
    </div>
  );
}
