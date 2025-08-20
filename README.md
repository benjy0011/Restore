Full-Stack Learning Repo

This repo is for self-learning full-stack development with C# (ASP.NET Core) and React (TypeScript).

API

cd ./API
dotnet watch
Client

cd ./client
npm run dev
Stripe Listener

stripe listen -f https://localhost:5001/api/payments/webhook
 \
-e payment_intent.succeeded,payment_intent.payment_failed
Database

docker compose up -d
dotnet ef migrations add SqlServerInitial -o Data/Migrations
Build Client

cd ./client
npm run build
Publish API

cd ./API
dotnet publish -c Release -o ./bin/Publish
👉 Then, right-click the Publish folder and select Deploy to Azure.
