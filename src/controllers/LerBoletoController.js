let LerBoletoService = require("../services/LerBoletoService");

let lerBoletoService = new LerBoletoService();

class LerBoletoController {
  lerBoleto(request, response) {
    const codBarra = request.params.codBarra;

    let dadosBoleto = lerBoletoService.executar(codBarra, response);
    console.log(dadosBoleto);
    return response.status(200).json(dadosBoleto);
  }
}

module.exports = LerBoletoController;