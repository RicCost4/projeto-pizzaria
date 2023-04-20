import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'
import { AuthContext } from '../contexts/AuthContext'

function Routes(){
    const {isAuthenticated, loading} = React.useContext(AuthContext)

    if(loading){
        return(
            <View style={{flex: 1, backgroundColor: '#F5f7fb', justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size={60} color="#1D1D2E"  />
            </View>
        )
    }

    return(
        isAuthenticated ? <AppRoutes /> : <AuthRoutes />
    )
}

export default Routes