import { Alert, FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import { setHeaderMode_global } from "../HomeScreen/Header"
import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { s } from "react-native-wind"
import { faArrowLeft, faCancel, faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons"
import AllScreenStyles from "../HomeScreen/AllScreen_styles"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getGoogleDriveMovies, getMoviesFromTmdb, getAvailableMovies } from "../Home/HomeFunctions"
import { useFocusEffect } from "@react-navigation/native"


const SearchMovieScreen = ({navigation})=>{
    const allMovies_trendingMovies = []

    const [availableSearchedMovies, setAvailableSearchedMovies] = useState([])
    const [searchInputText, setSearchInputText] = useState('')
    const [isSearched, setIsSearched] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


   

    /**Focusing on the search input.............................................. */
    const textInputRef = useState(null)

    const focusTextInput = ()=>{
        if (textInputRef.current){
            textInputRef.current.focus()
        }
        
    }

    useEffect(() => {
        // Automatically focus the input with a small delay
        const timeoutId = setTimeout(() => {
          focusTextInput();
        }, 100); // Adjust the delay as needed
        return () => clearTimeout(timeoutId);
      }, []);
    /////////////////////////////////////////////////


    
    /**Setting the header during current screen activation and deactivation */
    useFocusEffect(()=>{
    setHeaderMode_global(false)

    })
    //............................................................... 
    navigation.addListener('beforeRemove', ()=> (setHeaderMode_global(true)))
    //////////////////////////////////////////////////////////////////////////////////////






    /**Handles when the user searches an interested movie......................................................................
     * ........................................................................................................................
     */
    const handleSearchedMovies = async ()=>{
        
        if (searchInputText){
            setIsLoading(true)

            const googleDriveMovies = await getGoogleDriveMovies()


            /**Getting all movies and trending movies data to be added or appended into a single array */
            const allMovies = await getMoviesFromTmdb("https://api.themoviedb.org/3/movie/popular?language=en-US&page=")
            const trendingMovies = await getMoviesFromTmdb("https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=")
            

            /**Concating all_trending array with movies from both allMovies and trendingMovies data and ensuring integity of all_trending array*/
            const movieCategory = [allMovies, trendingMovies]
            movieCategory.forEach((eachCategory)=>{
                eachCategory.forEach((movie)=>{
                    const isMovieAvailable = allMovies_trendingMovies.length ? allMovies_trendingMovies.find(
                        (allMovie_trendingMovie) => allMovie_trendingMovie.key === movie.key ) : false

                    if (!isMovieAvailable){//Only store movie of unique key or data i.e when this condition is true or "isMovieAvailable" is null
                        allMovies_trendingMovies.push(movie)

                    }
                })
            })
            /**...................................................................................................................................................................
             * ...................................................................................................................................................................
             * ...................................................................................................................................................................
             */

            


                const availableMovies = await getAvailableMovies(googleDriveMovies, allMovies_trendingMovies)

                const filterSearchedMovies = availableMovies.filter((movie)=> movie.name.toLowerCase().includes(searchInputText.toLowerCase()))
                setAvailableSearchedMovies(filterSearchedMovies)
                setIsSearched(true)

                setIsLoading(false)
                
        }
        else{
            Alert.alert("Please enter a keyword")

        }
        

    }
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







    /**This function executes when the user clicks/selects a movie to process or download */
        const handleSelectedMovie = ({id_tmdb, id_gdrive})=>{
    
            navigation.navigate('movieInfo', {id_tmdb, id_gdrive, previousScreen:'searchMovie'})
        }
    ////////////////////////////////////////////////////////////////////////





    return (
        <View>
            <View style = {s`p-3 h-16 bg-green-800 flex flex-row items-center`}>
                <View style = {s ``}>
                    <TouchableOpacity onPress={()=> navigation.navigate('allmovies')}  >
                        <FontAwesomeIcon icon = {faArrowLeft} size={25} color="#fff"/>
                    </TouchableOpacity>
                </View>

                <View style = {s` w-4/5 flex flex-row ml-4`}>
                    <TextInput style = {[s` w-full px-2 rounded-lg border-gray-400 text-white text-base`, AllScreenStyles.searchMovieInput]} 
                    placeholder="Search your treasured movies..."  
                    onSubmitEditing={handleSearchedMovies}
                    returnKeyType="search"
                    ref={textInputRef}
                    value={searchInputText}
                    onChangeText={setSearchInputText}
                    />

                    <View style = {s`mr-2`}>
                        <TouchableOpacity onPress={()=> (setSearchInputText(''), searchInputText === '' ? navigation.navigate('allmovies') : "" )}>
                            <FontAwesomeIcon icon={faXmark} color="white" size={25}/>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </View>




            {/**The Second Section or body of the screen..................................... */}

            <View style= {[s`p-2 bg-gray-800 h-screen`, AllScreenStyles.trendingContainer]}>

                {
                    /**Returns a loader when isLoading is set to true i.e a search is initially made */
                    isLoading ? 
                        <View style= {[s`p-2 bg-gray-800 h-screen flex justify-center items-center`, AllScreenStyles.trendingContainer]}> 
                                <FontAwesomeIcon  icon={faSpinner} size={40} color="#fff"  />
                        </View> 

                    :

                        /**Condition to confirm the availablity of searched available movies before giving out the required or rightful information */

                        !availableSearchedMovies.length  ? 

                            <View style= {[s`p-2 bg-gray-800 h-screen flex justify-center`, AllScreenStyles.trendingContainer]}>

                                {
                                    isSearched ? 
                                    <View style = {s`items-center`}> 
                                        <Text style = {s`text-white font-bold`}>No Movies Found</Text>
                                        <Text style = {s`text-white font-bold`}>Please try again with a different keyword</Text>
                                    </View>
                                    : 
                                    null
                                } 
                        
                            </View> 

                        :

                            <FlatList 
                                key={2}
                                data={availableSearchedMovies}
                                keyExtractor={(item)=> item.key}
                                renderItem={({item: movie})=>(
        
                                <TouchableOpacity onPress={()=> handleSelectedMovie({id_tmdb:movie.key, id_gdrive:movie.id})} key={movie.key}>
                                    <View style = {s`h-72 w-40 border-black rounded-lg overflow-hidden m-3`}>
                                        <View style = {s`h-4/5 bg-gray-300`}>
                                            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.tumbnail}` }} style = {s`h-full`}/>
                                        </View>
                                        <View style = {s`h-1/5 bg-white items-center justify-center`}>
                                            <Text style = {s`text-base font-serif font-bold text-green-700`}>{movie.name}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
        
                                )}

                                contentContainerStyle = {s`flex items-center`}
                                numColumns={2}
                            />


                }



            </View>
        </View>

    )

}

export default SearchMovieScreen
