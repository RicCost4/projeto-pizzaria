import axios, {AxiosError} from "axios";
import { parseCookies } from "nookies";
import { AuthTokensErro } from "./erros/AuthTokensErro";
import { signOut } from "../contexts/AuthContexts";

export function setupAPIClient(contexto = undefined){
    let cookies = parseCookies(contexto)

    const api = axios.create({
        baseURL: 'http://localhost:3333',
        headers:{
            Authorization:`Bearer ${cookies['@nextauth.token']}`
        }
    })

    api.interceptors.response.use(response => {return response}, (error: AxiosError) => {
        if(error.response && error.response.status === 401){
            // Qualquer erro 401(não autorizado) devemos deslogar o usuario
            if(typeof window !== undefined){
                // Chamar a função para deslogar o usuario.
                signOut()
            }else{
                return Promise.reject(new AuthTokensErro())
            }
        }

        return Promise.reject(error)
    })

    return api
}