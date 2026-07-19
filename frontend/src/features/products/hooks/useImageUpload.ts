import { useState } from "react";
import { api } from "@/services/api";

export function useImageUpload() {
  const [isUploading, setIsUploading] =
    useState(false);

  const uploadImages = async (
    files: File[]
  ) => {
    try {
      setIsUploading(true);

      const formData = new FormData();

      files.forEach((file) => {
        formData.append(
          "images",
          file
        );
      });

      const response =
        await api.post(
          "/uploads/images",
          formData
        );

      return response.data.data;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadImages,
    isUploading,
  };
}