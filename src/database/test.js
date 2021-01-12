const Database = require('./db')
const createGymmy = require('./createGymmy')

Database.then(async (db) => {
  // inserir dados dos professores, aulas e data

  gymmyValue = {
    name: "Mariana",
    avatar: "https://images.unsplash.com/photo-1541647376583-8934aaf3448a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTh8fHBlcnNvbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    whatsapp: "13 99749-5500",
    bio: "Prossifional formado em Educação Física pela UFF com 4 anos de experiência. Com diversos alunos na baixada santista, é conhecido por seus treinos ao ar livre na orla da praia. Tem como foco o treinamento funcional para todas as idades e objetivos"
  }

  classValue = {
    subject: 0,
    cost: "45,00"
    // o gymmy_id virá pelo banco de dados 
  }

  classScheduleValues = [
    // o class_id virá pelo banco de dados após cadastrarmoos a class
    {
      weekday: 1,
      time_from: 720,
      time_to: 1220
    },
    {
      weekday: 1,
      time_from: 720,
      time_to: 1220
    }
  ]

  // await createGymmy(db, { gymmyValue, classValue, classScheduleValues })

  // consultar dados inseridos 

  // todos os gymmys
  const selectedGymmys = await db.all("SELECT * FROM gymmys") 
  // console.log(selectedGymmys)

  // consultar as classes de um determinado professor e trazer junto os dados desse professor, relacionando a tabela gymmys e a tabela classes
  const selectClassesAndGymmys = await db.all(`
    SELECT classes.*, gymmys.*
    FROM gymmys
    JOIN classes ON (classes.gymmy_id = gymmys.id)
    WHERE classes.gymmy_id = 1; 
  `)
  // console.log(selectClassesAndGymmys)

  // consultando os horários:
  // o horário que o professor trabalha, por exemplo, é das 8h às 18h
  // o horário do time_from (8h) precisa ser menor ou igual ao horário solicitado
  // e o time_to precisa ser maior
  const selectClassesSchedules = await db.all(`
    SELECT class_schedule.*
    FROM class_schedule
    WHERE class_schedule.class_id = "1"
    AND class_schedule.weekday = "1"
    AND class_schedule.time_from <= "1200"
    AND class_schedule.time_to > "1200"
  `) 
  console.log(selectClassesSchedules)
})