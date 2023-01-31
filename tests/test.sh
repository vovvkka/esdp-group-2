#!/bin/bash

REL_PATH=`dirname $0`

echo $REL_PATH
cd ${REL_PATH}
CURRENT_DIR=`pwd`

echo ${CURRENT_DIR}
cd ${CURRENT_DIR}

echo '##################'
echo "# Running tests! #"
echo '##################'

echo '# API'

cd ../backend

echo '# Running fixtures'
NODE_ENV=test npm run seed

echo '# Running API server in test mode'
pm2 start "NODE_ENV=test npm run start" --name="backend-test"

echo '# Running frontend in test mode'
cd ../frontend
pm2 start "npm run start-test" --name="esdp-frontend-test"

while ! nc -z localhost 3010; do
    sleep 0.1
done

echo "# Running tests"
cd ../tests
echo "$@"
npx codeceptjs run --steps "$@"
EXIT_CODE=$?

echo '# Killing test processes'
pm2 kill

exit ${EXIT_CODE}