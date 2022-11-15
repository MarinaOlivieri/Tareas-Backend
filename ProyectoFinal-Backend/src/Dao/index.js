import { ContainerFilesystem } from "../containers/index.js";
import {config} from "../config/index.js";

const productDao = new ContainerFilesystem(config.DATABASES.filesystem.PRODUCTS_FILENAME)
const cartDao = new ContainerFilesystem(config.DATABASES.filesystem.CARTS_FILNAME)

export {productDao, cartDao}