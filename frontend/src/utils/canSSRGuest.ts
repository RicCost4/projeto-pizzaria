import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import {parseCookies} from 'nookies'

// função para paginas que só pode ser acessadas por visitantes.

export function canSSRGuest<p>(fn: GetServerSideProps<p>){
    return async (contexto: GetServerSidePropsContext): Promise<GetServerSidePropsResult<p>> => {
        const cookies = parseCookies(contexto)

        // Se um usuario tentar acessar a pagina porem tendo já um login salvo, redirecionamos.
        if(cookies['@nextauth.token']){
            return{
                redirect:{
                    destination:'/dashboard',
                    permanent: false
                }
            }
        }

        return await fn(contexto)
    }
}