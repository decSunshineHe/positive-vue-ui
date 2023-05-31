#!/bin/sh
set -xe

COMMAND=$1

PROJECT_NAME=PositiveVueUI
VERSION=$(git describe --tag --dirty --long)
DOCKER_IMAGE_REPO=192.168.2.106:8680/demo
SERVER_ADDR=root@192.168.2.101

IMAGE_NAME=$DOCKER_IMAGE_REPO/$PROJECT_NAME:$VERSION

case $COMMAND in
build)
    npm ci
    npm run docs:build
    docker image build ./ -t "$IMAGE_NAME"
    ;;
push)
    docker push "$IMAGE_NAME"
    ;;
deploy)
    ssh "$SERVER_ADDR" kubectl set image deployment "$PROJECT_NAME" vue-front-container="$IMAGE_NAME" -n dev
    ;;
esac
