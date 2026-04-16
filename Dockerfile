FROM node:25-alpine
#Instalar NODE 


WORKDIR /app 
#Copiar proyecto al contenedor / imagen 
COPY package.json package-lock.json ./ 
#Instalar las dependencias 
RUN npm install 

COPY . . 
#Compilar el proyecto 
RUN npm run build 
EXPOSE 3000
#Elegir un comando de inicio 

CMD ["node","dist/main.js"]
