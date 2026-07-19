import cloudinary from "./cloudinary";
import streamifier from "streamifier";

export class UploadService {
  async upload(file: Express.Multer.File) {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "ramri/products",
        },
        (error, result) => {
          if (error) return reject(error);

          resolve({
            url: result!.secure_url,
            publicId: result!.public_id,
          });
        }
      );

      streamifier.createReadStream(file.buffer).pipe(stream);
    });
  }
}