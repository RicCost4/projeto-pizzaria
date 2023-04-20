import Head from "next/head"
import {useState, ChangeEvent, FormEvent} from 'react'
import Header from "@/src/components/Header"
import style from './style.module.scss'
import {FiUpload} from 'react-icons/fi'
import { toast } from "react-toastify"
import { canSSRAuth } from "@/src/utils/canSSRAuth"
import { setupAPIClient } from "@/src/services/api"


type ItemProps ={
    id: string
    name: string
}

interface CategoryProps{
    categoryList: ItemProps[]
}

export default function Product({ categoryList }: CategoryProps){

    const [name, setname] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

    const [avatarUrl, setAvatarUrl] = useState('')
    const [imageAvatar, setImageAvatar] = useState(null)
    const [categories, setCategories] = useState(categoryList || [])
    const [categorySelected, setCategorySelected] = useState(0)

    function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(!e.target.files){
            return
        }

        const image = e.target.files[0]
        if(!image){
            return
        }

        if(image.type === 'image/jpeg' || image.type === 'image/png'){
            setImageAvatar(image)
            setAvatarUrl(URL.createObjectURL(e.target.files[0]))
        }
    }

    // Quando você seleciona uma nova categoria na lista
    function handleChangeCategory(e){
        // console.log('Categoria selecionada', categories[e.target.value])

        setCategorySelected(e.target.value)
    }

    async function handleRegister(event: FormEvent) {
        event.preventDefault()

        try{
            const data = new FormData()

            if(name === '' || price === '' || imageAvatar === null){
                toast.error("Preencha todos os campos!")
                return
            }

            data.append('name', name)
            data.append('price', price)
            data.append('description', description)
            data.append('category_id', categories[categorySelected].id)
            data.append('file', imageAvatar)

            const apiClient = setupAPIClient()
            await apiClient.post('/products', data)

            toast.success("Produto cadastrado com sucesso!!")
        }catch(err){
            console.log(err)
            toast.error("Ops, erro ao cadastrar!!")
        }
        setname('')
        setPrice('')
        setDescription('')
        setImageAvatar(null)
        setAvatarUrl('')
    }

    return(
        <>
            <Head>
                <title>Novo produto - Sujeito Pizzaria</title>
            </Head>
            <Header />
            <main className={style.container}>
                <h1>Novo Produto</h1>

                <form className={style.form} onSubmit={handleRegister}>
                    <label className={style.labelAvatar}>
                        <span><FiUpload size={30} color="#FFF"/></span>
                        <input type="file" accept="image/png, image/jpeg" onChange={handleFile} />
                        {avatarUrl && (<img src={avatarUrl} alt="Foto do Produto" width={250} height={250} className={style.preview} />)}
                    </label>
                    <select value={categorySelected} onChange={handleChangeCategory}>
                        {categories.map((item, index) => {
                            return(
                                <option key={item.id} value={index}>{item.name}</option>
                            )
                        })}
                    </select>
                    <input type="text" placeholder="Digite o nome do produto" className={style.input} value={name} onChange={(e) => setname(e.target.value)}/>
                    <input type="text" placeholder="Preço do produto" className={style.input} value={price} onChange={(e) => setPrice(e.target.value)}/>
                    <textarea placeholder="Descreva seu produto" className={style.input} value={description} onChange={(e) => setDescription(e.target.value)}/>
                    <button type="submit" className={style.button}>Cadastrar</button>
                </form>
            </main>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    try{
        const apiClient = setupAPIClient(ctx)
        const response = await apiClient.get('http://app_back:3333/category')

        console.log(response.data)
        
        return{
            props:{
                categoryList: response.data
            }
        }
    }catch (error){
        console.log(error)
        return{
            props:{
                categoryList: []
            }
        }
    }
    
})