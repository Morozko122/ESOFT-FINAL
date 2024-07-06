const ContentService = require('../services/contentServices');

class ContentController {
  static async createContent(req, res) {
    try {
      const userId = req.user.userId;
      const contentData = req.body;
      const mediaFile = req.files['mediaFile'][0];
      const newContent = await ContentService.createContent(contentData, userId, mediaFile);
      res.status(201).json(newContent);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при создании контента', error: error.message });
    }
  }

  static async getContent(req, res, searchParams) {
    try {
      const { page = 1, limit = 10} = req.query;
      const getContent = await ContentService.getContent({ page, limit}, searchParams);
      res.status(200).json(getContent);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении контента', error: error.message });
    }
  }
}

module.exports = ContentController;
