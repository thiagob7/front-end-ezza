#!/usr/bin/env bash
set -euo pipefail

echo "🔄 Atualizando lista de pacotes..."
sudo apt-get update

echo "🔧 Instalando dependências básicas (build-essential, curl, python3)..."
sudo apt-get install -y build-essential curl python3

echo "📽 Instalando ffmpeg..."
sudo apt-get install -y ffmpeg

echo "🔧 Instalando Node.js v18 LTS (ARM)..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "🚀 Instalando PM2 globalmente..."
sudo npm install -g pm2

echo "📦 Instalando Yarn globalmente (via npm para compatibilidade ARM)..."
sudo npm install -g yarn

# Vai para a raiz do projeto (assume que o script está na raiz)
SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR"

echo "📥 Instalando dependências do projeto..."
yarn install --frozen-lockfile

echo "🏗 Fazendo build do projeto..."
yarn build

echo "💾 Executando migrations do Prisma..."
yarn prisma migrate deploy

echo "📈 Iniciando processos no PM2..."
pm2 start yarn --name "app-start" -- start
pm2 start yarn --name "app-monitor" -- monitor

echo "💾 Salvando configuração do PM2 para inicialização automática..."
pm2 save
pm2 startup systemd -u $(whoami) --hp $HOME

echo "✅ Setup concluído! Use 'pm2 ls' para verificar os processos."
