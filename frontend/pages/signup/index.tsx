import { useState, FormEvent, useContext } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import logoImg from '../../public/logo.svg'
import styles from '../../styles/home.module.scss'
import { Input } from "../../src/components/ui/Input"
import { Button } from "../../src/components/ui/Button"
import { AuthContext } from "@/src/contexts/AuthContexts"
import { toast } from "react-toastify"

export default function Signup() {
  const {signUp} = useContext(AuthContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleSignUp(event: FormEvent){
    event.preventDefault()

    if(name === '' || email === '' || password === ''){
      toast.info("Preencha todos os campos!!")
      return
    }

    setLoading(true)

    let data = {
      name, email, password
    }

    await signUp(data)

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Faça seu cadastro agora</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />
        <div className={styles.login}>
            <h1>Criando a sua conta</h1>
          <form onSubmit={handleSignUp}>
            <Input placeholder="Digite seu Nome" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            <Input placeholder="Digite seu Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Input placeholder="Sua Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Button type="submit" loading={loading}>Cadastrar</Button>
          </form>
          <Link href="/" className={styles.text}>
            Já possui uma conta? Faça login!
          </Link>
        </div>
      </div>
    </>
  )
}
