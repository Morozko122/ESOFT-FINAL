const Content = require('../models/contentModel');

class ContentController {
  static async createContent(req, res) {
    try {
      const { label, type_id, description, rating, rating_id } = req.body;
      const newContent = await Content.create({
        label,
        type_id,
        description,
        rating,
        rating_id,
        user_id: req.user.userId
      });
      res.status(201).json(newContent);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при создании контента', error: error.message });
    }
  }


  static async getContent(req, res, searchParams) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;
      const orderParams = searchParams ? [[searchParams, 'DESC']] : [['upload_date', 'DESC']];
      const contents = await Content.findAndCountAll({
        order: orderParams,
        offset,
        limit: parseInt(limit, 10),
      });

      res.json(contents.rows);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при получении контента' });
    }
  }
}

module.exports = ContentController;
