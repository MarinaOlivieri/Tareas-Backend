import { Router } from "express"
import { productDao } from "../../Dao/index.js"
import { verifyRole } from "../../middlewares/veryfyRole.js"
import { DATE_UTILS } from "../../Utils/date-utils.js"
import { ERR_UTILS } from "../../Utils/err-utils.js"
import { JOI_VALIDATOR } from "../../Utils/joi-validator.js"

const router = Router()

router.get("/", async (req,res)=>{
    const product = await productDao.getAll()
    if(!product){
        return res.send({err: ERR_UTILS.MESSAGES.NO_PRODUCT})
    }
    res.send(product)
})

router.get("/:id", async (req,res)=>{
    const {id} = req.params 
    const product = await productDao.getById(Number(id))
    res.send(product)
})

router.post("/", verifyRole, async(req, res)=>{
    try{
        const {title, description, code, thumbnail, price, stock} = req.body
        const product = await JOI_VALIDATOR.product.validateAsync({
            title, 
            description, 
            code, 
            thumbnail, 
            price, 
            stock, 
            timestamp: DATE_UTILS.getTimestamp()})
        const createdProduct = await productDao.save(product)
        res.send(createdProduct)   
    }catch(err){
        res.send(err)        
    }
})

router.delete("/:id", async(req,res)=>{
    try{
        const {id} = req.params
        await productDao.deleteById(Number(id))
        res.send({success: true})
    }catch(err){
        res.send({err: ERR_UTILS.MESSAGES.NO_DELETE})
    }
})

export {router as producRouter}