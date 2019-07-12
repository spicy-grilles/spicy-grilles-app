const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    //botón de preparado para meter los players en el array y botón de jugar cuando estén todos en el array
    startTime: String,
    finishTime: String,
    players:{type: Schema.Types.ObjectId, ref: "User"},
    playersON: [String],
    active: {type: Boolean, default: false}
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;
