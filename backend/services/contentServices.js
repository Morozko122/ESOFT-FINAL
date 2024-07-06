const Content = require('../models/contentModel');
const mimeTypeToTypeId = {
  'image/jpeg': 1, 
  'image/png': 1, 
  'video/mp4': 2, 
  'video/x-msvideo': 2 
};
class ContentService {
  static async createContent(contentData, userId, mediaFile) {
    try {
      if (mediaFile) {
        contentData.path = mediaFile.filename;
        
        console.log(contentData.path);

        const typeId = mimeTypeToTypeId[mediaFile.mimetype];
        if (!typeId) {
          throw new Error('Unsupported file type');
        }
        contentData.type_id = typeId;
      }
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
