const { Post, Tag, sequelize, User, Category } = require('../models/index')
const { Op } = require("sequelize")
const { slugify } = require('../helpers/createSlug')


class PostController {
    static async readArticle(req, res, next) {
        try {


            const result = await Post.findAll({ include: [Tag, User, Category], order: [["id", 'ASC']] })
            // console.log(result);
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
            // console.log(req.body, "<<");
            const authorId = req.additionalData.userId

            const slug = slugify(title)

            const create = await Post.create({ title, slug, content, imgUrl, categoryId, authorId }, { transaction: t })

            console.log(create, 'berhasil before createtags');

            if (!name || !name1 || !name2) throw { name: "nameLessThan3" }

            const createTags = await Tag.bulkCreate([
                { name: name, postId: create.id },
                { name: name1, postId: create.id },
                { name: name2, postId: create.id }
            ],
                { transaction: t })

            console.log('after create tags', createTags)

            await t.commit()
            // console.log(createTags);
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
        try {
            const { id } = req.params
            // console.log(id, "<id");
            const { title, content, imgUrl, categoryId } = req.body
            const authorId = req.additionalData.userId

            const edit = await Post.update(
                { title, content, imgUrl, categoryId, authorId },
                {
                    where: {
                        id: id
                    }
                })
            // console.log(edit, "<<<<");
            res.status(200).json({
                statusCode: 200,
                msg: "Post updated successfully"
            })
        } catch (err) {
            next(err);
        }
    }
}

module.exports = PostController