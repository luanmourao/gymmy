const Database = require('./database/db')

const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format')

function pageLanding(req, res){
  return res.render("index.html")
}

async function pageTreinar(req, res){
  const filters = req.query

  if (!filters.subject || !filters.weekday || !filters.time){
    return res.render("treinar.html", { filters, subjects, weekdays })
  }

  const timeToMinutes = convertHoursToMinutes(filters.time)

  const query = `
    SELECT classes.*, gymmys.*
    FROM gymmys
    JOIN classes ON (classes.gymmy_id = gymmys.id)
    WHERE EXISTS (
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = classes.id
        AND class_schedule.weekday = ${filters.weekday}
        AND class_schedule.time_from <= ${timeToMinutes}
        AND class_schedule.time_to > ${timeToMinutes}
    )
    AND classes.subject = '${filters.subject}' 
`  

  try {
      const db = await Database
      const gymmys = await db.all(query)

      gymmys.map((gymmy) => {
        gymmy.subject = getSubject(gymmy.subject)
      })

      return res.render("treinar.html", { gymmys, subjects, filters, weekdays })

  } catch (error) {
      console.log(error)
  }

} 

function pageDarAula(req, res){
  return res.render("dar-aula.html", { subjects, weekdays })
}

async function saveClasses(req, res){
  const createGymmy = require('./database/createGymmy')

  const gymmyValue = {
    name: req.body.name,
    avatar: req.body.avatar,
    whatsapp: req.body.whatsapp,
    bio: req.body.bio
  }

  const classValue = {
    subject: req.body.subject,
    cost: req.body.cost
  }

  const classScheduleValues = req.body.weekday.map((weekday, index) => {

    return {
      weekday,
      time_from: convertHoursToMinutes(req.body.time_from[index]),
      time_to: convertHoursToMinutes(req.body.time_to[index])
    }

  })

  try {
      const db = await Database
      await createGymmy(db, { gymmyValue, classValue, classScheduleValues })

      // configurando a query string para que o usuário, ao ser redirecionado, saiba pela url que seus filtros foram aplicados e aquilo que está sendo exibido é o resultado adequado
      let queryString = "?subject=" + req.body.subject
      queryString += "&weekday=" + req.body.weekday[0]
      queryString += "&time=" + req.body.time_from[0]
      
      return res.redirect("/treinar" + queryString)

  } catch (error) {
      console.log(error)
  }

}

module.exports = {
  pageLanding,
  pageTreinar,
  pageDarAula,
  saveClasses
}