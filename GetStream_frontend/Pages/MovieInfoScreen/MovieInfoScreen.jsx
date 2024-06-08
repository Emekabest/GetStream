import React, { useEffect, useState } from "react";
import { View, Text, Button, Image, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
import AllScreenStyles from "../HomeScreen/AllScreen_styles";
import { setHeaderMode_global } from "../HomeScreen/Header";
import { s } from "react-native-wind"
import axios from 'axios'



const MovieInfoScreen = ({navigation, route})=>{

    const { id_tmdb,  id_gdrive, previousScreen }= route.params

    useEffect(()=>{
        setHeaderMode_global(false)
    }, [])




    const [myMovie, setMyMovie] = useState(null)

    /**Getting the data of the movie choosen by the user............................... */
    const _id = id_tmdb
    const apiKey = "20077c931dbf56b5bf69c6ec11579c5b"

    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${_id}?api_key=${apiKey}`,
        headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDA3N2M5MzFkYmY1NmI1YmY2OWM2ZWMxMTU3OWM1YiIsInN1YiI6IjY2MmMyZDdmMWNmZTNhMDEyMTE1MzdhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.el8UxbmHKc3k4HBHI_75-dXtVtarYsIUqTs06uVYBAY'
        }
    };

    axios
    .request(options)
    .then(function (response) {

        if (myMovie === null){
            setMyMovie(response.data)
        }
    
    })
    .catch(err => err);

//////////////////////////////////////////////////////////////////////////
    

/**Downloads the specified movie...................................... */
const downloadMovie = (movieId) => {//Google drive/Storage movie id.

const downloadLink = `https://drive.usercontent.google.com/u/0/uc?id=${movieId}&export=download`
Linking.openURL(downloadLink)
  .catch((err) => err);

};
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////




 /**This function checks/listens when the device back-key is clicked and execute its block of code only when it has moved from THIS component
     * to a different or previous component.
     * ..................................................
     * Note: This function will achieve its purpose (setting or activating the header) when it moves backwards from this component to any component.
     * Ensure you modify this function if there is need for components to be rendered without the header
    */
 navigation.addListener('beforeRemove', ()=> (setHeaderMode_global(true))) 
///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////




    if (!myMovie){        
        return (
            <View style = {AllScreenStyles.container}>
                <View style = {s`p-3 h-16 bg-green-800 flex justify-center`}>
                    <TouchableOpacity onPress={()=> navigation.navigate('allmovies')}>
                        <FontAwesomeIcon icon = {faArrowLeft} size={25} color="#fff"/>
                    </TouchableOpacity>
                </View>
                <View style = {AllScreenStyles.loader}>
                    <FontAwesomeIcon icon={faSpinner} size={40} color="#fff" />
                </View>

            </View>
        )

    }

    
    return (
        <View style = {AllScreenStyles.container}>
            <View style = {s`h-full bg-gray-800`}>
                <View style = {s`p-3 h-16 bg-green-800 flex justify-center`}>
                    <TouchableOpacity onPress={()=> navigation.navigate(previousScreen)}>
                        <FontAwesomeIcon icon = {faArrowLeft} size={25} color="#fff"/>
                    </TouchableOpacity>
                </View>

                <View style = {s`p-3 `}>
                    <View style = {s`flex flex-row mb-5 border-b pb-8 border-gray-500`}>
                        <View style = {s`h-36 w-24 bg-green-400 mr-3 rounded overflow-hidden`}>
                            <Image source = {{uri:`https://image.tmdb.org/t/p/w500${myMovie.backdrop_path}`}}
                            style = {s`h-full `}
                            />
                        </View>

                        <View>
                           
                            <View style= {s`pb-2`}><Text style = {s`text-white font-bold ${myMovie.title.length > 22 ? "text-xs" : "text-xl"  } `}>{myMovie.title}</Text></View>
                            <View style= {s`pb-1`}><Text style = {s`text-white text-base `}>{myMovie.genres[0].name}</Text></View>
                            <View style= {s`pb-1`}><Text style = {s`text-white text-base `}>{myMovie.release_date}</Text></View>
                            <View style= {s`pb-1`}><Text style = {s`text-white text-base`}>TMDB</Text></View>
                        </View>
                    </View>

                    <View style = {s`mb-10 min-h-40 border-b pb-8 border-gray-500`}>
                        <View>
                            <Text style = {s`text-white text-lg font-semibold`}>Description</Text>
                        </View>
                        <View>
                            <Text style = {s`text-white tracking-wide font-mono`}>{myMovie.overview}</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={()=> downloadMovie(id_gdrive)}>
                        <View style = {s`flex items-center`}>
                            <View style = {s`h-10 w-4/5 pb-1 bg-green-800 rounded-full flex items-center justify-center`}>
                                <Text style = {s`text-white`}>Download</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>
                <View>
                </View>
            </View>
        </View>
    )
}

export default MovieInfoScreen