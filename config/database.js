import mongoose from 'mongoose';

 const connectdatabase = () => {

    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('mongo-db compass connected');
        })
        .catch(() => {
            console.log('not connected');
        })

}

export default connectdatabase;