#!/bin/bash

# Make a request to generate recipes
echo "Generating recipes..."
curl -X POST http://localhost:3000/api/recipes/generate \
  -H "Content-Type: application/json" \
  -d '{"number": 20}'

echo "Done! Check your database for new recipes." 