const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        await mongoose.connect('mongodb+srv://tuanaht2001:tuanaht2001@database.325kfju.mongodb.net/dbftshop?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database Connected Successfully');
    } catch (error) {
        console.log('Database error: ', error.message);
        process.exit(1);
    }
};

module.exports = dbConnect;