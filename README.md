This is a repo for self-learning purpose. I am learning full-stack development with C# and ReactTS.


API
~ cd .\API\
~ dotnet watch

Client
~ cd .\client\
~ npm run dev

Stripe listener
~ stripe listen -f https://localhost:5001/api/payments/webhook -e payment_intent.succeeded,payment_intent.payment_failed

Db
~ docker compose up -d  
~ dotnet ef migrations add SqlServerInitial -o Data/Migrations

Build client
~ cd .\client\
~ npm run build

Publish
~ cd .\API\
~ dotnet publish -c Release -o ./bin/Publish
~ (left click 'Publish' folder and click deploy to azure)