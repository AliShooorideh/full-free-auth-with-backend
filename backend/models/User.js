const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Hash the user's password before saving to the database
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hasshedPassword = await bcrypt.hash(this.password, salt);
    this.password = hasshedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

//Compare the provided password with the stored hashed password
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};
const User = mongoose.model("User", userSchema);
module.exports = User;
