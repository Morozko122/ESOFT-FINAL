const Content = require('../dbmodels/contentModel');
const User = require('../dbmodels/userModel');
const AgeRating = require('../dbmodels/ageRatingModel');
const ContentType = require('../dbmodels/contentTypeModel');
const path = require('path');
const fs = require('fs');
class ContentModel {
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

    static async getContent(orderParams, offset, limit) {
        try {
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

    static async getUserContent(userId) {
        try {
            const content = await Content.findAll({
                attributes: ['content_id', 'label', 'description', 'favorite_count', 'rating', 'path'],
                where: { user_id: userId }
            });
            return content;
        } catch (error) {
            throw error;
        }
    }

    static async updateContent(contentId, userId, contentData) {
        try {
            const content = await Content.findOne({
                where: { content_id: contentId, user_id: userId },
                include: [
                    { model: ContentType, attributes: ['label'] }
                ]
            });
            if (!content) {
                throw new Error('Content not found or not owned by user');
            }
            const originalPath = path.basename(content.path, path.extname(content.path));
            const previewPath = `${originalPath}_preview.jpg`;
            await content.update(contentData);
            return {
                content,
                originalPath,
                previewPath
            };
        } catch (error) {
            throw error;
        }
    }

    static async deleteContent(contentId, userId) {
        try {
            const content = await Content.findOne({
                where: { content_id: contentId, user_id: userId },
                include: [
                    { model: ContentType, attributes: ['label'] }
                ]
            });
            if (!content) {
                throw new Error('Content not found or not owned by user');
            }
            return content;
        } catch (error) {
            throw error;
        }
    }

    static async getContentById(contentId) {
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
            return {
                content_id: content.content_id,
                label: content.label,
                description: content.description,
                favorite_count: content.favorite_count,
                rating: content.rating,
                upload_date: content.upload_date,
                user_id: content.user_id,
                path: content.path,
                username: content.User ? content.User.username : null,
                age: content.AgeRating ? content.AgeRating.age : null,
                typeLabel: content.ContentType ? content.ContentType.label : null
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ContentModel;
