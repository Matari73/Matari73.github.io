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
                                createDivPeople(item);
                                break;
                            case "planets":
                                console.log(item)
                                createDivPlanets(item)
                                break
                            case "starships":
                                console.log(item)
                                createDivStarships(item)
                                break
                            default:
                                break;
                        }
                        // if(opcao == "people"){
                        //     console.log(item)
                        //     createDivPeople(item);
                        // }       
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

function createDivPeople(item) {
    const div = document.createElement('div');
    div.classList.add('item'); 
    propDesejadas = ["name", "height", "mass", "hair_color", "skin_color", "eye_color", "gender"] 

    for (const [key, value] of Object.entries(item)) {
        if (propDesejadas.includes(key)) {
            const propertyDiv = document.createElement('div');
            propertyDiv.textContent = `${key}: ${value}`;
            div.appendChild(propertyDiv);
        }
    }
    document.querySelector('.lista').appendChild(div);
}

function createDivPlanets(item) {
    const div = document.createElement('div');
    div.classList.add('item'); 
    propDesejadas = ["name", "rotation_period", "orbital_period", "diameter", "climate", "gravity", "terrain", "surface_water", "population"] 

    for (const [key, value] of Object.entries(item)) {
        if (propDesejadas.includes(key)) {
            const propertyDiv = document.createElement('div');
            propertyDiv.textContent = `${key}: ${value}`;
            div.appendChild(propertyDiv);
        }
    }
    document.querySelector('.lista').appendChild(div);
}

function createDivStarships(item) {
    const div = document.createElement('div');
    div.classList.add('item'); 
    propDesejadas = ["name", "model", "length", "passengers", "starship_class", "manufacturer", "cargo_capacity", "cost_in_credits"] 

    for (const [key, value] of Object.entries(item)) {
        if (propDesejadas.includes(key)) {
            const propertyDiv = document.createElement('div');
            propertyDiv.textContent = `${key}: ${value}`;
            div.appendChild(propertyDiv);
        }
    }
    document.querySelector('.lista').appendChild(div);
}

function erro(mensagem) {
    const div = document.createElement('div');
    div.innerText=`${mensagem}`; 
    document.querySelector('.lista').appendChild(div);
}
