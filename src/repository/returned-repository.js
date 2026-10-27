import ReturnedModel from "../model/returned-model.js";

class ReturnedRepository {
  async create(returned_info, session) {
    const [returned_vehicle] = await ReturnedModel.create([returned_info], {
      session,
    });

    return returned_vehicle;
  }
}

export default new ReturnedRepository();
