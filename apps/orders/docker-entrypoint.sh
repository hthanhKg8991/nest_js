#!/bin/bash

until nc -z -v -w30 mongodb 27017
do
  echo "Waiting for MongoDB to start..."
  sleep 1
done

yarn start:dev orders
