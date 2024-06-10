import React, { useCallback, useEffect, useState } from "react"
import { StatusBar } from 'expo-status-bar';
import AllScreenStyles from "../HomeScreen/AllScreen_styles";
import { View, Text, Image, TouchableOpacity } from "react-native"
import { s } from "react-native-wind"
import { FlatList } from "react-native-gesture-handler"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import {  setHeaderMode_global } from "../HomeScreen/Header";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAvailableMovies, getMoviesFromTmdb, getGoogleDriveMovies } from "../Home/HomeFunctions";
import * as SplashScreen from "expo-splash-screen"


SplashScreen.preventAutoHideAsync()

const AllMoviesScreen = ({navigation, route})=>{
  const [appIsReady, setAppIsReady] = useState(false);



    /**This section stores users data in the local storage to be accessed from any component... */
    const {params} = route
    const loggedInUserData = params ? params : {}
    
    if (loggedInUserData.isLoggedIn){
        
        const storeUserData = async ()=>{
            
            try{

                const {username, email, _id, } = loggedInUserData.userData
            
            
                /**Stores the user data in the LS */
                await AsyncStorage.setItem('userData', JSON.stringify({username, email, id: _id,}));
        
            }
            catch(error){

                return error
            }
    
        }
    
        storeUserData()
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







    //////////////////////////////////////////////////////////////////////////////////////
    const apiKey = "AIzaSyBuNXlKmw7GDgEx4ZysQQTYRweazREeevc"// api key of my googledrive console
    const folderId = "1oh3eDKvls1CwZBHG2EFAlnG03MBqgN7a" //folderKey of folder containing movies in google drive
    //////////////////////////////////////////////////////////




    /**This array contains movie available to be displayed and downloaded */
    const [AvailableMovies, setAvailableMovies] = useState([])
    //////////////////////////////////////////////////

    /**This array contains movies from TMDB center */
    const [MovieDataTmdb_All, setMovieDataTmdb_All] = useState([])
    ///////////////////////////////////////////////

    /**This array contains all movies available in my google drive storage... */
    const [MovieDataGoogledrive_All, setMovieDataGoogledrive_All] = useState([])
    /////////////////////////////////////

    // const [isLoading, setIsLoading] = useState(true)







    /**THIS SECTION DEALS WITH GETTING MOVIES FROM THEIR RESPECTIVE DATABASES................................................
     * ......................................................................................................................
     * ......................................................................................................................
     * ......................................................................................................................
    */

    /**Getting movies available in google drive................................................................... */
    useEffect(()=>{

        const fetchMovieData = async ()=>{

            if (!MovieDataGoogledrive_All.length){
                const movie  = await getGoogleDriveMovies()
                setMovieDataGoogledrive_All(movie)                

            }
                
        }
            
        fetchMovieData()

    },[])
    /**................................................................................
     * ////////////////////////////////////////////////////////////////////////////////
     */




    ///**Getting Movies available in TMDB movie database.......................................................... */
    useEffect(()=>{

        const fetchMovieData = async ()=>{
            const allMoviesUrl = "https://api.themoviedb.org/3/movie/popular?language=en-US&page="
            
            if (!MovieDataTmdb_All.length){
                const movies = await getMoviesFromTmdb(allMoviesUrl)
                setMovieDataTmdb_All(movies)

            }

        }

        fetchMovieData()

    }, [])
    /**..................................................................................................
     * ..................................................................................................
     */




/**Getting and setting available movies to be rendered or displayed in the UI....................... */
    useEffect(()=>{

        const fectchMovieData = async ()=>{

            if (!AvailableMovies.length){
                    
                    const availableMoviesData = await getAvailableMovies(MovieDataGoogledrive_All, MovieDataTmdb_All)
                    setAvailableMovies(availableMoviesData)
                
            }
                    

        }
        
        fectchMovieData()
    },[MovieDataGoogledrive_All, MovieDataTmdb_All])

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







/**Setting the columns for the flat list */
const [numColumns, setColumns] = useState(2)
///////////////////////////////////////////////////////////////////////////////////

/**This function executes when the user clicks/selects a movie to process or download */
const handleSelectedMovie = ({id_tmdb, id_gdrive})=>{
  
    navigation.navigate('movieInfo', {id_tmdb, id_gdrive, previousScreen:'allmovies'})
}
//////////////////////////////////////////////////////////////////////////





// This tells the splash screen to hide immediately after the specified number of seconds!
if (!appIsReady){
    setTimeout( async()=>{
    
            await SplashScreen.hideAsync();
            setAppIsReady(true)
        
        }, 4000)
    }
    ///////////////////////////////////////////////////////////////////////////

    



if (!AvailableMovies.length){

    // setTimeout(()=>{

    //     return(
    //         <View style = {AllScreenStyles.container}>
    //             <View style = {s`p-3 h-16 bg-green-800 flex justify-center`}></View>
    //             <View style = {AllScreenStyles.loader}>
    //                 <Text>Something went wrong</Text>
    //             </View>
    //         </View>
    //     )

    // }, 10000)

    
    return(
        <View style = {AllScreenStyles.container} >
            <View style = {s`p-3 h-16 bg-green-800 flex justify-center`}></View>
            <View style = {AllScreenStyles.loader}>
                <FontAwesomeIcon icon={faSpinner} size={40} color="#fff" />
            </View>
        </View>
    )
}
else{
  
        
    return(
        <View style = {AllScreenStyles.mainContainer}>
            <View style = {AllScreenStyles.mainContainerInner}>
                
                <View style = {[AllScreenStyles.mainContainerMenus, s`bg-green-800`]}>
                    <View style = {[AllScreenStyles.mainContainerMenus_left, s`border-b border-white`]}>
                        <View style = {AllScreenStyles.mainContainerMenus_left_top}>
                            <TouchableOpacity onPress={()=> navigation.navigate('allmovies')} style = {AllScreenStyles.activeBar} >
                            <Text style = {[AllScreenStyles.mainContainerMenus_left_top_txt, s`text-white`]}>All Movies</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {AllScreenStyles.mainContainerMenus_left_bottomLine}></View>
                    </View>
    
                    <View style = {AllScreenStyles.mainContainerMenus_right}>
                        <View style = {AllScreenStyles.mainContainerMenus_right_top}>
                            <TouchableOpacity onPress={()=> navigation.navigate('trending')}>
                            <Text style = {AllScreenStyles.mainContainerMenus_right_top_txt}>Trending</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {AllScreenStyles.mainContainerMenus_right_bottomLine}></View>
                    </View>
                </View>
            </View>
            
      
            <View style = {[s`p-2 bg-gray-800 h-screen flex`,AllScreenStyles.allmoviesContainer]}> 
            
                <View>
                 {/**Movie list....................................................... 
                  * ....................................................................,*/}
                    <FlatList 
                        key={numColumns}
                        data={AvailableMovies}
                        keyExtractor={(item)=> item.key}
                        renderItem={({item})=>(
    
                        <TouchableOpacity onPress={()=> handleSelectedMovie({id_tmdb:item.key, id_gdrive:item.id})} key={item.key}>
                            <View style = {s`h-72 w-40 border-black rounded-lg overflow-hidden m-3`}>
                                <View style = {s`h-4/5 bg-gray-300`}>
                                    <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.tumbnail}` }} style = {s`h-full`}/>
                                </View>
                                <View style = {s`h-1/5 bg-white items-center justify-center`}>
                                    <Text style = {s`text-base font-serif font-bold text-green-700`}>{item.name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
    
                        )}
                        contentContainerStyle = {s`flex items-center`}
                        numColumns={numColumns}
                    />
                    {/**...................................................... */}
    
                </View>
            </View>
    
        </View>
    
        )
}


}



export default AllMoviesScreen