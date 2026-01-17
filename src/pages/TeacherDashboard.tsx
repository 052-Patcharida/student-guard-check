import * as React from "react";
import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Users,
  Clock,
  Settings,
  CheckCircle2,
  XCircle,
  User,
  BookOpen,
  AlertCircle,
} from "lucide-react";
import type { AttendanceStatus } from "@/types";
import { toast } from "sonner";

// Mock data
const mockSubjects = [
  {
    id: "1",
    code: "CS101",
    name: "การเขียนโปรแกรมเบื้องต้น",
    lateThresholdMinutes: 15,
  },
  { id: "2", code: "CS201", name: "โครงสร้างข้อมูล", lateThresholdMinutes: 10 },
  { id: "3", code: "CS301", name: "ฐานข้อมูล", lateThresholdMinutes: 15 },
];

const mockPendingApprovals = [
  {
    id: "1",
    studentId: "6401012345678",
    studentName: "สมชาย ใจดี",
    subjectCode: "CS101",
    subjectName: "การเขียนโปรแกรมเบื้องต้น",
    date: new Date("2024-01-15"),
    currentStatus: "absent" as AttendanceStatus,
    reason: "เครื่องสแกนไม่ติด กรุณาอนุมัติด้วยครับ",
  },
  {
    id: "2",
    studentId: "6401012345679",
    studentName: "สมหญิง ดีใจ",
    subjectCode: "CS101",
    subjectName: "การเขียนโปรแกรมเบื้องต้น",
    date: new Date("2024-01-15"),
    currentStatus: "absent" as AttendanceStatus,
    reason: "แอปค้าง สแกนหน้าไม่ได้",
  },
];

const mockStudentsToday = [
  {
    id: "1",
    studentId: "6401012345678",
    name: "สมชาย ใจดี",
    timeIn: "08:55",
    status: "present" as AttendanceStatus,
  },
  {
    id: "2",
    studentId: "6401012345679",
    name: "สมหญิง ดีใจ",
    timeIn: "09:18",
    status: "late" as AttendanceStatus,
  },
  {
    id: "3",
    studentId: "6401012345680",
    name: "สมศักดิ์ มั่นคง",
    timeIn: null,
    status: "absent" as AttendanceStatus,
  },
  {
    id: "4",
    studentId: "6401012345681",
    name: "สมปอง รักเรียน",
    timeIn: "08:50",
    status: "present" as AttendanceStatus,
  },
];

export default function TeacherDashboard() {
  const [selectedSubject, setSelectedSubject] = useState(mockSubjects[0]);
  const [pendingApprovals, setPendingApprovals] = useState(mockPendingApprovals);
  const [lateThreshold, setLateThreshold] = useState(
    selectedSubject.lateThresholdMinutes.toString()
  );

  const handleApprove = (id: string) => {
    setPendingApprovals((prev) => prev.filter((p) => p.id !== id));
    toast.success("อนุมัติการเข้าเรียนเรียบร้อย");
  };

  const handleReject = (id: string) => {
    setPendingApprovals((prev) => prev.filter((p) => p.id !== id));
    toast.error("ปฏิเสธคำขอเรียบร้อย");
  };

  const handleSaveSettings = () => {
    toast.success(`บันทึกการตั้งค่าสาย ${lateThreshold} นาที สำหรับ ${selectedSubject.code}`);
  };

  return (
    <MobileLayout
      headerContent={
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-primary-foreground">
              อาจารย์ผู้สอน
            </h1>
            <p className="text-xs text-primary-foreground/80">
              ระบบจัดการการเข้าเรียน
            </p>
          </div>
        </div>
      }
    >
      <div className="p-4 pb-8 animate-fade-in">
        {/* Subject Selector */}
        <Card className="shadow-card mb-4">
          <CardContent className="pt-4">
            <Label className="text-sm text-muted-foreground">
              เลือกรายวิชา
            </Label>
            <Select
              value={selectedSubject.id}
              onValueChange={(value) => {
                const subject = mockSubjects.find((s) => s.id === value);
                if (subject) {
                  setSelectedSubject(subject);
                  setLateThreshold(subject.lateThresholdMinutes.toString());
                }
              }}
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {mockSubjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.code} - {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Tabs defaultValue="attendance">
          <TabsList className="w-full grid grid-cols-3 h-10">
            <TabsTrigger value="attendance" className="text-xs">
              <Users className="w-4 h-4 mr-1" />
              เช็คชื่อ
            </TabsTrigger>
            <TabsTrigger value="pending" className="text-xs relative">
              <Clock className="w-4 h-4 mr-1" />
              รออนุมัติ
              {pendingApprovals.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] rounded-full flex items-center justify-center">
                  {pendingApprovals.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-xs">
              <Settings className="w-4 h-4 mr-1" />
              ตั้งค่า
            </TabsTrigger>
          </TabsList>

          {/* Attendance List */}
          <TabsContent value="attendance" className="mt-4">
            <Card className="shadow-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    รายชื่อนักศึกษา
                  </span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {new Date().toLocaleDateString("th-TH", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[350px]">
                  <div className="space-y-2">
                    {mockStudentsToday.map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="w-9 h-9">
                            <AvatarFallback className="bg-primary/10 text-primary text-sm">
                              {student.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{student.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {student.studentId}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <StatusBadge status={student.status} />
                          {student.timeIn && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {student.timeIn}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pending Approvals */}
          <TabsContent value="pending" className="mt-4 space-y-3">
            {pendingApprovals.length === 0 ? (
              <Card className="shadow-card">
                <CardContent className="py-8 text-center">
                  <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    ไม่มีคำขออนุมัติที่รอดำเนินการ
                  </p>
                </CardContent>
              </Card>
            ) : (
              pendingApprovals.map((approval) => (
                <Card key={approval.id} className="shadow-card">
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-warning/10 text-warning">
                          <AlertCircle className="w-5 h-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium">
                            {approval.studentName}
                          </h4>
                          <StatusBadge status={approval.currentStatus} />
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {approval.studentId} • {approval.subjectCode}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {approval.date.toLocaleDateString("th-TH")}
                        </p>
                        <div className="mt-2 p-2 bg-muted rounded text-xs">
                          <span className="font-medium">เหตุผล: </span>
                          {approval.reason}
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            className="flex-1 bg-success hover:bg-success/90"
                            onClick={() => handleApprove(approval.id)}
                          >
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            อนุมัติ
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="flex-1"
                            onClick={() => handleReject(approval.id)}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            ปฏิเสธ
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="mt-4">
            <Card className="shadow-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  ตั้งค่ารายวิชา
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium">{selectedSubject.code}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedSubject.name}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lateThreshold">
                    เวลาสาย (นาที หลังเริ่มเรียน)
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="lateThreshold"
                      type="number"
                      min="5"
                      max="60"
                      value={lateThreshold}
                      onChange={(e) => setLateThreshold(e.target.value)}
                      className="flex-1"
                    />
                    <span className="flex items-center text-sm text-muted-foreground">
                      นาที
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    นักศึกษาที่เข้าเรียนหลังเวลานี้จะถูกบันทึกเป็น "มาสาย"
                  </p>
                </div>

                <Button
                  className="w-full gradient-primary"
                  onClick={handleSaveSettings}
                >
                  บันทึกการตั้งค่า
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
}
