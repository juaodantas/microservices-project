
# Microservices Project

  

Aplicação consiste em um sistema de microsserviço simples composto por 1 interface e 2 Apis, além de um sistema de mensageria em kafka para geração de logs

  ![Aplicação funcinando](https://raw.githubusercontent.com/juaodantas/microservices-project/master/images/1.png?token=GHSAT0AAAAAACDPYXY4BJ322XP64AFMDTV6ZD5LXAQ)

# ⏳ Para rodar a aplicação

  

Rodar no cmd os comandos:

```

docker-compose up -d --build

```

  

# 🛠️ Desenvolvido com:

  

* Angular - Interface Web
* Node JS - microservico-1: Usado para realizar o CRUD de usuários
* Node JS - microservico-2: Responsável pelos logs da aplicação
* Kafka - Sistema de mensageria para comunicação entre as duas APIs
* Postgresql - db1: Banco de dados dos Usuarios
* Postgresql - db2: Banco de dados dos Logs
* Docker - Virtualização


# :clipboard: Detalhes da aplicação:

**MICROSERVIÇO I** - Desenvolva uma API que deve conter as seguintes rotas:

-   /login - [POST] - realiza a autenticação do usuario na aplicação

-   /user - [POST] - cadastra um usuário, ao enviar os dados: nome, senha, email e cargo;
    
-   /user/{id} - [PUT] - esta rota edita o usuário do ID especificado.;
    
-   /user - [GET] - esta rota deve retornar a lista de todos os usuários
    
-   /user/{id} - [GET] - esta rota retorna o usuário do ID especificado com todos os seus dados;
    
-   /user/{id} - [DELETE] - esta rota deleta o usuário do ID especificado.

**MICROSERVIÇO II** -API que receber mensagens via Kafka e armazena  _logs_ dos eventos ocorridos na api principal da solução (microserviço I).

Cada log é composto por 
-   A ação que ocorreu na api    
-  Data e Hora que ocorreu
-  Payload da requisição

Além disso, ainda apresenta os _endpoints_:

-   /logs - [GET] - esta rota retorna a lista de todos os logs 
-   /logs - [POST] - esta rota cadastra um log;
-   /logs/{id} - [GET] - esta rota retorna os dados de um log pelo Id
