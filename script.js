const container = document.getElementById("container");
const header = document.getElementById("header");
const plantArray = [];
const pollinatorArray = [];
const capsule = document.getElementById("capsule");
const singleDisplay = document.getElementById("single-display");
header.addEventListener("click", (e) => {
  switch (e.target.id) {
    case "plant":
      container.innerHTML = "";
      singleDisplay.innerHTML = "";
      capsule.style.backgroundImage = "";
      styleBlock();
      fetchPlants();
      break;
    case "pollinator":
      container.innerHTML = "";
      singleDisplay.innerHTML = "";
      capsule.style.backgroundImage = "";
      styleBlock();
      fetchPollinators();
      break;
  }
});

function styleBlock() {
  if (container.style.display === "block") {
    container.style.display = "none";
  } else {
    container.style.display = "block";
  }
}

function fetchPlants() {
  fetch("http://localhost:3000/plants")
    .then((res) => res.json())
    .then((plants) => {
      plants.forEach((plant) => {
        plantArray.push(plant);
        container.innerHTML += `<main class="plant-card"><p>${plant.common_name}(${plant.latin_name})</br><button id="${plant.id}">View More</button></p>
            <img src="${plant.image}">
            
            </main>`;
      });

      container.addEventListener("click", (e) => {
        const targetedPlant = plantArray[e.target.id - 1];
        const plantPollinators = targetedPlant.pollinators;
        const pollinatorNames = plantPollinators.map(
          (pollinator) => pollinator.name
        );

        if (e.target.tagName === "BUTTON") {
          capsule.style.backgroundImage = `url(${targetedPlant.image})`;

          singleDisplay.innerHTML = `
                    <h1>${targetedPlant.common_name}</h1>
                    <h3> Latin Name: ${targetedPlant.latin_name}</h3>
                    <p> Hardiness Zone: ${targetedPlant.zone}</p>
                    <p>About This Plant:${targetedPlant.description}</p>

                    <h3 id ='h3'>Pollinators That Love This Plant: ${pollinatorNames.join(
                      " "
                    )}</h3>
                    `;
        }
      });
    });
}

function fetchPollinators() {
  fetch("http://localhost:3000/pollinators")
    .then((res) => res.json())
    .then((pollinators) => {
      //   console.log(pollinators);
      pollinators.forEach((pollinator) => {
        pollinatorArray.push(pollinator);
        container.innerHTML += `<main class="pollinator-card"><p>${pollinator.name}(${pollinator.species})</br><button id="${pollinator.id}">View More</button></p>
              <img src="${pollinator.image}">
            </main>`;
      });
      container.addEventListener("click", (e) => {
        const targetedPollinator = pollinatorArray[e.target.id - 1];
        if (e.target.tagName === "BUTTON") {
          capsule.style.backgroundImage = `url(${targetedPollinator.image})`;
          singleDisplay.innerHTML = `
                    <h1>${targetedPollinator.name}</h1>
                    <h3> Species: ${targetedPollinator.species}</h3>
                    <p>About This Pollinator: ${targetedPollinator.description}</p>
                    `;
        }
      });
    });
}
