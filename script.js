//Event Listener: When an element with the id "search" is clicked, it triggers the getPokemon function.
document.querySelector("#search").addEventListener("click", getPokemon);


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
      <p>Weight: ${data.weight}</p>
    </div>
      `
    })
    // The catch() block handles errors and logs a message if the Pokémon is not found.
    .catch((err) => {
      console.log("Pokemon not found", err);
    });

    e.preventDefault();
}
