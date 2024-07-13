// const ContentService = require('../services/contentServices');
// const path = require('path');

// class ContentController {
//   static async createContent(req, res) {
//     try {
//       const userId = req.user.userId;
//       const contentData = req.body;
//       const mediaFile = req.files['mediaFile'][0];
//       const newContent = await ContentService.createContent(contentData, userId, mediaFile);
//       res.status(201).json(newContent);
//     } catch (error) {
//       res.status(500).json({ message: 'Ошибка при создании контента', error: error.message });
//     }
//   }

//   static async getContent(req, res, searchParams) {
//     try {
//       const { page = 1, limit = 10 } = req.query;
//       const getContent = await ContentService.getContent({ page, limit }, searchParams);
//        //жоский костыль
//       const baseUrl = `${req.protocol}://${req.get('host')}`;
//       const contentsWithPreviews = getContent.rows.map(content => {
//         const mediaUrl = content.type_id === 1 ? `${baseUrl}/uploads/pictures/${content.path}` : content.type_id === 2 ? `${baseUrl}/uploads/videos/${content.path}` : `${baseUrl}/uploads/others/${content.path}`;
//         const previewUrl = `${baseUrl}/uploads/previews/${content.path.replace(path.extname(content.path), '_preview' + path.extname(content.path))
//           }`;
//         return {
//           ...content.toJSON(),
//           mediaUrl,
//           previewUrl
//         }
//       });

//       res.status(200).json({ ...getContent, rows: contentsWithPreviews });
//     } catch (error) {
//       res.status(500).json({ message: 'Ошибка при получении контента', error: error.message });
//     }
//   }
// }

// module.exports = ContentController;
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

  static async getContent(req, res, sortBy, order) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const getContent = await ContentService.getContent({ page, limit }, sortBy, order);
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const contentsWithPreviews = getContent.rows.map(content => {
        
        const mediaUrl = content.type_id === 1 ? `${baseUrl}/uploads/pictures/${content.path}` : 
        content.type_id === 2 ? `${baseUrl}/uploads/videos/${content.path}` : 
        `${baseUrl}/uploads/others/${content.path}`;
        
        const previewUrl = `${baseUrl}/uploads/previews/${content.path.replace(path.extname(content.path), '_preview' + path.extname(content.path))}`;
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

  static async getUserContent(req, res) {
    try {
      const userId = req.user.userId;
      const content = await ContentService.getUserContent(userId, req.protocol, req.get('host'));
      res.status(200).json(content);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении контента пользователя', error: error.message });
    }
  }

  static async updateContent(req, res) {
    try {
      const contentId = req.params.id;
      const userId = req.user.userId;
      const contentData = req.body;
      const mediaFile = req.files['mediaFile'] ? req.files['mediaFile'][0] : null;
      const updatedContent = await ContentService.updateContent(contentId, userId, contentData, mediaFile);
      res.status(200).json(updatedContent);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при обновлении контента', error: error.message });
    }
  }

  static async deleteContent(req, res) {
    try {
      const contentId = req.params.id;
      const userId = req.user.userId;

      await ContentService.deleteContent(contentId, userId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при удалении контента', error: error.message });
    }
  }

  static async getContentById(req, res) {
    try {
      const contentId = req.params.id;
      const content = await ContentService.getContentById(contentId, req.protocol, req.get('host'));
      res.status(200).json(content);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении контента', error: error.message });
    }
  }
}

module.exports = ContentController;
