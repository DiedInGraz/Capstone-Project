#! /bin/bash

#   File: scriptCheckStrapiRunning.sh
#   Author: Ben Pennington
#   Description: This script is used as an entrypoint
#   for the Strapi Docker container.

scriptToRun="scriptRunStrapi"
checkNpmInstallFailedCounter=0
extraInstallNeeded=true
#always run the script
while true
do

#switch value of extraInstallNeeded
if $extraInstallNeeded
then
    extraInstallNeeded=false
else 
    extraInstallNeeded=true
fi

#check if the script to run strapi is still running
if [[ `ps cax | grep "$scriptToRun"` == "" ]]
then
        #Check if the script just ran, and if the npm install (or `npm i`) command failed to install strapi properly.
        if $extraInstallNeeded
        then
                #try alternate install
                npm install --unsafe-perm
        fi

        npm i
        ./"$scriptToRun".sh
fi
done
