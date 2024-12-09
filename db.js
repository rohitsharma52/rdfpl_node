import mongoose from "mongoose";
mongoose.connect('mongodb://localhost:27017/Rdfpl');
 export const db = mongoose.connection;
db.once('open', () => {
    console.log('MongoDB connected successfully');
});
db.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err.message);
});
