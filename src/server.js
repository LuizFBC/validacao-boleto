const express = require('express');

const app = express();

app.use(express.json());

let LerBoletoController = require('./controllers/LerBoletoController');

let lerBoletoController = new LerBoletoController();

app.get('/api/teste/:codBarra', lerBoletoController.lerBoleto);

app.listen(1234, () => console.log('Listening on 1234'));