
const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
};

const buildDomString = (heroesArray) => {
    // console.log("heroesArray", heroesArray);
    let domString = '';
    heroesArray.forEach((hero) => {
    //   domString += `<h3>${hero.name}</h3>`;
      domString += `<div class="col-sm-3">`;
      domString += `<div class="panel">`;
      domString +=   `<div class="panel-heading">`;
      domString +=      `<h3 class="panel-title">${hero.name}</h3>`;
      domString +=   `</div>`;
      domString +=   `<div class="panel-body">`;
      domString +=      `<img class="charImage" src="${hero.image}">`;
      domString +=      `<p class="charDescription">${hero.description}</p>`;
      domString +=   `</div>`;
      domString += `</div>`;
      domString += `</div>`;
    });

    printToDom(domString, "superhero")

};

function executeThisCodeIfXHRFails(){
    console.log("something went wrong");
};

function executeThisCodeAfterFileLoaded (){
    // console.log("executeThisCodeAfterFileLoaded", executeThisCodeAfterFileLoaded);
//     console.log("this", this);
//     console.log("this.responseText", this.responseText);
    const data = JSON.parse(this.responseText);
//     console.log("data", data);
    buildDomString(data.superheroes);
};

const startApplication = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", executeThisCodeAfterFileLoaded);
    myRequest.addEventListener("error", executeThisCodeIfXHRFails);
    myRequest.open("GET", "../db/superheroes.json");
    myRequest.send();
    // console.log("myrequest", myRequest);
  };
  
  startApplication();