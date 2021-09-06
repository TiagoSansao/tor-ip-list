import mongoose from 'mongoose';
import {} from 'dotenv/config';

function connect() {
  try {
    mongoose.connect(process.env.MONGOOSE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch(e) {
    console.log(e);
  }
}

export default connect;

