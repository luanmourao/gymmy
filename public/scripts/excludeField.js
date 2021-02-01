document
  .getElementById("exclude-time")
  .addEventListener("click", excludeField);

function excludeField(){

  const hasSibling = document.querySelector(".schedule-item").nextElementSibling; 

  if (hasSibling){
    document.querySelector(".schedule-item").remove()
  } else {
    console.log("não tem irmão")
  }

}