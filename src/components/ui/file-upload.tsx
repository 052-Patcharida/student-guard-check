import * as React from "react";
import { cn } from "@/lib/utils";
import { Upload, X, Image as ImageIcon, FileCheck } from "lucide-react";

interface FileUploadProps {
  accept?: string;
  onChange: (file: File | null) => void;
  value?: File | null;
  label: string;
  description?: string;
  className?: string;
  error?: string;
}

export function FileUpload({
  accept = ".png,.jpg,.jpeg",
  onChange,
  value,
  label,
  description,
  className,
  error,
}: FileUploadProps) {
  const [preview, setPreview] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (value) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(value);
    } else {
      setPreview(null);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        alert("กรุณาเลือกไฟล์ PNG หรือ JPG เท่านั้น");
        return;
      }
      onChange(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-4 transition-all cursor-pointer",
          "hover:border-primary/50 hover:bg-primary/5",
          preview ? "border-success/50 bg-success/5" : "border-border",
          error && "border-destructive/50 bg-destructive/5"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />

        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-32 object-cover rounded-md"
            />
            <button
              onClick={handleRemove}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-md"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-success/90 text-success-foreground px-2 py-1 rounded text-xs">
              <FileCheck className="w-3 h-3" />
              อัปโหลดแล้ว
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-4 text-muted-foreground">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm font-medium">คลิกเพื่ออัปโหลด</p>
            {description && (
              <p className="text-xs mt-1 text-center">{description}</p>
            )}
            <p className="text-xs mt-2 text-muted-foreground/70">
              รองรับ PNG, JPG เท่านั้น
            </p>
          </div>
        )}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
