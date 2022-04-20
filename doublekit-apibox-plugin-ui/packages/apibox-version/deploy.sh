#!/bin/bash

echo "start to cp"



if [ ! -d "../../../../doublekit-apibox-ee-ui/plugins/version" ];
then
  echo "文件不存在"
  else
     echo "删除文件"
    rm -rf "../../../../doublekit-apibox-ee-ui/plugins/version"
fi

cp -r ./dist/versionButton ../../../../../doublekit-apibox-ui/doublekit-apibox-ui/plugins
killall $!
echo "拷贝完成"
