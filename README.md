<p align="center">
  

</p>

<h1 align="center"  font-size="1202px"">Api Olx Project</h1>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<h3 align="center"> Projeto criado para fins de estudo e pratica de backend e interação com banco de dados, e construção de api rest.
    <br> 
</h3>



## 🧐 Sobre <a name = "about"></a>

O Projeto foi criado dentro do curso b7web com intuido de estudo de constução de api rest em nodejs com express. No ententanto algumas funcionalidades foram mudadas por mim,<br/> vizando atualizar o projeto para atualizadade com tecnologias mais atualizas, e vizando criar tipagem do projeto com typescript. 
<br/>
<br/>
## O projeto tem as seguintes caracteristicas
### Construção:
- Construção em Typescript;
- Autenticação das rotas privadas com JWT, utilizando passport;
- Upload de arquivos de imagems, utilizando multer;
- Interação com banco de dados NoSQL, utilizando Mongodb;
- Validação de dados, utilizando express-validator;
- Dados sensíveis protegidos com bcryp e criptografia aes;

### Funções :
- Cadastro de usuarios;
- Listagem de informação do usuario;
- Edição de dados de usuario
- Cadastro de produtos;
- Listagem de produtos;
- Edição de produtos
- Autenticação de rotas privadas;


## 🏁 Rodando projeto voce mesmo <a name = "getting_started"></a>

Aqui algumas instrução para executar o projeto em sua maquina ou servidor


### Prerequisitos

Aqui é oque voce ira precisar para rodar o projeto em seu local de desenvolvimento:

- Voce precisara ter instalado em sua maquina o [NodeJs](https://nodejs.org/pt-br/download) para execução desse projeto.
- É necessario a utilização do mongoDb para esse projeto, a duas alternativas utilizar o [MongoDB_Community_Server](https://www.mongodb.com/try/download/community) e rodar o mongoDb localmente em sua maquina,<br/> ou utilização do [MongoDB_Atlas](https://account.mongodb.com/account/login) e rodar um cluster gratuito no MongoDb Atlas.




Apos instalação do nodeJs e Mongo db é necessario relizar as seguintes instalaçõs para evitar possiveis erros dependendo do modo de execução do projeto.

```
npm install -g typescript
npm install -g ts-node
npm install -g nodemon
```



### Installing

Apos instalção das dependencias, estando dentro da pasta do projeto é necessario criar um arquivo preencher o arquivo .env que estára vazio com seguites dados:
- PORT=5000
- BASE=http://localhost:5000
- MONGO_URL= url para coneção do seu banco de dados MongoDb
- CRYPTO_SECRET= sequencial usado para cripgrafar os dados da escolha do usuario
- JWT_SECRET= sequencial usado para validação do jwt 

Apos configurtação do .env podemos rodad seguinte comando. 
```
npm install 
```
Para nodejs ler todas dependencias que precisa e realizar o download

Apos instalação das repencias

```
npm build
npm run start
```
para dar build no projeto e transformar o ts em js e executar o servidor,
 ou se quiser rodar projeto em modo desenvolvimento execute.

```
npm run start-dev
```
Assim projeto ira rodar em modo desenolvimento e qualquer alteração feita nos arquivos terá mudança imedianta no servidor.




## 🎈 Usando Projeto <a name="usage"></a>

Para as rotas é uso estou disponibilanzdo o arquivo Postman, nele estara todas rotas e os dados que podem ser enviados, as rotas privadas é necessario envio do JWT porem apos realizar cadastro e loguin do usuario ja sera gerado um token para ele é possivel preencher nas variaveis predefinidas no Postman.
https://api.postman.com/collections/29516202-a5cd6f45-fede-461b-aa64-90e851d232e2?access_key=PMAT-01HBP81A104RHPQEBX4D7H6M32
com este link é possivel voce importar os dados no seu postman assim possibilitando utilizar o projeto com mais eficiencia


## ⛏️ Contrução usando <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment





## 🎉 Agradecimentos <a name = "acknowledgement"></a>

- Agradeço imensamente a B7Web pelos conhecimentos passados e pela ideia do projeto, espero dentro de alguns dias estar postando projeto que esta em desenvolvimento de minha autoria.
Nada seria possivel sem grandes horas de estudos e e pelos conhecimentos obtidos no curso, obrigado por tudo e nos vemos em breve.

Qualquer duvida ou para contato pode falar comigo pelo email: brunosampayo1040@gmail.com <br/>

