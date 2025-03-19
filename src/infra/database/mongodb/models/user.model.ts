import mongoose, { Schema, Document } from 'mongoose';
import { User, AccessLevel } from '../../../../domain/entities/user.entity';

export interface UserDocument extends Omit<User, 'id'>, Document {
  _id: mongoose.Types.ObjectId;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accessLevel: { 
      type: String, 
      enum: Object.values(AccessLevel), 
      default: AccessLevel.USER,
      required: true 
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model<UserDocument>('User', UserSchema); 