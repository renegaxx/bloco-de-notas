const novaNota = document.getElementById('nova-nota')
const adicionarNota = document.getElementById('adicionar-nota')
const limparNota = document.getElementById('limpar-notas')
const notasSalvas = document.getElementById('notas-salvas')

// verifica se tem alguma nota no armazenamento local

if (localStorage.getItem('notas')) {
    // recupera o valor do item "notas" do localStorage e converte de volta para o javaScript usando o JSON.parse()
    const notas = JSON.parse(localStorage.getItem('notas'))

    // percorre cada nota usando um loop e usa a função criarNota()
    notas.forEach(function (nota, index) {
        criarNota(nota, index)
    })
}

// adiciona uma nova nota quando clicar no botão "adicionar nota"
adicionarNota.addEventListener('click', function () {
    // pega o texto que estava na textarea e salva no textoNota removendo espaços no começo e no final
    const textoNota = novaNota.value.trim()
    if (textoNota !== '') {
        criarNota(textoNota)
        salvarNota()
        novaNota.value = ''
    }
})

// apaga todas as notas quando clicar no botão
limparNota.addEventListener('click', function () {
    notasSalvas.innerHTML = ''
    localStorage.removeItem('notas')
})

// função para criar uma nova nota
function criarNota(texto, index) {
    const div = document.createElement('div')
    const p = document.createElement('p')
    const botaoEditar = document.createElement('button')
    const botaoExcluir = document.createElement('button')
    const inputCor = document.createElement('input')
    const inputCorTexto = document.createElement('input')
    inputCor.type = 'color'
    inputCorTexto.type = 'color'

    p.textContent = texto
    botaoEditar.textContent = 'Editar'
    botaoExcluir.textContent = 'Excluir'

    div.appendChild(p)
    div.append(botaoEditar)
    div.append(botaoExcluir)
    div.appendChild(inputCor)
    div.appendChild(inputCorTexto)

    div.className = 'nota'

    // verifica se o índice é indefinido
    if (index !== undefined) {
        const notas = JSON.parse(localStorage.getItem('notas'))
        inputCor.value = notas[index].cor;
        div.style.backgroundColor = notas[index].cor
        inputCorTexto.value = notas[index].cor;
        div.style.color = notas[index].cor
    }

    notasSalvas.appendChild(div)

    // função para editar a nota
    botaoEditar.addEventListener('click', function () {
        editarNota(p, div, inputCor, inputCorTexto)
    })

    // função para excluir a nota
    botaoExcluir.addEventListener('click', function () {
        if (confirm("Tem certeza que deseja excluir sua nota?")) {
            div.remove()
            salvarNota()
        }
    })
}

// função para altenar entre visualização da nota e textarea para edição
function editarNota(p, div, inputCor, inputCorTexto) {
    const textareaEdicao = document.createElement('textarea')
    textareaEdicao.value = p.textContent
    div.replaceChild(textareaEdicao, p)

    const botaoSalvar = document.createElement('button')
    botaoSalvar.textContent = 'Salvar'
    div.appendChild(botaoSalvar)

    botaoSalvar.addEventListener('click', function () {
        p.textContent = textareaEdicao.value
        div.replaceChild(p, textareaEdicao)
        div.removeChild(botaoSalvar)
        div.style.backgroundColor = inputCor.value
        div.style.color = inputCorTexto.value
        salvarNota()
    })
}

// função para salvar as notas no armazenamento local
function salvarNota() {
    const notas = []
    const divsNotas = notasSalvas.querySelectorAll('.nota')

    divsNotas.forEach(function (div) {
        const p = div.querySelector('p')
        const inputCor = div.querySelector('input')

        notas.push({
            texto: p.textContent,
            cor: inputCor.value

        })
    })

    // JSON.stringify converte o conteúdo para o formato de string
    localStorage.setItem('notas', JSON.stringify(notas))
}