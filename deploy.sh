#!/bin/sh

SERVER_IP=35.240.130.172
DEPLOY_TO_FOLDER=/data/autoair-lp

rsync -av -R --exclude '.vscode' \
  --exclude '.git' \
  --exclude 'node_modules' \
  --exclude 'build' \
  --exclude '.next' \
  . $SERVER_IP:$DEPLOY_TO_FOLDER/ --delete
