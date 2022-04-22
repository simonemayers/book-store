let buttons = Array.from(document.querySelectorAll(".add-to-cart"))
let cart = document.querySelector("#list")
let cartLink = document.querySelector('[href*="cart.html"]')
let tutorials = Array.from(document.querySelectorAll(".featured .card"))
tutorials.map((t, i ) => t.id = i)

let cartList = [...Array.from(localStorage)].filter(m=> m)

function addItem(tutorial){
    localStorage.setItem(`${tutorial.id}`, JSON.stringify(tutorial.innerHTML))
    let newItem = document.createElement("li")
    newItem.innerHTML = JSON.parse(localStorage.getItem(`${tutorial.id}`))
}

// function showItemAdding(){

// }


buttons.map(button => {
    button.addEventListener("click", (e) => {
        if(e.target.children.length){
            let tutorial = e.target.parentNode
            addItem(tutorial)
            tutorial.querySelector(".bi").className = "bi bi-cart-check-fill text-warning"
        } else{
            let item = e.target.parentNode.parentNode
            addItem(item)
            item.querySelector(".bi").className = "bi bi-cart-check-fill text-warning"
        }
    })
})

function fillCart(arr){
    arr.map((item, i) => {
        let cartItem = document.createElement("li")
        cartItem.id = i
        cartItem.classList.add("list-group")
        cartItem.classList.add("cart-item")
        cartItem.innerHTML = JSON.parse(item)
        cart.appendChild(cartItem)
        return cartItem
    })   
}

function displayCart(arr){
    let cartItem = fillCart(arr)

    // let table = document.createElement("table")
    let tableHead = document.createElement("thead")
    let tableHeadRow = document.createElement("tr")
    let actionTableHeader = document.createElement("th")
    let tutorialTableHeader = document.createElement("th")
    let quantityTableHeader = document.createElement("th")
    let priceTableHeader = document.createElement("th")
    let tableBody = document.createElement("tbody")
    
    // cart.appendChild(table)
    cart.appendChild(tableHead)
    tableHead.appendChild(tableHeadRow)
    cart.appendChild(tableBody)

    tableHeadRow.appendChild(actionTableHeader)
    actionTableHeader.id = "action"

    tableHeadRow.appendChild(tutorialTableHeader)
    tutorialTableHeader.id = "tutorial-name"
    tutorialTableHeader.textContent = "Tutorial"

    tableHeadRow.appendChild(quantityTableHeader)
    quantityTableHeader.id = "quantity-name"
    quantityTableHeader.textContent = "Quantity"

    tableHeadRow.appendChild(priceTableHeader)
    priceTableHeader.id = "price-name"
    priceTableHeader.textContent = "Price"
    
    
    for(let i=0; i<cartList.length; i++){
        let nameText = document.getElementById(`${i}`).querySelector(".card-title").textContent
        // let descriptionText = document.getElementById(`${i}`).querySelector(".card-text").textContent
        let imageSrc = document.getElementById(`${i}`).querySelector(".card-img-top").src
        let priceText = document.getElementById(`${i}`).querySelector("small").textContent
        document.getElementById(`${i}`).style.display = "none"
        
        let tableRow = document.createElement("tr")
        tableBody.appendChild(tableRow)
        tableBody.appendChild(tableRow)

        let action = document.createElement("td")
        action.classList.add("action")
        action.classList.add("align-middle")
        tableRow.appendChild(action)

        let actionButton = document.createElement("button")
        actionButton.classList.add("action-button")
        actionButton.classList.add("btn")
        action.appendChild(actionButton)
        actionButton.innerHTML = "<i class='bi bi-trash3-fill fs-4'></i>"

        let info = document.createElement("td")
        info.classList.add("cart-item-info")
        tableRow.appendChild(info)
        
        let image = document.createElement("img")
        image.src = imageSrc
        image.classList.add("cart-item-image")
        info.appendChild(image)
        
        let name = document.createElement("div")
        name.textContent = nameText
        name.classList.add("cart-item-name")
        info.appendChild(name)

        // let description = document.createElement("div")
        // description.textContent = descriptionText; 
        // description.classList.add("cart-item-description")
        // info.appendChild(description)
        
        let quantity = document.createElement("td")
        quantity.classList.add("cart-item-quantity")
        tableRow.appendChild(quantity)
        quantity.textContent = "1"

        let price = document.createElement("td")
        price.textContent = priceText
        price.classList.add("cart-item-price")
        tableRow.appendChild(price)
    }
}

function getTotal(){
    let prices = Array.from(document.querySelectorAll(".cart-item-price")).map(i => parseFloat(i.textContent.split("$")[1]))
    let total = prices.reduce((a, b) => a+b).toFixed(2)
    return total
}

function displayTotal(){
    let total = getTotal()

    let totalRow = document.createElement("tr")
    totalRow.classList.add("total-row")
    let tbody = document.querySelector("#list tbody")
    tbody.appendChild(totalRow)
    totalRow.innerHTML = 
    `<td colspan="1"> </td><td colspan="1">Total</td><td colspan="1">${cartList.length}</td><td colspan="1">$${total}</td>`

    // totalRow.innerHTML = `<td colspan='4'>${total}</td>`
    // totalRow.textContent = total

    console.log(total)
}


if(Array.from(cartLink.classList).includes("active")){
    console.log("hello")
    displayCart(cartList)
    displayTotal()
}

function displayCartTotal(){
    cartLink.innerHTML = `Cart <sup>${cartList.length}</sup>`
}
displayCartTotal()

Array.from(document.querySelectorAll(".dropdown-item")).map(button => {
    button.addEventListener("click", (e) => {
        if(e.target.id === "all-tutorials-button"){
            document.querySelector("#most-popular").style.display = "block"
            document.querySelector("#new-arrivals").style.display = "block"
            document.querySelector("#best-deals").style.display = "block"
        } else if(e.target.id === "most-popular-button"){
            document.querySelector("#most-popular").style.display = "block"
            document.querySelector("#new-arrivals").style.display = "none"
            document.querySelector("#best-deals").style.display = "none"
        } else if(e.target.id === "new-arrivals-button"){
            document.querySelector("#most-popular").style.display = "none"
            document.querySelector("#new-arrivals").style.display = "block"
            document.querySelector("#best-deals").style.display = "none"
        } else if(e.target.id === "best-deals-button"){
            document.querySelector("#most-popular").style.display = "none"
            document.querySelector("#new-arrivals").style.display = "none"
            document.querySelector("#best-deals").style.display = "block"

        }
    })
})

Array.from(document.querySelectorAll(".action")).map(button => {
    button.addEventListener("click", (e) => {
        let name = e.target.parentNode.parentNode.parentNode.querySelector(".cart-item-name").textContent
        let localIds = Object.keys(localStorage).filter((key) => key.length < 3)
        for(let i=0; i< localIds.length; i++){
            if(localStorage[localIds[i]].includes(name)){
                console.log("yes")
                console.log(localIds[i])
                localStorage.removeItem(localIds[i])
                window.location.reload()
            }
        }
    })
})