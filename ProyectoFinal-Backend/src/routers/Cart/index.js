import {Router} from "express"
import { cartDao, productDao } from "../../Dao/index.js"
import { DATE_UTILS, ERR_UTILS } from "../../Utils/index.js"

const router = Router()

router.post("/", async(req,res)=>{
    try{
        const baseCart ={timestamp: DATE_UTILS.getTimestamp(), products: []}
        const cart = await cartDao.save(baseCart)
        res.send({success: true, cartId: cart.id})
    }catch (err){
       res.send(err) 
    }
})

router.post("/:cartId/products", async(req,res)=>{
    
    const {productId} = req.body
    const {cartId} = req.params

    const cart = await cartDao.getById(Number(cartId))
    if(!cart) return res.send({err: true, message: ERR_UTILS.MESSAGES.NO_CART})

    const product = await productDao.getById(Number(productId))
    if(!product) return res.send({err: true, message: ERR_UTILS.MESSAGES.NO_PRODUCT})

    cart.products.push(product)

    const updatedCart = await cartDao.updateById(Number(cartId), cart)

    res.send({success: true, cart: updatedCart})

})

export {router as CartRouter}