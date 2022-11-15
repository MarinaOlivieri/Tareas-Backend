const getProducts = async ()=>{
    try{
        const response = await fetch("api/products")
        const products =  await response.json()
        return products
    }catch(err){
        console.log(err)
    }
}

const makeProductTable = async (products)=>{
    const archivoTemplate = await fetch("views/products-table.hbs")
    const templateText = await archivoTemplate.text()
    const templateCompiled = Handlebars.compile(templateText)
    return templateCompiled({products})
}

const renderProducts = async ()=>{
    const productsContainer = document.getElementById("productsContainer")

    const products = await getProducts()

    productsContainer.innerHTML = await makeProductTable(products)
}

const getProductsBtn = document.getElementById("getProductsBtn")

getProductsBtn.addEventListener('click', renderProducts)