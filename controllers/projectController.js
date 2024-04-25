const { Project } = require('../models')

class projectController {
    static async getAll(req, res, next) {
        try {
            const userId = req.user.id
            const projects = await Project.findAll({ where: { UserId: userId } })
            res.status(200).json(projects)
        } catch (err) {
            next(err)
        }
    }

    static async createProject(req, res, next) {
        try {
            const UserId = req.user.id
            const { project } = req.body

            if (!project) throw { name: 'project is required' }

            const newProject = await Project.create({ project, UserId })
            res.status(201).json(newProject)
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    static async deleteProject(req, res, next) {
        try {
            const { id } = req.params
            if (!id) throw { name: 'id is required' }
            const project = await Project.findOne({ where: { id } })
            if (!project) throw { name: 'Project not found' }
            await Project.destroy({ where: { id } })
            res.status(200).json({ message: 'success delete project' })
        } catch (err) {
            next(err)
        }
    }

    static async getOne(req, res, next) {
        try {
            const { id } = req.params
            const userId = req.user.id;

            if (!id) throw { name: 'id is required' }
            const project = await Project.findOne({ where: { id, UserId: userId } })
            if (!project) throw { name: 'Project not found' }
            res.status(200).json(project)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = projectController