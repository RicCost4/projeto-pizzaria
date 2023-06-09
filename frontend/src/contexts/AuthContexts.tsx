import { createContext, ReactNode, useEffect, useState } from "react";
import  {destroyCookie, setCookie, parseCookies} from 'nookies'
import Router from "next/router";
import { api } from "../services/apiClient";
import { toast } from "react-toastify";

type AuthCOntextData = {
    user: UserProps
    isAuthenticated: boolean
    signIn: (credentials: SignInProps) => Promise<void>
    signOut: () => void
    signUp: (credentials: SignUpProps) => Promise<void>
}

type UserProps = {
    id: string;
    name: string;
    email: string
}

type SignInProps = {
    email: string;
    password: string
}

type SignUpProps = {
    name: string,
    email: string,
    password: string
}

type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthCOntextData)

export function signOut(){
    try{
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    }catch{
        console.log('erro ao logar')
    }
}

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user

    useEffect(() => {
        // tentar pegar o token
        const {'@nextauth.token': token} = parseCookies()

        if(token){
            api.get('/info').then(response => {
                const {id, name, email} = response.data
                setUser({id, name, email})
            })
            .catch(() => {
                //Se de erro, deslogar o usuario.
                signOut()
            })
        }
    }, [])

    async function signIn({email, password}: SignInProps){
        try{
            const response = await api.post('/login', {email, password})
            const {id, name, token} = response.data
            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60*60*24*30, // calculo para expirar o token em 1 mes.
                path: "/" // Quais caminhos teram acesso ao cookie
            })

            setUser({id, name, email})

            // passa para as proximas requisições o nosso token.
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success('Logado com sucesso!')

            // Redirecionar o user para /dashboard
            Router.push('/dashboard')
        }catch(err){
            toast.error('Erro ao acessar!')
            console.log(err)
        }
    }

    async function signUp({name, email, password}: SignUpProps) {
        try{
            const response = await api.post('/users', {name, email, password})

            toast.success("Cadastrado com sucesso!!")

            Router.push('/')
        }catch(err){
            toast.error('Erro ao cadastrar!')
            console.log(err)
        }
        
    }

    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut, signUp}}>
            {children}
        </AuthContext.Provider>
    )
}