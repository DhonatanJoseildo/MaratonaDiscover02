// acessando bibilioteca javascript express
const express = require("express");
//acessando propridade do express (Router == rota/caminho)
const routes = express.Router();
// importando controllers da pasta controller
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController');
const DashboardController = require("./controllers/DashboardController");

//res == response  && // req == request
//req (requirimento )/ res(resposta do servidor)
routes.get('/', DashboardController.index);
routes.get('/job', JobController.create);
routes.post('/job', JobController.save);
routes.get('/job/:id', JobController.show);
routes.post('/job/:id', JobController.update);
routes.post('/job/delete/:id', JobController.delete);
routes.get('/profile', ProfileController.index);
routes.post('/profile', ProfileController.update);

// exportando routes do server
module.exports = routes;