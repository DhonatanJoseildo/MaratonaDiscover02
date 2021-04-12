const Database = require('../db/config')


module.exports = {
    async get(){
        const db = await Database()
        // get para pegar 1 tabela
        const data = await db.get(`SELECT * FROM profile`)

        db.close()

        return {
            name: data.name,
            avatar: data.avatar,
            "monthly-budget": data.monthly_budget,
            "days-per-week": data.days_per_week,
            "hours-per-day": data.hours_per_day,
            "vacation-per-year": data.vacation_per_year,
            "value-hour": data.value_hour
        };
    },

    update(newData){
        data = newData;
    }
}