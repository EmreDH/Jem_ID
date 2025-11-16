![Logo van Jem_ID](https://westlandwerk.nl/resources/logo/jem-logo-def-zwart-witruimte.png)

De opdracht is om een gebruiksvriendelijke (mogelijk realtime) digitale veilingklok te maken voor de sierteeltsector in opdracht van Royal FloraHolland. Met Jem_ID kunnen producten digitaal geveild en verkocht worden aan meerdere kopers tegelijkertijd.

Het systeem is opgesplitst in twee project, namelijk:

- **Back end**: Verantwoordelijk voor
- **Front end**: Verantwoordelijk voor

## Systeemvereisten

- **Back end**

  - .NET SDK 9.X
    Te installeren via Microsoft's officiële .NET-pagina.
  - Entity Framework Core
    Nodig voor de database-togeang en migraties.

- **Database SQL Server**

  - Microsoft SQL Server

- **Front end**
  - Node.js (aanbevolen: actuele LTS-versie)
  - NPM als packagemanager

## Setup

Dit zijn de instructies om het project lokaal op te zetten. Volg deze stappen om de back end en de front end lokaal werkende te krijgen.

Het project maakt gebruik van een database. Voer de volgende acties uit om de database beschikbaar te stellen:

1. Voeg de `DefaultConnection` string toe in je project secrets. Dit kan je doen door met rechtermuisknop te klikken op `backendAPI.csproj` -> `Manage User Secrets` (in VScode met .NET extensies).

   ```
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=EMRE\\SQLEXPRESS;Database=JemID;Trusted_Connection=True;TrustServerCertificate=True;"
     }
   }
   ```

2. We maken gebruik van Entity Framework en de [CLI](https://learn.microsoft.com/en-us/ef/core/cli/dotnet) daarvan. Installeer de tools als volgt:

   ```
   dotnet tool install --global dotnet-ef
   ```

3. Nu dat de connection string is configureert en de [Entity Framework CLI](https://learn.microsoft.com/en-us/ef/core/cli/dotnet) is geïnstalleerd. Kunnen we de database migreren door de volgende commando uit te voeren:

   ```
   cd ./BackEnd
   dotnet ef database update
   ```

Om de back end op te starten voer de volgende commando's uit:

```
cd ./BackEnd
dotnet run
```

Nu dat de back end draait kunnen we de front end opstarten. Voor de volgende commando's uit om de front end op te starten:

```
cd ./FronEnd
npm install
npm start
```

## Referenties

- [Case digitale veilingklok 2025-2026](https://brightspace.hhs.nl/content/enforced/145034-H-ICT-SE3-25_2025_FALL_1/Case%20digitale%20veilingklok%202025-2026.pdf?ou=145034)
- [Extra systeemeisen](https://brightspace.hhs.nl/content/enforced/145034-H-ICT-SE3-25_2025_FALL_1/Extra%20systeemeisen.html?ou=145034&d2l_body_type=3)
