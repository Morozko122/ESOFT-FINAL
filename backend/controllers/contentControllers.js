const ContentService = require('../services/contentServices');
const path = require('path');

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
      const { page = 1, limit = 10 } = req.query;
      const getContent = await ContentService.getContent({ page, limit }, searchParams);
       //жоский костыль
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const contentsWithPreviews = getContent.rows.map(content => {
        const mediaUrl = content.type_id === 1 ? `${baseUrl}/uploads/pictures/${content.path}` : content.type_id === 2 ? `${baseUrl}/uploads/videos/${content.path}` : `${baseUrl}/uploads/others/${content.path}`;
        const previewUrl = `${baseUrl}/uploads/previews/${content.path.replace(path.extname(content.path), '_preview' + path.extname(content.path))
          }`;
        return {
          ...content.toJSON(),
   
          mediaUrl,
          previewUrl
        }
      });

      res.status(200).json({ ...getContent, rows: contentsWithPreviews });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении контента', error: error.message });
    }
  }
}

module.exports = ContentController;
