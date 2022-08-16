module.exports = mongoose => {
  var schema = mongoose.Schema(
      {
        PlantName: String,
        Description: String,
        PlantImage: String,
        PlantPrice: Number,
        Quantity: Number,
        CategoryID: Number,
        PlantStatus: Boolean
      },
      { timestamps: true }
    );
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    const Plant = mongoose.model("plant", schema);
    return Plant;
};