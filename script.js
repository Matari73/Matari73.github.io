document.querySelector('button').addEventListener('click', function () {
    let select = document.querySelector('select[name="select"]');
    let option = select.options[select.selectedIndex].value
    let input = document.querySelector('input').value

    try {
        fetch(`https://swapi.dev/api/${option}/?search=${input}`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                const list = document.querySelector('.lista');
                list.innerHTML = '';

                if (data.count >= 1) {
                    data.results.forEach((item) => {

                        switch (option) {
                            case "people":
                                console.log(item)
                                let peopleProperties = ["name", "height", "mass", "hair_color", "skin_color", "eye_color", "gender"]
                                createDiv(item, peopleProperties);
                                break;
                            case "planets":
                                console.log(item)
                                let planetsProperties = ["name", "rotation_period", "orbital_period", "diameter", "climate", "gravity", "terrain", "surface_water", "population"]
                                createDiv(item, planetsProperties)
                                break
                            case "starships":
                                console.log(item)
                                let starshipProperties = ["name", "model", "length", "passengers", "starship_class", "manufacturer", "cargo_capacity", "cost_in_credits"]
                                createDiv(item, starshipProperties)
                                break
                            default:
                                break;
                        }
                    });
                }
                else {
                    erro("No items found")
                }
            })
    } catch (error) {
        erro(error)
    }
})

function createDiv(item, properties) {
    const div = document.createElement('div');
    div.classList.add('item');  

    for (const [key, value] of Object.entries(item)) {
        if (properties.includes(key)) {
            const content = document.createElement('div');
            content.textContent = `${key}: ${value}`;
            div.appendChild(content);
        }
    }
    document.querySelector('.lista').appendChild(div);
}