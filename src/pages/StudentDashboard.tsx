import * as React from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CalendarDays,
  Clock,
  BookOpen,
  TrendingUp,
  User,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import type { AttendanceStatus } from "@/types";

// Mock data
const mockStudent = {
  name: "สมชาย ใจดี",
  studentId: "6401012345678",
  year: 3,
  major: "วิศวกรรมคอมพิวเตอร์",
  photoUrl: "",
};

const mockAttendanceRecords = [
  {
    id: "1",
    date: new Date("2024-01-15"),
    subjectCode: "CS101",
    subjectName: "การเขียนโปรแกรมเบื้องต้น",
    timeIn: "08:55",
    timeOut: "12:00",
    status: "present" as AttendanceStatus,
    schedule: "08:00 - 12:00",
  },
  {
    id: "2",
    date: new Date("2024-01-15"),
    subjectCode: "CS201",
    subjectName: "โครงสร้างข้อมูล",
    timeIn: "13:15",
    timeOut: "16:00",
    status: "late" as AttendanceStatus,
    schedule: "13:00 - 16:00",
  },
  {
    id: "3",
    date: new Date("2024-01-14"),
    subjectCode: "CS301",
    subjectName: "ฐานข้อมูล",
    timeIn: null,
    timeOut: null,
    status: "absent" as AttendanceStatus,
    schedule: "09:00 - 12:00",
  },
  {
    id: "4",
    date: new Date("2024-01-14"),
    subjectCode: "CS101",
    subjectName: "การเขียนโปรแกรมเบื้องต้น",
    timeIn: "08:50",
    timeOut: "12:00",
    status: "present" as AttendanceStatus,
    schedule: "08:00 - 12:00",
  },
  {
    id: "5",
    date: new Date("2024-01-13"),
    subjectCode: "GE101",
    subjectName: "ภาษาอังกฤษ 1",
    timeIn: null,
    timeOut: null,
    status: "leave" as AttendanceStatus,
    schedule: "10:00 - 12:00",
  },
];

const mockStats = {
  present: 15,
  late: 3,
  absent: 2,
  leave: 1,
  total: 21,
};

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [registrationData, setRegistrationData] = React.useState<any>(null);

  React.useEffect(() => {
    const data = localStorage.getItem("registrationData");
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed.status !== "approved") {
        navigate("/pending");
      } else {
        setRegistrationData(parsed);
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("registrationData");
    navigate("/");
  };

  const studentData = registrationData
    ? {
        ...mockStudent,
        name: registrationData.name,
        studentId: registrationData.studentId,
        year: parseInt(registrationData.year),
        major: registrationData.major,
      }
    : mockStudent;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("th-TH", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  return (
    <MobileLayout
      headerContent={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border-2 border-primary-foreground/30">
              <AvatarImage src={studentData.photoUrl} />
              <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground">
                <User className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-sm font-semibold text-primary-foreground">
                {studentData.name}
              </h1>
              <p className="text-xs text-primary-foreground/70">
                {studentData.studentId}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/10"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      }
    >
      <div className="pb-4 animate-fade-in">
        {/* Stats Cards */}
        <div className="px-4 -mt-2">
          <Card className="shadow-elevated border-0 overflow-hidden">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">
                  สรุปการเข้าเรียน
                </h3>
                <span className="text-xs text-muted-foreground">
                  ทั้งหมด {mockStats.total} คาบ
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <StatCard
                  label="มาเรียน"
                  value={mockStats.present}
                  color="success"
                />
                <StatCard label="สาย" value={mockStats.late} color="warning" />
                <StatCard
                  label="ขาด"
                  value={mockStats.absent}
                  color="destructive"
                />
                <StatCard label="ลา" value={mockStats.leave} color="info" />
              </div>

              {/* Attendance Rate */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    อัตราการเข้าเรียน
                  </span>
                  <span className="text-sm font-semibold text-success">
                    {Math.round(
                      ((mockStats.present + mockStats.late) / mockStats.total) *
                        100
                    )}
                    %
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-success rounded-full transition-all"
                    style={{
                      width: `${((mockStats.present + mockStats.late) / mockStats.total) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="today" className="mt-4">
          <div className="px-4">
            <TabsList className="w-full grid grid-cols-2 h-10">
              <TabsTrigger value="today" className="text-sm">
                <CalendarDays className="w-4 h-4 mr-2" />
                วันนี้
              </TabsTrigger>
              <TabsTrigger value="history" className="text-sm">
                <Clock className="w-4 h-4 mr-2" />
                ประวัติ
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="today" className="mt-4 px-4">
            <Card className="shadow-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  วิชาเรียนวันนี้
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockAttendanceRecords
                  .filter((r) => r.date.toDateString() === new Date("2024-01-15").toDateString())
                  .map((record) => (
                    <AttendanceCard key={record.id} record={record} />
                  ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <ScrollArea className="h-[400px] px-4">
              <div className="space-y-3">
                {mockAttendanceRecords.map((record) => (
                  <AttendanceCard
                    key={record.id}
                    record={record}
                    showDate
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  color: "success" | "warning" | "destructive" | "info";
}

function StatCard({ label, value, color }: StatCardProps) {
  const colorClasses = {
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    destructive: "bg-destructive/10 text-destructive",
    info: "bg-info/10 text-info",
  };

  return (
    <div
      className={`rounded-lg p-3 text-center ${colorClasses[color]}`}
    >
      <p className="text-xl font-bold">{value}</p>
      <p className="text-xs mt-0.5">{label}</p>
    </div>
  );
}

interface AttendanceCardProps {
  record: {
    id: string;
    date: Date;
    subjectCode: string;
    subjectName: string;
    timeIn: string | null;
    timeOut: string | null;
    status: AttendanceStatus;
    schedule: string;
  };
  showDate?: boolean;
}

function AttendanceCard({ record, showDate }: AttendanceCardProps) {
  return (
    <div className="bg-card border rounded-lg p-3 shadow-sm">
      {showDate && (
        <p className="text-xs text-muted-foreground mb-2">
          {record.date.toLocaleDateString("th-TH", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      )}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
              {record.subjectCode}
            </span>
            <StatusBadge status={record.status} />
          </div>
          <h4 className="text-sm font-medium mt-1.5">{record.subjectName}</h4>
          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {record.schedule}
            </span>
          </div>
        </div>
      </div>
      {record.timeIn && (
        <div className="mt-3 pt-3 border-t flex gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">เข้า: </span>
            <span className="font-medium text-success">{record.timeIn}</span>
          </div>
          {record.timeOut && (
            <div>
              <span className="text-muted-foreground">ออก: </span>
              <span className="font-medium">{record.timeOut}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
