const plantContainer = document.getElementById('plant-container')

fetch("http://localhost:3000/plants")
.then(res => res.json())
.then(plants => { console.log(plants)
    plants.forEach((plant) => {
        plantContainer.innerHTML += `<main class="plant-card"><p>${plant.common_name}(${plant.latin_name})</p>
        <img src="${plant.image}"></main>

        
         ` // <img src="${plant.image}">
     })
})
   


