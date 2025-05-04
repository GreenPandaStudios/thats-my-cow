FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Install Node.js for client build
RUN apt-get update && \
    apt-get install -y nodejs npm && \
    npm install -g n && \
    n stable

# Copy csproj and restore dependencies
COPY ["server/ThatsMyCowAPI/ThatsMyCowAPI.csproj", "server/ThatsMyCowAPI/"]
WORKDIR /app/server/ThatsMyCowAPI
RUN dotnet restore

# Copy everything else
WORKDIR /app
COPY . .

# Build client app
WORKDIR /app/client
RUN npm install
RUN npm run build

# Build .NET app
WORKDIR /app/server/ThatsMyCowAPI
RUN dotnet publish -c Release -o /app/publish

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 80
EXPOSE 443
ENTRYPOINT ["dotnet", "ThatsMyCowAPI.dll"]