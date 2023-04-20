import Head from "next/head"
import { useState, FormEvent } from "react"
import Header from "@/src/components/Header"
import style from './style.module.scss'
import { setupAPIClient } from "@/src/services/api"
import { toast } from "react-toastify"
import { canSSRAuth } from "@/src/utils/canSSRAuth"

export default function Category(){
    const [name, setName] = useState('')

    async function handleRegister(e: FormEvent) {
        e.preventDefault()

        if(name === ''){
            return
        }

        const apiClient = setupAPIClient()
        await apiClient.post('/category', {name: name})

        toast.success('Categoria Cadastrada com sucesso!')
        setName('')
    }

    return(
        <>
            <Head>
                <title>Nova categoria - Sujeito Pizza</title>
            </Head>
            <Header />
            <main className={style.container}>
                <h1>Cadastrar Categoria</h1>
                <form className={style.form} onSubmit={handleRegister}>
                    <input type="text" placeholder="Digite o nome da categoria" className={style.input} value={name} onChange={(e) => setName(e.target.value)}/>
                    <button type="submit">Cadastrar</button>
                </form>
            </main>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (contexto) => {
    return{
        props: {}
    }
})