const cardArray = [];

const datafetch = fetch("https://pokeapi.co/api/v2/type?limit=100")
  .then((response) => response.json())
  .then((data) =>
    data.results.forEach((element) => {
      addType(element.name);
    }, data.results)
  )
  .catch((error) => console.log(error));

function addType(name) {
  const select = document.getElementById("type");
  const options = document.createElement("option");
  options.value = name;
  options.textContent = name;
  options.setAttribute("id", "type-" + name);
  select.appendChild(options);
}

const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", () => {
  const cardsContainer = document.querySelector(".pokemon-cards-container");
  const select = document.getElementById("type");
  const type = select.value;
  const number = document.getElementById("pokemon-no").value;
  fetchPokemons(`https://pokeapi.co/api/v2/type/${type}`, number);

  cardsContainer.innerHTML = "";
});

function addCard(index) {
  const cardsContainer = document.querySelector(".pokemon-cards-container");
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  card.setAttribute("id", "card-" + index);

  const cardTop = document.createElement("div");
  cardTop.setAttribute("class", "card-top");
  const cardName = document.createElement("h2");
  cardName.setAttribute("class", "card-name");
  cardName.textContent = cardArray[index].name;

  const cardType = document.createElement("p");
  cardType.setAttribute("class", "card-type");
  cardType.textContent = cardArray[index].type;

  cardTop.appendChild(cardName);
  cardTop.appendChild(cardType);

  const cardImg = document.createElement("img");
  cardImg.setAttribute("id", "card-img");
  cardImg.setAttribute("src", cardArray[index].img);

  const cardInfo = document.createElement("div");
  cardInfo.setAttribute("class", "card-info");
  const cardStats = document.createElement("div");
  cardStats.setAttribute("class", "card-stats");
  cardStats.innerText = `• HP: ${cardArray[index].stats[0].base_stat} • Attack: ${cardArray[index].stats[1].base_stat} 
  • Defense: ${cardArray[index].stats[2].base_stat} • Sp. Atk: ${cardArray[index].stats[3].base_stat} 
  • Sp. Def: ${cardArray[index].stats[4].base_stat} • Speed: ${cardArray[index].stats[5].base_stat}`;

  const cardDemographic = document.createElement("div");
  cardDemographic.setAttribute("class", "card-demographic");
  const cardWeight = document.createElement("p");
  cardWeight.setAttribute("class", "card-weight");
  cardWeight.textContent = `Weight: ${cardArray[index].weight} kg`;

  const cardHeight = document.createElement("p");
  cardHeight.setAttribute("class", "card-height");
  cardHeight.textContent = `Height: ${cardArray[index].height} cm`;

  cardDemographic.appendChild(cardWeight);
  cardDemographic.appendChild(cardHeight);
  cardInfo.appendChild(cardStats);
  cardInfo.appendChild(cardDemographic);
  card.appendChild(cardTop);
  card.appendChild(cardImg);
  card.appendChild(cardInfo);
  cardsContainer.appendChild(card);
}

function fetchPokemons(url, number) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      number = Math.min(number, data.pokemon.length);
      for (let i = 0; i < number; i++) {
        const temp = data.pokemon;
        console.log(temp[i].pokemon.url);
        fetchPokemon(temp[i].pokemon.url, i);
      }
    })
    .catch((error) => console.log(error));
}

function fetchPokemon(url, i) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      cardArray[i] = {
        name: data.forms[0].name,
        img: data.sprites.other["official-artwork"].front_default,
        weight: data.weight,
        height: data.height,
        type: data.types[0].type.name,
        stats: data.stats,
      };
      addCard(i);
    })
    .catch((error) => console.log(error));
}
