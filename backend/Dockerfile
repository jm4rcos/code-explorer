# Fase de build
FROM node:20-alpine AS builder

# Defina o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Instale dependências de compilação
RUN apk add --no-cache openssl python3 make g++

# Copie os arquivos necessários
COPY package*.json ./
COPY prisma ./prisma/

# Instale as dependências do projeto
RUN npm ci --quiet --no-optional --no-fund --loglevel=error

# Gere os arquivos do Prisma
RUN npx prisma generate

# Copie o resto dos arquivos do backend
COPY . .

# Realiza o build da aplicação
RUN npm run build

# Etapa de debug: Liste o conteúdo da pasta dist
RUN ls -la dist

# Fase de produção
FROM node:20-alpine AS production

# Defina o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie os arquivos do builder
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

# Instale as dependências apenas de produção
RUN npm ci --quiet --no-optional --no-fund --loglevel=error --only=production

# Expõe a porta da aplicação
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["node", "dist/main.js"]
