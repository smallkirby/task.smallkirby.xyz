#!/bin/bash

set -eu

IGNORE_SECRETS=(
  "NODE_ENV"
)

if ! [ -f ".env" ]; then
  echo "No .env file found."
  exit 3
fi

while IFS= read -r _line; do
  line=$(echo "$_line" | xargs)
  if [ -z "$line" ]; then
    continue
  fi
  if [[ "$line" == \#* ]]; then
    continue
  fi

  key=$(echo "$line" | cut -d '=' -f 1)
  value=$(echo "$line" | cut -d '=' -f 2-)

  if [[ "${IGNORE_SECRETS[*]}" =~ $key ]]; then
    continue
  fi
  echo "$value" | wrangler secret put "$key"
  echo "[+] Set $key"
done < ".env"
