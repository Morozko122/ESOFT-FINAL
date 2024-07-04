const Content = require('../models/contentModel');

class ContentService {
  static async createContent(contentData, userId) {
    try {
      const content = await Content.create({
        ...contentData,
        user_id: userId,
      });
      return content;
    } catch (error) {
      throw error;
    }
  }

  static async getContent({ page, limit}, searchParams) {
    try {
      const offset = (page - 1) * limit;
      const orderParams = searchParams ? [[searchParams, 'DESC']] : [['upload_date', 'DESC']];
      const contents = await Content.findAndCountAll({
        order: orderParams,
        offset,
        limit: parseInt(limit, 10),
      });
      return contents;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ContentService;
