const path = require('path');
const fs = require('fs');
const mimeTypeToTypeId = {
  'image/jpeg': 1,
  'image/png': 1,
  'video/mp4': 2,
  'video/x-msvideo': 2
};
class ContentService {
  constructor(contentModel) {
    this.contentModel = contentModel;
  }

  async createContent(contentData, userId, mediaFile) {
    try {
      if (mediaFile) {
        contentData.path = mediaFile.filename;
        const typeId = mimeTypeToTypeId[mediaFile.mimetype];
        if (!typeId) {
          throw new Error('Unsupported file type');
        }
        contentData.type_id = typeId;
      }
      const content = await this.contentModel.createContent(contentData, userId);
      return content;
    } catch (error) {
      throw error;
    }
  }

  async getContent({ page, limit }, sortBy, order) {
    const offset = (page - 1) * limit;
    const orderParams = sortBy ? (order ? [[sortBy, order.toUpperCase()]] : [[sortBy, 'DESC']]) : [['upload_date', 'DESC']];
    const contents = await this.contentModel.getContent(orderParams, offset, limit);
    return contents;
  }

  async getUserContent(userId, protocol, host) {
    try {
      const content = await this.contentModel.getUserContent(userId);
      const baseUrl = `${protocol}://${host}`;
      const modifiedContent = content.map(item => {
        const originalPathWithoutExt = path.basename(item.path, path.extname(item.path));
        const previewPath = `${baseUrl}/uploads/previews/${originalPathWithoutExt}_preview.png`;
        return {
          ...item.toJSON(),
          previewPath
        };
      });
      return modifiedContent;
    } catch (error) {
      throw error;
    }
  }

  async updateContent(contentId, userId, contentData, mediaFile) {
    try {
      if (mediaFile) {
        contentData.path = mediaFile.filename;
        const typeId = mimeTypeToTypeId[mediaFile.mimetype];
        if (!typeId) {
          throw new Error('Unsupported file type');
        }
        contentData.type_id = typeId;
      }
      const content = await this.contentModel.updateContent(contentId, userId, contentData);
      await this.deleteFiles(content.content.ContentType.label, content.content.path);  
      return content.content;
    } catch (error) {
      throw error;
    }
  }

  async deleteContent(contentId, userId) {
    try {
      const content = await this.contentModel.deleteContent(contentId, userId);
      await this.deleteFiles(content.ContentType.label, content.path);
      await content.destroy();
    } catch (error) {
      throw error;
    }
  }

  async deleteFiles(contentType, filePath) {
    try {
      const mediaUrl = contentType === "Image"
        ? `/pictures/${filePath}`
        : contentType === "Video"
          ? `/videos/${filePath}`
          : `/others/${filePath}`;
      const previewUrl = `/previews/${filePath.replace(path.extname(filePath), '_preview' + '.png')}`;
      if (mediaUrl) {
        const fullMediaPath = path.join(__dirname, '../uploads', mediaUrl);
        
        if (fs.existsSync(fullMediaPath)) {
          fs.unlinkSync(fullMediaPath);
        }
      }
      if (previewUrl) {
        const fullPreviewPath = path.join(__dirname, '../uploads', previewUrl);
        console.log(fullPreviewPath);
        if (fs.existsSync(fullPreviewPath)) {
          fs.unlinkSync(fullPreviewPath);
        }
      }
    } catch (error) {
      throw error;
    }
  }
  async getContentById(contentId, protocol, host) {
    try {
      const content = await this.contentModel.getContentById(contentId);

      const baseUrl = `${protocol}://${host}`;
      const mediaUrl = content.typeLabel === "Image"
        ? `${baseUrl}/uploads/pictures/${content.path}`
        : content.typeLabel === "Video"
          ? `${baseUrl}/uploads/videos/${content.path}`
          : `${baseUrl}/uploads/others/${content.path}`;

      return {
        content,
        mediaUrl
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ContentService;
