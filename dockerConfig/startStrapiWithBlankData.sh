#! /bin/bash
#   File: startStrapiWithBlankData.sh
#   Author: Ben Pennington
#   Description: This script is for populating the mongo docker 
#   container with blank data

docker exec -it dockerconfig_mongo-db_1 mongorestore --db serverTest ./blankInstall/serverTest --drop 
docker exec -it dockerconfig_strapi-frontend_1 bash -c "cd /section01-group02/strapi/ && npm install --unsafe-perm && strapi start"
