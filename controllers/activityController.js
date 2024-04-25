const { Activity, Project } = require('../models');
const { Op } = require('sequelize');

class activityController {
    static async getAll(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const activityQuery = req.query.activity;
            const projectIdQuery = req.query.projectId;

            const userId = req.user.id;

            let filterOptions = {};

            if (activityQuery) {
                filterOptions.activity = {
                    [Op.iLike]: `%${activityQuery}%`
                };
            }

            if (projectIdQuery) {
                filterOptions.ProjectId = projectIdQuery;
            }

            filterOptions.UserId = userId;

            const { rows: activities, count: totalCount } = await Activity.findAndCountAll({
                where: filterOptions,
                limit: limit,
                offset: (page - 1) * limit,
                include: {
                    model: Project,
                    attributes: ['id', 'project'],
                    required: true,
                }
            });

            res.status(200).json({
                page: page,
                total_pages: Math.ceil(totalCount / limit),
                total_items: totalCount,
                data: activities
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            const activity = await Activity.findOne({
                where: {
                    id,
                    UserId: userId
                },
                include: {
                    model: Project,
                    attributes: ['id', 'project'],
                    required: true,
                }
            });

            if (!activity) {
                return res.status(404).json({ error: 'Kegiatan tidak ditemukan' });
            }

            res.status(200).json(activity);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }


    static async createActivity(req, res, next) {
        try {
            const UserId = req.user.id
            const { tanggalMulai, tanggalBerakhir, waktuMulai, waktuBerakhir, activity, projectId } = req.body;
            const startDateTime = new Date(`${tanggalMulai}T${waktuMulai}`);
            const endDateTime = new Date(`${tanggalBerakhir}T${waktuBerakhir}`);
            const durationMs = endDateTime - startDateTime;

            const durationMinutes = durationMs / (1000 * 60);

            // Format ulang tanggal mulai dan tanggal berakhir ke "tahun-bulan-tanggal"
            const formattedStartDate = startDateTime.toISOString().split('T')[0];
            const formattedEndDate = endDateTime.toISOString().split('T')[0];

            const newActivity = await Activity.create({
                tanggalMulai: formattedStartDate,
                tanggalBerakhir: formattedEndDate,
                waktuMulai,
                waktuBerakhir,
                activity,
                UserId,
                ProjectId: projectId,
                durasi: durationMinutes
            });

            res.status(201).json(newActivity);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }



    static async updateActivity(req, res, next) {
        try {
            const { id } = req.params

            if (!id) throw { name: 'id is required' }

            const activityId = await Activity.findOne({ where: { id } })

            if (!activityId) throw { name: 'Activity not found' }

            const { tanggalMulai, tanggalBerakhir, waktuMulai, waktuBerakhir, activity, ProjectId } = req.body;

            await Activity.update({ tanggalMulai, tanggalBerakhir, waktuMulai, waktuBerakhir, activity, ProjectId }, { where: { id } })

            res.status(200).json({ message: 'success update activity' })
        } catch (error) {
            next(error)
        }
    }

    static async deleteActivity(req, res, next) {
        try {
            const { id } = req.params
            if (!id) throw { name: 'id is required' }
            const activityId = await Activity.findOne({ where: { id } })
            if (!activityId) throw { name: 'Activity not found' }
            await Activity.destroy({ where: { id } })
            res.status(200).json({ message: 'success delete activity' })
        } catch (error) {
            next(error)
        }
    }

    static async getAllByProjectId(req, res, next) {

    }
}

module.exports = activityController;
