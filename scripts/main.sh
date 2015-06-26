#!/bin/bash

WD="$(dirname $0)"

FILE=$1
FILE_NAME=$(echo $1 | sed 's/^\(.*\)\..*$/\1/')
JSON=$WD/${FILE_NAME}-meta.json

$WD/main.py $FILE_NAME > $JSON
# data=$(sed -n '/#/s/.*Coordinate origin.* lat \([0-9.]*\), lon \([0-9.]*\).*/"lat": \1, "lon": \2/p' $FILE_NAME.obj)
# sed -i "1s/\[,/\[{\"name\": \"\", $data},/" $JSON
cat $JSON
