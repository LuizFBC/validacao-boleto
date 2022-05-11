const CriarBoletoService = require("../src/services/LerBoletoService");

const response = require('express/lib/response');

describe('Leitura de boleto', () => {

  let criarBoletoService = new CriarBoletoService();

  it('Não deve poder ler se o código tiver letras', () => {
    let resposta = criarBoletoService.executar('az812371238126387126381263', response);

    expect(resposta).toHaveProperty('message').toBe('O codigo deve conter somente numero');
    expect(resposta).toHaveProperty('statusCode').toBe(400);
  });

  it('Não deve poder ter quantidade de digitos inferior a padrão', () => {
    let resposta = criarBoletoService.executar('az812371238126387126381263', response);

    expect(resposta).toHaveProperty('message').toBe('Quantidade de digitos inferior a padrão');
    expect(resposta).toHaveProperty('statusCode').toBe(400);
  });

  it('Deve poder ler o código e retornar os dados na resposta', () => {
    let resposta = criarBoletoService.executar('231231232198371289371289371982198237928712371238126387126381263', response);

    expect(resposta).toHaveProperty('barCode').toBe('231231232198371289371289371982198237928712371238126387126381263');
    expect(resposta).toHaveProperty('statusCode').toBe(200);
  });
});