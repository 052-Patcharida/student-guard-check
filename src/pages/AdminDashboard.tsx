import * as React from "react";
import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Shield,
  User,
  CheckCircle2,
  XCircle,
  Eye,
  Clock,
  Users,
  UserCheck,
  UserX,
} from "lucide-react";
import { toast } from "sonner";

// Mock pending registrations
const mockPendingRegistrations = [
  {
    id: "1",
    name: "สมชาย ใจดี",
    studentId: "6401012345678",
    year: 3,
    major: "วิศวกรรมคอมพิวเตอร์",
    submittedAt: new Date("2024-01-14"),
    photoUrl: "",
    idCardUrl: "",
  },
  {
    id: "2",
    name: "สมหญิง ดีใจ",
    studentId: "6401012345679",
    year: 2,
    major: "วิทยาการคอมพิวเตอร์",
    submittedAt: new Date("2024-01-14"),
    photoUrl: "",
    idCardUrl: "",
  },
  {
    id: "3",
    name: "สมศักดิ์ มั่นคง",
    studentId: "6401012345680",
    year: 4,
    major: "เทคโนโลยีสารสนเทศ",
    submittedAt: new Date("2024-01-15"),
    photoUrl: "",
    idCardUrl: "",
  },
];

export default function AdminDashboard() {
  const [pendingRegistrations, setPendingRegistrations] = useState(
    mockPendingRegistrations
  );
  const [selectedStudent, setSelectedStudent] = useState<
    (typeof mockPendingRegistrations)[0] | null
  >(null);

  const handleApprove = (id: string) => {
    setPendingRegistrations((prev) => prev.filter((p) => p.id !== id));
    setSelectedStudent(null);
    toast.success("อนุมัติการลงทะเบียนเรียบร้อย");
  };

  const handleReject = (id: string) => {
    setPendingRegistrations((prev) => prev.filter((p) => p.id !== id));
    setSelectedStudent(null);
    toast.error("ปฏิเสธการลงทะเบียน");
  };

  const stats = {
    pending: pendingRegistrations.length,
    approved: 45,
    rejected: 3,
  };

  return (
    <MobileLayout
      headerContent={
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-primary-foreground">
              Admin Panel
            </h1>
            <p className="text-xs text-primary-foreground/80">
              จัดการการลงทะเบียนนักศึกษา
            </p>
          </div>
        </div>
      }
    >
      <div className="p-4 pb-8 animate-fade-in">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <Card className="shadow-card">
            <CardContent className="pt-4 text-center">
              <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-2">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <p className="text-2xl font-bold text-warning">{stats.pending}</p>
              <p className="text-xs text-muted-foreground">รอตรวจสอบ</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="pt-4 text-center">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-2">
                <UserCheck className="w-5 h-5 text-success" />
              </div>
              <p className="text-2xl font-bold text-success">{stats.approved}</p>
              <p className="text-xs text-muted-foreground">อนุมัติแล้ว</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="pt-4 text-center">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-2">
                <UserX className="w-5 h-5 text-destructive" />
              </div>
              <p className="text-2xl font-bold text-destructive">
                {stats.rejected}
              </p>
              <p className="text-xs text-muted-foreground">ปฏิเสธ</p>
            </CardContent>
          </Card>
        </div>

        {/* Pending Registrations */}
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              รอการตรวจสอบ
              {pendingRegistrations.length > 0 && (
                <Badge variant="secondary" className="ml-auto">
                  {pendingRegistrations.length} รายการ
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pendingRegistrations.length === 0 ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-3" />
                <p className="text-muted-foreground">
                  ไม่มีรายการรอตรวจสอบ
                </p>
              </div>
            ) : (
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {pendingRegistrations.map((student) => (
                    <div
                      key={student.id}
                      className="p-4 bg-muted/50 rounded-lg space-y-3"
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={student.photoUrl} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            <User className="w-6 h-6" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {student.studentId}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              ปี {student.year}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {student.major}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            ส่งเมื่อ{" "}
                            {student.submittedAt.toLocaleDateString("th-TH", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => setSelectedStudent(student)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              ดูรายละเอียด
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-sm mx-4">
                            <DialogHeader>
                              <DialogTitle>ข้อมูลนักศึกษา</DialogTitle>
                            </DialogHeader>
                            {selectedStudent && (
                              <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                  <Avatar className="w-16 h-16">
                                    <AvatarFallback className="bg-primary/10 text-primary text-xl">
                                      {selectedStudent.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="font-medium">
                                      {selectedStudent.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedStudent.studentId}
                                    </p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">
                                      ชั้นปี:
                                    </span>
                                    <span className="ml-1 font-medium">
                                      ปี {selectedStudent.year}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">
                                      สาขา:
                                    </span>
                                    <span className="ml-1 font-medium">
                                      {selectedStudent.major}
                                    </span>
                                  </div>
                                </div>

                                {/* Placeholder for ID Card */}
                                <div className="border rounded-lg p-4 bg-muted/50">
                                  <p className="text-sm text-muted-foreground text-center">
                                    รูปบัตรนักศึกษา
                                  </p>
                                  <div className="aspect-video bg-muted rounded mt-2 flex items-center justify-center">
                                    <User className="w-12 h-12 text-muted-foreground/50" />
                                  </div>
                                </div>

                                <div className="flex gap-2 pt-2">
                                  <Button
                                    className="flex-1 bg-success hover:bg-success/90"
                                    onClick={() =>
                                      handleApprove(selectedStudent.id)
                                    }
                                  >
                                    <CheckCircle2 className="w-4 h-4 mr-1" />
                                    อนุมัติ
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    className="flex-1"
                                    onClick={() =>
                                      handleReject(selectedStudent.id)
                                    }
                                  >
                                    <XCircle className="w-4 h-4 mr-1" />
                                    ปฏิเสธ
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          className="bg-success hover:bg-success/90"
                          onClick={() => handleApprove(student.id)}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(student.id)}
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
}
