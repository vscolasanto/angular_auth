# Angular Auth

Repositório para estudo de autenticação com angular.

## Backend
O backend foi feito em nodejs para simulação de duas rotas autenticadas.

**Tecnologias utilizadas:**
- [x] NodeJS
- [x] Express
- [x] MongoDB 
- [x] BcryptJS
- [x] Jsonwebtoken

**Como rodar**\
*Necessário ter o mongodb instalado e rodando.*

Entrar na pasta server e rodar `npm install`, em seguida rodar os dois comandos abaixo:

```shell
node src/utils/gen_people.js && node src/utils/gen_products.js
```

Rodar o comando `npm run dev` para subir o backend na porta 3333.
* * *

## Frontend
O frontend possui o básico para simular uma autenticação: Tela de cadastro, tela de login e duas rotas que estão guardadas e são exibidas apenas para usuários autenticados.

**Tecnologias utilizadas**
- [x] Angular
- [x] Typescript
- [x] Angular Material
- [x] Angular Flex Layout

**Como rodar**\
Entrar na pasta client e rodar `npm install`.\
Em seguida rodar `ng s` para subir o frontend na porta 4200.
* * *
OBS: Backend e frontend precisam estar rodando em paralelo.
