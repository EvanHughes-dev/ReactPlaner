import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js'

const root = ReactDOM.createRoot(document.getElementById('root'));


RenderOBJ();
//export default means this is the function to call in to import from
export default function RenderOBJ() {
    console.log("Render");
    root.render(<App />);
    
    return "";

}
/*
You are now watching
the React file 'index.js'
through our 'Show React' tool.
*/