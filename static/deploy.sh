#!/bin/bash

# 1. cd into assets directory mkdir random folder name then mv images folder into random folder name
cd out/assets && ls -a
FINGERPRINT=$(date +%s | sha256sum | base64 | head -c30)
mkdir -p $FINGERPRINT/images
mv images $FINGERPRINT

# 2. string replace https://cdn.koralabs.io/assets/YzI5NmU4ZDg3ODNkMzZjZGU4ODM5MT/images with /assets/randomfolder/images
cd ../
grep -rli 'https://cdn.koralabs.io/assets/YzI5NmU4ZDg3ODNkMzZjZGU4ODM5MT/images' * | xargs -i@ sed -i 's/\/assets\/images/https:\/\/cdn\.koralabs\.io\/assets\/'$FINGERPRINT'\/images/g' @