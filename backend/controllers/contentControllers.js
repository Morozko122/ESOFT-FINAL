const path = require('path');
class ContentController {
  constructor(contentService) {
    this.contentService = contentService;
  }
  createContent = async (req, res) => {
    try {
      const userId = req.user.userId;
      const contentData = req.body;
      const mediaFile = req.files['mediaFile'][0];
      const newContent = await this.contentService.createContent(contentData, userId, mediaFile);
      res.status(201).json(newContent);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при создании контента', error: error.message });
    }
  }

  getContent= async (req, res, sortBy, order) =>  {
    try {
      const { page = 1, limit = 10 } = req.query;
      const getContent = await this.contentService.getContent({ page, limit }, sortBy, order);
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const contentsWithPreviews = getContent.rows.map(content => {
        
        const mediaUrl = content.type_id === 1 ? `${baseUrl}/uploads/pictures/${content.path}` : 
        content.type_id === 2 ? `${baseUrl}/uploads/videos/${content.path}` : 
        `${baseUrl}/uploads/others/${content.path}`;
        
        // const previewUrl = `${baseUrl}/uploads/previews/${content.path.replace(path.extname(content.path), '_preview' + path.extname(content.path))}`;
        const previewUrl = `${baseUrl}/uploads/previews/${content.path.replace(path.extname(content.path), '_preview' + '.jpg')}`;
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

  getUserContent = async (req, res) => {
    try {
      const userId = req.user.userId;
      const content = await this.contentService.getUserContent(userId, req.protocol, req.get('host'));
      res.status(200).json(content);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении контента пользователя', error: error.message });
    }
  }
  getUserContentById = async (req, res) => {
    try {
      const userId = req.params.id;
      const content = await this.contentService.getUserContent(userId, req.protocol, req.get('host'));
      res.status(200).json(content);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении контента пользователя', error: error.message });
    }
  }
  updateContent = async (req, res) => {
    try {
      const contentId = req.params.id;
      const userId = req.user.userId;
      const contentData = req.body;
      const mediaFile = req.files['mediaFile'] ? req.files['mediaFile'][0] : null;
      const updatedContent = await this.contentService.updateContent(contentId, userId, contentData, mediaFile);
      res.status(200).json(updatedContent);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при обновлении контента', error: error.message });
    }
  }

  deleteContent = async (req, res) => {
    try {
      const contentId = req.params.id;
      const userId = req.user.userId;

      await this.contentService.deleteContent(contentId, userId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при удалении контента', error: error.message });
    }
  }

  getContentById = async (req, res) => {
    try {
      const contentId = req.params.id;
      const content = await this.contentService.getContentById(contentId, req.protocol, req.get('host'));
      res.status(200).json(content);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении контента', error: error.message });
    }
  }
}

module.exports = ContentController;
