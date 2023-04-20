import prismaClient from "../../prisma";

class ListOrderServices{
    async execute(){
        const order = await prismaClient.order.findMany({
            where:{
                draft: false,
                status: false
            },
            orderBy:{
                updated_at: 'desc'
            }
        })
        return order
    }
}

export {ListOrderServices}