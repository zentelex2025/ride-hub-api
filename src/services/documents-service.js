import logger from "../config/logger.js";
import documentsRepository from "../repository/documents-repository.js";
import base64ToUrl from "../utils/base64-to-url.js";
import AppError from "../utils/error-class.js";

class DocumentsService {
  constructor(documentsRepository) {
    this.documentsRepository = documentsRepository;
  }

  async createDocuments(id, documents_info) {
    try {
      documents_info.user_id = id;

      /* converting base64 to url for the aadhaar image */
      if (documents_info.aadhaar_card_image?.length) {
        if (documents_info.aadhaar_card_image.length > 2) {
          throw new AppError("Maximum 2 Aadhaar images are allowed.", 400);
        }

        documents_info.aadhaar_card_image = await base64ToUrl(
          documents_info.aadhaar_card_image,
        );
      }

      /* converting base64 to url for the pan image */

      if (documents_info.pan_card_image) {
        const [pan_url] = await base64ToUrl([documents_info.pan_card_image]);

        documents_info.pan_card_image = pan_url;
      }

      /* converting base64 to url for the license image */

      if (documents_info.license_image) {
        const [license_url] = await base64ToUrl([documents_info.license_image]);

        documents_info.license_image = license_url;
      }

      return await this.documentsRepository.create(documents_info);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      logger.error("catch documents-service createDocuments", error);
      throw new AppError("Failed to create documents.", 500);
    }
  }
}

export default new DocumentsService(documentsRepository);
