#!/bin/sh
echo "Application des migrations..."
python manage.py migrate --noinput

echo "Démarrage du serveur Django..."
exec "$@"
