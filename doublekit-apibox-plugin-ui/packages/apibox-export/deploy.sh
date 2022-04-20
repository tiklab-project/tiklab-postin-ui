#!/bin/bash

echo "start to cp"



if [ ! -d "../../../darth-apibox-ui/plugins/export" ];
then
  echo "文件不存在"
  else
     echo "删除文件"
    rm -rf ../../../darth-apibox-ui/plugins/Version
fi

cp -r ./dist/Version ../../../darth-apibox-ui/plugins
killall $!
echo "拷贝完成"
