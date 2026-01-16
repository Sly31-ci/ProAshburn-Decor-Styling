#!/bin/bash

# Script de démarrage rapide pour Pro Ashburn Décor & Styling
# Ce script lance un serveur web local pour tester le site

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                                                              ║"
echo "║        🎨 Pro Ashburn Décor & Styling 🎨                     ║"
echo "║                                                              ║"
echo "║              Démarrage du serveur local...                   ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Vérifier si Python est installé
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 détecté"
    echo "🚀 Démarrage du serveur sur http://localhost:8000"
    echo ""
    echo "📝 Pour arrêter le serveur, appuyez sur Ctrl+C"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "✅ Python détecté"
    echo "🚀 Démarrage du serveur sur http://localhost:8000"
    echo ""
    echo "📝 Pour arrêter le serveur, appuyez sur Ctrl+C"
    echo ""
    python -m http.server 8000
else
    echo "❌ Python n'est pas installé"
    echo ""
    echo "Options alternatives :"
    echo "1. Installer Python : https://www.python.org/downloads/"
    echo "2. Utiliser npx : npx http-server -p 8000"
    echo "3. Utiliser VS Code Live Server"
    echo ""
fi
