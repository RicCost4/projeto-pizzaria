import { useContext, FormEvent, useState } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { canSSRGuest } from "@/src/utils/canSSRGuest"
import logoImg from '../public/logo.svg'
import styles from '../styles/home.module.scss'
import { Input } from "../src/components/ui/Input"
import { Button } from "../src/components/ui/Button"
import { AuthContext } from "@/src/contexts/AuthContexts"
import { toast } from "react-toastify"

export default function Home() {
  const {signIn} = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent){
    event.preventDefault()

    if(email === '' || password === ''){
      toast.info("Preencha os dados!!")
      return
    }

    setLoading(true)

    let data = {
      email,
      password
    }

    await signIn(data)
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input placeholder="Digite seu Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Input placeholder="Sua Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Button type="submit" loading={loading}>Acessar</Button>
          </form>
          <Link href="/signup" className={styles.text}>
            Não possui uma conta? Cadastrar-se!
          </Link>
        </div>
      </div>
    </>
  )
}


export const getServerSideProps = canSSRGuest(async (contexto) =>{
  return{
    props:{}
  }
})