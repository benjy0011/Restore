# Restore (Full-Stack Learning Repo)
This repo is for self-learning full-stack development with C# (ASP.NET Core) and React (TypeScript). It is a full-stack e-commerce demo application with role-based access, image uploads, and Stripe-powered payments.


- #### [🔗Link](https://restore-benjy-d7fgfahtdpf4cuhv.southeastasia-01.azurewebsites.net/) (temporarily stopped due to budget constraint)

![restore-demo](https://github.com/user-attachments/assets/81b4b911-7e0b-4d26-9e7a-2d8b12a84077)


## Tech Stack
- **Frontend**: React (TypeScript), Redux, Material-UI  
- **Backend**: ASP.NET Core, Cloudinary, Stripe  
- **Database**: Microsoft SQL Server (Dockerized)


## Features
- 🔐 Role-based authentication & authorization (Admin / User)  
- 📷 Image uploading via Cloudinary  
- 💳 Stripe integration for secure payments  
- 📦 Product management (CRUD)  

## Prerequisites
- Node.js >= 18  
- .NET SDK >= 7.0  
- Docker Desktop (for MSSQL)  
- Stripe CLI (for webhook testing)  



## Run in local
API

```sh
cd ./API
dotnet watch
```

Client

```sh
cd ./client
npm run dev
```

Stripe Listener

```sh
stripe listen -f https://localhost:5001/api/payments/webhook -e payment_intent.succeeded,payment_intent.payment_failed
```

Database

```sh
docker compose up -d
```

## Deploy
Build Client

```sh
cd ./client
npm run build
```

Publish API

```sh
cd ./API
dotnet publish -c Release -o ./bin/Publish
```

👉 After publishing, deploy the contents of the `./API/bin/Publish` folder to your Azure App Service.
 (or right-click the Publish folder and select Deploy to Azure)
