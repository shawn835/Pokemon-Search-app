const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";
const errorMessage = document.getElementById("error-message")


searchBtn.addEventListener("click", () => {
    const pokemonName = searchInput.value.toLowerCase().trim();

    if (pokemonName) {
        fetchPokemonData(pokemonName);
    } else {
        alert("Pokémon not found");
    }
    searchInput.value = "";
});

const fetchPokemonData = async (pokemonName) => {
    clearPreviousResults()
    try {

        showLoadingIndicator(true);

        const res = await fetch(`${pokemonUrl}${pokemonName}`);
        if (!res.ok) {
            // throw new Error(`${pokemonName} not found!`);
            throw new Error(`HTTP error! status:${res.status}`)
        }
        const data = await res.json();
        showData(data);
    } catch (e) {
        handleError(e.message);

    }
    finally {
        showLoadingIndicator(false)


    }
};

const showData = (data) => {
    const { height, id, name, sprites, weight, types, stats } = data;
    const hp = stats.find((stat) => stat.stat.name === "hp")?.base_stat;
    const attack = stats.find((stat) => stat.stat.name === "attack")?.base_stat;
    const defense = stats.find((stat) => stat.stat.name === "defense")?.base_stat;
    const spAttack = stats.find(
        (stat) => stat.stat.name === "special-attack"
    )?.base_stat;
    const spDefense = stats.find(
        (stat) => stat.stat.name === "special-defense"
    )?.base_stat;
    const speed = stats.find((stat) => stat.stat.name === "speed")?.base_stat;

    document.getElementById("pokemon-name").textContent = name;
    document.getElementById("pokemon-id").textContent = id;
    document.getElementById("weight").textContent = `Weight: ${weight}`;
    document.getElementById("height").textContent = `Height: ${height}`;
    document.getElementById("image").src = sprites.front_default;
    document.getElementById("type-one").textContent =
        types[0]?.type.name || "N/A";
    document.getElementById("type-two").innerHTML =
        types[1]?.type.name || "N/A";
    document.getElementById("hp").textContent = hp;
    document.getElementById("attack").textContent = attack;
    document.getElementById("defense").textContent = defense;
    document.getElementById("special-defense").textContent = spDefense;
    document.getElementById("speed").textContent = speed;
    document.getElementById("special-attack").textContent = spAttack;
};

const showLoadingIndicator = (isLoading) => {
    const loader = document.getElementById('loader')
    loader.style.visibility = isLoading ? "visible" : "hidden"
}

const handleError = (message) => {
    errorMessage.innerHTML = `error: ${message}!`

}

const clearPreviousResults = () => {
    errorMessage.textContent = ''
    document.getElementById("pokemon-name").textContent = "";
    document.getElementById("pokemon-id").textContent = "";
    document.getElementById("weight").textContent = "";
    document.getElementById("height").textContent = "";
    document.getElementById("image").src = "";
    document.getElementById("type-one").textContent =
        "";
    document.getElementById("type-two").textContent =
        "";
    document.getElementById("hp").textContent = "";
    document.getElementById("attack").textContent = "";
    document.getElementById("defense").textContent = "";
    document.getElementById("special-defense").textContent = "";
    document.getElementById("speed").textContent = "";
    document.getElementById("special-attack").textContent = "";

}
