//Event Listener: When an element with the id "search" is clicked, it triggers the getPokemon function.
document.querySelector("#search").addEventListener("click", getPokemon);
document.querySelector("#pokemonName").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    getPokemon();
  }
});

//lowerCaseName: This function takes a string and converts it to lowercase.
function lowerCaseName(string) {
    return string.toLowerCase();
}


// capitalizeFirstLetter: This function takes a string and capitalizes the first letter.
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getPokemon(e) {

  // It retrieves the value entered by the user in an input field with the id "pokemonName" and converts it to lowercase.
    const name = document.querySelector("#pokemonName").value;
    const pokemonName = lowerCaseName(name);

// It then uses the fetch function to make an HTTP GET request to the PokeAPI to get information about the Pokémon with the provided name.
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => {
       // This block of code is executed when the API call is successful.
        // It updates the HTML content with information about the Pokémon.
      document.querySelector(".pokemonBox").innerHTML = `
      <div>
      <img
        src="${data.sprites.other["official-artwork"].front_default}"
        alt="${capitalizeFirstLetter(data.name)}"
      />
    </div>
    <div class="pokemonInfo">
      <h1>${capitalizeFirstLetter(data.name)}</h1>
      <br>
      <h3>${capitalizeFirstLetter(data.abilities[0].ability.name)}</h3>
      <h3>${capitalizeFirstLetter(data.abilities[1].ability.name)}</h3>
      <p>🔋Hp: ${data.stats[0].base_stat}</p>
      <p>🎯Attack: ${data.stats[1].base_stat}</p>
      <p>🔰Defense: ${data.stats[2].base_stat}</p>
      <p>⚡Speed: ${data.stats[5].base_stat}</p>
      <p>🐉Weight: ${data.weight}</p>
      <br>
      <br>
    </div>
      `
    })
    // The catch() block handles errors and logs a message if the Pokémon is not found.
    .catch((err) => {
      console.log("Pokemon not found", err);
    });

    e.preventDefault();
}
