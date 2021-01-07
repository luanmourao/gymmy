// lógica para criação dos gymmys
// como precisaremos usar a lógica deste arquivo no db.js, devemos exportá-lo já neste início
module.exports = async function(db, { gymmyValue, classValue, classScheduleValues }){
  // inserir dados na tabela gymmys 
  const insertedGymmy = await db.run(`
    INSERT INTO gymmys (
        name,
        avatar,
        whatsapp,
        bio
    ) VALUES (
        "${gymmyValue.name}",
        "${gymmyValue.avatar}",
        "${gymmyValue.whatsapp}",
        "${gymmyValue.bio}"
    );
  `)

  const gymmy_id = insertedGymmy.lastID 

  // inserir dados na tabela classes
  const insertedClass = await db.run(`
      INSERT INTO classes (
          subject,
          cost,
          gymmy_id
      ) VALUES (
          "${classValue.subject}",
          "${classValue.cost}",
          "${gymmy_id}"
      );
  `)

  const class_id = insertedClass.lastID

  //inserir dados na tabela class_schedule 
  const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
    return db.run(`
      INSERT INTO class_schedule (
          class_id,
          weekday,
          time_from,
          time_to
      ) VALUES (
          "${class_id}",
          "${classScheduleValue.weekday}",
          "${classScheduleValue.time_from}",
          "${classScheduleValue.time_to}"
      );
    `)
  })

  // executando todos os db.runs() das class_schedule
  await Promise.all(insertedAllClassScheduleValues)
}