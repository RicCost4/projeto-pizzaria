// Receber a requisição e enviar para o service e devolver o retorno para o front
import { Request, Response } from "express";
import { ListByCategoryService } from "../../services/products/ListByCategoryService";

class ListByCategoryController{
    async handle(req: Request, res: Response){

        const category_id = req.query.category_id as string

        const listByCategory = new ListByCategoryService

        const product = await listByCategory.execute({category_id})

        return res.json(product)
    }
}

export {ListByCategoryController}