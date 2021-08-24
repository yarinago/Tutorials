/* Creating a schema that will represents a single tutorial.
   The mongoose.model represents tutorials collection in MongoDB database */
module.exports = mongoose => {
    const Tutorial = mongoose.model(
      "tutorial",
      mongoose.Schema(
        {
          title: String,
          description: String,
          published: Boolean
        },
        { timestamps: true }
      )
    ); // These fields will be generated automatically for each Tutorial document: _id, title, description, published, createdAt, updatedAt, __v.
  
    return Tutorial;
  };

/* (!) If we are using a front-end that need id field instead of _id, this is how we will do it. (!)
  module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: String,
        description: String,
        published: Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Tutorial = mongoose.model("tutorial", schema);
    return Tutorial;
  }; */