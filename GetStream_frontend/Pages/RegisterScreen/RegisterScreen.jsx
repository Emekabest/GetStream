import { View, Text, TouchableOpacity, Button, Alert } from "react-native"
import React, { useState } from "react"
import { TextInput } from "react-native-gesture-handler"
import AllScreenStyles from "../HomeScreen/AllScreen_styles"
import { setHeaderMode_global } from "../HomeScreen/Header";
import { s } from "react-native-wind"
import axios from "axios";


const RegisterScreen = ({navigation})=>{
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const createAccount = ()=>{
       
        /**Defining Regexes........ */
            const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{0,7}$/
            const emailRegex = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/
            const passwordRegex = /^.{5,}$/
            //...................................................
            const isUsername = usernameRegex.test(username)
            const isEmail = emailRegex.test(email)
            const isPassword = passwordRegex.test(password)
            
            ////////////////////////////////////////////////

            const inputInfo = [

                {
                    id:'username',
                    name: username,
                    regex: usernameRegex.test(username),
                    regexErrMsg: 'username must not be less than 3'
                    
                },

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

            /**Checking if any input in empty */
        if (username == "" || email == "" ||  password == ""){

            let execution = 1
            inputInfo.forEach((value)=>{
                if (value.name == "" && execution < 2){//Ensures this condition runs only once if a fault is noticed
                    const errorMsg = `Please enter ${value.id}`
                    Alert.alert(errorMsg)
                    
                    execution++
                }
                
            })
        }    
        else if(!isUsername || !isPassword || !isEmail) {/**Checking if the input data aligns with the regex exp */

            let execution = 1
            inputInfo.forEach((value)=>{
                if (!value.regex && execution < 2){//Ensures this condition runs only once is a fault is noticed
                    Alert.alert(value.regexErrMsg)

                    execution ++
                }
            })  

        }
        else{
             /**Conneting to the backend server...................................................... */
            const userDetails = {
                username,
                email,
                password
            }

            const url = "https://igiqkxs26h.execute-api.us-east-1.amazonaws.com/create-account"
            axios.post(url, userDetails).then((res)=>{

                if (res.data.errorCode === 409){
                    Alert.alert(res.data.error)

                }
                else{//Succesfully registered
                    const userData = res.data
                    
                    Alert.alert(userData.status)
                    
                    userData.User.avatar = "naruto"
                    navigation.navigate('allmovies', {userData: userData.User, isLoggedIn: true})
                }
                

            }).catch((error)=>{
                console.error(error)
            })
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        setHeaderMode_global(false)
    }

    return (
        <View>
            <View style = { s`h-full items-center justify-center bg-gray-800`}>
                <View style = {s`w-9/12`}>
                    <View>
                        <TextInput style = {AllScreenStyles.signIn_signUpInputs} placeholder="Enter username" placeholderTextColor='gray'
                         value={username} onChangeText={setUserName} />

                        <TextInput style = {AllScreenStyles.signIn_signUpInputs} placeholder="Enter email" placeholderTextColor='gray'
                        value = {email} onChangeText={setEmail} />

                        <TextInput style = {AllScreenStyles.signIn_signUpInputs} placeholder="Enter password" placeholderTextColor='gray'
                         value = {password} onChangeText={setPassword}/>

                    </View>
                    <TouchableOpacity onPress={createAccount}>
                        <View style = {s`bg-green-800 h-10 items-center justify-center`}>
                            <Text style = {s`text-white font-bold`}>Create account</Text>
                        </View>
                    </TouchableOpacity>
                    
                </View>
                
            </View>
        </View>
    )
}


export default RegisterScreen
