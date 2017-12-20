#!/bin/bash

bundle check || bundle install
sleep 10m
# bundle exec shotgun --server=webrick --port=4567 --host=0.0.0.0 --env=production web.rb

bundle exec ruby web.rb -p 4567
