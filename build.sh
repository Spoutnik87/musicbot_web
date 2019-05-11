#/bin/bash
# Récupére les informations du build à l'aide des variables d'environnements. (date et numéro)

cd src/assets

echo "{ \"build\": { \"date\": \"${BUILD_TIMESTAMP_DATE} à ${BUILD_TIMESTAMP_TIME}\", \"number\": ${BUILD_NUMBER} } }" > info.json