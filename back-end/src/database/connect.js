import mongoose from 'mongoose';
import {} from 'dotenv/config';

function connect() {
  mongoose.connect(process.env.MONGOOSE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export default connect;

