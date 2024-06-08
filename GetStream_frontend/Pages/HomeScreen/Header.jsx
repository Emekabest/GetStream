import React, { useEffect, useState }  from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View,} from 'react-native';
import Constants from 'expo-constants'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';
import AllScreenStyles from './AllScreen_styles';
import { s } from "react-native-wind"
import { globalSetIsNavBar as setIsNavBar} from '../NavBar/NavBar';
import { TextInput } from 'react-native-gesture-handler';


/**A global variable that carries the instance of loginRegisterModeActivated setter function across components to be modified */
let setHeaderMode_global
/**........................................................ */


const Header = ()=>{
    let searchMovieMode = false;
    const navigation = useNavigation()

    const [headerMode, setHeaderMode] = useState(true)
    setHeaderMode_global = setHeaderMode
    
    const openNavBar = ()=>{
        setIsNavBar(true)
        
    }


 /**This function checks/listens when the device back-key is clicked and execute its block of code only when it has moved from THIS component
     * to a different or previous component.
     * ..................................................
     * Note: This function will achieve its purpose (setting or activating the header) when it moves backwards from the current component to any component.
     * Ensure you modify this function if there is need for components to be rendered without the header
    */
// const placeHeaderOnBackwardMovement = (screenName)=>{
           
//        const componentName = e.target.split('-', 2)
    
//        if (componentName[0] == screenName){
//             setHeaderMode_global(true)//activates the header
//         }
    
// }

// placeHeaderOnBackwardMovement_global = placeHeaderOnBackwardMovement

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////


    const handleSearchBtn = ()=>{

          /**setting "availableMovies" data in local storage........................................... */

         navigation.navigate('searchMovie')
    } 
    
    if (headerMode){
        return(
            <View style = {[AllScreenStyles.container]}  >
                <View style = {[AllScreenStyles.header, s`bg-green-800`]}>
        
                    <View style = {[AllScreenStyles.headerInner, s`px-3 py-1`]}>
                        <View style = {AllScreenStyles.headerInner_left}>
                            <Text style = {AllScreenStyles.headerInner_left_logo}>GETSTREAM</Text>
                        </View>


                        <View style = {AllScreenStyles.headerInner_middle}>
                         {/**search icon and input are being displayed based on seachMovieMode coditional value */}

                            
                            <TouchableOpacity onPress={handleSearchBtn}>
                                
                                    <FontAwesomeIcon icon={faSearch} style={AllScreenStyles.headerSearchBar}/>
                                
                            </TouchableOpacity>

                            {/* ///////////////////////////////////////////////////////////////////////////// */}

                        </View>
                        
                        <View style = {AllScreenStyles.headerInner_right}>
                            <TouchableOpacity onPress={openNavBar}>
                                <FontAwesomeIcon icon={faBars} style={AllScreenStyles.headerMenuBar} size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

}


export {Header, setHeaderMode_global}