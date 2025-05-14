const botao_buscar = document.getElementById("botao_buscar");
const campoEntrada = document.getElementById("entrada");

botao_buscar.addEventListener("click", async function () {
    const buscar = campoEntrada.value.toLowerCase();
    if (!buscar) return;

    try {
        // Esperar a resposta da API
        const resposta = await fetch('https://pokeapi.co/api/v2/pokemon/' + buscar);
        if (!resposta.ok) throw new Error("Pokémon não encontrado");

        const dados = await resposta.json();

        document.getElementById("nome").textContent = dados.name;
        document.getElementById("numero").textContent = `#${dados.id}`;
        document.getElementById("imagem").src = dados.sprites.front_default;

        // Exibir tipos com cores
        const tipos = document.getElementById("tipo");
        tipos.innerHTML = "";

        dados.types.forEach(tipoInfo => {
            const tipo = tipoInfo.type.name;
            const chip = document.createElement("span");
            chip.className = "chip_tipo";
            chip.textContent = tipo;
            chip.style.backgroundColor = corTipo(tipo); // aplicar a cor
            chip.style.color = "white";
            chip.style.padding = "4px 8px";
            chip.style.margin = "4px";
            chip.style.borderRadius = "8px";
            tipos.appendChild(chip);
        });
    } catch (error) {
        alert(error.message);
    }
});

// Mapeamento de cores por tipo
function corTipo(tipo) {
    const cor = {
        fire: "#F08030", water: "#6890F0", grass: "#78C850", electric: "#F8D030",
        ice: "#98D8D8", fighting: "#C03028", poison: "#A040A0", ground: "#E0C068",
        flying: "#A890F0", psychic: "#F85888", rock: "#B8A038", bug: "#A8B820",
        ghost: "#705898", steel: "#B8B8D0", fairy: "#EE99AC", normal: "#A8A878",
        dragon: "#7038F8", dark: "#705848"
    };
    return cor[tipo] || "#000000";
}
