import shrikhandImg from "@/assets/products/shrikhand.jpg";
import butterImg from "@/assets/products/butter.jpg";
import gheeImg from "@/assets/products/ghee.jpg";
import milkImg from "@/assets/products/milk.jpg";
import curdImg from "@/assets/products/curd.jpg";
import paneerImg from "@/assets/products/paneer.jpg";
import amrakhandImg from "@/assets/products/amrakhand.jpg";
import basundiImg from "@/assets/products/basundi.jpg";
import buttermilkImg from "@/assets/products/buttermilk.jpg";

export interface Product {
  id: string;
  name_en: string;
  name_mr: string;
  price: number;
  description_en: string;
  description_mr: string;
  category: string;
  category_mr: string;
  image: string;
  ingredients_en: string;
  ingredients_mr: string;
  nutrition: string;
  expiry: string;
  expiry_mr: string;
  storage_en: string;
  storage_mr: string;
  sizes: string[];
  // New field for quantity-based pricing
  pricing?: {
    [size: string]: number;
  };
}

export const categories = [
  { en: "Milk Products", mr: "दूध उत्पादने" },
  { en: "Sweets", mr: "गोड पदार्थ" },
  { en: "Butter & Ghee", mr: "लोणी आणि तूप" },
  { en: "Cheese & Paneer", mr: "चीज आणि पनीर" },
  { en: "Beverages", mr: "पेये" },
];

export const defaultProducts: Product[] = [
  {
    id: "1",
    name_en: "Shrikhand",
    name_mr: "श्रीखंड",
    price: 80,
    description_en: "Creamy, sweetened strained yogurt dessert flavored with saffron and cardamom. A traditional Maharashtrian delicacy.",
    description_mr: "केशर आणि वेलचीने सुगंधित केलेली मलईदार, गोड गाळलेल्या दह्याची मिठाई. एक पारंपारिक महाराष्ट्रीय पदार्थ.",
    category: "Sweets",
    category_mr: "गोड पदार्थ",
    image: shrikhandImg,
    ingredients_en: "Strained yogurt, sugar, saffron, cardamom, pistachios",
    ingredients_mr: "गाळलेले दही, साखर, केशर, वेलची, पिस्ता",
    nutrition: "Calories: 180kcal | Protein: 5g | Fat: 8g | Carbs: 22g",
    expiry: "7 days (refrigerated)",
    expiry_mr: "७ दिवस (फ्रिजमध्ये)",
    storage_en: "Store in refrigerator at 4°C",
    storage_mr: "फ्रिजमध्ये ४°C तापमानात ठेवा",
    sizes: ["250g", "500g", "1kg"],
    pricing: {
      "250g": 80,
      "500g": 150,
      "1kg": 280
    }
  },
  {
    id: "2",
    name_en: "Butter",
    name_mr: "लोणी",
    price: 50,
    description_en: "Fresh, creamy homemade butter churned from pure milk cream. Rich in flavor and perfect for cooking.",
    description_mr: "शुद्ध दुधाच्या मलईपासून बनवलेले ताजे, मलईदार घरगुती लोणी. चवीला समृद्ध आणि स्वयंपाकासाठी उत्तम.",
    category: "Butter & Ghee",
    category_mr: "लोणी आणि तूप",
    image: butterImg,
    ingredients_en: "Fresh milk cream, salt",
    ingredients_mr: "ताजी दुधाची मलई, मीठ",
    nutrition: "Calories: 717kcal | Protein: 0.9g | Fat: 81g | Carbs: 0.1g per 100g",
    expiry: "30 days (refrigerated)",
    expiry_mr: "३० दिवस (फ्रिजमध्ये)",
    storage_en: "Store in refrigerator at 4°C, away from strong odors",
    storage_mr: "फ्रिजमध्ये ४°C तापमानात, तीव्र वासापासून दूर ठेवा",
    sizes: ["200g", "500g", "1kg"],
    pricing: {
      "200g": 50,
      "500g": 120,
      "1kg": 220
    }
  },
  {
    id: "3",
    name_en: "Ghee",
    name_mr: "तूप",
    price: 150,
    description_en: "Pure desi cow ghee made from traditional Bilona method. Golden, aromatic and full of nutrition.",
    description_mr: "पारंपारिक बिलोना पद्धतीने बनवलेले शुद्ध देशी गाईचे तूप. सोनेरी, सुगंधित आणि पोषणांनी भरपूर.",
    category: "Butter & Ghee",
    category_mr: "लोणी आणि तूप",
    image: gheeImg,
    ingredients_en: "Pure cow milk cream",
    ingredients_mr: "शुद्ध गाईच्या दुधाची मलई",
    nutrition: "Calories: 900kcal | Fat: 99.5g per 100g",
    expiry: "6 months (room temperature)",
    expiry_mr: "६ महिने (खोलीच्या तापमानात)",
    storage_en: "Store in a cool, dry place. No refrigeration needed.",
    storage_mr: "थंड, कोरड्या जागी ठेवा. फ्रिजची गरज नाही.",
    sizes: ["250ml", "500ml", "1L"],
    pricing: {
      "250ml": 150,
      "500ml": 280,
      "1L": 520
    }
  },
  {
    id: "4",
    name_en: "Fresh Milk",
    name_mr: "ताजे दूध",
    price: 30,
    description_en: "Farm-fresh whole milk from healthy cows. Pasteurized and packed with natural goodness.",
    description_mr: "निरोगी गाईंचे शेतातील ताजे संपूर्ण दूध. पाश्चराइज्ड आणि नैसर्गिक गुणांनी भरपूर.",
    category: "Milk Products",
    category_mr: "दूध उत्पादने",
    image: milkImg,
    ingredients_en: "Whole cow milk",
    ingredients_mr: "संपूर्ण गाईचे दूध",
    nutrition: "Calories: 62kcal | Protein: 3.2g | Fat: 3.3g | Carbs: 5g per 100ml",
    expiry: "2 days (refrigerated)",
    expiry_mr: "२ दिवस (फ्रिजमध्ये)",
    storage_en: "Store in refrigerator at 4°C. Consume within 2 days of opening.",
    storage_mr: "फ्रिजमध्ये ४°C तापमानात ठेवा. उघडल्यानंतर २ दिवसांत वापरा.",
    sizes: ["500ml", "1L"],
    pricing: {
      "500ml": 30,
      "1L": 55
    }
  },
  {
    id: "5",
    name_en: "Curd",
    name_mr: "दही",
    price: 25,
    description_en: "Thick, creamy homemade curd set from fresh whole milk. Perfect for meals and recipes.",
    description_mr: "ताज्या संपूर्ण दुधापासून लावलेले घट्ट, मलईदार घरगुती दही. जेवण आणि पाककृतींसाठी उत्तम.",
    category: "Milk Products",
    category_mr: "दूध उत्पादने",
    image: curdImg,
    ingredients_en: "Fresh milk, curd culture",
    ingredients_mr: "ताजे दूध, दही विरजण",
    nutrition: "Calories: 60kcal | Protein: 3.5g | Fat: 3.3g | Carbs: 4.7g per 100g",
    expiry: "5 days (refrigerated)",
    expiry_mr: "५ दिवस (फ्रिजमध्ये)",
    storage_en: "Store in refrigerator at 4°C",
    storage_mr: "फ्रिजमध्ये ४°C तापमानात ठेवा",
    sizes: ["250g", "500g", "1kg"],
    pricing: {
      "250g": 25,
      "500g": 45,
      "1kg": 80
    }
  },
  {
    id: "6",
    name_en: "Paneer",
    name_mr: "पनीर",
    price: 80,
    description_en: "Fresh, soft homemade paneer made from pure milk. Ideal for curries, snacks and desserts.",
    description_mr: "शुद्ध दुधापासून बनवलेले ताजे, मऊ घरगुती पनीर. भाज्या, नाश्ता आणि मिठाईसाठी उत्तम.",
    category: "Cheese & Paneer",
    category_mr: "चीज आणि पनीर",
    image: paneerImg,
    ingredients_en: "Fresh milk, lemon juice / citric acid",
    ingredients_mr: "ताजे दूध, लिंबाचा रस / सायट्रिक अ‍ॅसिड",
    nutrition: "Calories: 265kcal | Protein: 18g | Fat: 20g | Carbs: 1.2g per 100g",
    expiry: "5 days (refrigerated)",
    expiry_mr: "५ दिवस (फ्रिजमध्ये)",
    storage_en: "Store in refrigerator at 4°C, submerged in water",
    storage_mr: "फ्रिजमध्ये ४°C तापमानात, पाण्यात बुडवून ठेवा",
    sizes: ["200g", "500g", "1kg"],
    pricing: {
      "200g": 80,
      "500g": 180,
      "1kg": 320
    }
  },
  {
    id: "7",
    name_en: "Amrakhand",
    name_mr: "आम्रखंड",
    price: 90,
    description_en: "Delicious mango-flavored shrikhand made with fresh Alphonso mango pulp and strained yogurt. A seasonal Maharashtrian favorite.",
    description_mr: "ताज्या हापूस आंब्याच्या रसापासून आणि गाळलेल्या दह्यापासून बनवलेला स्वादिष्ट आम्रखंड. हंगामी महाराष्ट्रीय आवडता पदार्थ.",
    category: "Sweets",
    category_mr: "गोड पदार्थ",
    image: amrakhandImg,
    ingredients_en: "Strained yogurt, Alphonso mango pulp, sugar, saffron, cardamom",
    ingredients_mr: "गाळलेले दही, हापूस आंब्याचा रस, साखर, केशर, वेलची",
    nutrition: "Calories: 200kcal | Protein: 4g | Fat: 7g | Carbs: 30g",
    expiry: "5 days (refrigerated)",
    expiry_mr: "५ दिवस (फ्रिजमध्ये)",
    storage_en: "Store in refrigerator at 4°C",
    storage_mr: "फ्रिजमध्ये ४°C तापमानात ठेवा",
    sizes: ["250g", "500g", "1kg"],
    pricing: {
      "250g": 90,
      "500g": 170,
      "1kg": 320
    }
  },
  {
    id: "8",
    name_en: "Basundi",
    name_mr: "बासुंदी",
    price: 70,
    description_en: "Rich, thickened sweetened milk dessert slow-cooked to perfection. Garnished with dry fruits and flavored with cardamom.",
    description_mr: "मंद आचेवर उत्तम प्रकारे शिजवलेली समृद्ध, घट्ट गोड दुधाची मिठाई. सुक्या मेव्याने सजवलेली आणि वेलचीने सुगंधित.",
    category: "Sweets",
    category_mr: "गोड पदार्थ",
    image: basundiImg,
    ingredients_en: "Full cream milk, sugar, cardamom, almonds, pistachios, saffron",
    ingredients_mr: "फुल क्रीम दूध, साखर, वेलची, बदाम, पिस्ता, केशर",
    nutrition: "Calories: 190kcal | Protein: 6g | Fat: 9g | Carbs: 24g",
    expiry: "5 days (refrigerated)",
    expiry_mr: "५ दिवस (फ्रिजमध्ये)",
    storage_en: "Store in refrigerator at 4°C",
    storage_mr: "फ्रिजमध्ये ४°C तापमानात ठेवा",
    sizes: ["250g", "500g", "1kg"],
    pricing: {
      "250g": 70,
      "500g": 130,
      "1kg": 240
    }
  },
  {
    id: "9",
    name_en: "Buttermilk",
    name_mr: "ताक",
    price: 15,
    description_en: "Refreshing spiced buttermilk made from fresh curd. Seasoned with cumin, mint and a pinch of salt. Perfect summer drink.",
    description_mr: "ताज्या दह्यापासून बनवलेले ताजेतवाने मसालेदार ताक. जिरे, पुदिना आणि चिमूटभर मीठ घालून तयार. उन्हाळ्यातील उत्तम पेय.",
    category: "Beverages",
    category_mr: "पेये",
    image: buttermilkImg,
    ingredients_en: "Fresh curd, water, cumin, mint, salt, green chili",
    ingredients_mr: "ताजे दही, पाणी, जिरे, पुदिना, मीठ, हिरवी मिरची",
    nutrition: "Calories: 40kcal | Protein: 2g | Fat: 1g | Carbs: 5g per 200ml",
    expiry: "1 day (refrigerated)",
    expiry_mr: "१ दिवस (फ्रिजमध्ये)",
    storage_en: "Store in refrigerator at 4°C. Best consumed fresh.",
    storage_mr: "फ्रिजमध्ये ४°C तापमानात ठेवा. ताजे प्यायल्यास उत्तम.",
    sizes: ["200ml", "500ml", "1L"],
    pricing: {
      "200ml": 15,
      "500ml": 35,
      "1L": 60
    }
  },
];
