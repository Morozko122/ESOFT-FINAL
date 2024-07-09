const Content = require('../models/contentModel');
const User = require('../models/userModel');
const AgeRating = require('../models/ageRatingModel');
const ContentType = require('../models/contentTypeModel');
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

  static async getContent({ page, limit}, sortBy, order) {
    try {
      const offset = (page - 1) * limit;
      const orderParams = sortBy ? (order ? [[sortBy, order.toUpperCase()]] : [[sortBy, 'DESC']] ) : [['upload_date', 'DESC']];
      const contents = await Content.findAndCountAll({
        order: orderParams,
        offset,
        limit: parseInt(limit, 10)
      });
      return contents;
    } catch (error) {
      throw error;
    }
  }
  
  // static async getContentById(contentId, protocol, host) {
  //   try {
  //     const content = await Content.findByPk(contentId, {
  //       include: [
  //         { model: User, attributes: ['username'] },
  //         { model: AgeRating, attributes: ['age'] },
  //         { model: ContentType, attributes: ['label'] }
  //       ]
  //     });
  //     if (!content) {
  //       throw new Error('Content not found');
  //     }

  //     const baseUrl = `${protocol}://${host}`;
  //     const mediaUrl = content.type_id === 1 
  //       ? `${baseUrl}/uploads/pictures/${content.path}` 
  //       : content.type_id === 2 
  //       ? `${baseUrl}/uploads/videos/${content.path}` 
  //       : `${baseUrl}/uploads/others/${content.path}`;

  //     return {
  //       ...content.toJSON(),
  //       username: content.User ? content.User.username : null,
  //       age: content.AgeRating ? content.AgeRating.age : null,
  //       typeLabel: content.ContentType ? content.ContentType.label : null,
  //       mediaUrl
  //     };
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  static async getContentById(contentId, protocol, host) {
    try {
      const content = await Content.findByPk(contentId, {
        attributes: ['content_id', 'label', 'description', 'favorite_count', 'rating', 'upload_date', 'user_id', 'path'],
        include: [
          { model: User, attributes: ['username'] },
          { model: AgeRating, attributes: ['age'] },
          { model: ContentType, attributes: ['label'] }
        ]
      });

      if (!content) {
        throw new Error('Content not found');
      }
      console.log(content.ContentType.label);
      const baseUrl = `${protocol}://${host}`;
      const mediaUrl = content.ContentType.label === "Image" 
        ? `${baseUrl}/uploads/pictures/${content.path}` 
        : content.ContentType.label === "Video"
        ? `${baseUrl}/uploads/videos/${content.path}` 
        : `${baseUrl}/uploads/others/${content.path}`;

      return {
        content_id: content.content_id,
        label: content.label,
        description: content.description,
        favorite_count: content.favorite_count,
        rating: content.rating,
        upload_date: content.upload_date,
        user_id: content.user_id,
        username: content.User ? content.User.username : null,
        age: content.AgeRating ? content.AgeRating.age : null,
        typeLabel: content.ContentType ? content.ContentType.label : null,
        mediaUrl
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ContentService;
