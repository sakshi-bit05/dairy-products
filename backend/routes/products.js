const express = require('express');
const router = express.Router();

// Sample product data (in a real app, this would come from a database)
const products = [
  {
    id: "1",
    name_en: "Shrikhand",
    name_mr: "Shrikhand",
    price: 250,
    description_en: "Creamy, sweetened strained yogurt dessert flavored with saffron and cardamom. A traditional Maharashtrian delicacy.",
    description_mr: "Creamy, sweetened strained yogurt dessert flavored with saffron and cardamom. A traditional Maharashtrian delicacy.",
    category: "Sweets",
    category_mr: "Sweets",
    image: "/products/shrikhand.jpg",
    ingredients_en: "Strained yogurt, sugar, saffron, cardamom, pistachios",
    ingredients_mr: "Strained yogurt, sugar, saffron, cardamom, pistachios",
    nutrition: "Calories: 180kcal | Protein: 5g | Fat: 8g | Carbs: 22g",
    expiry: "7 days (refrigerated)",
    expiry_mr: "7 days (refrigerated)",
    storage_en: "Store in refrigerator at 4°C",
    storage_mr: "Store in refrigerator at 4°C",
    sizes: ["250g", "500g", "1kg"],
  },
  {
    id: "2",
    name_en: "Butter",
    name_mr: "Butter",
    price: 180,
    description_en: "Fresh, creamy homemade butter churned from pure milk cream. Rich in flavor and perfect for cooking.",
    description_mr: "Fresh, creamy homemade butter churned from pure milk cream. Rich in flavor and perfect for cooking.",
    category: "Butter & Ghee",
    category_mr: "Butter & Ghee",
    image: "/products/butter.jpg",
    ingredients_en: "Fresh milk cream, salt",
    ingredients_mr: "Fresh milk cream, salt",
    nutrition: "Calories: 717kcal | Protein: 0.9g | Fat: 81g | Carbs: 0.1g per 100g",
    expiry: "30 days (refrigerated)",
    expiry_mr: "30 days (refrigerated)",
    storage_en: "Store in refrigerator at 4°C, away from strong odors",
    storage_mr: "Store in refrigerator at 4°C, away from strong odors",
    sizes: ["200g", "500g", "1kg"],
  },
  {
    id: "3",
    name_en: "Ghee",
    name_mr: "Ghee",
    price: 550,
    description_en: "Pure desi cow ghee made from traditional Bilona method. Golden, aromatic and full of nutrition.",
    description_mr: "Pure desi cow ghee made from traditional Bilona method. Golden, aromatic and full of nutrition.",
    category: "Butter & Ghee",
    category_mr: "Butter & Ghee",
    image: "/products/ghee.jpg",
    ingredients_en: "Pure cow milk cream",
    ingredients_mr: "Pure cow milk cream",
    nutrition: "Calories: 900kcal | Fat: 99.5g per 100g",
    expiry: "6 months (room temperature)",
    expiry_mr: "6 months (room temperature)",
    storage_en: "Store in a cool, dry place. No refrigeration needed.",
    storage_mr: "Store in a cool, dry place. No refrigeration needed.",
    sizes: ["250ml", "500ml", "1L"],
  },
  {
    id: "4",
    name_en: "Fresh Milk",
    name_mr: "Fresh Milk",
    price: 60,
    description_en: "Farm-fresh whole milk from healthy cows. Pasteurized and packed with natural goodness.",
    description_mr: "Farm-fresh whole milk from healthy cows. Pasteurized and packed with natural goodness.",
    category: "Milk Products",
    category_mr: "Milk Products",
    image: "/products/milk.jpg",
    ingredients_en: "Whole cow milk",
    ingredients_mr: "Whole cow milk",
    nutrition: "Calories: 62kcal | Protein: 3.2g | Fat: 3.3g | Carbs: 5g per 100ml",
    expiry: "2 days (refrigerated)",
    expiry_mr: "2 days (refrigerated)",
    storage_en: "Store in refrigerator at 4°C. Consume within 2 days of opening.",
    storage_mr: "Store in refrigerator at 4°C. Consume within 2 days of opening.",
    sizes: ["500ml", "1L"],
  },
  {
    id: "5",
    name_en: "Curd",
    name_mr: "Curd",
    price: 50,
    description_en: "Thick, creamy homemade curd set from fresh whole milk. Perfect for meals and recipes.",
    description_mr: "Thick, creamy homemade curd set from fresh whole milk. Perfect for meals and recipes.",
    category: "Milk Products",
    category_mr: "Milk Products",
    image: "/products/curd.jpg",
    ingredients_en: "Fresh milk, curd culture",
    ingredients_mr: "Fresh milk, curd culture",
    nutrition: "Calories: 60kcal | Protein: 3.5g | Fat: 3.3g | Carbs: 4.7g per 100g",
    expiry: "5 days (refrigerated)",
    expiry_mr: "5 days (refrigerated)",
    storage_en: "Store in refrigerator at 4°C",
    storage_mr: "Store in refrigerator at 4°C",
    sizes: ["250g", "500g", "1kg"],
  }
];

const categories = [
  { en: "Milk Products", mr: "Milk Products" },
  { en: "Sweets", mr: "Sweets" },
  { en: "Butter & Ghee", mr: "Butter & Ghee" },
  { en: "Cheese & Paneer", mr: "Cheese & Paneer" },
  { en: "Beverages", mr: "Beverages" },
];

// GET all products
router.get('/', (req, res) => {
  res.json(products);
});

// GET product by ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// GET products by category
router.get('/category/:category', (req, res) => {
  const categoryProducts = products.filter(p => p.category === req.params.category);
  res.json(categoryProducts);
});

// GET all categories
router.get('/categories/all', (req, res) => {
  res.json(categories);
});

module.exports = router;
