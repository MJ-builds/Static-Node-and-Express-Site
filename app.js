//not sure if this goes here but going with it for now.
//all of the below is my code:


//import the express library
const express = require('express');
const path = require('path');
//instantiate the app
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

//setting pug up as the view engine
app.set('view engine', 'pug');
app.set('views');

//accessing the JSON file.
const accessJsonFileData = require('./data.json');
const { projects } = accessJsonFileData;

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
  });

// app.get('/projects', (req, res) => {
//     res.render('project', {title: 'Projects'});
// });


// projects.forEach(project => {
//     app.get(`/${project.id}`, (req, res) => {
//         res.render('project', {project});
//     });
// });

app.get("/", (req, res) => {
  res.render("index", { projects });
});

app.get('/projects/:id', (req, res) => {
    const { id } = req.params;
    const indexId = parseInt(id) -1;
    const project_name = projects[indexId].project_name;
    const description = projects[indexId].description;
    const technologies = projects[indexId].technologies;
    const github_link = projects[indexId].github_link;
    const image_urls = projects[indexId].image_urls;
    const live_link = projects[indexId].live_link;
  res.render("project", { indexId,project_name, description, technologies, github_link, image_urls,live_link, projects });
});