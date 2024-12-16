#!/bin/sh

cp -r ./apps/auth/i18n/* ./dist/apps/auth/i18n/

exec "$@"
