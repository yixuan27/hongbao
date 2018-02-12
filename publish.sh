#!/usr/bin/env bash

git fetch origin master
git reset --hard origin/master
npm i
npm run reload
pm2 ls
