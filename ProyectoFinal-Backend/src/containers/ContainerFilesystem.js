import fs from "fs"
import { fileURLToPath } from "url"

class ContainerFilesystem{
    constructor(fileName){
        this.filePath = `./src/db/${fileName}.json`
    }

    async getAll(){
        try{
            const file = await fs.promises.readFile(this.filePath, "utf-8")
            const elements = JSON.parse(file)
            return elements 
        }catch(err){
            if (err.code === 'ENOENT'){
                await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 3))
                return []
            }
            console.log(err)
        }
    }
}

