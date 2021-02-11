document
  .getElementById("exclude-time")
  .addEventListener("click", excludeField);

function excludeField(){

  const hasSibling = document.querySelector(".schedule-item").nextElementSibling; 

  if (hasSibling){
    document.getElementById("exclude-time").parentNode.remove();
  } else {
    console.log("não tem irmão")
  }

}