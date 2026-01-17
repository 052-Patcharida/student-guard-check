import * as React from "react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap,
  Users,
  Shield,
  ArrowRight,
  CheckCircle2,
  Clock,
  BookOpen,
} from "lucide-react";

export default function Index() {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Check if user has registration data
    const data = localStorage.getItem("registrationData");
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed.status === "approved") {
        navigate("/dashboard");
      } else if (parsed.status === "pending") {
        navigate("/pending");
      }
    }
  }, [navigate]);

  return (
    <MobileLayout showHeader={false}>
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <div className="gradient-hero px-6 pt-16 pb-24 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-primary-foreground" />
            <div className="absolute top-32 right-8 w-16 h-16 rounded-full bg-primary-foreground" />
            <div className="absolute bottom-20 left-20 w-20 h-20 rounded-full bg-primary-foreground" />
          </div>

          <div className="relative z-10 animate-fade-in">
            <div className="w-20 h-20 rounded-2xl bg-primary-foreground/20 flex items-center justify-center mx-auto mb-6 rotate-3 shadow-lg">
              <GraduationCap className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-primary-foreground mb-2">
              ระบบเช็คชื่อนักศึกษา
            </h1>
            <p className="text-primary-foreground/80 text-sm">
              Student Attendance System
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="flex-1 px-4 -mt-12 relative z-20">
          <Card className="shadow-elevated mb-4">
            <CardContent className="pt-6 space-y-4">
              <FeatureItem
                icon={CheckCircle2}
                title="เช็คชื่อด้วยใบหน้า"
                description="ระบบสแกนใบหน้าอัตโนมัติ รวดเร็วและแม่นยำ"
              />
              <FeatureItem
                icon={Clock}
                title="บันทึกเวลาอัตโนมัติ"
                description="บันทึกเวลาเข้า-ออก พร้อมสถานะมาเรียน/สาย/ขาด"
              />
              <FeatureItem
                icon={BookOpen}
                title="ติดตามผลการเข้าเรียน"
                description="ดูสถิติและประวัติการเข้าเรียนได้ทุกที่"
              />
            </CardContent>
          </Card>

          {/* Role Selection */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-center text-muted-foreground">
              เลือกบทบาทของคุณ
            </p>

            <Button
              className="w-full h-14 text-base gradient-primary shadow-soft justify-between"
              onClick={() => navigate("/signup")}
            >
              <span className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5" />
                นักศึกษา
              </span>
              <ArrowRight className="w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              className="w-full h-14 text-base justify-between border-2"
              onClick={() => navigate("/teacher")}
            >
              <span className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary" />
                อาจารย์
              </span>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </Button>

            <Button
              variant="outline"
              className="w-full h-14 text-base justify-between border-2"
              onClick={() => navigate("/admin")}
            >
              <span className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                ผู้ดูแลระบบ
              </span>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 Student Attendance System
          </p>
        </div>
      </div>
    </MobileLayout>
  );
}

interface FeatureItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

function FeatureItem({ icon: Icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex gap-3">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
    </div>
  );
}
