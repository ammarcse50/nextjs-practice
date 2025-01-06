
let db;
export const connectDB = async () => {

  if(db)    return db;

  try {
   const url = process.env.DATABASE_URL
    
  } catch (error) {
    console.log(error);
  }

}