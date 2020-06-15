const plantContainer = document.getElementById('plant-container')

fetch("http://localhost:3000/plants")
.then(res => res.json())
.then(plants => console.log(plants)
   


