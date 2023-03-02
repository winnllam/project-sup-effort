ssh ${user}@${host}
# insert password here

cd project-sup-effort
git pull
# may need to log in to github

cd backend
npm install
pm2 startup ubuntu

cd ../frontend
npm install

cd /var/www/html
rm -r divideandconquer.me

cd ~/project-sup-effort
cp -Rv frontend /var/www/html
cd /var/www/html
mv frontend divideandconquer.me
chown -R www-data:www-data /var/www/html/divideandconquer.me

sudo systemctl restart nginx
sudo service nginx restart