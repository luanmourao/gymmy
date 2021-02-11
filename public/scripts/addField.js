 document
    .querySelector("#add-time")
    .addEventListener("click", checkField)

function checkField(){

  const fieldset = document.getElementById("schedule-itens");

  const inputs = document
                    .querySelectorAll(".schedule-item")[document.querySelectorAll(".schedule-item").length-1]
                    .querySelectorAll('input'); 

  const selectWeekday = document
                          .querySelectorAll(".schedule-item")[document.querySelectorAll(".schedule-item").length-1]
                          .querySelector('.weekday');


  if (fieldset.lastElementChild.textContent == "Preencha todos os campos para inserir um novo horário"){
    fieldset.removeChild(fieldset.lastElementChild);
  }

  if (selectWeekday.value == "" || inputs[0].value == "" || inputs[1].value == ""){
    createSpan();
    return
  }

  cloneField(); 
}

function createSpan(){

  const elementParent = document.getElementById('schedule-itens');
  const elementChild = document.createElement('span');
  elementChild.textContent = 'Preencha todos os campos para inserir um novo horário';
  elementParent.appendChild(elementChild); 

}

function cloneField(){
  const newfieldContainer = document.querySelector(".schedule-item").cloneNode(true);

  let excludeBT = newfieldContainer.querySelector("button");

  excludeBT.id = `exclude-time${document.querySelectorAll(".schedule-item").length}`;

  const fields = newfieldContainer.querySelectorAll('input');
  
  fields.forEach(function(field){
    field.value = ''; 
  })

  document.querySelector("#schedule-itens").appendChild(newfieldContainer); 
}