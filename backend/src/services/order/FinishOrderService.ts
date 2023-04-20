import prismaClient from "../../prisma";

interface OrdeRequest{
    order_id: string
}

class FinishOrderService{
    async execute({order_id}: OrdeRequest){
        const order = await prismaClient.order.update({
            where:{
                id: order_id
            },
            data:{
                status: true
            }
        })

        return order
    }
}

export {FinishOrderService}