// Receber a requisição e enviar para o service e devolver o retorno para o front
import { Request, Response } from "express";
import { CreateProductsService } from "../../services/products/CreateProductsService";

class CreateProductsController{
    async handle(req: Request, res: Response){
        const {name, price, description, category_id} = req.body

        const createProductsService = new CreateProductsService()

        if(!req.file){
            throw new Error("Erro no upload no file")
        }else{
            const {originalname, filename: banner} = req.file

            const products = await createProductsService.execute({
                name,
                price,
                description,
                banner,
                category_id
            })

            return res.json(products)
        }
    }
}

export {CreateProductsController}