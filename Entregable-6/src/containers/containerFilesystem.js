import fs from "fs"

class ContainerFilesystem{
    constructor(fileName){
        this.filePath = `./src/db/${fileName}.json`
    }

    async getAll(){
        try{
            const file = await fs.promises.readFile(this.filePath, "utf-8")
            const products = JSON.parse(file)
            return products
        }catch(err){
            if(err.code === "ENOENT"){
                await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 3))
                return []
            }
            console.log(err)
        }
    }

    async save(product){
        try{
            const products = await this.getAll()
            const id = products.length === 0 ? 1 : products[products.length - 1].id + 1
            product.id = id 
            products.push(product)
            await fs.promises.writeFile(
                this.filePath, JSON.stringify(products, null, 3) 
            )
            return product
        }catch(err){
            console.log(err)
        }
    }

    async getById(id){
        try{
           const products = await this.getAll() 
           const foundProduct = products.find((product)=> product.id  == id)
           if(!foundProduct) return null 
           return foundProduct
        }catch(err){
           console.log(err) 
        }
    }

    async deletebyId(id){
        try{
           const products = await this.getAll()
           const foundProduct = products.find((product)=> product.id == id) 
           if (!foundProduct) return "Product not found"
           const filterProducts = products.filter((product)=> product.id != id)
           await fs.promises.writeFile(this.filePath, JSON.stringify(filterProducts, null, 3))
        }catch(err){
            console.log(err)   
        }
    }

    async deleteAll(){
        try{
            await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 3))
        }catch(err){
            console.log(err)
        }
    }

    async updateById(id, newData){
        try{
            const products = await this.getAll()
            const foundProductIndex = products.findeIndex((product)=> product.id == id)
            if(foundProductIndex === -1) return null 
            const foundProduct = products[foundProductIndex]
            for (const key in newData){
                if(foundProduct.hasOwnProperty(key)){
                    foundProduct[key] = newData[key]
                }
            }
            await fs.promises.writeFile(this.filePath, JSON.stringify(products, nnull, 3))
            return foundProduct
        }catch(err){
            console.log(err)
        }
    }
}

export {ContainerFilesystem}

