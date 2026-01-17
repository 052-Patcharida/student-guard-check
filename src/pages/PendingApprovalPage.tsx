import * as React from "react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CheckCircle2, FileSearch, Bell } from "lucide-react";

export default function PendingApprovalPage() {
  const navigate = useNavigate();
  const [registrationData, setRegistrationData] = React.useState<any>(null);

  React.useEffect(() => {
    const data = localStorage.getItem("registrationData");
    if (data) {
      setRegistrationData(JSON.parse(data));
    }
  }, []);

  // For demo: allow bypassing to dashboard
  const handleDemoApproval = () => {
    if (registrationData) {
      localStorage.setItem(
        "registrationData",
        JSON.stringify({ ...registrationData, status: "approved" })
      );
    }
    navigate("/dashboard");
  };

  return (
    <MobileLayout showHeader={false}>
      <div className="flex flex-col min-h-screen">
        {/* Header with gradient */}
        <div className="gradient-hero px-6 pt-12 pb-20 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary-foreground animate-pulse-soft" />
            <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-primary-foreground animate-pulse-soft delay-300" />
            <div className="absolute bottom-10 left-20 w-16 h-16 rounded-full bg-primary-foreground animate-pulse-soft delay-500" />
          </div>

          <div className="relative z-10">
            <div className="w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-4 animate-spin-slow">
              <Clock className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-primary-foreground mb-2">
              รอการอนุมัติ
            </h1>
            <p className="text-primary-foreground/80 text-sm">
              ข้อมูลของคุณอยู่ระหว่างการตรวจสอบ
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-4 -mt-10 relative z-20">
          <Card className="shadow-elevated">
            <CardContent className="pt-6 space-y-6">
              {/* Steps */}
              <div className="space-y-4">
                <StepItem
                  icon={FileSearch}
                  title="ส่งข้อมูลลงทะเบียนแล้ว"
                  description="ระบบได้รับข้อมูลของคุณเรียบร้อย"
                  completed
                />
                <StepItem
                  icon={Clock}
                  title="กำลังตรวจสอบข้อมูล"
                  description="Admin กำลังตรวจสอบข้อมูลและเอกสาร"
                  active
                />
                <StepItem
                  icon={CheckCircle2}
                  title="อนุมัติการลงทะเบียน"
                  description="หลังอนุมัติจะสามารถใช้งานระบบได้"
                />
              </div>

              {/* Info Box */}
              <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                <div className="flex gap-3">
                  <Bell className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-foreground">
                      การแจ้งเตือน
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      ระบบจะแจ้งเตือนผ่านแอปพลิเคชันเมื่อการลงทะเบียนได้รับการอนุมัติ
                      โดยปกติใช้เวลา 1-2 วันทำการ
                    </p>
                  </div>
                </div>
              </div>

              {/* Registration Summary */}
              {registrationData && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">
                    ข้อมูลที่ลงทะเบียน
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">ชื่อ:</span>
                      <span className="ml-1 font-medium">
                        {registrationData.name}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">รหัส:</span>
                      <span className="ml-1 font-medium">
                        {registrationData.studentId}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">ชั้นปี:</span>
                      <span className="ml-1 font-medium">
                        ปี {registrationData.year}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">สาขา:</span>
                      <span className="ml-1 font-medium">
                        {registrationData.major}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Demo Button */}
          <div className="mt-6 space-y-3">
            <Button
              onClick={handleDemoApproval}
              className="w-full gradient-primary shadow-soft"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              [Demo] จำลองการอนุมัติ
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              ปุ่มนี้สำหรับทดสอบระบบเท่านั้น
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 text-center">
          <p className="text-xs text-muted-foreground">
            หากมีข้อสงสัย กรุณาติดต่อฝ่ายทะเบียน
          </p>
        </div>
      </div>
    </MobileLayout>
  );
}

interface StepItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
  completed?: boolean;
  active?: boolean;
}

function StepItem({
  icon: Icon,
  title,
  description,
  completed,
  active,
}: StepItemProps) {
  return (
    <div className="flex gap-3">
      <div
        className={`
          w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
          ${completed ? "bg-success text-success-foreground" : ""}
          ${active ? "bg-primary text-primary-foreground animate-pulse-soft" : ""}
          ${!completed && !active ? "bg-muted text-muted-foreground" : ""}
        `}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 pt-1">
        <h4
          className={`text-sm font-medium ${
            completed || active ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {title}
        </h4>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
    </div>
  );
}
