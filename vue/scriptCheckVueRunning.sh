#! /bin/bash

#   File: scriptCheckVueRunning.sh
#   Author: Ben Pennington
#   Description: This script is used as an entrypoint
#   for the Vue Docker container

scriptToRunVue="scriptRunVue"
#always run the script
while true
do

#check if the script to run vue is still running

if [[ `ps cax | grep "$scriptToRunVue"` == "" ]]

then
	npm i
	./"$scriptToRunVue".sh
fi
done

