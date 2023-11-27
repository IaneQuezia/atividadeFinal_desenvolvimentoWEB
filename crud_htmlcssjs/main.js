

const openForm = () => document.getElementById('form')
    .classList.add('active')

const closeForm = () => {
    clearFields()
    document.getElementById('form').classList.remove('active')
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_funcionario')) ?? []
const setLocalStorage = (dbFuncionario) => localStorage.setItem("db_funcionario", JSON.stringify(dbFuncionario))

// CRUD - create read update delete
const deleteFuncionario = (index) => {
    const dbFuncionario = readFuncionario()
    dbFuncionario.splice(index, 1)
    setLocalStorage(dbFuncionario)
}

const updateFuncionario = (index, func) => {
    const dbFuncionario = readFuncionario()
    dbFuncionario[index] = func
    setLocalStorage(dbFuncionario)
}

const readFuncionario = () => getLocalStorage()

const createFuncionario = (func) => {
    const dbFuncionario = getLocalStorage()
    dbFuncionario.push (func)
    setLocalStorage(dbFuncionario)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.form-field')
    fields.forEach(field => field.value = "")
}

const saveFuncionario = () => {
    if (isValidFields()) {
        const func = {
            nome: document.getElementById('nome').value,
            idade: document.getElementById('idade').value,
            peso: document.getElementById('peso').value,
            altura: document.getElementById('altura').value
        }
        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            createFuncionario(func)
            updateTable()
            closeForm()
        } else {
            updateFuncionario(index, func)
            updateTable()
            closeForm()
        }
    }
}

const createRow = (func, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${func.nome}</td>
        <td>${func.idade}</td>
        <td>${func.peso}</td>
        <td>${func.altura}</td>
        <td>${func.imc}</td>
        <td>${func.comorbidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `
    document.querySelector('#tableFuncionario>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableFuncionario>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbFuncionario = readFuncionario()
    clearTable()
    dbFuncionario.forEach(createRow)
}

const fillFields = (func) => {
    document.getElementById('nome').value = func.nome
    document.getElementById('idade').value = func.idade
    document.getElementById('peso').value = func.peso
    document.getElementById('altura').value = func.altura
    document.getElementById('nome').dataset.index = func.index
}

const editfunc = (index) => {
    const func = readFuncionario()[index]
    func.index = index
    fillFields(func)
    openForm()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editfunc(index)
        } else {
            const func = readFuncionario()[index]
            const response = confirm(`Deseja realmente excluir o funcionário ${func.nome}?`)
            if (response) {
                deleteFuncionario(index)
                updateTable()
            }
        }
    }
}

updateTable()

// Eventos
document.getElementById('cancelar')
    .addEventListener('click', closeForm)

document.getElementById('cadastrarFuncionario')
    .addEventListener('click', openForm)

document.getElementById('formClose')
    .addEventListener('click', closeForm)

document.getElementById('salvar')
    .addEventListener('click', saveFuncionario)

document.querySelector('#tableFuncionario>tbody')
    .addEventListener('click', editDelete)
