document.querySelector('button').addEventListener('click', function () {
    let select = document.querySelector('select[name="select"]');
    let opcao = select.options[select.selectedIndex].value
    let input = document.querySelector('input').value

    try {
        fetch(`https://swapi.dev/api/${opcao}/?search=${input}`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                document.querySelector('.lista').innerHTML = '';
                if (data.count >= 1) {
                    data.results.forEach((item) => {
                        createLi(`${item.name}`)
                    });
                }
                else {
                    createLi("Nenhum item encontrado")
                }
            })
    } catch (error) {
        createLi(error)
    }


})


function createLi(mensagem) {
    const li = document.createElement('li');
    li.textContent = `${mensagem}`
    document.querySelector('.lista').appendChild(li);
}