@echo off
setlocal

rem Chemin vers Prettier (Assurez-vous que Prettier est installé localement ou globalement)
set PRETTIER_PATH="./node_modules/.bin/prettier"

rem Dossiers à formater (séparés par un espace)
set FOLDERS_TO_FORMAT="./frontend"

rem Exécutez Prettier sur tous les dossiers spécifiés
%PRETTIER_PATH% --write %FOLDERS_TO_FORMAT%

echo "Formatage terminé."
pause
