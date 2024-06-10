const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Имя необходимо!"],
    },
    email: {
      type: String,
      required: [true, "Почта необходима!"],
    },
    bio: {
      type: String,
      default: "Я использую УРК тайм-трекер!",
    },
    password: {
      type: String,
      required: [true, "Пароль необходим!"],
      trim: true,
    },
    profilePicture: {
      type: String,
      default: function () {
        return `https://api.dicebear.com/7.x/bottts/svg?seed=${
          this.username?.toLowerCase()?.split(" ")[0]
        }`;
      },
    },
    verified: {
      type: Boolean,
      default: false,
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
