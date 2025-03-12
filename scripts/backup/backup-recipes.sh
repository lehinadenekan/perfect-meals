#!/bin/bash

# Directory containing the recipes file
RECIPES_DIR="prisma/seed-data"
RECIPES_FILE="recipes.ts"
BACKUP_DIR="scripts/backup"

# Create backup filename with timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="recipes_backup_${TIMESTAMP}.ts"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Copy the recipes file to backup location
cp "${RECIPES_DIR}/${RECIPES_FILE}" "${BACKUP_DIR}/${BACKUP_FILE}"

# Keep only the last 5 backups
cd "$BACKUP_DIR"
ls -t recipes_backup_* | tail -n +6 | xargs rm -f 2>/dev/null

echo "Backup created: ${BACKUP_FILE}" 