import mongoose from 'mongoose';

const blacklistSchema = mongoose.Schema({
  ip: { type: String, required: true }
});

export default mongoose.model('Blacklist', blacklistSchema);