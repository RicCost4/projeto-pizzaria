//Arquivo que ira processa toda o detalhe do usuario ja cadastrado recebendo parametros do arquivo em controller.
import prismaClient from "../../prisma"

class DetailUserServices{
    async execute(user_id: string){

        const user = await prismaClient.user.findFirst({
            where:{
                id: user_id
            },
            select:{
                id: true,
                name: true,
                email: true
            }
        })

        return user
    }
}

export {DetailUserServices}