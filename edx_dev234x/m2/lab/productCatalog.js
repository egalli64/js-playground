window.onload = init

let input
let tblSimilar
let tblAll
let spnId
let spnPrice
let spnType
const deltaPrice = 50

function init() {
    input = document.querySelector('#input')
    tblSimilar = document.querySelector('#tblSimilar')
    tblAll = document.querySelector('#tblAll')
    spnId = document.querySelector('#spnId')
    spnPrice = document.querySelector('#spnPrice')
    spnType = document.querySelector('#spnType')

    document.querySelector('#btnSearchById')
        .addEventListener('click', () => searchById(input.value))

    document.querySelector('#btnSearchByPrice')
        .addEventListener('click', () => searchByPrice(input.value))

    document.querySelector('#btnSearchByType')
        .addEventListener('click', () => searchByType(input.value))

    api.searchAllProducts().then(values => updateTable(tblAll, values))
}

function searchById(id) {
    api.searchProductById(id).then(item => {
        updateExamined(item)

        let p1 = api.searchProductsByPrice(item.price, deltaPrice)
        let p2 = api.searchProductsByType(item.type)
        return Promise.all([p1, p2, item])
    }).then(val => {
        var values = getIntersection(val[0], val[1], val[2].id)
        updateTable(tblSimilar, values)
    }).catch(val => alert(val))
}

function searchByPrice(price) {
    api.searchProductsByPrice(price, deltaPrice).then(items => {
        updateExamined(items[0])
        updateTable(tblSimilar, items)
    }).catch(error => alert(error))
}

function searchByType(type) {
    api.searchProductsByType(type).then(items => {
        updateExamined(items[0])
        updateTable(tblSimilar, items)
    }).catch(val => alert(val))
}

function getIntersection(arrA, arrB, id) {
    let results = []
    for (let a of arrA) {
        for (let b of arrB) {
            if (a === b && a.id != id)
                results.push(a)
        }
    }
    return results
}

function updateExamined(item) {
    spnId.textContent = item.id
    spnPrice.textContent = item.price
    spnType.textContent = item.type

    input.value = ''
}

function updateTable(table, items) {
    while (table.childElementCount > 1) {
        table.removeChild(table.lastChild)
    }

    for (let item of items) {
        let tr = document.createElement('TR')
        let td1 = document.createElement('TD')
        let td2 = document.createElement('TD')
        let td3 = document.createElement('TD')
        let td4 = document.createElement('button')

        td4.addEventListener('click', function () {
            searchById(this.parentNode.firstChild.textContent)
        })

        td1.appendChild(document.createTextNode(item.id))
        td2.appendChild(document.createTextNode(item.type))
        td3.appendChild(document.createTextNode(item.price))
        td4.appendChild(document.createTextNode('Examine'))

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)

        table.appendChild(tr)
    }
}