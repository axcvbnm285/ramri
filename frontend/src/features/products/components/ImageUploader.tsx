"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { X, Upload, Loader2 } from "lucide-react";

import { useImageUpload } from "../hooks/useImageUpload";

interface ProductImage {
  url: string;
  publicId: string;
}

export default function ImageUploader() {
  const { setValue, watch } = useFormContext();

  const images: ProductImage[] =
    watch("images") || [];

  const {
    uploadImages,
    isUploading,
  } = useImageUpload();

  const onDrop = useCallback(
    async (files: File[]) => {
      try {
        const uploadedImages =
          await uploadImages(files);

        const updatedImages = [
          ...images,
          ...uploadedImages,
        ];

        setValue(
          "images",
          updatedImages,
          {
            shouldDirty: true,
            shouldValidate: true,
          }
        );
      } catch (error) {
        console.error(
          "Image upload failed:",
          error
        );
      }
    },
    [images, setValue, uploadImages]
  );

  const removeImage = (
    publicId: string
  ) => {
    const updatedImages =
      images.filter(
        (image) =>
          image.publicId !== publicId
      );

    setValue(
      "images",
      updatedImages,
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,

    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },

    maxFiles: 10,

    disabled: isUploading,
  });

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">
        Product Images
      </h2>

      <div
        {...getRootProps()}
        className="cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition hover:border-black"
      >
        <input {...getInputProps()} />

        {isUploading ? (
          <div className="flex flex-col items-center">
            <Loader2
              size={30}
              className="animate-spin"
            />

            <p className="mt-3 text-sm text-gray-500">
              Uploading images...
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload size={30} />

            <p className="mt-3 font-medium">
              {isDragActive
                ? "Drop images here"
                : "Drag & drop images here"}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              or click to select images
            </p>
          </div>
        )}
      </div>

      {images.length > 0 && (
        <div className="mt-5 grid grid-cols-2 gap-4">
          {images.map((image) => (
            <div
              key={image.publicId}
              className="relative overflow-hidden rounded-lg border"
            >
              <img
                src={image.url}
                alt="Product"
                className="h-40 w-full object-cover"
              />

              <button
                type="button"
                onClick={() =>
                  removeImage(
                    image.publicId
                  )
                }
                className="absolute right-2 top-2 rounded-full bg-black p-1 text-white"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}