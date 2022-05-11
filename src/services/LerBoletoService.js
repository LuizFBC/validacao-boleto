class LerBoletoService {
  executar(codBarra, response) {

    let calculoDataVencimento;
    let tipoBoleto = codBarra.substring(0,1);
    let intCode = parseInt(codBarra);
    const dadosBoleto = verificaTipoBoleto(codBarra, tipoBoleto);
    
    if(isNaN(intCode)) {
      return response
        .status(400)
        .json({ statusCode: 400, message: 'O codigo deve conter somente numero' });
    }
      
    if(codBarra.length < 44) {
      return response
        .status(400)
        .json({ statusCode: 400, message: 'Quantidade de digitos inferior a padrão' });
    }
    
    if(codBarra.length > 44) {
      return response
        .status(400)
        .json({ statusCode: 400, message: 'Quantidade de digitos superior a padrão' });
    }

    if (tipoBoleto == "8"){
      calculoDataVencimento = calculaDataVencimento(null ,dadosBoleto.campoLivre.substring(0,8),tipoBoleto);
    } else {
      calculoDataVencimento = calculaDataVencimento(dadosBoleto.fatorVencimento, tipoBoleto)
    }

    return {
      digitoVerificador: calculaDigitoVerificador(codBarra, tipoBoleto), // finalizado
      barCode : codBarra, //finalizado
      amount: calculaValor(dadosBoleto.valor, tipoBoleto), // finalizado
      expirationDate: calculoDataVencimento // finalizado
    }
  }
}

function verificaTipoBoleto (codBarra, tipoBoleto){
	if (tipoBoleto == "8"){
		return { 
			idProduto: codBarra.substring(0 ,1),
			idSegmento: codBarra.substring(2 ,3),
			idValor: codBarra.substring(3 ,4),
			digitoVerificador: codBarra.substring(4, 5),
			valor: codBarra.substring(5, 15),
			idEmpresa: codBarra.substring(16, 19),
			campoLivre: codBarra.substring(20, 44)
		}
	} else {
		return{
			codBanco: codBarra.substring(0 ,3),
			codMoeda: codBarra.substring(3 ,4),
			digitoVerificado: codBarra.substring(4 ,5),
			fatorVencimento: codBarra.substring(5, 9),
			valor: codBarra.substring(9, 19),
			campoLivre: codBarra.substring(19, 44),
		}
	}
}

function calculaDataVencimento (fatorVencimento, dataDeVencimento , tipoBoleto) { // fazer validação da virada de 9999 do fator
	if (tipoBoleto == "8"){
		let dia = dataDeVencimento.substring(6, 8);
		let mes = dataDeVencimento.substring(4, 6);
		let ano = dataDeVencimento.substring(0, 4);
		let dataVencimento = new Date(`${ano}/${mes}/${dia}`);
		
		if(dataVencimento >= new Date()){
			return dataVencimento.toLocaleDateString('pt-BR').replace(/[/]/g, "-");
		} else {
			return ""
		}
	} else {
		const dataBase = new Date("1997/10/07");
		let dataVencimento = dataBase.setDate(dataBase.getDate() + parseInt(fatorVencimento));
		let ano = new Date(dataVencimento);

		if (ano < new Date()){
			let teste = 9999 + parseInt(fatorVencimento);
			dataVencimento = dataBase.setDate(dataBase.getDate() + teste);
			dataVencimento = new Date(dataVencimento).toLocaleDateString('pt-BR');
		} else {
			dataVencimento = new Date(dataVencimento).toLocaleDateString('pt-BR');
		}
		return dataVencimento.replace(/[/]/g, "-");
	}
}

function calculaValor (valor, tipoBoleto){
	let valorBoleto = valor.replace(/^0+/, '');
	valorBoleto = parseFloat(valorBoleto /100).toFixed(2);

	return valorBoleto;
}

function calculaDigitoVerificador (codBarra, tipoBoleto) {
	if(tipoBoleto == "8"){
		let code = codBarra.substring(0, 3) + codBarra.substring(4, 44);
		let multiplicador = 2;
		let somaTotal = 0;
		
		for (let i = code.length - 1; i >= 0; i--){
			if(multiplicador == 0) multiplicador = 2; 
			if((parseInt(code[i]) * multiplicador) > 9) {
				let stringNumber = ""+parseInt(code[i]) * multiplicador;
				let arrayNumber = stringNumber.split("");
				let primeiroNumero = parseInt(arrayNumber[0]);
				let segundoNumero = parseInt(arrayNumber[1]);
				somaTotal += primeiroNumero + segundoNumero;
			} else {
				somaTotal += parseInt(code[i]) * multiplicador
			}
			multiplicador--;
		}

		let restoSomaTotal = somaTotal % 10;
		let digitoVerificador = 10 - restoSomaTotal;

		return digitoVerificador;
	} else {
		let code = codBarra.substring(0, 4) + codBarra.substring(5, 44);
		let multiplicador = 2;
		let somaTotal = 0;

		for (let i = code.length - 1; i >= 0; i--){
			if(multiplicador > 9) multiplicador = 2; 
			
			somaTotal += parseInt(code[i]) * multiplicador;
			multiplicador++;
		}

		let restoSomaTotal = somaTotal % 11;
		let digitoVerificador = 11 - restoSomaTotal;
		
		if (digitoVerificador == 0 || digitoVerificador == 10 || digitoVerificador == 11){
		digitoVerificador = 1;
		}

		return digitoVerificador;
	}
}

module.exports = LerBoletoService;
