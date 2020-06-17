const container = document.getElementById("container");
const header = document.getElementById("header");
let plantArray = [];
let pollinatorArray = [];
const capsule = document.getElementById("capsule");
const singleDisplay = document.getElementById("single-display");
fetchPlants();
fetchPollinator();
renderSinglePollinators();
renderSinglePlants();
header.addEventListener("click", (e) => {
  switch (e.target.id) {
    case "plant":
      container.innerHTML = "";
      singleDisplay.innerHTML = "";
      capsule.style.backgroundImage = "";
      styleBlock();
      renderAllPlants();
      
      break;
    case "pollinator":
      container.innerHTML = "";
      singleDisplay.innerHTML = "";
      capsule.style.backgroundImage = "";
      styleBlock();
      renderAllPollinators();
     
      break;
    case "form":
      container.innerHTML = "";
      singleDisplay.innerHTML = "";
      capsule.style.backgroundImage = "";
      e.preventDefault();
      renderForm();
  }
});

function styleBlock() {
  if (container.style.display === "block") {
    container.style.display = "none";
  } else {
    container.style.display = "block";
  }
}
function renderAllPlants(){
  plantArray.forEach((plant) => {
    
        container.innerHTML += `<main class="plant-card"><p>${plant.common_name}<br>(${plant.latin_name})</br><br><img src="${plant.image}"><button class="renderplantbutton" id="${plant.id}">View More</button ></p><br>
           
            
            </main>`;
      });

};

function renderSinglePlants() {
      container.addEventListener("click", (e) => {
        const targetedPlant = plantArray[e.target.id - 1];
        const plantPollinators = targetedPlant.pollinators;
        const pollinatorNames = plantPollinators.map(
          (pollinator) => pollinator.name
        );

        if (e.target.className === "renderplantbutton") {
          capsule.style.backgroundImage = `url(${targetedPlant.image})`;

          singleDisplay.innerHTML = `
                    <h1>${targetedPlant.common_name}</h1>
                    <h3> Latin Name: ${targetedPlant.latin_name}</h3>
                    <p> Hardiness Zone: ${targetedPlant.zone}</p>
                    <p>About This Plant:${targetedPlant.description}</p>

                    <h3 id ='h3'>Pollinators That Love This Plant: ${pollinatorNames.join(" ")}</h3>
                    `;
        };
    });
    
};

function fetchPollinator(){
    fetch("http://localhost:3000/pollinators")
    .then((res) => res.json())
    .then((pollinators) => {
        pollinatorArray = pollinators
      
    //   pollinators.forEach((pollinator) => {
        
    //     container.innerHTML += `<main class="pollinator-card"><p>${pollinator.name}(${pollinator.species})</br><button class="renderButton" id="${pollinator.id}">View More</button></p>
    //           <img src="${pollinator.image}">
    //         </main>`;
    //   });

     })
};

function fetchPlants(){
    fetch("http://localhost:3000/plants")
    .then((res) => res.json())
    .then((plants) => {
        plantArray = plants
    //   plants.forEach((plant) => {
    
    //     container.innerHTML += `<main class="plant-card"><p>${plant.common_name}(${plant.latin_name})</br><button id="${plant.id}">View More</button></p>
    //         <img src="${plant.image}">
            
    //         </main>`;
    //   });

    });
};

function renderAllPollinators(){
       pollinatorArray.forEach((pollinator) => {
        
        container.innerHTML += `<main class="pollinator-card"><p>${pollinator.name}<br>(${pollinator.species})</br><br><img src="${pollinator.image}"><button class="renderpollinatorbutton" id="${pollinator.id}">View More</button></p><br>
              
            </main>`;
      });

};

function renderSinglePollinators() {
  
      container.addEventListener("click", (e) => {
        const targetedPollinator = pollinatorArray[e.target.id - 1];
        if (e.target.className === "renderpollinatorbutton") {
          capsule.style.backgroundImage = `url(${targetedPollinator.image})`;
          singleDisplay.innerHTML = `
                    <h1>${targetedPollinator.name}</h1>
                    <h3> Species: ${targetedPollinator.species}</h3>
                    <p>About This Pollinator: ${targetedPollinator.description}</p>
                    `;
        }
    });
};


function renderForm() {
   
  singleDisplay.innerHTML = `<form  method="post" id ="newPlantForm">
  <h1> Add a New Plant to the Collection</h1>
            
            <label for="Pname"> Plant name:</label><br>

            <input type="text" id="fname" name="fname" value="" ><br>

            <label for="Lname"> Latin name:</label><br>
            <input name="lname" type="text" id="lname" value="" ><br>
            
            <label for="zone"> Hardiness Zones:</label><br>
            <input name="zone" type="text" id="zone" value="" ><br>

            <label for="description"> Description:</label><br>
            <input name="description" type="text" id="form-description" value=""> <br>

            <label for="imageUrl">Image Url:</label><br>
            <input name="imgurl" type="text" id="imageUrl" value=""><br><br>

            

            ${pollinatorArray
              .map((polli) => {
                return `<input type="checkbox" id="${polli.id}" name="pollinator" value="${polli.name}">${polli.name}</input><br> `;
              })
              .join(" ")}
              
            <br><input type='submit' value='Submit'>

         </form>`;
        submitEvent();
        
      
       
};

function submitEvent(){
  singleDisplay.addEventListener('submit', (e) =>{
    e.preventDefault();
    const form = document.getElementById('newPlantForm')
    
    const checkboxes = Array.from(form.pollinator)
  
    const checkedPollinators = checkboxes.filter(checkbox => checkbox.checked === true)
    // console.log(checkedPollinators)

    const sendPollinatorIds = checkedPollinators.map((pollinator) => {return (pollinator.id)})
    console.log(sendPollinatorIds)
    // console.log(form.zone.value)
    // console.log(form.fname.value)
    // console.log(form.lname.value)
    // console.log(form.description.value)
    // console.log(form.imgurl.value)
    
   

    // 2)  now we will filter out checkboxes that aren't checked
    // 3)  after fitlering, map over array so that each element is an ID
        //  fetch('http://localhost:3000/plants', {
        //         method: 'POST',
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Accept": "application/json",
        //         },
        //         body: JSON.stringify({
        //           plant: {
        //             common_name: form.fname.value,
        //             latin_name: form.lname.value,
        //             description: form.description.value,
        //             image: form.imgurl.value,
        //             zone: form.zone.value,
        //             pollinator_ids: sendPollinatorIds
        //           }
        //         })
        //     })
      
    })
}

// function postPlant(){ 
//     fetch('http://localhost:3000/plants', {
//           method: 'POST',
//           header: {
//               "Content-Type": "application/json",
//               Accept: "application/json",
//           },
//           body: JSON.stringify({
//             plant: {
//               common_name: form.fname.value,
//               latin_name: form.lname.value,
//               description: form.description.value,
//               image: form.imgurl.value,
//               pollinator_ids: sendPollinatorIds
//             }
//           })
//       })
// };

