const subjects = [
  "Geral",
  "Superior completo",
  "Inferior completo",
  "Glúteos/Quadríceps",
  "Ombro/Costas/Peito",
  "Bíceps/Tríceps",
  "Abdômen/Core",
  "Perda de Peso",
  "Hipertrofia/Ganho de massa",
  "Funcional/Aeróbico",
  "Alongamento/Regenerativo",
]

const weekdays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado"
]

// funcionalidades
function getSubject(subjectNumber){
  const position = subjectNumber
  return subjects[position]
}

function convertHoursToMinutes(time){
  const [ hours, minutes ] = time.split(":")
  return Number((hours * 60) + minutes)
}

convertHoursToMinutes("09:00")

module.exports = {
  subjects,
  weekdays,
  getSubject,
  convertHoursToMinutes
}