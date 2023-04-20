import React from "react";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextData = {
    user: UserProps
    isAuthenticated: boolean
    loadingAuth: boolean
    loading: boolean
    signIn: (credentials: SignInProps) => Promise<void>
    signOut: () => Promise<void>
}

type UserProps = {
    id: string
    name: string
    email: string
    token: string
}

type AuthProviderProps = {
    children: React.ReactNode
}

type SignInProps = {
    email: string
    password: string
}

export const AuthContext = React.createContext({} as AuthContextData)

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = React.useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: ''
    })
    const [loadingAuth, setLoadingAuth] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    const isAuthenticated = !!user.name

    React.useEffect(() => {
        async function getUser (){
            //Pegar os dados salvos so usuario salvo no storage do aparelho
            const userInfo = await AsyncStorage.getItem('@sujeitopizzaria')
            let hasUser: UserProps = JSON.parse(userInfo || '{}')

            //Verificar se recebemos as informações dele.
            if(Object.keys(hasUser).length > 0){
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`
                setUser({
                    id: hasUser.name,
                    name: hasUser.name,
                    email: hasUser.email,
                    token: hasUser.token
                })
            }

            setLoading(false)
        }

        getUser()
    }, [])

    //Metodo de login e autentificação no App
    async function signIn({email, password}: SignInProps) {
        setLoadingAuth(true)

        try{
            const response = await api.post('/login', {email, password})
            // console.log(response.data)
            const {id, name, token} = response.data
            const data = {
                ...response.data
            }
            await AsyncStorage.setItem('@sujeitopizzaria', JSON.stringify(data))

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setUser({id, name, email, token})

            setLoadingAuth(false)
        }catch(err){
            console.log('Erro ao acessar', err)
            setLoadingAuth(false)
        }
    }

    //Metodo de deslogar do App
    async function signOut(){
        await AsyncStorage.clear().then(() => {
            setUser({
                id: '',
                name: '',
                email: '',
                token: ''
            })
        })
    }

    return(
        <AuthContext.Provider 
            value={{
                user, 
                isAuthenticated, 
                loadingAuth, 
                loading, 
                signIn, 
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}