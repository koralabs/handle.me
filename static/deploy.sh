#!/bin/bash
set -eu

# 1. cd into assets directory mkdir random folder name then mv images folder into random folder name
cd out/assets
FINGERPRINT=$(date +%s | sha256sum | base64 | head -c30)
mkdir -p $FINGERPRINT/images
mv images $FINGERPRINT

# 2. string replace /assets/images with /assets/randomfolder/images
cd ../
grep -rli '/assets/images' --exclude=*\.sh * | xargs -i@ sed -i 's/\/assets\/images/https:\/\/cdn\.handle\.me\/assets\/'$FINGERPRINT'\/images/g' @
mkdir -p assets/$FINGERPRINT/html
mv *.html assets/$FINGERPRINT/html
echo $FINGERPRINT