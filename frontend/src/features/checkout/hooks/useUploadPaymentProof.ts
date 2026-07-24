import { useState } from "react";
import { api } from "@/services/api";

export function useUploadPaymentProof() {
  const [isUploading, setIsUploading] = useState(false);

  const uploadProof = async (file: File): Promise<{ url: string; publicId: string }> => {
    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("proof", file);

      const response = await api.post("/uploads/payment-proof", formData);

      return response.data.data;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadProof, isUploading };
}
