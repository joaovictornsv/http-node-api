<div align="center">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" width=100>
    <h1>
        API 100% NodeJS
    </h1>
    <h4>
        Uma api sem dependências!
    </h4>    
    <img  alt="Dependencies"  src=https://img.shields.io/badge/dependecies-0-brightgreen.svg?style=flat-square">
    <img  alt="Language Top"  src="https://img.shields.io/github/languages/top/joaovictornsv/http-node-api">
     <a  href="https://github.com/joaovictornsv/climate-app/blob/master/LICENSE">
        <img  alt="License"  src="https://img.shields.io/github/license/joaovictornsv/climate-app.svg">
    </a>
</div>

---

<h2 id="conteudos">Conteúdos</h2>

[➜ Sobre o projeto](#mag_right-sobre-o-projeto)<br>
[➜ O que aprendi](#book-o-que-aprendi)<br>
[➜ Como usar](#information_source-como-usar)<br>
[➜ Rotas](#arrow_right_hook-rotas)<br>

---

## :mag_right: Sobre o projeto

<sup>[Voltar ao topo](#conteudos)</sup><br>

O objetivo dessa aplicação era criar uma API sem nenhuma dependência externa, apenas utilizando as bibliotecas nativas do NodeJS. Tudo foi feito utilizando 100% Javascript.

---

### ➜ Banco de Dados
Não foi utilizado nenhum banco de dados, os registros são armazenados em um arquivo `users.txt`. Escolhi trabalhar com txt ao invés de JSON para ter o desafio de ler arquivos usando o Node.

---

### ➜ Arquitetura
Tentei utilizar, na medida do possível, o conceito da Clean Architecture, separando os arquivos em Controllers, Services e Repository.

---

### ➜ Tratamento de erros
Como o módulo `http` nativo do Node não nos permite usar o `request.body`, tive que adaptar minhas rotas e validar os dados passados por elas.
Além disso, a estrutura da rota também foi validada, pois diferente de bibliotecas como o ExpressJS, onde passar a string `/users/:id` em uma função de request já nos permite acessar o parâmetro com facilidade, no Node esse acesso não é permitido. Para isso tive que criar modos de obtê-los.

Para os tratamentos e validações utilizei as famosas RegEx's, as quais aprendi bastante sobre como atuam durante o desenvolvimento desse projeto.

---

### ➜ Funcionalidades
A API possui um sistema de CRUD completo (Create, Read, Update and Delete) e possui as seguintes funcionalidades:

#### Funções principais:
- Listagem de usuários ou usuário único
- Criação de novo usuário
- Alteração de dados de um usuário
- Remoção de um usuário

#### Outras funcionalidades:
- Validação de dados
- Validação de rotas
- Tratamento de erros usando Middlewares
- Gerador de IDs únicos
- Uso de Controller, Repository e Services

---

## 📚 O que aprendi

Ter que implementar cada etapa da api, desde o tratamento dos dados até o retorno da resposta para o cliente contribuiu bastante para treinar minha lógica de programação, a eficiência em resolver problemas pequenos e também a criar códigos mais legíveis e limpos.
Além disso, aprendi a utilizar RegEx's para realizar várias validações no projeto. Por fim, acredito que criar essa API "pura" me fez evoluir mais um degrau nessa jornada de back-end.

---

## :information_source: Como usar

<sup>[Voltar ao topo](#conteudos)</sup><br>

```bash
# Clone this repository
$ git clone https://github.com/joaovictornsv/http-node-api

# Go into the repository
$ cd http-node-api

# Run the server
$ yarn start
```

---

## :arrow_right_hook: Rotas

<sup>[Voltar ao topo](#conteudos)</sup><br>

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=http-node-api&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fjoaovictornsv%2Fhttp-node-api%2Fmaster%2FInsomnia.json)


![](https://img.shields.io/badge/get-BD93F9.svg?&style=for-the-badge&logoColor=white)

- Home page

```
/
```

- Get all users

```
/users
```

- Get a specific user
```
/users/:id
```

---

![](https://img.shields.io/badge/post-49F37B.svg?&style=for-the-badge&logoColor=white)
- Create a user

```
users/data?...

Search params:
- name
- email
- age
- city
```

---

![](https://img.shields.io/badge/put-FFB86C.svg?&style=for-the-badge&logoColor=white)
- Update a user

```
users/:id/data?...

Search params:
- name
- email
- age
- city
```

---

![](https://img.shields.io/badge/delete-FF4D4B.svg?&style=for-the-badge&logoColor=white)

- Delete a user

```
/users/:id
```

---

### :pencil2: Author 

<table>
  <tr>
    <td align="center"><a href="https://github.com/joaovictornsv"><img src="https://github.com/joaovictornsv.png" width="100px;" alt="Profile"/><br /><sub><b>João Victor</b></sub></a><br /><a href="https://github.com/joaovictornsv" title="Code">💻</a></td>
  <tr>
</table>
