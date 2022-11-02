import { Router } from "express";

const router = Router()

router.get("/", async (req,res)=>{
    const product = await getAll()
    res.send(product)
})

export {router as producRouter}