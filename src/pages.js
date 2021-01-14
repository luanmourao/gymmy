const Database = require('./database/db')

const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format')

let filters;

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

function renderModal(req, res){
  filters = req.body
  return res.render("modal.html")
}

async function saveClasses(req, res){
  const createGymmy = require('./database/createGymmy')

  const gymmyValue = {
    name: filters.name,
    avatar: filters.avatar,
    whatsapp: filters.whatsapp,
    bio: filters.bio
  }

  const classValue = {
    subject: filters.subject,
    cost: filters.cost
  }

  const classScheduleValues = filters.weekday.map((weekday, index) => {

    return {
      weekday,
      time_from: convertHoursToMinutes(filters.time_from[index]),
      time_to: convertHoursToMinutes(filters.time_to[index])
    }

  })

  try {
      const db = await Database
      await createGymmy(db, { gymmyValue, classValue, classScheduleValues })

      // configurando a query string para que o usuário, ao ser redirecionado, saiba pela url que seus filtros foram aplicados e aquilo que está sendo exibido é o resultado adequado
      let queryString = "?subject=" + filters.subject
      queryString += "&weekday=" + filters.weekday[0]
      queryString += "&time=" + filters.time_from[0]
      
      return res.redirect("/treinar" + queryString)

  } catch (error) {
      console.log(error)
  }

}

module.exports = {
  pageLanding,
  pageTreinar,
  pageDarAula,
  saveClasses,
  renderModal
}