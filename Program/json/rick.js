fetch("https://rickandmortyapi.com/api/character/?name=pickle&status=alive")
    .then((response) => response.json())
    .then((data) => Cards(data.results));

function Cards(stuff) {
    const cardContainer = document.querySelector("#card-group")
    console.log(stuff)
    stuff.forEach(character => {
        cardContainer.innerHTML = cardContainer.innerHTML +
            `<div class="row">
            <div class="card">
            <div class="row">
        <h2>${character.name}</h2>
        <h4>Status:${character.status}- Species:${character.species}</h4>
        </div>
        <img src=${character.image} class="card-img-top"></img>
        </div>
        </div>
        </br>
        `
    })
}