import { InferSchemaType, model, Schema } from "mongoose";
import { getNextSequenceValue } from "./counter"; 

const userSchema = new Schema({
    id: { type: Number, unique: true, required: true }, 
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, select: false },
    password: { type: String, required: true, select: false },
    address: { type: String, required: true, select: false },
    role: { type: String, required: true, enum: ["student", "moderator"] },
});

userSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.id = await getNextSequenceValue('userId');
    }
    next();
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
