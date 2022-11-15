import dotenv from "dotenv"
dotenv.config()

const PRODUCTS_FILENAME = "products"
const CARTS_FILNAME = "carts"

const config ={
    SERVER:{
        PORT: process.env.PORT || 3000
    },
    DATABASES:{
        filesystem:{
            PRODUCTS_FILENAME,
            CARTS_FILNAME
        }
    }
}

export {config}