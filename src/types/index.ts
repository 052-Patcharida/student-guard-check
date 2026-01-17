export type UserRole = "student" | "teacher" | "admin";

export type RegistrationStatus = "pending" | "approved" | "rejected";

export type AttendanceStatus = "present" | "late" | "absent" | "leave";

export interface Student {
  id: string;
  studentId: string;
  name: string;
  year: number;
  major: string;
  photoUrl: string;
  idCardUrl: string;
  registrationStatus: RegistrationStatus;
  createdAt: Date;
  approvedAt?: Date;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  teacherId: string;
  lateThresholdMinutes: number;
  schedule: SubjectSchedule[];
}

export interface SubjectSchedule {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:mm
  endTime: string; // HH:mm
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  date: Date;
  timeIn?: string;
  timeOut?: string;
  status: AttendanceStatus;
  approvedByTeacher: boolean;
  teacherNote?: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  subjects: string[];
}

export interface PendingApproval {
  id: string;
  studentId: string;
  studentName: string;
  subjectId: string;
  subjectName: string;
  date: Date;
  requestedStatus: AttendanceStatus;
  reason?: string;
}
