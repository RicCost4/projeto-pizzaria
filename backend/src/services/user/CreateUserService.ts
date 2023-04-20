//Arquivo que ira processa toda a criação do usuario recebendo parametros do arquivo em controller.
import prismaClient from "../../prisma"
import { hash } from "bcryptjs"

interface UserRequest{
    name: string
    email: string
    password: string
}

class CreateUserService{
    async execute({name, email, password}: UserRequest){

        // Verificar se cadastrou um email.
        if(!email){
            throw new Error("Email incorreto!!")
        }

        // Verificar se já possui esse email cadastrado.
        const userAlredyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(userAlredyExists){
            throw new Error("Seu Email esta cadastrado.")
        }

        const passawordHash = await hash(password, 8) //criptografia da senha

        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                passaword: passawordHash
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

export{CreateUserService}