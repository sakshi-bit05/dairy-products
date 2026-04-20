const mongoose = require('mongoose');

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/aditya_dairy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for login test'))
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

// Test admin login
const testAdminLogin = async () => {
  try {
    console.log('Testing admin login with new email...');
    
    // Find admin user with new email
    const admin = await AdminUser.findOne({ email: 'umeshsurya4832@gmail.com', isActive: true });
    
    if (admin) {
      console.log('✅ SUCCESS: Admin user found with new email!');
      console.log('Email:', admin.email);
      console.log('Name:', admin.name);
      console.log('Role:', admin.role);
      console.log('Password exists:', admin.password ? 'Yes' : 'No');
    } else {
      console.log('❌ FAILED: Admin user not found with new email');
      
      // Check if old email still exists
      const oldAdmin = await AdminUser.findOne({ email: 'admin@aditya.com', isActive: true });
      if (oldAdmin) {
        console.log('❌ Old admin email still exists:', oldAdmin.email);
      } else {
        console.log('❌ No admin users found in database');
      }
    }
    
  } catch (error) {
    console.error('Error testing login:', error);
  } finally {
    mongoose.disconnect();
  }
};

// Run test
testAdminLogin();
