fetch("https://rickandmortyapi.com/api/character/")
    .then((response) => response.json())
    .then((data) => Cards(data.results));

function Cards(stuff) {
    const cardContainer = document.querySelector("#card-group")
    console.log(stuff)
    stuff.forEach(character => {
        cardContainer.innerHTML = cardContainer.innerHTML +
            `<div class="card">
        <h2>${character.name}</h2>
        <h4>Status:${character.status}</h4>
        <img src=${character.image} class="card-img-top"></img>
        </div>
        </br>
        `
    })
}