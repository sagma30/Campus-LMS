export type UserRole = 'student' | 'teacher' | 'admin';

export interface SemesterGpaRecord {
  semester: string;
  semesterLabel: string;
  academicYear: string;
  sgpa: number;
  cgpa: number;
  creditsEarned: number;
  totalCredits: number;
  status: 'Completed' | 'Current' | 'Upcoming';
  isCurrent?: boolean;
  coursesCount: number;
  honors?: string;
}

export interface StudentProfile {
  id: string;
  universityId: string; // e.g. CS-2024-819
  name: string;
  email: string;
  department: string; // Computer Science & Engineering
  degree: string; // B.Tech
  semester: number; // 5
  section: string; // A
  avatar: string;
  aggregateAttendance: number; // 88.4
  attendedSessions: number; // 145
  totalSessions: number; // 164
  attendanceGoal: number; // 88.4
  attendanceStatus: 'Compliant' | 'Warning' | 'Critical';
  cgpa: number; // 8.92
  earnedCredits: number; // 92
  totalDegreeCredits: number; // 160
  academicAdvisor: string; // Dr. Arvind Ramesh
  phone: string;
  bloodGroup: string;
  emergencyContact: string;
  hostelRoom: string;
}

export interface TeacherProfile {
  id: string;
  facultyId: string; // e.g. FAC-2018-042
  name: string;
  title: string; // Assoc. Prof
  department: string; // CSE Dept
  email: string;
  avatar: string;
  assignedSubjects: string[];
  tenured: boolean;
  officeRoom: string;
  officeHours: string;
}

export interface AdminProfile {
  id: string;
  name: string;
  title: string; // Academic Registrar & Super Admin
  department: string; // Academic Administration
  email: string;
  avatar: string;
  superAdmin: boolean;
  scope: string; // Multi-Tenant Root Scope
}

export interface Course {
  code: string;
  name: string;
  type: 'Core Theory' | 'Practical Lab' | 'Seminar / Elective' | 'Institutional Mandate';
  credits: number;
  facultyId: string;
  facultyName: string;
  instructor?: string;
  description?: string;
  facultyTitle: string;
  facultyAvatar?: string;
  room: string;
  capacity: number;
  enrolledCount: number;
  attendedHours: number;
  totalHours: number;
  attendanceRate: number; // percentage
  attendanceFlag?: 'normal' | 'caution' | 'critical';
  syllabusUnits?: string[];
  syllabusModules: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
  }[];
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  startTime: string; // e.g. "08:30 AM"
  endTime: string; // e.g. "09:45 AM"
  timeWindow: string; // "08:30 AM - 09:45 AM"
  courseCode: string;
  courseName: string;
  courseType?: string;
  room: string;
  faculty: string;
  status: 'completed' | 'in_progress' | 'upcoming' | 'recess';
  attendanceStatus?: 'Present' | 'Absent' | 'Excused';
  progressionMinutes?: { current: number; total: number; percentage: number };
  materials?: { title: string; type: 'pdf' | 'lab' | 'slides' }[];
  isRecess?: boolean;
}

export interface Assignment {
  id: string;
  courseCode: string;
  courseName: string;
  type: 'Lab' | 'Project' | 'Report' | 'Problem Set';
  numberLabel: string; // "LAB 3"
  title: string;
  deadlineText: string; // "Tomorrow, 11:59 PM"
  dueDate: string; // ISO date string
  status: 'pending' | 'draft' | 'submitted' | 'graded';
  description: string;
  weightage?: number;
  totalMarks?: number;
  submissionVersion?: number;
  rubricCriteria?: string[];
  rubricNotes?: string;
  draftVersion?: string; // "Draft Saved (v2)"
  submissionDate?: string;
  submittedDate?: string;
  submittedFile?: string;
  submittedCodeRepo?: string;
  grade?: string;
  score?: number;
  maxScore?: number;
  avgPassRate?: number;
  submittedCount?: number;
  totalStudents?: number;
  pendingReviewCount?: number;
}

export interface StudyMaterial {
  id: string;
  courseCode: string;
  courseName: string;
  title: string;
  category: 'Lecture Slides' | 'Lab Manual' | 'Lecture Notes' | 'Reference Code' | 'Syllabus' | 'Reference Paper';
  fileFormat: 'PDF' | 'ZIP' | 'PY' | 'DOCX' | 'PCAP';
  fileSize: string;
  uploadDate: string;
  author: string;
  uploadedBy?: string;
  description?: string;
  downloadUrl: string;
  downloadsCount: number;
}

export interface Notice {
  id: string;
  circularNo: string; // "#CIR-2026-104"
  title: string;
  category: string;
  priority: 'urgent_mandatory' | 'high_priority' | 'normal';
  timestamp: string; // "2 hours ago"
  publishDate: string;
  author: string;
  authorRole: string;
  summary: string;
  details?: string;
  hasAttachment?: boolean;
  attachmentName?: string;
  attachmentSize?: string;
  acknowledgedCount?: number;
  totalTargetAudience?: number;
  isUrgentMandatoryRead?: boolean;
  targetScope: string;
  channels: string[];
}

export interface CampusEvent {
  id: string;
  eventCode: string; // "#EVT-2026-042"
  title: string;
  subtitle: string;
  category: 'Hackathon' | 'Distinguished Lecture' | 'Workshop' | 'Cultural';
  startDate: string;
  endDate: string;
  datesText: string;
  venue: string;
  isRegistered: boolean;
  confirmedEntry: boolean;
  registrationOpen: boolean;
  registeredCount: number;
  maxCapacity: number;
  teamName?: string;
  teamSize?: number;
  track?: string;
  passId?: string;
  odSanctionedCode?: string;
  activityCredits?: number;
  bannerImage: string;
  description: string;
  coordinator: string;
}

export interface StudentSessionAttendance {
  studentId: string;
  rollNo: string;
  name: string;
  department: string;
  section: string;
  overallAttendanceRate: number;
  overallAttendanceStatus: 'Compliant' | 'Under 75%' | 'Critical (<70%)';
  sessionStatus: 'Present' | 'Absent' | 'Excused';
  remarks?: string;
}

export interface AttendanceCorrectionPetition {
  id: string;
  ticketNumber: string; // "#COR-2026-089"
  urgentFlag: boolean;
  urgencyLabel?: string;
  submittedAgo: string;
  courseCode: string;
  courseName: string;
  sessionNumber: number;
  sessionDate: string;
  sessionSlot: string;
  facultyId: string;
  facultyName: string;
  facultyTitle: string;
  facultyDept: string;
  studentId: string;
  studentName: string;
  studentRoll: string;
  priorStatus: 'ABSENT' | 'EXCUSED' | 'PRESENT';
  postStatus: 'ABSENT' | 'EXCUSED' | 'PRESENT';
  priorAttendance: number;
  postAttendance: number;
  priorCompliant: boolean;
  postCompliant: boolean;
  facultyJustification: string;
  medicalSlipDoc?: {
    name: string;
    size: string;
    status: string;
  };
  statutoryReasonCode: string;
  adminRemark?: string;
  sha256Hash: string;
  signerPublicKey?: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface AuditLedgerEntry {
  blockNumber: string;
  timestamp: string;
  studentName: string;
  studentRoll: string;
  courseCode: string;
  courseTitle: string;
  sessionDesc: string;
  stateTransition: {
    from: 'ABSENT' | 'EXCUSED' | 'PRESENT';
    to: 'ABSENT' | 'EXCUSED' | 'PRESENT' | 'REJECTED';
  };
  grounds: string;
  authorizedBy: string;
  sha256Hash: string;
}

export interface AcademicHoliday {
  id: string;
  dateRange: string;
  daysText: string;
  name: string;
  description: string;
  classification: 'National Gazetted' | 'Institutional Recess' | 'State Holiday';
  engineImpact: string;
}

export interface UserAccount {
  id: string;
  universityId: string;
  name: string;
  email: string;
  role: string;
  systemRole: 'STUDENT' | 'FACULTY' | 'ACADEMIC ADMIN' | 'SUPER ADMIN';
  department: string;
  cohort: string;
  accessScope: string;
  status: 'active' | 'under_review' | 'revoked' | 'pending' | 'suspended';
  lastActivity: string;
  twoFactorEnabled: boolean;
  assignedSubjects?: string[];
}
