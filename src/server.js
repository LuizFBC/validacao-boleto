const express = require('express');

const app = express();

app.use(express.json());

app.get('/api/teste/:barCode', (request, response) => {

	const barCode = request.params.barCode;
	intCode = parseInt(barCode);
	
	if(isNaN(intCode)) {
		return response
			.status(400)
			.json({ statusCode: 400, message: 'O codigo deve conter somente numero' });
	}

	if(barCode.length < 44) {
		return response
			.status(400)
			.json({ statusCode: 400, message: 'Quantidade de digitos inferior a padrão' });
	}
	
	if(barCode.length > 44) {
		return response
			.status(400)
			.json({ statusCode: 400, message: 'Quantidade de digitos superior a padrão' });
	}

});

app.listen(1234, () => console.log('Listening on 1234'));
