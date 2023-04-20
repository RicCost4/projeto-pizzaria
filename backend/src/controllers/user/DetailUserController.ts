//Arquivo da rota que ira receber, enviar para o arquivo em service e retorna os dados.
import { Request, Response } from "express"
import { DetailUserServices } from "../../services/user/DetailUserServices"

class DetailUserController{

    async handle(req: Request, res: Response){
        const user_id = req.user_id

        const detailUserServices = new DetailUserServices()

        const user = await detailUserServices.execute(user_id)

        return res.json(user)
    }
}

export {DetailUserController}