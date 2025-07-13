#!/bin/sh
# Wait for the backend to be available
HOST="backend"
PORT=3001
TIMEOUT=30

for i in $(seq 1 $TIMEOUT); do
  nc -z $HOST $PORT && break
  echo "Waiting for $HOST:$PORT... ($i/$TIMEOUT)"
  sleep 1
done

if ! nc -z $HOST $PORT; then
  echo "Timeout waiting for $HOST:$PORT"
  exit 1
fi

exec "$@" 