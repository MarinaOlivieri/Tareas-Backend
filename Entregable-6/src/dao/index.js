import { ContainerMemory } from "../containers/containerMemory.js"
import { ContainerFilesystem } from "../containers/containerFilesystem.js"

const DB_TYPE = "filesystem"
const PRODUCTS_FILENAME = "products"
const MESSAGES_FILENAME = "messages"

const ProductDao = 
DB_TYPE === "filesystem" ? new ContainerFilesystem(PRODUCTS_FILENAME) : new ContainerMemory()

const MessagesDao = 
DB_TYPE === "filesystem" ? new ContainerFilesystem(MESSAGES_FILENAME) : new ContainerMemory()

export {ProductDao, MessagesDao}