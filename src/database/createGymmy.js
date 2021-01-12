module.exports = async function(db, { gymmyValue, classValue, classScheduleValues }){

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

  await Promise.all(insertedAllClassScheduleValues)
}