const plantContainer = document.getElementById('plant-container')
const plantArray = []

fetch("http://localhost:3000/plants")
.then(res => res.json())
.then(plants => { console.log(plants)
    plants.forEach((plant) => {
        plantArray.push(plant)
        console.log(plantArray)
        plantContainer.innerHTML += `<main class="plant-card"><p>${plant.common_name}(${plant.latin_name})</br><button id="${plant.id}">View More</button></p>
        <img src="${plant.image}">
        
        </main>` 
     })
})

plantContainer.addEventListener('click', (e) => {
    const plantDisplay = document.getElementById('plant-display')
    const targetedPlant = plantArray[e.target.id]
    if(e.target.tagName === 'BUTTON'){
         plantDisplay.innerHTML = `
         <h1>${targetedPlant.common_name}</h1>

         `
    }

})


   


