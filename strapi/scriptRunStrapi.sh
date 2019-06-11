#! /bin/bash

#   File: scriptRunStrapi.sh
#   Author: Ben Pennington
#   Description: This script is used by the 
#   script "scriptCheckStrapiRunning.sh".
#   It tries to run Strapi, and if it fails,
#   outputs the error it failed with.

#exit when command fails
set -e
#track of last command run
trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG
#output error message before exiting
trap 'echo "<${last_command}> failed with exit code <$?>"' EXIT

#run strapi project
strapi start

