
import React from 'react';
import Head from './Header/HeadMain.js'
import { useState } from "react";
import { GoogleLogin } from '@react-oauth/google';


export default function App() {
   const [id, setID] = useState(sessionStorage.getItem("ID"));
    const [loggedIn, setLogin] = useState(false);
    if (id!=null && !loggedIn) {
        setLogin(true);
    }
    if (!loggedIn) {

        const  LoggedIn  = (response) => {
            console.log(response);
        };
        const errorMessage = (error) => {
            console.log(error);
        };
        return (
            <div>
                <h2>React Google Login</h2>
                <br />
                <br />
                <GoogleLogin onSuccess={ LoggedIn } onError={errorMessage} />
            </div>
        )

    } else {
        return (
            <Head />


        );
    }
    

}