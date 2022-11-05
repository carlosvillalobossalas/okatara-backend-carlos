import { Schema, model } from "mongoose";

const PackageSchema = new Schema({
  name: {
    type: String,
    require,
  },
  location: {
    type: Object,
    require,
  },
  status: {
    type: String,
    require,
  },
});

PackageSchema.method("toJSON", function () {
  const { _v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export const Package = model("Package", PackageSchema);
