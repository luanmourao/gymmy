// procurar o botão 
document.querySelector("#add-time")
// colocar um evento no botão 
.addEventListener("click", cloneField)
// executar uma ação quando ocorrer o evento
function cloneField(){
  // identificar o campo e cloná-lo
  const newfieldContainer = document.querySelector(".schedule-item").cloneNode(true);
  // limpar os campos clonados
  const fields = newfieldContainer.querySelectorAll('input');
  
  fields.forEach(function(field){
    field.value = ''; 
  })

  // indicar um local da página para colocar o campo clonado
  document.querySelector("#schedule-itens").appendChild(newfieldContainer); 
}