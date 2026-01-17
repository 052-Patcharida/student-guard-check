import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { FileUpload } from "@/components/ui/file-upload";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, UserCircle, IdCard, Loader2 } from "lucide-react";

const majors = [
  "วิศวกรรมคอมพิวเตอร์",
  "วิศวกรรมไฟฟ้า",
  "วิศวกรรมเครื่องกล",
  "วิทยาการคอมพิวเตอร์",
  "เทคโนโลยีสารสนเทศ",
  "การจัดการธุรกิจ",
  "บัญชี",
  "นิเทศศาสตร์",
];

const years = [1, 2, 3, 4, 5];

export default function SignupPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    year: "",
    major: "",
    studentPhoto: null as File | null,
    idCardPhoto: null as File | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "กรุณากรอกชื่อ-นามสกุล";
    }

    if (!formData.studentId.trim()) {
      newErrors.studentId = "กรุณากรอกรหัสนักศึกษา";
    } else if (!/^\d{10,13}$/.test(formData.studentId)) {
      newErrors.studentId = "รหัสนักศึกษาต้องเป็นตัวเลข 10-13 หลัก";
    }

    if (!formData.year) {
      newErrors.year = "กรุณาเลือกชั้นปี";
    }

    if (!formData.major) {
      newErrors.major = "กรุณาเลือกสาขาวิชา";
    }

    if (!formData.studentPhoto) {
      newErrors.studentPhoto = "กรุณาอัปโหลดรูปถ่ายนักศึกษา";
    }

    if (!formData.idCardPhoto) {
      newErrors.idCardPhoto = "กรุณาอัปโหลดรูปบัตรนักศึกษา";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Store registration data (in real app, this would go to backend)
    localStorage.setItem(
      "registrationData",
      JSON.stringify({
        ...formData,
        studentPhoto: formData.studentPhoto?.name,
        idCardPhoto: formData.idCardPhoto?.name,
        status: "pending",
        submittedAt: new Date().toISOString(),
      })
    );

    setIsSubmitting(false);
    navigate("/pending");
  };

  return (
    <MobileLayout
      headerContent={
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-primary-foreground">
              ลงทะเบียนนักศึกษา
            </h1>
            <p className="text-xs text-primary-foreground/80">
              กรอกข้อมูลให้ครบถ้วน
            </p>
          </div>
        </div>
      }
    >
      <div className="p-4 pb-8 animate-fade-in">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Student Photo */}
          <Card className="shadow-card overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <UserCircle className="w-5 h-5 text-primary" />
                รูปถ่ายนักศึกษา
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FileUpload
                label=""
                description="รูปถ่ายหน้าตรง ชัดเจน"
                value={formData.studentPhoto}
                onChange={(file) =>
                  setFormData((prev) => ({ ...prev, studentPhoto: file }))
                }
                error={errors.studentPhoto}
              />
            </CardContent>
          </Card>

          {/* ID Card Photo */}
          <Card className="shadow-card overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <IdCard className="w-5 h-5 text-primary" />
                บัตรนักศึกษา
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FileUpload
                label=""
                description="ถ่ายบัตรนักศึกษาให้ชัดเจน"
                value={formData.idCardPhoto}
                onChange={(file) =>
                  setFormData((prev) => ({ ...prev, idCardPhoto: file }))
                }
                error={errors.idCardPhoto}
              />
            </CardContent>
          </Card>

          {/* Personal Info */}
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">ข้อมูลส่วนตัว</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">ชื่อ-นามสกุล</Label>
                <Input
                  id="name"
                  placeholder="กรอกชื่อ-นามสกุล"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentId">รหัสนักศึกษา</Label>
                <Input
                  id="studentId"
                  placeholder="เช่น 6401012345678"
                  value={formData.studentId}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      studentId: e.target.value,
                    }))
                  }
                  className={errors.studentId ? "border-destructive" : ""}
                />
                {errors.studentId && (
                  <p className="text-xs text-destructive">{errors.studentId}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>ชั้นปี</Label>
                  <Select
                    value={formData.year}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, year: value }))
                    }
                  >
                    <SelectTrigger
                      className={errors.year ? "border-destructive" : ""}
                    >
                      <SelectValue placeholder="เลือกชั้นปี" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          ปี {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.year && (
                    <p className="text-xs text-destructive">{errors.year}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>สาขาวิชา</Label>
                  <Select
                    value={formData.major}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, major: value }))
                    }
                  >
                    <SelectTrigger
                      className={errors.major ? "border-destructive" : ""}
                    >
                      <SelectValue placeholder="เลือกสาขา" />
                    </SelectTrigger>
                    <SelectContent>
                      {majors.map((major) => (
                        <SelectItem key={major} value={major}>
                          {major}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.major && (
                    <p className="text-xs text-destructive">{errors.major}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 text-base font-medium gradient-primary hover:opacity-90 transition-opacity shadow-soft"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                กำลังส่งข้อมูล...
              </>
            ) : (
              "ลงทะเบียน"
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            ข้อมูลจะถูกตรวจสอบภายใน 2 วันทำการ
          </p>
        </form>
      </div>
    </MobileLayout>
  );
}
