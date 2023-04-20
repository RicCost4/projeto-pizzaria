//Arquivo da rota que ira receber, enviar para o arquivo em service e retorna os dados.
import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";

class CreateCategoryController{
    async handle(req: Request, res: Response){
        const {name} = req.body

        const createCategoryService = new CreateCategoryService()
        const category = await createCategoryService.execute({
            name
        })

        return res.json(category)
    }
}

export{CreateCategoryController}