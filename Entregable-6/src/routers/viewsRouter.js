import {Router} from "express"
import {ProductDao} from "../dao/index.js"

const viewsRouter = Router()

viewsRouter.get("/", (req,res)=>{
    res.render("form-products")
})

viewsRouter.post("/products", async(req,res)=>{
    const {title, price, thumbnail} = req.body
    await ProductDao.save({title, price, thumbnail})
    res.redirect("/")
})

viewsRouter.get("products", async(req,res)=>{
    const products = await ProductDao.getAll()
    res.render("table-products", {products: products})
})

export {viewsRouter}