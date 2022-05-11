## API
Finalidade de receber um código de barra de boleto bancario/concessionária e fazer validações do código de barra e extrair dados do código de acordo com especificações de cada instituição bancária. 

## Clonar projeto
1- Abra o Git Bash. 

2- Selecione o diretório para instalar.

3- Use git clone e cole a URL do projeto. Ex: `https://github.com/grexd/validacao-boleto.git`
## Execução

Escolher o editor de código-fonte de sua preferencia, abrir no terminal o caminho especificado do projeto. Ex: "C:\Users\SeuUsuario\Desktop\Projeto>" 
Após entrar no diretorio via comando, executar o comando `npm` para instalação das dependencias contidas no `package.json` e finalizando, rodar "node src/server.js" para iniciar o projeto e rodar a API na porta especificada.

Link para teste : `http://localhost:8000/boleto/82210000215048200974202205114098290108605940`

## Realizar Teste
Dentro do editor de código-fonte, acessar o terminal no caminho do projeto e rodar o comando `npm test`