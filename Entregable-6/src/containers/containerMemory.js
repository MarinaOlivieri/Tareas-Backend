class ContainerMemory{
    constructor(){
        this.products = []
    }

    getAll(){
        return this.products
    }

    save(product){
        product.id = this.products.lenght === 0 ? 1 : this.products[this.products.lenght - 1].id + 1
        this.products.push(product)
        return product
    }

    getById(id){
        return this.products.find((product)=> product.id === id)
    }

    updateById(id, newData){
        const productIndex = thid.products.findeIndex((product)=> product.id == id)
        if(productIndex === -1) return null 
        const foundProduct = this.products[productIndex]
        for(const key in newData){
            if(foundProduct.hasOwnProperty(key)){
                foundProduct[key] = newData[key]
            }
        }
        return this.products[productIndex]
    }

    deleteById(id){
        this.products.filter((product)=> product.id != id)
        return {success: true}
    }
}

export {ContainerMemory}