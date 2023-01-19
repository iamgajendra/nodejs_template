if [ -z "$1" ]
  then
    echo "Which env do you want to run the migration?"
    exit 1
fi
echo 'Running Migration...'
docker exec -it raccord-orgconnectnewapi-app-1 npx sequelize-cli db:migrate --env=$1