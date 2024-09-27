/**
 * id
 * user_id
 * date
 * messages list
 * public_visibility
 */

import { InferSchemaType, model, Schema } from "mongoose";
import { getNextSequenceValue } from "./counter"; 

const threadSchema = new Schema({
    id: { type: Number, unique: true, required: true },
    userId: {type: Number, required: true },
    messages_list: {type: Array, require: true},
    public_visibility: {type: Boolean, required: true},
    date: {type: Date, required: true}
});

threadSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.id = await getNextSequenceValue('userId');
    }
    next();
});

type Thread = InferSchemaType<typeof threadSchema>;

export default model<Thread>("Book", threadSchema);