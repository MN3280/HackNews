const { Post, Tag, sequelize, User, Category } = require('../models/index')
const { Op } = require("sequelize")
const { slugify } = require('../helpers/createSlug')

class PostController {
    static async readArticle(req, res, next) {
        try {
            const where = {}
            const { title } = req.query
            if (title) {
                where.title = { [Op.iLike]: `%${title}%` }
            }

            const result = await Post.findAll({
                where,
                include: [Tag, User, Category], order: [["id", 'ASC']]
            })
            res.status(200).json({
                statusCode: 200,
                msg: `Here is the data`,
                result
            })
        } catch (err) {
            next(err)
        }
    }

    static async RenderPostDetail(req, res, next) {
        try {
            const { id } = req.params;
            const response = await Post.findOne({
                where: {
                    id: id,
                },
            });

            const tags = await Tag.findOne({
                where: {
                    postId: id
                }
            })
            res.status(200).json({
                statusCode: 200,
                response,
                tags
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async deletePostById(req, res, next) {
        try {
            const { id } = req.params;
            const response = await Post.destroy({
                where: {
                    id: id,
                },
            });
            res.status(200).json({
                statusCode: 200,
                response,
                msg: "News deleted successfully",
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async createPost(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const { title, content, imgUrl, categoryId, name, name1, name2 } = req.body
            const authorId = req.additionalData.userId
            const slug = slugify(title)

            const create = await Post.create({ title, slug, content, imgUrl, categoryId, authorId }, { transaction: t })

            if (!name || !name1 || !name2) throw { name: "nameLessThan3" }

            const createTags = await Tag.bulkCreate([
                { name: name, postId: create.id },
                { name: name1, postId: create.id },
                { name: name2, postId: create.id }
            ],
                { transaction: t })

            await t.commit()
            res.status(201).json({
                statusCode: 201,
                create,
                createTags
            })
        } catch (err) {
            await t.rollback()
            next(err);
        }
    }

    static async editPost(req, res, next) {
        const trx = await sequelize.transaction()
        try {
            const { id } = req.params
            const { title, content, imgUrl, categoryId, name, name1, name2 } = req.body
            const authorId = req.additionalData.userId

            const edit = await Post.update(
                { title, content, imgUrl, categoryId, authorId },
                {
                    where: {
                        id: id
                    },
                    transaction: trx
                })
            const destroy = await Tag.destroy({
                where: {
                    postId: id
                },
                transaction: trx
            })

            const updateTag = await Tag.bulkCreate([
                { name: name, postId: id },
                { name: name1, postId: id },
                { name: name2, postId: id }
            ],
                { transaction: trx })
            await trx.commit()
            res.status(200).json({
                statusCode: 200,
                msg: "Post updated successfully"
            })
        } catch (err) {
            console.log(err);
            await trx.rollback()
            next(err);
        }
    }
}

module.exports = PostController