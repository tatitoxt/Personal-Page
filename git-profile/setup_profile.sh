#!/usr/bin/env bash

echo "======================================================"
echo "🚀 Configuración del Perfil de GitHub para @tatitoxt"
echo "======================================================"

# Verificar email de git
CURRENT_EMAIL=$(git config --global user.email)
echo "🔍 Email global de Git actual: $CURRENT_EMAIL"

if [ -z "$CURRENT_EMAIL" ]; then
    echo "⚠️  Atención: No tienes un email global configurado en Git."
    echo "Ejecuta: git config --global user.email 'tu_email_de_github@ejemplo.com'"
fi

echo ""
echo "1️⃣  Instrucciones para publicar tu Profile README:"
echo "------------------------------------------------------"
echo "1. Ve a GitHub y crea un repositorio público llamado: tatitoxt"
echo "   (URL: https://github.com/new)"
echo "2. En tu terminal, ejecuta los siguientes comandos:"
echo ""
echo "   cd /Users/fausto/.gemini/antigravity/scratch/tatitoxt-github-profile"
echo "   git init"
echo "   git branch -M main"
echo "   git add README.md"
echo "   git commit -m 'feat: initial aesthetic profile readme'"
echo "   git remote add origin https://github.com/tatitoxt/tatitoxt.git"
echo "   git push -u origin main"
echo ""
echo "======================================================"
