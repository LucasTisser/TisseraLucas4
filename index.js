const express = require('express')
const {Router} = express

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const productos = Router()
const listaProductos = [
{
    "title":"Shampoo",
    "price":"5USD",
    "id":"1"
},
{
    "title":"Acondicionador",
    "price":"7USD",
    "id":"2"
},
{
    "title":"Jabon",
    "price":"2USD",
    "id":"3"
}]
productos.get('/', (req,res)=>{
    res.send(listaProductos)
})
productos.get('/:id', (req,res)=>{
    // Toma un producto segun su id
    const id = req.params.id
    const productoBuscado = listaProductos.filter(producto=>producto.id === id)
    if(listaProductos.length < id){
        console.log("No se ha encontrado un producto con dicho ID")
    } else {
        res.send(productoBuscado)
    }
})
productos.post('/', (req, res) => {
    const {title ,price, id} = req.body
    if(!title || !price || !id){
        res.status(400).send('producto no encontrado')
    }
},(req, res) => {
    listaProductos.push({title,price,id})
    res.send('producto guardado con exito')} 
)
productos.put('/',(req,res)=>{
    // recibe y actualiza un producto segun su id
    res.send()
})
productos.delete('/:id',(req, res) => {
    // Elimina un producto segun su id
    const id = req.params.id
    // filtrar los datos para identificar el objeto a eliminar y eliminarlo
    const productoBorrado = listaProductos.filter((elemento) => elemento.id !== id);
    console.log(productoBorrado)
    if (productoBorrado.length == listaProductos.length) {
      console.log("No se encontro un item con dicho id para eliminar");
    } else {
    // guardar el nuevo array con el nuevo objeto agregado
    res.send("Elemento eliminado")
  }
})

app.use('/api/productos',productos)

const PORT = 8080
app.listen(PORT,()=> {
    console.log('Server on '+ PORT)
})