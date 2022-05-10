const express = require('express');

const app = express();

app.use(express.json());

app.get('/api/teste/:barCode', (request, response) => {
	
});

app.listen(1234, () => console.log('Listening on 1234'));
