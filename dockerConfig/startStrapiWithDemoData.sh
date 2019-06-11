#! /bin/bash
#   File: startStrapiWithDemoData.sh
#   Author: Ben Pennington
#   Description: This script is for  populating the mongo docker 
#   container with demo data

docker exec -it dockerconfig_mongo-db_1 mongorestore --db serverTest ./demoData/serverTest --drop 
docker cp ./demoData/uploads/ dockerconfig_strapi-frontend_1:/section01-group02/strapi/public/
docker exec -it dockerconfig_strapi-frontend_1 bash -c "cd /section01-group02/strapi/ && npm install --unsafe-perm && strapi start"


