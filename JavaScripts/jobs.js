
const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
};

const buildDomString = (heroesArray) => {
    // console.log("heroesArray", heroesArray);
    let domString = '';
    heroesArray.forEach((hero) => {
      domString +=  `<li>`;
      domString +=      `<a href="#" data-hero-id="${hero.id}">${hero.name}</a>`;
      domString +=  `</li>`;
    });

    printToDom(domString, "awesome-dropdown")

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