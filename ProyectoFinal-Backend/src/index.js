import express from "express"
import {producRouter} from "./routers/index.js"

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api/products", producRouter)

app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))