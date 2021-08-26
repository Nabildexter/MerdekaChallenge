//Save and Run Expredd
const express = require("express");
const app = express();

//require fetch
const fetch = require('node-fetch');


//Require data
var blogPagesDat = [];

//Save path, cwd. 
//look for views extension folder in path
const path = require('path');
const { default: axios } = require("axios");
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, '/views'));


//Look for css and bootstrap
// app.use (express.static(path.join(__dirname, '/public')));



//Root/Home Directory Request
app.get("/", (req, res)=> {
    res.render('home.ejs');
});




//All/Blogs Directory Request
app.get("/Allblogs", async (req, res) => {

    console.log("On All Blogs Page");

    //API URL
    const APIurl = "https://softwareq-merdeka-api.azure-api.net/blog/v1/Listall?&softwareq-apim-subscription-key=63bffa25581648ec934d269f01be3780";
    
    //Testing
    console.log("-----------Getting data from: " + APIurl);
    console.log("-----------------------------------------");
    const JSONDATA = await axios.get(APIurl);
    console.log("---------- Data ----------");
    console.log(JSONDATA);
    const amount =  Object.keys(JSONDATA.data).length;
    console.log("Amount of Blogs: " + amount);

    //Save List of DataArray
    const allBlogs = JSONDATA.data;
    console.log(allBlogs);

    blogPagesData = allBlogs;

    res.render("allBlogs.ejs", {allBlogs});
});


//Get Specific Blog Page and Details
app.get("/rBlog/:rBlogID", async (req, res) => {

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    const {rBlogID} = req.params;


    //API URL
    const APIurl = `https://softwareq-merdeka-api.azure-api.net/blog/v1/ById?id=${rBlogID}&softwareq-apim-subscription-key=63bffa25581648ec934d269f01be3780`;

    //Testing
    console.log("-----------Getting Specific Blog data from: " + APIurl);
    console.log("-----------------------------------------");
    const JSONDATA = await axios.get(APIurl);
    console.log("---------- Data ----------");
    console.log(JSONDATA);
     
    const specificBlog = JSONDATA.data;
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n" + specificBlog);

    console.log("Reddit Blog Page Searching...");
    if(specificBlog){
        res.render('blog.ejs', {specificBlog});       
    } else {
        res.render('notfound.ejs', {rBlogID});              
    }

})


//Listening for client
app.listen(3000, () => {
    console.log("Listening on Port: 3000");
}); 
