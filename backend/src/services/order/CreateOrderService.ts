import prismaClient from "../../prisma";

interface OrderRequest{
    table: number,
    name: string
}

class CreateOrderService{
    async execute({table, name}: OrderRequest){
        const order = await prismaClient.order.create({ // Criar uma mesa.
            data:{
                table: table,
                name: name
            }
        })

        return order
    }
}

export {CreateOrderService}