import { StyleSheet, Dimensions } from "react-native";
import Constants from 'expo-constants'

const screenHeight = Math.floor(Dimensions.get("screen").height);
const screenWidth = Math.floor(Dimensions.get("screen").width);


const AllScreenStyles = StyleSheet.create({

    homeContainer:{
        paddingTop: Constants.statusBarHeight,
        position:'relative',
        height:screenHeight + Constants.statusBarHeight,//Added the status bar height together with the screen height
    },
    
    mainContainer:{
        height:"100%",
        // marginTop:Constants.statusBarHeight, 
    },

    // Header General Styles
    loader:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        height:screenHeight,
        backgroundColor:'#333'
    },
    
    // Styles for the top part of the header
    headerInner:{
        display: 'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        // height:300
    },

    headerInner_left:{
        flex:1,
    },

    headerInner_left_logo:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:18,
        fontFamily:'sans-serif-condensed'
    },
    
    headerInner_middle:{
        flex:1,
        alignItems:'center',
    },

    headerSearchBar:{
        color:'#fff',
        fontSize:20,
    },
  
    headerInner_right:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end'
    },

    headerMenuBar:{
        color:'#fff',
    },



/**List Item/card styling................................... */
    card:{
        borderRadius:8,
        margin:12,
        width:160,
        height:288,
        overflow:'hidden',

    },

    cardImgCont:{
        height:'80%',
        backgroundColor:'silver'

    },
    cardImg :{
        height: '100%'
    },

    cardTxtCont:{
        height:'20%',
        backgroundColor:"#fff",
        alignItems: 'center',
        justifyContent:"center"

    },

    cardTxt:{
        // fontFamily:"ui-serif, Georgia, Cambria, Times, serif,",
        fontWeight: 'bold',
        fontSize:16,
        color:'darkgreen'

    },



/////////////////////////////////////////////


    // Styles for the buttom part of the header (Movies/Trendng)
    mainContainerMenus:{
        padding:5,
        // height:30,
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },

    mainContainerMenus_left:{
        flex: 1,
        alignItems:'center',
   
    },

    mainContainerMenus_left_top_txt:{
        color: '#a9a9a9',
        fontSize:14,
        fontWeight:'bold'
    },

    mainContainerMenus_right:{
        flex: 1,
        alignItems:'center',
        
    },

    mainContainerMenus_right_top_txt:{
        color: '#a9a9a9',
        fontSize:14,
        fontWeight:'bold'

    },

    allmoviesContainer:{
        height:screenHeight - 100
    },

    trendingContainer:{
        height:screenHeight - 100
    },

/**Menu bar container styles........... */
screenOverlay:{
    height:'100%',
    width:'100%',
    backgroundColor:'darkgreen',
    opacity:0.3,
    position:'absolute',
    zIndex:0.9,
},

navBarMainCont:{
    height:'100%',
    width:'100%',
    position:'absolute',
},

menuBarCont:{
    height:'100%',
    width:'50%',
    zIndex:1,
    right:0,
    position:'absolute',
    borderRadius:10
},

signIn_signUpInputs:{
    padding:5,
    borderWidth:0.5,
    margin:10,
    height:40,
    borderColor:'gray',
    color:'white'
},

searchMovieInput:{
    // opacity:0.5
},

/**Nav bar content styles................................. */

navBarList:{
    borderColor: "gray",
    padding:15,
    alignItems:'center'


},

navBarListTxt:{
    color: '#fff',
    fontSize: 15,
    fontWeight:'bold'
    

},

/**Styles for active screen........... */
activeBar:{
    // backgroundColor:'gray'
},



/** Admin screen styles........................ */
adminMainButtons:{
    borderWidth:2,
    flex: 1,
    margin: 4,
    height: 150,
    borderColor:'#333',
    display:'flex',
    justifyContent:'center',
    alignItems:"center",
    backgroundColor:'#333'
},

adminMainText:{
fontWeight:'bold',
color:'#fff'

},

adminLayout:{

    position:'absolute',
    zIndex: 1,
    height:'100%',
    width: screenWidth,

}




////////////////////////////////////////

  });

  export default AllScreenStyles