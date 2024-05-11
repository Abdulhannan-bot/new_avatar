echo "Switched to main branch"
git checkout main

echo "Building the app"
npm run build

echo "Deploying files to server"
scp -r build/* sammy@64.227.139.190:/var/www/ai.shozim.com/

echo "Done"