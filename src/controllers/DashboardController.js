const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    
    async index(req, res) {
        const jobs = await Job.get();
        const profile = await Profile.get()

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        // total de horas por dia de cada job em progresso
        let jobTotalHours = 0

        const updateJobs = jobs.map((job) => {
            //ajustes no job e calculos
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'
            
            //somando a quantidade de status
            statusCount[status] += 1;

            // total de horas por dia de cada job em progresso
            jobTotalHours = status =='progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours
            
            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        })
        const freeHours = profile["hours-per-day"] - jobTotalHours;

        return res.render("index", {jobs: updateJobs, profile: profile, statusCount:statusCount, freeHours:freeHours})
    }
}