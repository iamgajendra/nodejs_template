git push heroku master
echo 'Running Migration...'
heroku run npx sequelize-cli db:migrate 