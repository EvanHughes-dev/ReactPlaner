import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';



const root = ReactDOM.createRoot(document.getElementById('root'));

fun();

export default function fun() {
    root.render(
        <GoogleOAuthProvider clientId="630224516517-vk7h1mb4fk5c4lckjsq3s7ms6oveugk7.apps.googleusercontent.com">
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </GoogleOAuthProvider>
    );
    return;
}
/*
You are now watching
the React file 'index.js'
through our 'Show React' tool.
*/