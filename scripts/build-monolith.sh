BUILD_PATH=$(pwd)/build
SRC_PATH=$(pwd)/src
SCRIPTS_PATH=$(pwd)/scripts
ROOT_PATH=$(pwd)

rm -rf $BUILD_PATH

mkdir -p $BUILD_PATH

cp -r $SCRIPTS_PATH/application $BUILD_PATH/application

mkdir $BUILD_PATH/core

cp -r $SRC_PATH/* $BUILD_PATH/core

cp $SCRIPTS_PATH/docker/monolith.yaml $BUILD_PATH/docker-compose.yaml

cp $SCRIPTS_PATH/docker/Dockerfile $BUILD_PATH/Dockerfile

cp $ROOT_PATH/package.json $ROOT_PATH/yarn.lock $ROOT_PATH/tsconfig.json $BUILD_PATH/

