//require the express framework
const express = require('express');
const app = express();

//require the path module
const path= require('path');

// Set up static server middleware. Refer to public folder as "static"
app.use("/static", express.static("public"));
// Set up to use pug templates
app.set("view engine", "pug");

//Connecting to the routes folder
const mainRoutes = require('./routes');
app.use(mainRoutes);

//Error handler for non existed routes (404 not found)
app.use((req , res , next) =>{
    res.status(404).render('not-found');
});

//GLOBAL ERROR HANDLER
app.use(( err , req , res , next) =>{

    if (err){
        console.log('Global error handler called', err);
    }

    if (err.status === 404){
        // Render 'not-found' view and pass error object to view
        res.status(404).render('not-found', {err})
    }else{
        // Set error message to given message or specify general message
        err.message = err.message || `Ooooops! Something bad has happened to the server!`;

        //Set the response status to the given error status or if it doesn't exist
        //give it the 500 error status. Then render the error view and pass it the error object

        res.status(err.status || 500).render('error' , {err});
    }
})




// Set up local server to listen on port 3000 and log a message to the console
app.listen(3000, () => {
    console.log("The application is running on localhost:3000")
});