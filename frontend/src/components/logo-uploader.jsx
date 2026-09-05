import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus, X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const LogoUploader = ({ field }) => {
  const [preview, setPreview] = useState(field.value || "");
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result;
          setPreview(result);
          field.onChange(result);
        };
        reader.readAsDataURL(file);
      }
    },
    [field],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setPreview(url);
    field.onChange(url);
  };

  const clearImage = () => {
    setPreview("");
    field.onChange("");
  };

  return (
    <FormItem>
      <FormLabel>Logo</FormLabel>
      <FormControl>
        <div className="space-y-4">
          {/* URL Input */}

          {/* Dropzone Area */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-gray-300 hover:border-primary/50"
            }`}
          >
            <input {...getInputProps()} />

            {preview ? (
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={preview} alt="Logo preview" />
                  <AvatarFallback>Logo</AvatarFallback>
                </Avatar>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearImage();
                    }}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Hapus
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 bg-muted rounded-full">
                  <ImagePlus className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Drag & Drop Logo</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG, SVG, WebP (Max 5MB)
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* File Info */}
          {preview && (
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Preview logo</span>
              <span className="text-xs">
                {preview.startsWith("data:") ? "File uploaded" : "URL image"}
              </span>
            </div>
          )}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default LogoUploader;
