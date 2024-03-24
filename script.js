document.querySelector('button').addEventListener('click', function () {
    let select = document.querySelector('select[name="select"]');
    let opcao = select.options[select.selectedIndex].value
    let input = document.querySelector('input').value

    try {
        fetch(`https://swapi.dev/api/${opcao}/?search=${input}`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                const lista = document.querySelector('.lista');
                lista.innerHTML = '';

                if (data.count >= 1) {
                    data.results.forEach((item) => {

                        switch (opcao) {
                            case "people":
                                console.log(item)
                                let propriedadesPeople = ["name", "height", "mass", "hair_color", "skin_color", "eye_color", "gender"]
                                createDiv(item, propriedadesPeople);
                                break;
                            case "planets":
                                console.log(item)
                                let propriedadesPlanets = ["name", "rotation_period", "orbital_period", "diameter", "climate", "gravity", "terrain", "surface_water", "population"]
                                createDiv(item, propriedadesPlanets)
                                break
                            case "starships":
                                console.log(item)
                                let propriedadesStarships = ["name", "model", "length", "passengers", "starship_class", "manufacturer", "cargo_capacity", "cost_in_credits"]
                                createDiv(item, propriedadesStarships)
                                break
                            default:
                                break;
                        }
                    });
                }
                else {
                    erro("Nenhum item encontrado")
                }
            })
    } catch (error) {
        erro(error)
    }
})

function createDiv(item, propriedades) {
    const div = document.createElement('div');
    div.classList.add('item');  

    for (const [key, value] of Object.entries(item)) {
        if (propriedades.includes(key)) {
            const propertyDiv = document.createElement('div');
            propertyDiv.textContent = `${key}: ${value}`;
            div.appendChild(propertyDiv);
        }
    }
    document.querySelector('.lista').appendChild(div);
}