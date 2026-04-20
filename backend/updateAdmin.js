const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/aditya_dairy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for admin update'))
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

// Update admin email
const updateAdminEmail = async () => {
  try {
    // Find the existing admin user
    const admin = await AdminUser.findOne({ email: 'admin@aditya.com' });
    
    if (!admin) {
      console.log('Admin user not found');
      return;
    }
    
    console.log('Found admin user:', admin.email);
    
    // Update email to umeshsurya4832@gmail.com
    admin.email = 'umeshsurya4832@gmail.com';
    admin.name = 'Umesh Suryawanshi';
    
    await admin.save();
    
    console.log('Admin email updated successfully to: umeshsurya4832@gmail.com');
    console.log('Admin name updated to: Umesh Suryawanshi');
    
    // Verify the update
    const updatedAdmin = await AdminUser.findOne({ email: 'umeshsurya4832@gmail.com' });
    console.log('Verification - Updated admin:', updatedAdmin.email, updatedAdmin.name);
    
  } catch (error) {
    console.error('Error updating admin:', error);
  } finally {
    mongoose.disconnect();
  }
};

// Run the update
updateAdminEmail();
