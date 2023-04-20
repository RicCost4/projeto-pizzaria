import React from "react"
import {View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import {AntDesign} from '@expo/vector-icons'
import { AuthContext } from "../../contexts/AuthContext"
import { StackParamsList } from "../../routes/app.routes"
import { api } from "../../services/api"

export default function Dashboard(){
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

    const {signOut} = React.useContext(AuthContext)
    const [number, setNumber] = React.useState('')

    async function openOrder(){
        
        if(number === ''){
            return
        }

        const response = await api.post('/order', {table: Number(number)})

        // console.log(response.data)
        //Fazer Requisição e abrir mesa ao navegar na outra tela.
        navigation.navigate('Order', {number: number, order_id: response.data.id})
        setNumber('')
    }

    return(
        <SafeAreaView style={styles.container}>
            
            <View style={styles.header}>
                <Text style={styles.title}>Novo Pedido</Text>
                <TouchableOpacity onPress={signOut}>
                    <AntDesign name="logout" size={30} color="#FF3F4b" />
                </TouchableOpacity>
            </View>
            <TextInput style={styles.input} placeholder="Numero da Mesa" placeholderTextColor="#F0F0F0" keyboardType="numeric" value={number} onChangeText={setNumber} />
            <TouchableOpacity style={styles.button} onPress={openOrder}>
                <Text style={styles.buttonText}>Abrir Mesa</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#1d1d2e'
    },
    header:{
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
        marginTop: 24
    },
    title:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF'
    },
    input:{
        width: '90%',
        height: 60,
        backgroundColor: '#101026',
        borderRadius: 4,
        paddingHorizontal: 8,
        textAlign: 'center',
        fontSize: 22,
        color: '#FFF'
    },
    button:{
        width: '90%',
        height: 40,
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText:{
        fontSize: 18,
        color: '#101026',
        fontWeight: 'bold'
    }
})