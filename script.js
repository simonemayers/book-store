let buttons = Array.from(document.querySelectorAll(".add-to-cart"))
let cart = document.querySelector("#list")
let cartLink = document.querySelector('[href*="cart.html"]')



let cartList = []

function addItem(item){
    console.log(item)
    localStorage.setItem("item", JSON.stringify(item.innerHTML))
    let newItem = document.createElement("li")
    newItem.innerHTML = JSON.parse(localStorage.item)
    cartList.push(localStorage.item)
    // cartList.push(newItem.innerHTML)
}

buttons.map(button => {
    button.addEventListener("click", (e) => {
        if(e.target.children.length){
            let item = e.target.parentNode
            addItem(item)
        } else{
            let item = e.target.parentNode.parentNode
            addItem(item)
        }
    })
})


function fillCart(arr){
    arr.map((item, i) => {
        let cartItem = document.createElement("li")
        cartItem.id = i
        cartItem.classList.add("list-group")
        cart.appendChild(cartItem)
        cartItem.innerHTML = JSON.parse(item)
    })
    
}

// while(!cart){
    // fillCart(cartList)

// }

