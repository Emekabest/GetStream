import React, { useEffect, useState } from "react"
import AllScreenStyles from "../HomeScreen/AllScreen_styles"
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native"
import { s } from "react-native-wind"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars, faSearch, faArrowLeft, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { StatusBar } from 'expo-status-bar';
import { getAvailableMovies, getGoogleDriveMovies, getMoviesFromTmdb } from "../Home/HomeFunctions";
import axios from "axios"

const TrendingScreen = ({navigation, route})=>{


    /**Variable declaration state..................................... */
    const [AvailableMovies, setAvailableMovies] = useState([])
    const [TrendingMovies, setTrendingMovies] = useState([])
    const [MovieDataGoogledrive_All, setMovieDataGoogledrive_All] = useState([])
    /////////////////////////////////////////////////////////////////////




    /**Getting movies available in google drive.................................................................. */
    useEffect(()=>{

        const fetchMovieData = async ()=>{

            if (!MovieDataGoogledrive_All.length){
                const movie  = await getGoogleDriveMovies()
                setMovieDataGoogledrive_All(movie)

            }
                
        }
            
        fetchMovieData()

    })
    /**................................................................................
     * ////////////////////////////////////////////////////////////////////////////////
     */


   


  ///**Getting Movies available in TMDB movie database.......................................................... */
  useEffect(()=>{

    const fetchMovieData = async ()=>{
        const trendingMoviesUrl = "https://api.themoviedb.org/3/trending/movie/day?language=en-US&page="
        
        if (!TrendingMovies.length){
            const movies = await getMoviesFromTmdb(trendingMoviesUrl)
            setTrendingMovies(movies)
        }

    }

    fetchMovieData()

}, [])





    /**Getting and setting available movies to be rendered or displayed in the UI
    * ................................................................................. */
    useEffect(()=>{

        const fectchData = async ()=>{

            if (!AvailableMovies.length){
                const availableMoviesData = await getAvailableMovies(MovieDataGoogledrive_All, TrendingMovies)
                setAvailableMovies(availableMoviesData)
            }

        }
        
        fectchData()
    
    },[MovieDataGoogledrive_All, TrendingMovies])
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////






    /**This function executes when the user clicks/selects a movie to process or download..s */
    const handleSelectedMovie = ({id_tmdb, id_gdrive})=>{

        navigation.navigate('movieInfo', {id_tmdb, id_gdrive, previousScreen: 'trending'})
    }
    //////////////////////////////////////////////////////////////////////////////






    /**FlatList Template Data......................................................................................
     * .............................................................................................................
     * ..............................................................................................................
     * ..............................................................................................................
    */
    const MovieTemplate = React.memo(({item})=>(
        <TouchableOpacity key={item.key} onPress={()=> handleSelectedMovie({id_tmdb:item.key, id_gdrive:item.id})}>
            <View style = {AllScreenStyles.card}>
                <View style = {AllScreenStyles.cardImgCont}>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.tumbnail}`}} style = {AllScreenStyles.cardImg}/>
                </View>
                <View style = {AllScreenStyles.cardTxtCont}>
                    <Text style = {AllScreenStyles.cardTxt}>{item.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    ))


    const renderTemplate = ({item})=>(
        <MovieTemplate item = {item} />
    )

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



return(
    <View style = {AllScreenStyles.mainContainer}>
        <View style = {AllScreenStyles.mainContainerInner}>

        <View style = {[AllScreenStyles.mainContainerMenus, s`bg-green-800`]}>
                <View style = {AllScreenStyles.mainContainerMenus_left}>
                    <View style = {AllScreenStyles.mainContainerMenus_left_top}>
                        <TouchableOpacity onPress={()=> navigation.navigate('allmovies')}>
                        <Text style = {AllScreenStyles.mainContainerMenus_left_top_txt}>All Movies</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {AllScreenStyles.mainContainerMenus_left_bottomLine}></View>
                </View>

                <View style = {[AllScreenStyles.mainContainerMenus_right, s`border-b border-white`]}>
                    <View style = {AllScreenStyles.mainContainerMenus_right_top}>
                        <TouchableOpacity onPress={()=> navigation.navigate('trending')}>
                        <Text style = {[AllScreenStyles.mainContainerMenus_right_top_txt, s`text-white`]}>Trending</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {AllScreenStyles.mainContainerMenus_right_bottomLine}></View>
                </View>
            </View>
        
        <View style= {[s`p-2 bg-gray-800 h-screen flex`, AllScreenStyles.trendingContainer]}>
            <View>

            <FlatList
                    key={2}
                    data={AvailableMovies}
                    keyExtractor={(item)=> item.key}
                    renderItem={renderTemplate}
                    contentContainerStyle = {s`flex items-center`}
                    numColumns={2}
                />

            </View>
            </View>
        </View>
    </View>

)

}

export default TrendingScreen

