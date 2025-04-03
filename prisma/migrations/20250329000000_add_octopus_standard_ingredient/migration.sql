-- Add octopus and its variations to StandardIngredient
INSERT INTO "StandardIngredient" (id, name, category, "createdAt", "updatedAt")
VALUES 
  (gen_random_uuid(), 'octopus', 'seafood', NOW(), NOW()),
  (gen_random_uuid(), 'pulpo', 'seafood', NOW(), NOW()),
  (gen_random_uuid(), 'octopi', 'seafood', NOW(), NOW()); 