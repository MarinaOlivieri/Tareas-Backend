import express from "express"
import { config } from "./config/index.js"
import {producRouter, CartRouter} from "./routers/index.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use("/api/products", producRouter)
app.use("/api/cart", CartRouter)

const server = app.listen(config.SERVER.PORT, ()=>
console.log(`Server running on port ${server.address().port}`))