import { View, Text, TouchableOpacity, Image, Alert, } from "react-native"
import { s } from "react-native-wind"
import AllScreenStyles from "../HomeScreen/AllScreen_styles"
import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Avatars from "./avatar"


/**A global variable that carries the instance of isNavBar setter function across components to be modified */
let globalSetIsNavBar;
/////////////////////////////////////
const NavBar = ()=>{
    const navigation = useNavigation()

    /**Declaring and defining avatar for profiles */
    const [avatar, setAvatar] = useState("")
    
    /**////////////////////////////////////////////////////////// */

    let navBarDisplay = "block"

    const [isNavBar, setIsNavBar] = useState(false)
    globalSetIsNavBar = setIsNavBar;


    /**This Section controls the process of accessing authorized user data from the local storage */
    const [userData, setUserData] = useState('')

    const getStorageData = async ()=>{
        try {
            const getUserDataFromStorage = await AsyncStorage.getItem('userData');
            
            if (!userData && getUserDataFromStorage){
                setUserData(JSON.parse(getUserDataFromStorage))

                 const randomNumber = Math.floor(Math.random() * Avatars.length)
                 setAvatar(Avatars[randomNumber])

            }
            
        }catch(err){
            
            return err
        }
    
        
       } 
      getStorageData()

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////


    const logOut = async ()=>{

        await AsyncStorage.removeItem('userData')
        
        setUserData('')
        setIsNavBar(false)
        navigation.navigate('allmovies')
        Alert.alert('You have successfully logged out')
    }


    const closeNavBar = ()=>{
        setIsNavBar(false)

    }

    
    if (isNavBar){
        navBarDisplay = 'block'
    }
    else{
        navBarDisplay = 'none'
    }


    const navigateToScreen = (screen)=>{

        navigation.navigate(screen)
        closeNavBar()
    }
    

     const ProfileIcon = ({avatar})=>{

        // const avatarIcon = Avatars[avatar]/
        console.log(avatar)
        
        // return <Image source={avatarIcon} style = {s`h-full w-full`}  resizeMode="cover"/>
     }


    return (
        <View style = {[AllScreenStyles.navBarMainCont, {display:`${navBarDisplay}`} ]}>

            {/**Overlay container................ */}
            <TouchableOpacity onPress={closeNavBar} style = {AllScreenStyles.screenOverlay}></TouchableOpacity>
            {/*..................................................*/}

            {/**Menu bar container */}
            <View style = {[AllScreenStyles.menuBarCont, s`bg-gray-800`]}>
                <View style = {s``}>

                    {/**First Section (User Display / Login) */}
                        <View style = {s`m-2 h-40 flex items-center justify-center border-b border-gray-600`}>


                            {/**Displaying data based on the availabilty of a user........................ */}
                            {
                                userData ?

                                <View>
                                    <View style = {s`items-center`}>

                                        <View style = {s`h-24 w-24 bg-gray-300 overflow-hidden rounded-full `}>
                                        <Image source={avatar.icon} style = {s`h-full w-full`}  resizeMode="cover"/>
                                        </View>
                                    
                                        <View style = {s`p-1`}><Text style = {s`text-white font-medium`}>{ "Hey, " + userData.username}</Text></View>
                                    </View>
                                </View>
                                
                                :

                                <TouchableOpacity onPress={()=>navigateToScreen('login')}>

                                    <View style = {s`w-full rounded-full px-12 py-3 shadow-md border border-gray-400` }>
                                        <Text style = {s`text-white font-bold text-base`}>Login</Text>
                                    </View>
                                
                                </TouchableOpacity> 
                            }
                            {/*/////////////////////////////////////////////////////////////////////////////////////////// */}
                            {/*/////////////////////////////////////////////////////////////////////////////////////////// */}

                            
                        </View>
                        {/*...................................... */}


                        {/**Second Section.................................................................. */}
                        
                            <View style = {s`h-3/4`}>

                                {
                                    /**Implemented an admin button only to be accessed by the admin */
                                    userData.username === "Admin" ?  
                                    
                                        <TouchableOpacity style = {AllScreenStyles.navBarList} onPress={()=> navigateToScreen('admin')}>
                                            <Text style = {AllScreenStyles.navBarListTxt}>Admin</Text>
                                        </TouchableOpacity>
                                     
                                    : <View></View>
                                    ///////////////////////////////////////////////////////////////////////////////////////
                                    ///////////////////////////////////////////////////////////////////////////////////////
                                }

                                <TouchableOpacity style = {AllScreenStyles.navBarList} onPress={()=> navigateToScreen('allmovies')}>
                                    <Text style = {AllScreenStyles.navBarListTxt}>Home</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style = {AllScreenStyles.navBarList} >
                                    <Text style = {AllScreenStyles.navBarListTxt}>About Us</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style = {AllScreenStyles.navBarList}>
                                    <Text style = {AllScreenStyles.navBarListTxt}>Contact Us</Text>
                                </TouchableOpacity>
                               
                               

                                {
                                    userData ?
                                    <TouchableOpacity style = {AllScreenStyles.navBarList} onPress={logOut}>                       
                                        <Text style = {AllScreenStyles.navBarListTxt}>Log Out</Text>
                                    </TouchableOpacity>
                                    :
                                    <View></View>

                                }

                            </View>
                        {/*...................................*/}


                    </View>
            </View>
            {/**........................................... */}

        </View>
    )
}




export {NavBar, globalSetIsNavBar}