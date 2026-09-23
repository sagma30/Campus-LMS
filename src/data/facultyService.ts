import {
  StudentSessionAttendance,
  Assignment,
  StudyMaterial,
  Notice,
  Course,
} from '../types';
import { CURRENT_TEACHER } from './mockData';

export interface FacultySubject {
  code: string;
  name: string;
  type: string;
  semester: number;
  section: string;
  room: string;
  totalStudents: number;
  avgAttendance: number;
  credits: number;
  schedule: string;
  syllabusModules: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    lectureHours: number;
  }[];
}

export interface StudentSubmission {
  id: string;
  assignmentId: string;
  assignmentTitle: string;
  courseCode: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  avatar?: string;
  submittedAt: string;
  fileName: string;
  fileSize: string;
  testPassRate: number;
  grade: string;
  score: number;
  maxScore: number;
  feedback: string;
  status: 'reviewed' | 'pending';
  codeSnippet?: string;
  executionLogs?: string;
}

export interface EnrolledStudentDetail {
  id: string;
  rollNo: string;
  prn: string;
  name: string;
  email: string;
  phone: string;
  courseCode: string;
  section: string;
  semester: number;
  attendanceRate: number;
  attendedHours: number;
  totalHours: number;
  attendanceStanding: 'Compliant' | 'Caution (<75%)' | 'Critical (<70%)';
  assignmentsSubmitted: number;
  totalAssignments: number;
  averageScore: number;
  avatar: string;
  academicRemarks: string;
}

// Initial Faculty Subjects
export const INITIAL_FACULTY_SUBJECTS: FacultySubject[] = [
  {
    code: 'CS502',
    name: 'Distributed Operating Systems',
    type: 'Core Theory & Systems Lab',
    semester: 5,
    section: 'Section A',
    room: 'Hall 304, Turing Science Block',
    totalStudents: 62,
    avgAttendance: 88.5,
    credits: 4.0,
    schedule: 'Tue & Thu 10:00 AM - 11:30 AM',
    syllabusModules: [
      { id: 1, title: 'Foundations of Distributed Computing', description: 'Network models, clock drift, Lamport timestamps, vector clocks', completed: true, lectureHours: 8 },
      { id: 2, title: 'Consensus Protocols & Fault Tolerance', description: 'Two-phase commit, Paxos, Raft leader election and log replication', completed: true, lectureHours: 12 },
      { id: 3, title: 'Distributed Mutual Exclusion & Snapshotting', description: 'Ricart-Agrawala, Chandy-Lamport global state recording', completed: false, lectureHours: 10 },
      { id: 4, title: 'Distributed Storage & Transactions', description: 'CAP theorem, ACID vs BASE, Google Spanner, DynamoDB hashing', completed: false, lectureHours: 8 },
      { id: 5, title: 'Byzantine Fault Tolerance & Modern Systems', description: 'PBFT, Raft vs Kafka Raft, decentralization paradigms', completed: false, lectureHours: 6 },
    ],
  },
  {
    code: 'CS508',
    name: 'Computer Networks & Protocols',
    type: 'Core Theory & Net Lab',
    semester: 5,
    section: 'Section B',
    room: 'Hall 102 / Cisco Lab 4, Turing Block',
    totalStudents: 58,
    avgAttendance: 86.2,
    credits: 4.0,
    schedule: 'Mon & Wed 02:15 PM - 03:45 PM',
    syllabusModules: [
      { id: 1, title: 'Protocol Architecture & Layering', description: 'OSI vs TCP/IP reference models, physical transmission media', completed: true, lectureHours: 6 },
      { id: 2, title: 'Data Link Layer & LAN Framing', description: 'Ethernet framing, CSMA/CD, ARP, Spanning Tree Protocol (STP)', completed: true, lectureHours: 10 },
      { id: 3, title: 'Network Layer & Dynamic Routing', description: 'IPv4/IPv6 addressing, CIDR, OSPF Dijkstra, BGP path vector', completed: false, lectureHours: 14 },
      { id: 4, title: 'Transport Layer & Congestion Control', description: 'TCP Reno/BBR, 3-way handshake, UDP socket programming', completed: false, lectureHours: 8 },
      { id: 5, title: 'Application Layer & Network Security', description: 'DNS hierarchy, TLS 1.3 handshake, HTTP/2 & HTTP/3 QUIC', completed: false, lectureHours: 6 },
    ],
  },
];

// Initial Enrolled Students across Sections
export const INITIAL_ENROLLED_STUDENTS: EnrolledStudentDetail[] = [
  {
    id: 'std_01',
    rollNo: 'CS-2024-819',
    prn: 'MET-CS-2024-819',
    name: 'Elena Vance',
    email: 'elena.vance@campus.edu',
    phone: '+91 98201 44819',
    courseCode: 'CS502',
    section: 'Section A',
    semester: 5,
    attendanceRate: 88.4,
    attendedHours: 25,
    totalHours: 28,
    attendanceStanding: 'Compliant',
    assignmentsSubmitted: 3,
    totalAssignments: 3,
    averageScore: 96,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
    academicRemarks: 'Exceptional systems programming skills. Demonstrated working Raft leader election in Rust.',
  },
  {
    id: 'std_02',
    rollNo: 'CS-2024-802',
    prn: 'MET-CS-2024-802',
    name: 'Marcus Brody',
    email: 'marcus.brody@campus.edu',
    phone: '+91 98201 44802',
    courseCode: 'CS502',
    section: 'Section A',
    semester: 5,
    attendanceRate: 92.0,
    attendedHours: 26,
    totalHours: 28,
    attendanceStanding: 'Compliant',
    assignmentsSubmitted: 3,
    totalAssignments: 3,
    averageScore: 91,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&h=256&q=80',
    academicRemarks: 'Consistent lab submission quality. Good peer reviewer in group assignments.',
  },
  {
    id: 'std_03',
    rollNo: 'CS-2024-811',
    prn: 'MET-CS-2024-811',
    name: 'Dev Patel',
    email: 'dev.patel@campus.edu',
    phone: '+91 98201 44811',
    courseCode: 'CS502',
    section: 'Section A',
    semester: 5,
    attendanceRate: 74.2,
    attendedHours: 21,
    totalHours: 28,
    attendanceStanding: 'Caution (<75%)',
    assignmentsSubmitted: 2,
    totalAssignments: 3,
    averageScore: 78,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&h=256&q=80',
    academicRemarks: 'Submitted hospital discharge slip for Session #28. Caution notice issued under 75% rule.',
  },
  {
    id: 'std_04',
    rollNo: 'CS-2024-815',
    prn: 'MET-CS-2024-815',
    name: 'Priya Sharma',
    email: 'priya.sharma@campus.edu',
    phone: '+91 98201 44815',
    courseCode: 'CS502',
    section: 'Section A',
    semester: 5,
    attendanceRate: 96.0,
    attendedHours: 27,
    totalHours: 28,
    attendanceStanding: 'Compliant',
    assignmentsSubmitted: 3,
    totalAssignments: 3,
    averageScore: 94,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80',
    academicRemarks: 'Top 5 percentile in continuous evaluations. Highly engaged in seminar discussions.',
  },
  {
    id: 'std_05',
    rollNo: 'CS-2024-822',
    prn: 'MET-CS-2024-822',
    name: 'Alex Chen',
    email: 'alex.chen@campus.edu',
    phone: '+91 98201 44822',
    courseCode: 'CS502',
    section: 'Section A',
    semester: 5,
    attendanceRate: 82.5,
    attendedHours: 23,
    totalHours: 28,
    attendanceStanding: 'Compliant',
    assignmentsSubmitted: 3,
    totalAssignments: 3,
    averageScore: 83,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
    academicRemarks: 'Authorized medical leave on Sep 18. Progressing well on distributed cache implementation.',
  },
  {
    id: 'std_06',
    rollNo: 'CS-2024-830',
    prn: 'MET-CS-2024-830',
    name: 'Zoya Khan',
    email: 'zoya.khan@campus.edu',
    phone: '+91 98201 44830',
    courseCode: 'CS502',
    section: 'Section A',
    semester: 5,
    attendanceRate: 90.1,
    attendedHours: 25,
    totalHours: 28,
    attendanceStanding: 'Compliant',
    assignmentsSubmitted: 3,
    totalAssignments: 3,
    averageScore: 89,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&h=256&q=80',
    academicRemarks: 'Strong grasp of distributed deadlock detection algorithms.',
  },
  {
    id: 'std_07',
    rollNo: 'CS-2024-835',
    prn: 'MET-CS-2024-835',
    name: 'Rahul Nair',
    email: 'rahul.nair@campus.edu',
    phone: '+91 98201 44835',
    courseCode: 'CS502',
    section: 'Section A',
    semester: 5,
    attendanceRate: 68.0,
    attendedHours: 19,
    totalHours: 28,
    attendanceStanding: 'Critical (<70%)',
    assignmentsSubmitted: 2,
    totalAssignments: 3,
    averageScore: 71,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80',
    academicRemarks: 'Critical attendance warning. Attending hackathons on official duty; condonation pending.',
  },
  {
    id: 'std_08',
    rollNo: 'CS-2024-841',
    prn: 'MET-CS-2024-841',
    name: 'Ananya Deshmukh',
    email: 'ananya.deshmukh@campus.edu',
    phone: '+91 98201 44841',
    courseCode: 'CS508',
    section: 'Section B',
    semester: 5,
    attendanceRate: 91.5,
    attendedHours: 24,
    totalHours: 26,
    attendanceStanding: 'Compliant',
    assignmentsSubmitted: 2,
    totalAssignments: 2,
    averageScore: 93,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
    academicRemarks: 'Excellent packet dissection scripts in Wireshark/Scapy. Perfect score in Lab 1.',
  },
  {
    id: 'std_09',
    rollNo: 'CS-2024-849',
    prn: 'MET-CS-2024-849',
    name: 'Kabir Joshi',
    email: 'kabir.joshi@campus.edu',
    phone: '+91 98201 44849',
    courseCode: 'CS508',
    section: 'Section B',
    semester: 5,
    attendanceRate: 84.6,
    attendedHours: 22,
    totalHours: 26,
    attendanceStanding: 'Compliant',
    assignmentsSubmitted: 2,
    totalAssignments: 2,
    averageScore: 86,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&h=256&q=80',
    academicRemarks: 'Active participant in Cisco lab simulations. Consistent performance.',
  },
  {
    id: 'std_10',
    rollNo: 'CS-2024-855',
    prn: 'MET-CS-2024-855',
    name: 'Tanvi Kulkarni',
    email: 'tanvi.kulkarni@campus.edu',
    phone: '+91 98201 44855',
    courseCode: 'CS508',
    section: 'Section B',
    semester: 5,
    attendanceRate: 72.8,
    attendedHours: 19,
    totalHours: 26,
    attendanceStanding: 'Caution (<75%)',
    assignmentsSubmitted: 1,
    totalAssignments: 2,
    averageScore: 74,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&h=256&q=80',
    academicRemarks: 'Caution advised. Missed BGP routing lab; scheduled for make-up slot next Friday.',
  },
];

// Initial Faculty Assignments
export const INITIAL_FACULTY_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg_01',
    courseCode: 'CS502',
    courseName: 'Distributed Operating Systems',
    type: 'Lab',
    numberLabel: 'LAB 3',
    title: 'Raft Consensus State Machine Implementation',
    deadlineText: 'Tomorrow, 11:59 PM',
    dueDate: '2026-09-24T23:59:00',
    status: 'pending',
    description: 'Implement a distributed replicated state machine using the Raft consensus protocol. Must support leader election, heartbeat timeouts, randomized election timers (150-300ms), and log replication across 5 simulated nodes.',
    weightage: 15,
    totalMarks: 100,
    submittedCount: 48,
    totalStudents: 62,
    pendingReviewCount: 18,
    rubricCriteria: [
      'Leader Election & Split-Vote resolution (30 marks)',
      'Log Matching Property & Commitment rules (35 marks)',
      'Network Partition recovery & Reconnect test (25 marks)',
      'Code modularity & concurrency safety (10 marks)',
    ],
  },
  {
    id: 'asg_02',
    courseCode: 'CS502',
    courseName: 'Distributed Operating Systems',
    type: 'Problem Set',
    numberLabel: 'PS 1',
    title: 'Logical Clocks & Chandy-Lamport Snapshotting',
    deadlineText: 'In 5 days • Sep 28',
    dueDate: '2026-09-28T23:59:00',
    status: 'pending',
    description: 'Solve formal proofs for vector clock causal ordering and design a non-blocking snapshot algorithm for a peer-to-peer cryptocurrency ledger with in-transit channel tokens.',
    weightage: 10,
    totalMarks: 50,
    submittedCount: 22,
    totalStudents: 62,
    pendingReviewCount: 22,
    rubricCriteria: [
      'Lamport total ordering proof correctness (15 marks)',
      'Vector clock event concurrent detection (15 marks)',
      'Chandy-Lamport marker propagation schema (20 marks)',
    ],
  },
  {
    id: 'asg_03',
    courseCode: 'CS508',
    courseName: 'Computer Networks & Protocols',
    type: 'Lab',
    numberLabel: 'NET LAB 2',
    title: 'Packet Dissection & BGP Anomaly Detection in Python',
    deadlineText: 'Oct 02, 2026 • 11:59 PM',
    dueDate: '2026-10-02T23:59:00',
    status: 'pending',
    description: 'Using Scapy and Wireshark PCAP captures, implement an automated IDS rule processor to detect route poisoning and AS-path hijacking anomalies in real-time streaming sockets.',
    weightage: 15,
    totalMarks: 100,
    submittedCount: 14,
    totalStudents: 58,
    pendingReviewCount: 14,
    rubricCriteria: [
      'PCAP stream parser efficiency (25 marks)',
      'AS-path looped detection accuracy (35 marks)',
      'Socket performance under 10k packets/sec (25 marks)',
      'Automated test suite (15 marks)',
    ],
  },
  {
    id: 'asg_04',
    courseCode: 'CS502',
    courseName: 'Distributed Operating Systems',
    type: 'Project',
    numberLabel: 'TERM PROJ',
    title: 'High-Throughput Distributed Key-Value Store (Consistent Hashing)',
    deadlineText: 'Nov 15, 2026 • 11:59 PM',
    dueDate: '2026-11-15T23:59:00',
    status: 'draft',
    description: 'Design and deploy a distributed Dynamo-style storage cluster with virtual node consistent hashing, gossip-based failure detectors, and configurable read/write quorums (W + R > N).',
    weightage: 25,
    totalMarks: 100,
    submittedCount: 0,
    totalStudents: 62,
    pendingReviewCount: 0,
    rubricCriteria: [
      'Consistent hashing ring with 256 virtual nodes (25 marks)',
      'Quorum consensus replication (30 marks)',
      'Anti-entropy with Merkle trees (25 marks)',
      'Benchmark throughput graphs (20 marks)',
    ],
  },
];

// Initial Study Materials
export const INITIAL_FACULTY_MATERIALS: StudyMaterial[] = [
  {
    id: 'mat_01',
    courseCode: 'CS502',
    courseName: 'Distributed Operating Systems',
    title: 'Module 2: Consensus in Distributed Systems (Paxos & Raft Slides)',
    category: 'Lecture Notes',
    fileFormat: 'PDF',
    fileSize: '4.8 MB',
    uploadDate: 'Sep 21, 2026',
    author: 'Dr. Arvind Ramesh',
    downloadUrl: '#',
    downloadsCount: 124,
  },
  {
    id: 'mat_02',
    courseCode: 'CS502',
    courseName: 'Distributed Operating Systems',
    title: 'Lab 3 Starter Harness & Automated Test Suite (Go / Rust)',
    category: 'Reference Code',
    fileFormat: 'ZIP',
    fileSize: '1.2 MB',
    uploadDate: 'Sep 20, 2026',
    author: 'Dr. Arvind Ramesh',
    downloadUrl: '#',
    downloadsCount: 98,
  },
  {
    id: 'mat_03',
    courseCode: 'CS502',
    courseName: 'Distributed Operating Systems',
    title: 'Original Paper: In Search of an Understandable Consensus Protocol (Ongaro & Ousterhout)',
    category: 'Reference Paper',
    fileFormat: 'PDF',
    fileSize: '890 KB',
    uploadDate: 'Sep 15, 2026',
    author: 'Dr. Arvind Ramesh',
    downloadUrl: '#',
    downloadsCount: 142,
  },
  {
    id: 'mat_04',
    courseCode: 'CS508',
    courseName: 'Computer Networks & Protocols',
    title: 'Module 3: BGP Path-Vector Routing & Autonomous System Peering Guide',
    category: 'Lecture Notes',
    fileFormat: 'PDF',
    fileSize: '3.6 MB',
    uploadDate: 'Sep 18, 2026',
    author: 'Dr. Arvind Ramesh',
    downloadUrl: '#',
    downloadsCount: 88,
  },
  {
    id: 'mat_05',
    courseCode: 'CS508',
    courseName: 'Computer Networks & Protocols',
    title: 'Wireshark Sample Captures for DNS, TCP 3-Way Handshake & TLS 1.3',
    category: 'Lab Manual',
    fileFormat: 'PCAP',
    fileSize: '14.2 MB',
    uploadDate: 'Sep 14, 2026',
    author: 'Dr. Arvind Ramesh',
    downloadUrl: '#',
    downloadsCount: 76,
  },
];

// Initial Faculty Announcements
export const INITIAL_FACULTY_ANNOUNCEMENTS: Notice[] = [
  {
    id: 'not_fac_01',
    circularNo: '#NOT-CS502-09',
    title: 'Lab 3 Submission Deadline Extended by 24h & Test Suite Patch v1.2',
    category: 'Lab Announcement',
    priority: 'high_priority',
    timestamp: 'Today, 09:30 AM',
    publishDate: 'Sep 22, 2026',
    author: 'Dr. Arvind Ramesh',
    authorRole: 'Assoc. Professor • Course In-Charge CS502',
    summary: 'Due to network latency simulator tuning in Lab Hall 304, the deadline for Lab 3 (Raft Consensus) is extended to Sep 24, 23:59 IST. Please pull test harness v1.2 from the Courseware Repository.',
    details: 'Test harness v1.2 fixes a race condition where candidate reelection timers expired prematurely on single-core virtual machines. Make sure your RPC timeout does not exceed 350ms.',
    targetScope: 'CS502 (Section A) Students',
    channels: ['Portal Notice Board', 'Student Email Broadcast'],
    isUrgentMandatoryRead: false,
    hasAttachment: true,
    attachmentName: 'test_harness_patch_v1.2.zip',
    attachmentSize: '420 KB',
  },
  {
    id: 'not_fac_02',
    circularNo: '#NOT-CS502-08',
    title: 'Special Guest Lecture: Raft at Scale by Lead Infrastructure Architect (AWS)',
    category: 'Guest Colloquium',
    priority: 'normal',
    timestamp: 'Sep 19, 2026',
    publishDate: 'Sep 19, 2026',
    author: 'Dr. Arvind Ramesh',
    authorRole: 'Course In-Charge CS502',
    summary: 'Institutional guest colloquium on practical challenges running Raft in high-throughput clusters. Attendance mandatory for Section A.',
    details: 'Held on Monday, Sep 28 from 04:00 PM to 05:30 PM in Main Auditorium 2. Tea and networking with engineering leads will follow.',
    targetScope: 'CS502 & CS508 Students',
    channels: ['Portal Notice Board'],
    isUrgentMandatoryRead: false,
  },
  {
    id: 'not_fac_03',
    circularNo: '#NOT-CS508-04',
    title: 'Cisco Lab 4 Workstation IP Allotments & SSH Keys for Net Lab 2',
    category: 'Infrastructure',
    priority: 'normal',
    timestamp: 'Sep 17, 2026',
    publishDate: 'Sep 17, 2026',
    author: 'Dr. Arvind Ramesh',
    authorRole: 'Course In-Charge CS508',
    summary: 'Each student has been mapped to a dedicated virtual router workstation IP (10.14.30.100 - 158). Password authentication is disabled; use your campus Kerberos key.',
    details: 'Firewall rules permit raw socket sniffing only inside container namespaces. Refer to the laboratory safety and institutional IT compliance manual.',
    targetScope: 'CS508 (Section B) Students',
    channels: ['Portal Notice Board'],
  },
];

// Initial Submissions List for Review
export const INITIAL_STUDENT_SUBMISSIONS: StudentSubmission[] = [
  {
    id: 'sub_01',
    assignmentId: 'asg_01',
    assignmentTitle: 'Raft Consensus State Machine Implementation',
    courseCode: 'CS502',
    studentId: 'std_01',
    studentName: 'Elena Vance',
    rollNo: 'CS-2024-819',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
    submittedAt: 'Today, 10:14 AM',
    fileName: 'raft_state_machine_v2.tar.gz',
    fileSize: '1.4 MB',
    testPassRate: 100,
    grade: 'A+',
    score: 98,
    maxScore: 100,
    feedback: 'Flawless election timeouts and log reconciliation. Excellent modularity in RPC handlers and thread-safe channels.',
    status: 'reviewed',
    codeSnippet: `// Raft Node Election State Machine
fn start_election(&mut self) {
    self.current_term += 1;
    self.state = NodeState::Candidate;
    self.voted_for = Some(self.node_id);
    let votes_received = Arc::new(AtomicUsize::new(1));
    let term = self.current_term;
    
    for peer in &self.peers {
        let req = RequestVoteArgs { term, candidate_id: self.node_id, last_log_index: self.logs.len() };
        // Dispatch non-blocking RPC
        self.send_request_vote(peer, req, votes_received.clone());
    }
}`,
    executionLogs: `[INFO] Initializing Raft Cluster: 5 Nodes
[PASS] Test 1: Initial Election Leader Established in 184ms
[PASS] Test 2: Leader heartbeat broadcast interval: 50ms verified
[PASS] Test 3: Split vote randomized backoff resolved in next term
[PASS] Test 4: Network partition 3 vs 2: Majority cluster continues commitments
[PASS] Test 5: Reconnect partitioned leader: Overwritten uncommitted logs verified
=== 25/25 AUTOMATED TESTS PASSED (100%) ===`,
  },
  {
    id: 'sub_02',
    assignmentId: 'asg_01',
    assignmentTitle: 'Raft Consensus State Machine Implementation',
    courseCode: 'CS502',
    studentId: 'std_02',
    studentName: 'Marcus Brody',
    rollNo: 'CS-2024-802',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&h=256&q=80',
    submittedAt: 'Yesterday, 08:40 PM',
    fileName: 'brody_cs502_lab3.zip',
    fileSize: '980 KB',
    testPassRate: 92,
    grade: 'A',
    score: 91,
    maxScore: 100,
    feedback: 'Passed 23/25 test cases. Minor uncommitted log duplication on partitioned leader reconnect, but leader election is rock solid.',
    status: 'reviewed',
    codeSnippet: `def handle_append_entries(self, args):
    if args.term < self.current_term:
        return AppendEntriesReply(term=self.current_term, success=False)
    self.reset_election_timer()
    if args.prev_log_index >= len(self.log) or self.log[args.prev_log_index].term != args.prev_log_term:
        return AppendEntriesReply(term=self.current_term, success=False)
    # Reconcile entries
    self.log = self.log[:args.prev_log_index + 1] + args.entries
    return AppendEntriesReply(term=self.current_term, success=True)`,
    executionLogs: `[INFO] Initializing Raft Cluster: 5 Nodes
[PASS] Test 1: Leader election verified
[PASS] Test 2: Heartbeats normal
[WARN] Test 14: Log reconciliation edge-case took 412ms (threshold 350ms)
=== 23/25 AUTOMATED TESTS PASSED (92%) ===`,
  },
  {
    id: 'sub_03',
    assignmentId: 'asg_01',
    assignmentTitle: 'Raft Consensus State Machine Implementation',
    courseCode: 'CS502',
    studentId: 'std_04',
    studentName: 'Priya Sharma',
    rollNo: 'CS-2024-815',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80',
    submittedAt: 'Yesterday, 11:15 PM',
    fileName: 'priya_raft_impl.tar.gz',
    fileSize: '1.8 MB',
    testPassRate: 96,
    grade: 'A',
    score: 94,
    maxScore: 100,
    feedback: 'Passed election race stress test. Great documentation and clean state diagram.',
    status: 'pending',
    codeSnippet: `type RaftNode struct {
    sync.Mutex
    peers       []*rpc.Client
    currentTerm int
    votedFor    int
    log         []LogEntry
    commitIndex int
    lastApplied int
    state       NodeRole
}`,
    executionLogs: `[INFO] Testing concurrent election triggers
[PASS] Test 1-20: Sequential & parallel node partition tests OK
[PASS] Test 24: Stress race detector (-race clean)
=== 24/25 AUTOMATED TESTS PASSED (96%) ===`,
  },
  {
    id: 'sub_04',
    assignmentId: 'asg_01',
    assignmentTitle: 'Raft Consensus State Machine Implementation',
    courseCode: 'CS502',
    studentId: 'std_05',
    studentName: 'Alex Chen',
    rollNo: 'CS-2024-822',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
    submittedAt: 'Sep 20, 2026',
    fileName: 'cs502_alex_chen.zip',
    fileSize: '840 KB',
    testPassRate: 80,
    grade: 'B+',
    score: 83,
    maxScore: 100,
    feedback: 'Needs work on candidate split-vote randomized timers. Heartbeat timeouts are slightly too aggressive.',
    status: 'pending',
    codeSnippet: `public synchronized void startElection() {
    this.currentTerm++;
    this.state = State.CANDIDATE;
    this.votedFor = this.nodeId;
    this.electionTimer.reset(ThreadLocalRandom.current().nextInt(150, 300));
}`,
    executionLogs: `[WARN] Split vote retry count exceeded 3 cycles in partition test
=== 20/25 AUTOMATED TESTS PASSED (80%) ===`,
  },
  {
    id: 'sub_05',
    assignmentId: 'asg_03',
    assignmentTitle: 'Packet Dissection & BGP Anomaly Detection in Python',
    courseCode: 'CS508',
    studentId: 'std_08',
    studentName: 'Ananya Deshmukh',
    rollNo: 'CS-2024-841',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
    submittedAt: 'Sep 21, 2026',
    fileName: 'ananya_bgp_parser.py',
    fileSize: '65 KB',
    testPassRate: 100,
    grade: 'A+',
    score: 97,
    maxScore: 100,
    feedback: 'Exceptional PCAP parser performance using Scapy. Caught all 5 simulated AS-path loop injections.',
    status: 'reviewed',
    codeSnippet: `from scapy.all import rdpcap, BGPHeader

def inspect_bgp_updates(pcap_path):
    packets = rdpcap(pcap_path)
    anomalies = []
    for pkt in packets:
        if pkt.haslayer(BGPHeader) and pkt[BGPHeader].type == 2: # UPDATE
            as_path = extract_as_path(pkt)
            if len(as_path) != len(set(as_path)):
                anomalies.append(('AS_LOOP_DETECTED', as_path))
    return anomalies`,
    executionLogs: `[INFO] Parsing 50,000 BGP Update frames...
[PASS] Completed in 1.42s
[PASS] Detected 5/5 Route Poison Injections
=== 10/10 TESTS PASSED (100%) ===`,
  },
];
