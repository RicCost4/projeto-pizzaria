import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SignIn from '../pages/SignIn'

/* Tela de Usuarios não autentificados podem acessar */
const Stack = createNativeStackNavigator()

function AuthRoutes(){

    return(
        <Stack.Navigator>
            <Stack.Screen name='SignIn' component={SignIn} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}

export default AuthRoutes