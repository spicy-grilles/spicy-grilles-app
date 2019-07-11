const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema(
  {
    username: String,
    url: String,
    image: String,
    imagePath: String,
    spicyPoints: { type: Number, enum: [50, 100, 150, 200, 250] },
    activeItem: { type: Boolean, default: false },
    item: {type: Schema.Types.ObjectId, ref: "Item"}, //populate, cambiar con la learning

    location: { type: { type: String }, coordinates: [Number] }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

restaurantSchema.index({ location: "2dsphere" });

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;


