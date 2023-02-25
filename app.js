//import the express library
const express = require('express');
const path = require('path');

//instantiate the app
const app = express();

//serve the static files located in the public folder
app.use(express.static(path.join(__dirname, 'public')));

//setting pug up as the view engine
app.set('view engine', 'pug');
app.set('views');

//accessing the JSON file.
const accessJsonFileData = require('./data.json');
const { projects } = accessJsonFileData;

//route handling for the about page
app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
  });

//route handling for the index page
app.get("/", (req, res) => {
  res.render("index", { projects });
});

//route handling for each project
app.get('/projects/:id', (req, res, next) => {
  
    const { id } = req.params;
    const indexId = parseInt(id) -1;

    //check if the id is a number and if it is within the range of the projects array - if not, throw error
    if (isNaN(indexId) || indexId < 0 || indexId >= projects.length) {
      const err = new Error(`Project '${id}' does not exist`);
      err.status = 404;
      //return statement required to stop the below code from running, if true
      return next(err);
    }

    // Store project array details in separate variables for easier access in pug template
    const project_name = projects[indexId].project_name;
    const description = projects[indexId].description;
    const technologies = projects[indexId].technologies;
    const github_link = projects[indexId].github_link;
    const image_urls = projects[indexId].image_urls;
    const live_link = projects[indexId].live_link;

    res.render("project", { indexId,project_name, description, technologies, github_link, image_urls,live_link, projects });
});

//Middleware 404 error handler
app.use((req,res,next) => {
  const err = new Error('The page you were looking for does not exist.');
  err.status = 404;
  next(err);
});

//Middleware global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(`<h1>Error ${err.status}</h1><p>` + err.message + '</p>');
  console.log(err.message);
});

//start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
