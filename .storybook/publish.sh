#!/bin/bash

set -e

rm -rf pages/{storybook,.git}
./node_modules/.bin/build-storybook -o pages/storybook -s .storybook/public

cd pages
git init
git add .
git commit -m 'Build Storybook'
git push --force https://github.com/toxicFork/react-three-renderer master:gh-pages
rm -rf .git
