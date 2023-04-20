# Instalar projeto do aparti do docker
> Na pasta do projeto:
    * Possui na maquina o Docker instalado, Windows so o Docker Desktop, no linux e mac instalar o docker e o docker-compose
    * Possui na maquina o Python 3.10 superior.
Ai e so executar o arquivo composes_up.py para subir, e o composes_down.py para parar as maquinas, se optar pelo terminal executar os seguintes comandos:
* Subir os containers, esta na pasta do projeto;
```
    docker-compose -f docker-compose.yml build --no-cache
    docker-compose -f docker-compose.yml up db_postgres -d
    docker-compose -f docker-compose.yml up app_back -d
    docker-compose -f docker-compose.yml up app_front -d
```
Ápos subir os containers, entrar nos containers do back e front e executar os seguintes comandos lah, 
* Container back;
```
    npx prisma migrate dev && npx prisma generate
```
restarta o container.
* Container front
```
    npm i sass
```
restarta o container.
* para os containers;
```
    docker-compose down
```
Para fazer o backup, so seguir a orientação na propria pasta bd. O app mobile não roda em container, então rodar o projeto na maquina.
# Instalar projeto do Zero
## Pasta Back-End.
> Na pasta do projeto:
* Projeto do Zero
```
    npm init -y
```
* Projeto ja Criado
```
    npm install
```

> Adicionar parametros.
* packge.json
```
    "scripts": {
        "dev": "ts-node-dev src/server.ts",
        "start": "ts-node-dev --transpile-only src/server.ts",
    }
```
### RUN
* Executar o projeto via terminal.
```
    npm run dev
```
### Configurar o BD
```
    npx prisma init (Start o prima ápos instalar ele na dependencia do projeto)
```
Ápos start o prisma, uma pasta prisma é criado com as consfigurações para assossiar ha um BD.
Ai na variavel de ambiente `.env`, configurar assim - DATABASE_URL="postgresql://`nome do adm`:`senha configurada do bd`@localhost:5432/`nome da BD`?schema=public".

Depois criamos uma pasta prisma com um `index.ts` e configuramos assim.
```
    import { PrismaClient } from "@prisma/client";
    const prismaClient = new PrismaClient()
    export default prismaClient
```
### Dependencias Adicional.

* npm
```
    npm add typescript -D
    npm add express
    npm add @types/express -D
    tsc-init
    tsc --init
    npm add ts-node-dev -D
    npm add express-async-errors
    npm add cors
    npm add @types/cors -D
    npm install prisma --save-dev
    npm install @prisma/client
    npm add bcryptjs
    npm add @types/bcryptjs -D
    npm add jsonwebtoken
    npm add @types/jsonwebtoken -D
    npm add dotenv
    npm add multer
    npm add @types/multer -D
```

* software
    * PostgreSQL v11 [download](https://www.postgresql.org/download/)
    * postbird [download](https://github.com/Paxa/postbird)
    * prisma doc [link](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgres)


## Pasta Front-End.
> Na pasta do projeto:
* Projeto do Zero
```
    npx create-next-app@latest --typescript
```
* Projeto ja Criado
```
    npm install
```

> Adicionar parametros.
### RUN
* Executar o projeto via terminal.
```
    npm run dev
```
### Dependencias Adicional.

* npm
```
    npm add typescript @types/react @types/node -D
    npm add sass
    npm install react-icons --save
    npm add axios nookies jwt-decode
    npm install react-toastify
    npm install react-modal
    npm install @types/react-modal -D
```

## Pasta Mobile.
> Na pasta do projeto:
* Projeto do Zero
```
    expo init 'nome da pasta'
```
**Possui o expo-cli global na maquina para rodar o projeto!!**

* Projeto ja Criado
```
    npx expo install
```

> Adicionar parametros.
### RUN
* Executar o projeto via terminal.
```
    npx expo start
```
### Dependencias Adicional.

```
    npx expo install @react-navigation/native
    npx expo install react-native-screens react-native-safe-area-context
    npx expo install @react-navigation/native-stack
    npx expo install @react-native-async-storage/async-storage
    expo install axios
```

* software
    * Android Emulador [download](https://developer.android.com/studio?gclid=CjwKCAiAl9efBhAkEiwA4ToritpXAljnLH1-W1GZyt9DRfEqN510Wf1F5OALbr6kbx2DmeAnLjB9vBoCo_wQAvD_BwE&gclsrc=aw.ds)