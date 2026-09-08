import { useState, useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const LogoUploader = ({ field, title = true }) => {
  const [preview, setPreview] = useState("");

  const blobUrlRef = useRef(null);

  const createPreview = (file) => {
    // Hapus Blob URL sebelumnya
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }

    const url = URL.createObjectURL(file);

    blobUrlRef.current = url;

    setPreview(url);
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (!file) return;

      // File asli masuk ke react-hook-form
      field.onChange(file);

      // Preview
      createPreview(file);
    },
    [field],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,

    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"],
    },

    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  });

  const clearImage = (e) => {
    e?.stopPropagation();

    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }

    setPreview("");

    field.onChange(null);
  };

  useEffect(() => {
    // Tidak ada value
    if (!field.value) {
      return;
    }

    // File baru
    if (field.value instanceof File) {
      // Preview sudah dibuat oleh onDrop
      return;
    }

    // URL dari database
    if (typeof field.value === "string") {
      setPreview(field.value);
    }
  }, [field.value]);

  useEffect(() => {
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
    };
  }, []);

  return (
    <FormItem>
      {title && <FormLabel>Logo</FormLabel>}

      <FormControl>
        <div className="space-y-4">
          <div
            {...getRootProps()}
            className={`
              border-2
              border-dashed
              rounded-lg
              p-6
              text-center
              cursor-pointer
              transition-colors
              ${
                isDragActive
                  ? "border-primary bg-primary/5"
                  : "border-gray-300 hover:border-primary/50"
              }
            `}
          >
            <input {...getInputProps()} />

            {preview ? (
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={preview} alt="Logo preview" />

                  <AvatarFallback>Logo</AvatarFallback>
                </Avatar>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={clearImage}
                >
                  <X className="mr-2 h-4 w-4" />
                  Remove
                </Button>
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

          {field.value instanceof File && (
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span className="truncate max-w-[250px]">{field.value.name}</span>

              <span className="text-xs">
                {(field.value.size / 1024).toFixed(1)} KB
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
