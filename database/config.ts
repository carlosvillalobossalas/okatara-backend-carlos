import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    const dbUrl = process.env.DB_CNN || "";
    await mongoose.connect(dbUrl);
    console.log("DB Online");
  } catch (error) {
    console.log(error);
    throw new Error("DB Connection Error");
  }
};
