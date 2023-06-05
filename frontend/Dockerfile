# Estágio de compilação
FROM node:14 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --configuration=production --output-path=dist/poseidon-ng

# Estágio de produção
FROM nginx:latest

# Remove a configuração padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos de build para o Nginx
COPY --from=build /app/dist/poseidon-ng /usr/share/nginx/html

# Copia o arquivo nginx.conf para dentro do contêiner
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80 do contêiner
EXPOSE 80

# Comando para iniciar o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
