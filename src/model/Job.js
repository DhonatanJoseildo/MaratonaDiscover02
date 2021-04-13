const Database = require('../db/config')


module.exports = {
    async get(){
        const db = await Database()

        // .all vai no banco de dados e pega tudo
        // .get so pega 1 no banco de dados
        const jobs = await db.all(`SELECT * FROM jobs`)

        db.close()
        return jobs.map(job => ({
            id: job.id,
            name: job.name,
            "daily-hours": job.daily_hours,
            "total-hours": job.total_hours,
            created_at: job.created_at

        }))
    },

    async update(updatedJob, jobId){
        const db = await Database()

        await db.run(`UPDATE jobs SET 
            name = "${updatedJob.name}",
            daily_hours = ${updatedJob["daily-hours"]},
            total_hours = ${updatedJob["total-hours"]}
            WHERE id = ${jobId}
        `)

        await db.close()
    },

    async delete(id){
        const db = await Database()
        // apagar augo da tabela jobs , passando o id como referencia
        await db.run(`DELETE FROM jobs WHERE id = ${id}`)

        await db.close()
       
    },

    async create(newJob){
        const db = await Database()

        await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob.created_at}
        )`)

        await db.close()
    }
}