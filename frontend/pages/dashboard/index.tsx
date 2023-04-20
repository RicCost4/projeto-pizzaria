import {useState} from 'react'
import { canSSRAuth } from "@/src/utils/canSSRAuth"
import styles from './styles.module.scss'
import Header from "@/src/components/Header"
import { ModalOrder } from '@/src/components/ModalOrder'
import Head from "next/head"
import { FiRefreshCcw } from "react-icons/fi"
import Modal from 'react-modal'
import { setupAPIClient } from "@/src/services/api"


type OrderProps = {
    id: string
    table: string | number
    status: boolean
    draft: boolean
    name: string | null
}

interface HomeProps{
    orders: OrderProps[]
}

export type OrdemItemProps = {
    id: string
    amout: number
    order_id: string
    product_id: string
    product:{
        id: string
        name: string
        description: string | null
        price: string
        banner: string
    }
    order:{
        id: string
        table: string | number
        status: boolean
        name: string | null
    }
}

export default function Dashboard({ orders }: HomeProps){

    const [orderList, setOrderList] = useState(orders || [])

    const [modalItem, setModalItem] = useState<OrdemItemProps[]>()
    const [modalVisible, setModalVisible] = useState(false)

    function handleCloseModal(){
        setModalVisible(false)
    }

    async function handleOpenModalView(id: string){
        const apiClient = setupAPIClient()
        const response = await apiClient.get('/order/detail', {
            params:{order_id: id}
        })

        setModalItem(response.data)
        setModalVisible(true)
    }

    async function handleFinishItem(id : string){
        const apiClient = setupAPIClient()
        await apiClient.put('/order/finish', { order_id: id})

        const response = await apiClient.get('/order')

        setOrderList(response.data)
        setModalVisible(false)
    }

    async function handleRefreshOrders(){
        const apiClient = setupAPIClient()

        const response = await apiClient.get('/order')
        setOrderList(response.data)
    }

    Modal.setAppElement('#__next')

    return(
        <>
            <Head>
                <title>Painel - Sujeito Pizzaria</title>
            </Head>
            <Header />
            <main className={styles.container}>
                <div className={styles.containerHeader}>
                    <h1>Ultimos Pedidos</h1>
                    <button onClick={handleRefreshOrders}>
                        <FiRefreshCcw color="#3fffa3" size={25}/>
                    </button>
                </div>
                <article className={styles.listOrders}>
                    {orderList.length === 0 && (<span className={styles.emptyList}>Nenhum Pedido foi encontrado...</span>)}
                    {
                        orderList.map((e) => {
                            if(!e.status && !e.draft){
                                return(
                                    <section key={e.id} className={styles.orderItem}>
                                        <button onClick={() => handleOpenModalView(e.id)}>
                                            <div className={styles.tag}></div>
                                            <span>Mesa {e.table}</span>
                                        </button>
                                    </section>
                                )
                            }
                        })
                    }
                </article>
            </main>
            {modalVisible && (
                <ModalOrder isOpen={modalVisible} onRequestClose={handleCloseModal} order={modalItem} handleFinishOrder={handleFinishItem}/>
            )}
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    try {
      const apiClient = setupAPIClient(ctx)
      const response = await apiClient.get('http://app_back:3333/order')
  
      console.log(response.data)
      return {
        props: {
          orders: response.data,
        }
      }
    } catch (error) {
      console.log(error)
      return {
        props: {
          orders: [],
        }
      }
    }
  })