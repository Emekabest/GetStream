const aws = require('aws-sdk');
const { MongoClient } = require('mongodb')
const bcrypt = require('bcryptjs')
require('dotenv').config()




/**Invoking lambda into this project............................................. */
aws.config.update({region: 'us-east-1'})
const lambda = new aws.Lambda();

const params = {
    FunctionName: 'GetStream', 
    Payload: JSON.stringify({ key: 'value' })
}

lambda.invoke(params, (err, data)=>{

    if (err) {
        console.error('Error invoking Lambda function:', err);
      } else {
        console.log('Lambda function response:', JSON.parse(data.Payload));

      }

})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






// Database set up.......................................................................
const mongodbUrl = process.env.MONGODB_URL
const client = new MongoClient(mongodbUrl)
/////////////////////////////////////////////////////////////////////////
console.log(mongodbUrl)


exports.handler= async (event, context) => {

  try{

      /**Connecting database... */
        await client.connect()
        const db = await client.db('GetStream_DB')
        const pingResponse = await db.command({ ping: 1 })
        const collection = await db.collection("Userdetails")
      /////////////////////////////////////////////////////
      
      /** All Events data..................................... */
      const { requestContext, rawPath, body } = event
      ////////////////////////////////////////////////////////////


          /**This condition runs when the user is requesting to create account....................... */
      if (requestContext.http.method === 'POST' && rawPath === "/create-account"){
          const userDetails = JSON.parse(body)

          const {username, email, password} = userDetails

          const oldUser = await collection.findOne({username})//Returns an existing user if any is found else returns null
          if (oldUser){//Checking if a user exists

              const response = {
                statusCode:200,
                body: JSON.stringify({error:'Username already taken', errorCode: 409})
              };

              return response
          }
          else{
            
              const encryptedPassword = await bcrypt.hash(password, 10)//This function encrypt the users password for security purposes 
             
              const User = {
                username,
                email,
                password: encryptedPassword
              }

                //Registers a new user...........
                await collection.insertOne(User)
                //////////////////////////////////////////////////

                /**Status of the response......................................................................................*/
              const responseStatus = {
                db_status: pingResponse.ok ? "Database connected successfully" : "failed connecting with database",
                status:'Account successfully created',
                User
              
              }
            //.............................................................
          
            /**Response data to be sent to the client... */
            const response = {
              statusCode: 200,
              body: JSON.stringify(responseStatus),
            };
            ///////////////////////////////////////////////
          
            return response;

          }


         
      }
      /**This condition runs when the user is requesting to sign-in into an account.................................... */
      else if (requestContext.http.method ==='POST' && rawPath === '/login'){

              /**User details from the client side */
              const userDetails = JSON.parse(body)
              const {email, password} = userDetails
              ///////////////////////////////////////

              const User =  await collection.findOne({email})//Checks if the user exist
              
              /** Declaring a response to be sent to the client during the sign in authentication process */
              let response = {}
              //.........................................................................
              if (User){//Authenticate users identity

                /**Authenticate users password...................... */
                  const isPassword = await bcrypt.compare(password, User.password)
                  if (isPassword){
                    response.statusCode = 200
                    response.body = JSON.stringify({User, info:'Verfication Successful' }) 

                  }
                  else{
                    response.body = JSON.stringify({info:'Incorrect password'}) 

                  }
                //////////////////////////////////////////////

                
              }
              else{

                response.body = JSON.stringify({info:"Email dosen't exist" }) 

              }

              return response
      }

  }
  catch(error){

    const errorData ={
      statusCode: 500,
      body:JSON.stringify({error:'Internal server error'})
    }

    return errorData
  }
  finally{
    // Ensures that the client closes when the specified task has been completed or an error occured
    await client.close()
  }
  
  };
  
