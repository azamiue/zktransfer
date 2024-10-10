#!/bin/sh

docker build -t autoair-lp .
docker stack rm autoair-lp
docker stack deploy -c docker-compose.yml autoair-lp
