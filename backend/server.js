const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aditya_dairy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Admin User Schema
const adminUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
  isActive: { type: Boolean, default: true }
});

const AdminUser = mongoose.model('AdminUser', adminUserSchema);

// Initialize default admin user
const initializeAdmin = async () => {
  try {
    const existingAdmin = await AdminUser.findOne({ email: 'admin@aditya.com' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('1234', 10);
      const defaultAdmin = new AdminUser({
        email: 'admin@aditya.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'super_admin',
        isActive: true
      });
      await defaultAdmin.save();
      console.log('Default admin user created in MongoDB');
    }
  } catch (error) {
    console.error('Error initializing admin:', error);
  }
};

// Import routes
const productsRouter = require('./routes/products');

// Admin Authentication Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find admin user
    const admin = await AdminUser.findOne({ email, isActive: true });
    
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    // Compare password
    const isValidPassword = await bcrypt.compare(password, admin.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    // Update last login
    admin.lastLogin = new Date();
    await admin.save();
    
    res.json({
      success: true,
      user: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get all admins
app.get('/api/admin/users', async (req, res) => {
  try {
    const admins = await AdminUser.find({ isActive: true })
      .select('-password')
      .sort({ createdAt: -1 });
    res.json({ success: true, admins });
  } catch (error) {
    console.error('Get admins error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update admin user
app.put('/api/admin/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, role } = req.body;
    
    const admin = await AdminUser.findById(id);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }
    
    // Update fields
    if (email) admin.email = email;
    if (name) admin.name = name;
    if (role) admin.role = role;
    
    await admin.save();
    res.json({ success: true, message: 'Admin updated successfully' });
    
  } catch (error) {
    console.error('Update admin error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Routes
app.use('/api/products', productsRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Dairy Delight Hub API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await initializeAdmin();
});
