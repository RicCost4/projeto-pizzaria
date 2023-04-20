//Arquivo que ira processa toda a requsição do usuario e enviar os parametros do arquivo em controller.
import prismaClient from "../../prisma";

class ListCategoryService{

    async execute(){

        const category = await prismaClient.category.findMany({
            select:{
                id: true,
                name: true
            }
        })

        return category
    }
}

export {ListCategoryService}