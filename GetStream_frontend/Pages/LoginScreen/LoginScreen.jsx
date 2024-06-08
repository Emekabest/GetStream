import { View, Text, TouchableOpacity, Alert } from "react-native"
import React, { useEffect, useState } from "react"
import { TextInput } from "react-native-gesture-handler"
import { setHeaderMode_global } from "../HomeScreen/Header";
import AllScreenStyles from "../HomeScreen/AllScreen_styles"
import { s } from "react-native-wind"
import axios from "axios";

const LoginScreen = ({navigation})=>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(()=>{
        setHeaderMode_global(false)//deactivates the header
    },[])


    
    
    const login = ()=>{
        const userDetails = {
            email,
            password
        }
        
        /**Defining Regexes........ */
        const emailRegex = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/
        const passwordRegex = /^.{5,}$/
        //...................................................
        const isEmail = emailRegex.test(email)
        const isPassword = passwordRegex.test(password)
        ////////////////////////////////////////////////

        const inputInfo = [

            {
                id:'email',
                name: email,
                regex: emailRegex.test(email),
                regexErrMsg: 'invalid email'

                
            },

            {
                id:'password',
                name:password,
                regex: passwordRegex.test(password),
                regexErrMsg: 'password must be more than 4'
            }

        ]

        /**Checking if any input is empty */

        if (!email || !password){
            let execution = 1
            inputInfo.forEach((value)=>{
                if (value.name == "" && execution < 2){//Ensures this condition runs only once if a fault is noticed
                    const errorMsg = `Please enter ${value.id}`
                    Alert.alert(errorMsg)
                    
                    execution++
                }
                
            })
        }

        else if( !isEmail || !isPassword){/**Checking if the input data aligns with the regex exp */
            let execution = 1
            inputInfo.forEach((value)=>{
                if (!value.regex && execution < 2){//Ensures this condition runs only once if a fault is noticed
                    Alert.alert(value.regexErrMsg)

                    execution ++
                }
        })  

        }
        else {
            /**Conneting to the backend server...................................................... */
            const url ='https://igiqkxs26h.execute-api.us-east-1.amazonaws.com/login'
            axios.post(url, userDetails).then((res)=>{
                const userData = res.data
                
                if (userData.User){
                    Alert.alert(userData.info)
                    navigation.navigate('allmovies', {userData: userData.User, isLoggedIn: true})
                }
                else{     
                    const body = JSON.parse(userData.body)
                    Alert.alert(body.info)
                }

            }).catch((error)=>{
                
                return error
            })
            //////////////////////////////////////////

        }

    }



    /**This function checks/listens when the device back-key is clicked and execute its block of code only when it has moved from THIS component
     * to a different or previous component.
     * ..................................................
     * Note: This function will achieve its purpose (setting or activating the header) when it moves backwards from this component to any component.
     * Ensure you modify this function if there is need for components to be rendered without the header
    */

    navigation.addListener('beforeRemove', ()=> (setHeaderMode_global(true))) 

    ///////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////

    
    return (
        <View>
            <View style = { s`h-full items-center justify-center bg-gray-800`}>
                <View style = {s`w-9/12`}>
                    
                    <View>
                        <TextInput style = {AllScreenStyles.signIn_signUpInputs} placeholder="Enter email" placeholderTextColor='gray'
                            value={email} onChangeText={setEmail}/>
                        <TextInput style = {AllScreenStyles.signIn_signUpInputs} placeholder="Enter password" placeholderTextColor='gray' 
                            value = {password} onChangeText={setPassword}/>
                    </View>

                    <View>
                        <TouchableOpacity style = {s`bg-green-800 h-10 items-center justify-center`} onPress={login}>
                            <Text style = {s`text-white font-bold`}>Login</Text>
                        </TouchableOpacity>
                    </View>

                    <View style = {s`p-2 flex flex-row`}>
                        <Text style = {s`text-white`}>Not yet a member?</Text>
                        <TouchableOpacity style = {s`px-2`} onPress={()=> navigation.navigate('register')}>
                            <Text style = {s`text-blue-500`}>Register</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>
        </View>
    )
}


export {LoginScreen}
