//Arquivo que ira processa toda a solicitação do usuario, recebendo os parametros do arquivo em controller.
import prismaClient from "../../prisma"

interface CategoryRequest{
    name: string
}

class CreateCategoryService{
    async execute({name}: CategoryRequest){

        if(name === ''){
            throw new Error('Nome Invalido, digite Novamente!!')
        }

        const category = await prismaClient.category.create({
            data:{
                name: name
            },
            select:{
                id: true,
                name: true
            }
        })

        return category
    }
}

export {CreateCategoryService}