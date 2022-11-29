import express from "express"
import {Server as HttpServer} from "http"
import {Server as IOServer} from "socket.io"
import {productRouter} from "./routers/productRouter.js"
import {viewsRouter} from "./routers/viewsRouter.js"
import { MessagesDao, ProductDao} from "./dao/index.js"
import {DATE_UTILS} from "./utils/index.js"
import handlebars from "express-handlebars"
import path from "path"


const PORT = 8080
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const server = httpServer.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`)
})
server.on("err", (err)=>{
    console.error(`Error en el servidor ${err}`)
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.engine("hbs", handlebars.engine({extname: "hbs", defaultLayout: "main.hbs"}))
app.set("view engine", "hbs")
app.set("views", path.join(process.cwd(), "/views"))

io.on("connection", async(socket)=>{
    console.log(`Nuevo cliente conectado ${socket.id}`)
    socket.emit("mensajes", await MessagesDao.getAll())
    socket.on("mensajeNuevo", async({email, text})=>{
        const message = {email, text, timstamp: DATE_UTILS.getTimestamp()}
        await MessagesDao.save(message)
        io.sockets.emit("mensajes", await MessagesDao.getAll())
    })

    socket.emit("products", await ProductDao.getAll())

    socket.on("add-product", async(data)=>{
        const products = await ProductDao.save(data)
        io.sockets.emit("products", await ProductDao.getAll())
    })
})