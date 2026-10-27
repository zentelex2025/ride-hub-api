import DocumentsModel from "../model/documents-model.js";

class DocumentsRepository {
  async create(documents_info) {
    return await DocumentsModel.create({ ...documents_info });
  }

  async findById(id) {
    return await DocumentsModel.findById(id);
  }

  async findByUserId(id, session) {
    return await DocumentsModel.findOne({ user_id: id }).session(session);
  }
}

export default new DocumentsRepository();
