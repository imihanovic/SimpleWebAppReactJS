const mongoose = require("mongoose");
const User = require("../models/UserModel.js");
const { userRole } = require("../enums/UserRole.js");
require("dotenv").config({ path: "../.env" });
const bcrypt = require("bcryptjs");

mongoose.connect("mongodb://localhost:27017/projekt", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seedAdmin() {
  try {
    console.log("roles", userRole.Admin);
    admin = new User({
      _id: "60d5ecb44ef14be0c8c8e490",
      email: "admin@admin.com",
      password: "admin1!",
      role: userRole.Admin,
    });
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(admin.password, salt);
    admin.password = hashPassword;
    const result = await User.create(admin);
    console.log(`admin seeded successfully.`);
  } catch (error) {
    console.error("Error seeding admin model:", error.message);
  }
}

async function seedData() {
  try {
    await seedAdmin();
  } catch (error) {
    console.error("Error seeding data:", error.message);
  } finally {
    mongoose.disconnect();
  }
}

seedData();
