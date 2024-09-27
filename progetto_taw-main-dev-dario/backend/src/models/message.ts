/**
 * id
 * body
 * user_id
 * date
 */

import { InferSchemaType, model, Schema } from "mongoose";
import { getNextSequenceValue } from "./counter"; 

const messageSchema = new Schema({
    id: { type: Number, unique: true, required: true },
    userId: {type: Number, required: true },
    body: {type: String, required: true},
    date: {type: Date, required: true}
});

messageSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.id = await getNextSequenceValue('userId');
    }
    next();
});

type Message = InferSchemaType<typeof messageSchema>;

export default model<Message>("Book", messageSchema);