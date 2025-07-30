pm2 stop all
pm2 start npm --name "adventure" -- start
pm2 save
pm2 startup