#!/bin/bash

# Script to backup both recipe data and images
# Creates a timestamped directory with recipe data and images

# Base directories
RECIPES_DIR="prisma/seed-data"
RECIPES_FILE="recipes.ts"
IMAGES_DIR="public/images/recipes"
BACKUP_BASE_DIR="backups"

# Create timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="${BACKUP_BASE_DIR}/recipes_backup_${TIMESTAMP}"

# Create backup directories
mkdir -p "${BACKUP_DIR}/data"
mkdir -p "${BACKUP_DIR}/images"

echo "Creating backup in ${BACKUP_DIR}..."

# 1. Backup recipe data
echo "Backing up recipe data..."

# First use the existing recipe backup script to generate a fresh backup
./scripts/backup/backup-recipes.sh

# Then copy the most recent backup to our new backup directory
LATEST_RECIPE_BACKUP=$(ls -t scripts/backup/recipes_backup_* | head -n 1)
cp "${LATEST_RECIPE_BACKUP}" "${BACKUP_DIR}/data/"

# 2. Export recipe data from database (optional, if you want the live database version too)
echo "Exporting recipe data from database..."
npx ts-node scripts/export-recipes.ts > "${BACKUP_DIR}/data/recipes_export.json"

# 3. Backup recipe images
echo "Backing up recipe images..."
cp -R "${IMAGES_DIR}"/* "${BACKUP_DIR}/images/"

# Count images before compressing
IMAGE_COUNT=$(find "${BACKUP_DIR}/images" -type f | wc -l)

# 4. Create a compressed archive
echo "Creating compressed archive..."
tar -czf "${BACKUP_DIR}.tar.gz" -C "${BACKUP_BASE_DIR}" "recipes_backup_${TIMESTAMP}"

# 5. Clean up the uncompressed directory (optional)
rm -rf "${BACKUP_DIR}"

# 6. Keep only the last 5 backups
echo "Cleaning up old backups..."
ls -t ${BACKUP_BASE_DIR}/recipes_backup_*.tar.gz | tail -n +6 | xargs rm -f 2>/dev/null

echo "Backup completed: ${BACKUP_DIR}.tar.gz"
echo "Images backed up: ${IMAGE_COUNT}" 