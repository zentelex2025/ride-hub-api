import logger from "../config/logger.js";
import cloudinary from "./cloudinary-config.js";
import AppError from "./error-class.js";

export default async function base64ToUrl(base64_array) {
  try {
    logger.info(`here is total ${base64_array.length} array of base64`);

    if (base64_array.length === 0) return;
    const upload_results = await Promise.all(
      base64_array.map((base64_image) =>
        cloudinary.uploader.upload(base64_image),
      ),
    );

    const image_urls = upload_results.map((result) => result.secure_url);

    return image_urls;
  } catch (error) {
    logger.error("base64ToUrl", error);
    throw new AppError(
      error?.message ?? "cloudinary failed to send image url",
      500,
    );
  }
}
