# Microservices Project

Aplicação consiste em um sistema de microsserviço simples composto por 1 interface e 2 Apis, além de um sistema de mensageria em kafka para geração de logs

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