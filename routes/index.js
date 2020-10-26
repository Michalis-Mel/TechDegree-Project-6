//Require express framework
const express = require('express');
//Set up router
const router = express.Router();
//Require the data from the data.json file
const data = require('../data.json');

//get the homepage and render the index template  from the views file

router.get('/',( req , res ) =>{
    res.render('index', {data});
});

//get the about page and render the about template  from the views file

router.get("/about", ( req , res ) =>{
    res.render("about");
});

//Get dynamic the project routes based on the project's id that is rendered

router.get("/project/:id" , ( req , res , next ) => {

    //If the requested id exists the specified project is rendered from the project file in view folde
    //Else a new 404 error is forwarded to the global error handler
    if (data.projects[req.params.id]){
        res.render("project", {
        project: data.projects[req.params.id]
        });
    }else{
        const err = new Error();
        err.status = 404;
        err.message = `The project that you requested doesn't exist!`
        // Looks for the next middleware function with the 'err' parameter
        next(err);
    }
    })

module.exports = router;