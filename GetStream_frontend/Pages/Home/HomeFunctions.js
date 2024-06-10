import axios from "axios"
import { API_KEY, FOLDER_ID } from '@env'



const getGoogleDriveMovies = async ()=>{

   /**This array contains all movies available in my google drive storage... */
   let MovieDataGoogledrive_All = []
   ////////////////////////////////////////////////////////////////////


  /**Declaring and setting the variable that will contain all movie-data form google drive storage .*/
  let movieData_gDrive = []

  /**Getting movies available in my storage (Google drive)... */
  const googleDrive_ApiUrl = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}`

 const getMovieFiles = axios.get(googleDrive_ApiUrl).then((res)=>{
      const movieFiles = res.data.files

        if (!movieData_gDrive.length){
            
            return movieFiles
        }

  }).catch((e)=>{

  return e
  })
  /**.............................................................................................. */


  movieData_gDrive = await getMovieFiles


  if (movieData_gDrive.length){
      
      const promiseData = movieData_gDrive.map((movie)=>{
          /**Returns objects of the request based on each movie id and api key.....*/
          /**Automatically, the parent variable "promiseData" becomes an array of various objects */
          return axios.get(`https://www.googleapis.com/drive/v3/files/${movie.id}?fields=description&key=${API_KEY}`)
      })

      /**This resolves all the promises in the variable or array "promiseData" and gives out a response if the promises were resolved*/
      /**else an error occurs if any of the promises were rejected */
      
          
        const getMovieData =  Promise.all(promiseData).then((response)=>{
    
              /**"The map function returns a customized object that comprises of various data from the responses and movie data from drive itself*/
              /**Automatically, the 'movieData' contains an array of the customized object returned to it */
              const movieData = response.map((res, index)=> ({//res contains each request object while "index" contains the index value of each object "res"
                  id:movieData_gDrive[index].id,
                  name:movieData_gDrive[index].name,
                  key:res.data.description
              }))
              
    
              if (!MovieDataGoogledrive_All.length || MovieDataGoogledrive_All.length != movieData_gDrive.length){
                  /**Adding movie-data from google drive storage to local array (MovieDataGoogledrive_All) .*/
                  //This function sets the state of the array MovieDataGoogledrive_All to movieData(which is also an array)

                  
                  
                  return movieData
              }
    
    
          })
          .catch((error)=>{
    
              return 'An Error Occured: ' + error
          })
      
          MovieDataGoogledrive_All = await getMovieData

  }
  
  

  return MovieDataGoogledrive_All
  
}
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////








  //**.................................................................................... */
const getMoviesFromTmdb = async (movieUrl)=>{

    /**Variable declaration state................................... */
      const AllMovies = []
      let MoviePages = []
      const pages = 5
      ///////////////////////////////////////////////////////////////
  


      /**Loopping through each page of all pages(1-5) from TMDB....................................... */
      const promises = []//collects promises data to  be processed
      for (let page = 1; page <= pages; page++){
  
          const options = {
              method: 'GET',
              url: movieUrl + page,
              headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDA3N2M5MzFkYmY1NmI1YmY2OWM2ZWMxMTU3OWM1YiIsInN1YiI6IjY2MmMyZDdmMWNmZTNhMDEyMTE1MzdhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.el8UxbmHKc3k4HBHI_75-dXtVtarYsIUqTs06uVYBAY'
              }
          };
          
        const moviePage = axios.request(options)
          .then((response)=> {            
              
              return response.data.results
          })
          .catch(function (error) {
              console.error(error);
              return error
          });
  
          promises.push(moviePage)
  
      }
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



      /**Getting all movie pages...........................................
       * ..................................................................
       */
      const getMoviePages = async ()=>{

        const movieData =  Promise.all(promises).then((moviePages)=>{
    
            return moviePages
      
          }).catch((err)=> err)

          return movieData
      }

      MoviePages = await getMoviePages()
      /**........................................................... */



      
      /**Concating AllMovies array with movies from all pages together (1-5)............. */
      if (MoviePages.length){
            MoviePages.forEach((moviePage)=>{//looping through the movie pages
                moviePage.forEach((movie)=>{//looping through each movie page (this is where each movie object can be obtained)

                    /**Checking if similar movie is already in AllMovies array */
                 const isMovieAvailable =  AllMovies.length ?  AllMovies.find((allMovies_movie)=> allMovies_movie.key == movie.id) : false
                 /////////////////////////////////////////////////////////////////////

                 if (!isMovieAvailable){//Only store movie of unique key or data i.e when this condition is true or "isMovieAvailable" is null
                     AllMovies.push({
                         key: movie.id,
                         name: movie.title,
                         releaseDate: movie.release_date,
                         tumbnail: movie.poster_path
                     })
                 }
                

                })

            })
        
      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
  
      return AllMovies
    }


/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////





/**This function compares moviedata from Google drive and TMDB if they match. if true, then it will be filtered and added to the array 
 * 'availableMovies'
 */
const getAvailableMovies = async (GoogleDriveMovies, ExternalDatabaseMovies)=>{
  

    const availableMoviesData = []

     GoogleDriveMovies.map((GoogleDriveMovies_each)=>{
      
        const filteredAvailableMovie = ExternalDatabaseMovies.filter((ExternalDatabaseMovies_each)=> 
            Number(ExternalDatabaseMovies_each.key) === Number(GoogleDriveMovies_each.key))
        
        /**Declaring and initializing the attribute id in filteredAvailableMovie (object)*/
        const availableMovie = filteredAvailableMovie[0]
        
        if(availableMovie){
            
            availableMovie.id = GoogleDriveMovies_each.id //modifying availableMovie object before pushing to General data (availableMoviesData)
            
            availableMoviesData.push(availableMovie)
        }

            
    })



    return availableMoviesData
}
  
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////








export {getAvailableMovies, getMoviesFromTmdb, getGoogleDriveMovies}