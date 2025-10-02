import mongoose from 'mongoose';
import { MONGODB_URI } from'../config/envconfig.js';

if(!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in the environmental variables");
};

const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

export default connectToDatabase;