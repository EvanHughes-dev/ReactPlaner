
import React from 'react';
import Head from './Header/HeadMain.js'
import { useState, useEffect } from "react";
import { GoogleLogin } from '@react-oauth/google';

const jose = require('jose')


const BaseUrl = 'http://69.242.41.167:8082';

export default function App() {
   //#region Login
    const [id, setID] = useState(null);
  
    if (sessionStorage.getItem("CurrentUserID") != null && id==null) {
        setID(parseInt(sessionStorage.getItem("CurrentUserID")));
    }
    
    const [loggedIn, setLogin] = useState(false);
    if (id!=null && !loggedIn) {
        setLogin(true);
    }
    if (!loggedIn) {

        const LoggedIn = (credentials) => {
            const info = jose.decodeJwt(credentials.credential);


            window.sessionStorage.setItem("CurrentProfilePhoto", info.picture);




            fetch(BaseUrl + "/api/login/google/" + info.sub, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
                //if the user does not yet exist, the user is generated automatically in backend
            }).catch(error => {

                console.error(error);
                
            })
            .then((response) => response.json())
                .then((json) => {
                   
                    sessionStorage.setItem("CurrentUserID", json[0].id);
                    setID(json[0].id);
                    setLogin(true);
                    
                })
                .catch(error => {
                    console.error(error);
                });
           

                    
   
            
            

        };
        const errorMessage = (error) => {
            console.log(error);
        };
        return (
            <div>
                <center>
                    <h2>Welcome to STEM Tempest</h2>
         
                    <br/>
                    <br/>
                      <GoogleLogin onSuccess={LoggedIn} onError={errorMessage} />
                </center>
            </div>
        )

    } else {

        //#endregion



    

   
    //an attempt at a side bar
        return (
            <>
                
            <Head id={id} />
            
               
            </>
        );
    }
    

}

