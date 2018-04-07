let selectedHero = "";

const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
};

const buildDomString = (heroesArray) => {
    // console.log("heroesArray", heroesArray);
    let domString = '';
    heroesArray.forEach((hero) => {
      domString +=  `<li>`;
      domString +=      `<a class="hero-name" data-hero-id="${hero.id}">${hero.name}</a>`;
      domString +=  `</li>`;
    });

    printToDom(domString, "awesome-dropdown")

};

const selectHero = (e) => {
    selectedHero = e.target.dataset.heroId;
    document.getElementById("awesome-button").classList.add("hide");
    genericHeroRequest(loadFileForSingleHero);

};

const addHeroSelectionEventListeners = () => {
    const heroNames = document.getElementsByClassName("hero-name");
    for (let i=0; i < heroNames.length; i++) {
        heroNames[i].addEventListener("click", selectHero);
    }
};

const displaySuperHero = heroes => {
    let domString = "";
    heroes.forEach(hero => {
      if (hero.id === selectedHero) {
        domString += `<div class="row">`;
        domString += `<div class="col-sm-4">`;
        if (hero.gender === "Male") {
          domString += `<img class="charImage maleImage" src="${
            hero.image
          }">`;
        } else {
          domString += `<img class="charImage femaleImage" src="${
            hero.image
          }">`;
        }
        domString += `</div>`;
        domString += `<div class="col-sm-6">`;
        domString += `<h2>Selected Hero: ${hero.name}</h2>`;
        domString +=     `<p class='charDescription'>${hero.description}</p>`;
        domString += `</div>`;
      }
    });
    printToDom(domString, "selectedHero");
    getJobs(heroes);
  };
  
  const displayJobs = (heroes) => {
    let domString = "";
    heroes.forEach(hero => {
      if (hero.id === selectedHero) {
        hero.jobs.forEach((job) =>{
          domString += `<div>${job}</div>`;
        })
      }
    });
    printToDom(domString, "jobs");
  
  }

  const megaSmash = (jobsArray, heroesArray) => {
    heroesArray.forEach((hero) => {
      hero.jobs = [];
      hero.jobIds.forEach((jobId) =>{
        jobsArray.forEach((job) => {
          if(job.id === jobId){
            hero.jobs.push(job.title);
          }
        })
      })
    })
    return heroesArray;
  };

  const getJobs = (heroesArray) =>{
    let jobsRequest = new XMLHttpRequest();
    jobsRequest.addEventListener("load", jobsJSONConvert);
    jobsRequest.addEventListener("error", executeThisCodeIfXHRFails);
    jobsRequest.open("GET", "../db/jobs.json");
    jobsRequest.send();
  
    function jobsJSONConvert() {
      const jobsData = JSON.parse(this.responseText).jobs;
      const completeHeroes = megaSmash(jobsData, heroesArray);
      displayJobs(completeHeroes);
    }
  }

function loadFileForSingleHero(){
    const data = JSON.parse(this.responseText);
    displaySuperHero(data.superheroes);
};

function executeThisCodeIfXHRFails(){
    console.log("something went wrong");
};

function executeThisCodeAfterFileLoaded (){
    // console.log("executeThisCodeAfterFileLoaded", executeThisCodeAfterFileLoaded);
//     console.log("this", this);
//     console.log("this.responseText", this.responseText);
    const data = JSON.parse(this.responseText);
    buildDomString(data.superheroes);
    addHeroSelectionEventListeners();
};

const genericHeroRequest=(successFunction) => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", successFunction);
    myRequest.addEventListener("error", executeThisCodeIfXHRFails);
    myRequest.open("GET", "../db/superheroes.json");
    myRequest.send();
};

const startApplication = () => {
    genericHeroRequest(executeThisCodeAfterFileLoaded);
    // console.log("myrequest", myRequest);
  };
  
  startApplication();