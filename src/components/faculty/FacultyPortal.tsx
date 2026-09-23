import React from 'react';
import { FacultyDashboardView } from './FacultyDashboardView';
import { FacultySubjects } from './FacultySubjects';
import { FacultyAttendance } from './FacultyAttendance';
import { FacultyAssignments } from './FacultyAssignments';
import { FacultySubmissions } from './FacultySubmissions';
import { FacultyMaterials } from './FacultyMaterials';
import { FacultyAnnouncements } from './FacultyAnnouncements';
import { FacultyStudents } from './FacultyStudents';
import { FacultyProfile } from './FacultyProfile';
import { FacultyCalendar } from './FacultyCalendar';

interface FacultyPortalProps {
  currentTab: string;
  onNavigateTab: (tab: string, param?: string) => void;
  onOpenCreateAssignment: () => void;
  onOpenUploadMaterial: () => void;
  onOpenNewAnnouncement: () => void;
  onOpenReviewSubmissions: (asgTitle: string) => void;
}

export const FacultyPortal: React.FC<FacultyPortalProps> = ({
  currentTab,
  onNavigateTab,
  onOpenReviewSubmissions,
}) => {
  const normalized = currentTab.toLowerCase();

  switch (normalized) {
    case 'my-subjects':
    case 'subjects':
      return <FacultySubjects onNavigateTab={onNavigateTab} />;

    case 'attendance-marker':
    case 'attendance':
    case 'roll-call':
    case 'rollcall':
      return <FacultyAttendance onNavigateTab={onNavigateTab} />;

    case 'coursework':
    case 'assignments':
      return (
        <FacultyAssignments
          onNavigateTab={onNavigateTab}
          onOpenReviewSubmissions={onOpenReviewSubmissions}
        />
      );

    case 'submissions-review':
    case 'submissions':
    case 'student-submissions':
      return <FacultySubmissions onNavigateTab={onNavigateTab} />;

    case 'materials-repo':
    case 'study-materials':
    case 'materials':
      return <FacultyMaterials onNavigateTab={onNavigateTab} />;

    case 'announcements':
    case 'notices':
      return <FacultyAnnouncements onNavigateTab={onNavigateTab} />;

    case 'students':
    case 'enrolled-students':
    case 'student-roster':
      return <FacultyStudents onNavigateTab={onNavigateTab} />;

    case 'profile':
      return <FacultyProfile onNavigateTab={onNavigateTab} />;

    case 'calendar':
    case 'teaching-calendar':
      return <FacultyCalendar onNavigateTab={onNavigateTab} />;

    case 'teaching-console':
    case 'dashboard':
    default:
      return (
        <FacultyDashboardView
          onNavigateTab={onNavigateTab}
          onOpenReviewSubmissions={onOpenReviewSubmissions}
        />
      );
  }
};
