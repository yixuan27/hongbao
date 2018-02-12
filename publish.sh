#!/usr/bin/env bash

git fetch --all
git reset --hard origin/master
npm i
npm run reload
pm2 ls
