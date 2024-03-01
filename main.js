class Producto{
    constructor (id,nombre,precio,imagen){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }
}

const producto1 = new Producto (1, "Aros disrupt", 1000, "aros-disrupt.jpg");
const producto2 = new Producto (2, "Collar corazones", 1300, "corazonescollar-product.jpg");
const producto3 = new Producto (3, "Punto de luz", 1150, "pdluz-product.jpg");
const producto4 = new Producto (4, "Pendientes Bright", 800, "pendientes-bright.jpg");
const producto5 = new Producto (5, "Pendientes Brito", 650, "pendientes-brito.jpg");
const producto6 = new Producto (6, "Pendientes Cava", 760, "pendientes-cava.jpg");
const producto7 = new Producto (7, "Pulsera Rolo", 1100, "pulseras-rolo.jpg");
const producto8 = new Producto (8, "Pulsera Torneada", 950, "pulseratorn-product.jpg");


const modal = document.querySelector(`#modal`)  
const modalContainer = document.querySelector (`#modalContainer`)
const carritoContent = document.querySelector (`#carritoContent`)
const carrito = document.querySelector(`#carrito`)
const closemodal = document.querySelector (`#closemodal`)
const precioTotal = document.querySelector (`#totalAmount`)
const undoProduct = document.querySelector (`.undoProduct`)
const totalAPagar = document.querySelector (`.totalAPagar`)



// mostrar y ocultar carrito
carrito.addEventListener("click", () => {
    modal.style.display = "block"
})

closemodal.addEventListener(`click`, () => {
    modal.style.display = `none`
})

// boton agregar al carrito y acumular los elementos que se agregan mas de una vez
const containerProduct = document.querySelector(`.containerProducts`)
containerProduct.addEventListener("click", agregarCarrito)

let carritoProducts = JSON.parse(localStorage.getItem(`carritoProducts`)) || []





function agregarCarrito(event){
    event.preventDefault()
    if(event.target.classList.contains("agregarCarrito")){
        const product = event.target.parentElement           
        const productData = {
            quantity : 1,
            name: product.querySelector(`h4`).textContent,
            price: product.querySelector(`p`).textContent,
        }

        const repeat = carritoProducts.some((product) => product.name === productData.name)
        if (repeat){
            const productos = carritoProducts.map ((product) =>{
                if (product.name === productData.name){
                    product.quantity++
                    return product
                }else{
                    return product
                }
            })
            carritoProducts = [...productos]
        }else{
            carritoProducts = [...carritoProducts, productData]
        }
        carritoDisplay()
        saveLocal ()
    }
}

// eliminar elementos
 carritoContent.addEventListener(`click`, (event) => {
     if (event.target.classList.contains(`undoProduct`)) {
         const product = event.target.parentElement
         const name = product.querySelector(`h4`).textContent
         carritoProducts = carritoProducts.filter( 
             (product) => product.name !== name
        );
         carritoDisplay()
     }
 })


//  mostrar los productos a los que apretamos agregar al carrito y hacer suma total de precio
const carritoDisplay = () =>{
    carritoContent.innerHTML = " "
    let total = 0
    carritoProducts.forEach(product =>{
        const containerCarritoProduct = document.createElement (`div`)
        containerCarritoProduct.classList.add(`containerCarrito`)
        containerCarritoProduct.innerHTML = `
            <div class = "infoCarritoProduct">
                <p class = "productQuantity">${product.quantity}</p>
                <h4 class = "carritoProductName">${product.name}</h4>
                <p class = "carritoProductPrice">${product.price}</p>
                <span class="undoProduct">&times;</span>
            </div>
        `
        carritoContent.append(containerCarritoProduct)
        total = total + parseInt(product.quantity * product.price.slice(1))
        })
        totalAPagar.innerText = `Precio Total = $${total}`
}

if(carritoProducts = []){
    carritoContent.innerHTML = `
    <p>Tu carrito esta vacio</p>`
}


const saveLocal =  () => {
    localStorage.setItem("carritoProducts", JSON.stringify(carritoProducts))
}
