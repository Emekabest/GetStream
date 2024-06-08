import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { s } from "react-native-wind"
import AllScreenStyles from "../HomeScreen/AllScreen_styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCancel } from "@fortawesome/free-solid-svg-icons";
import { setHeaderMode_global } from "../HomeScreen/Header";
import { getMoviesFromTmdb } from "../Home/HomeFunctions";
import axios from "axios";


const AdminScreen = ()=>{

  const [AllMovieData, setAllMovieData] = useState([])


  /**Assigning Movie Url state.................................................................... */
  const allMoviesUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page='
  const trendingMoviesUrl = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US&page='
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////





  /**Sorting the array alphabetically...................................... */
  AllMovieData.sort((a, b) => {  
    // Converting names to lowercase to ensure case-insensitive sorting
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
  
    if (nameA < nameB) {
      return -1; // nameA comes before nameB
    }
    if (nameA > nameB) {
      return 1; // nameA comes after nameB
    }
    return 0; // names are equal
  });

  ////////////////////////////////////////////////////////////////////////////
    


  /**Handle button Clicks.............................................*/
  const [layoutDisplay, setLayoutDisplay] = useState('none')
  const [layOutHeading, setLayoutHeading] = useState('')


    const handleLayoutBox = async (status, heading, url)=>{
  
      if (status == 'open'){
        
        const movies = await getMoviesFromTmdb(url)
        setAllMovieData(movies)
        
        
        setHeaderMode_global(false)
        
        setLayoutDisplay('block')
        
        setLayoutHeading(heading)
        }
        else if(status == 'close'){
        setAllMovieData([])
        setLayoutDisplay('none')
        setHeaderMode_global(true)
  
      }
      
    }


/**.......................................................................................................... */



/**LAYOUTBOX TEMPLATE...............................................................................................
 * .................................................................................................................
 * .................................................................................................................
*/
const LayoutBox = ({show})=>{

  if (AllMovieData.length){
    
    return (
      <View style = {[s`h-2/4 pb-14 w-full bg-teal-900`, AllScreenStyles.adminLayout, {display:`${show}`}]}>
          <View style = {s`h-10 bg-yellow-700 flex flex-row justify-center items-center`}>
            <View style = {s``}>
              <Text style = {s`font-bold text-base text-gray-200`}>{layOutHeading}</Text>
            </View>
            <TouchableOpacity onPress={()=> (handleLayoutBox('close'))} style = {s`absolute right-3`}>
              <FontAwesomeIcon icon={faCancel} size={20} color="#d3d3d3" />
            </TouchableOpacity>
          </View>
  
  
        <View>
          <View style = {s`w-full`}>
  
              <FlatList
                key={1}
                data={AllMovieData}
                keyExtractor={(item)=> item.key}
                renderItem={({item})=>(
                  <View style = {s`flex flex-row content-around m-2 w-auto `}>
  
                    <View style = {s` h-20 bg-gray-300 w-14`}>
                            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.tumbnail}` }} style = {s`h-full`}/>
                    </View>
                    <View style = {s`bg-gray-500 p-2`}>
                      <View style = {s``}><Text>{item.name}</Text></View>
                      <View><Text >{item.releaseDate}</Text></View>
                      <View><Text >{item.key}</Text></View>
                    </View>
                    
                  </View>
  
                )}
  
                contentContainerStyle = {s`flex items-center`}
                
            />
  
          </View>
  
        </View>
  
      </View>
    )
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////






 
    

      return (
        <View style = {s`p-3  h-full bg-gray-800 relative`}>
          <View style = {s`flex flex-row`}>
             <TouchableOpacity style = {AllScreenStyles.adminMainButtons} onPress={()=> handleLayoutBox('open', 'All Movies', allMoviesUrl)}>
                <Text style = {AllScreenStyles.adminMainText}>All Movies</Text>
              </TouchableOpacity>
             <TouchableOpacity style = {AllScreenStyles.adminMainButtons} onPress={()=> handleLayoutBox('open', 'Trending Movies', trendingMoviesUrl)}>
                <Text style = {AllScreenStyles.adminMainText}>Trending Movies</Text>
              </TouchableOpacity>
          </View>

        {/**PopUp layout box.............................. */}
          <LayoutBox show = {`${layoutDisplay}`}/>
        {/**........................................ */}

          

        </View>

      )  
    
}


{/* <View style = {s`w-full`}>

<FlatList
        key={1}
        data={MovieDataTmdb_All}
        keyExtractor={(item)=> item.key}
        renderItem={({item})=>(
          <View style = {s`flex flex-row content-around m-2 w-auto `}>

            <View style = {s` h-20 bg-gray-300 w-14`}>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.tumbnail}` }} style = {s`h-full`}/>
            </View>
            <View style = {s`bg-gray-500 p-2`}>
              <View style = {s``}><Text>{item.name}</Text></View>
              <View><Text >{item.releaseDate}</Text></View>
              <View><Text >{item.key}</Text></View>
            </View>
            
          </View>

        )}

        contentContainerStyle = {s`flex items-center`}
        
    />

</View> */}

export default AdminScreen