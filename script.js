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
                        createDiv(item);
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

function createDiv(item) {
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

function erro(mensagem) {
    const div = document.createElement('div');
    div.innerText=`${mensagem}`; 
    document.querySelector('.lista').appendChild(div);
}
