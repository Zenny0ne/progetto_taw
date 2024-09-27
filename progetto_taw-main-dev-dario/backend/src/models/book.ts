import { InferSchemaType, model, Schema } from "mongoose";
import { getNextSequenceValue } from "./counter"; 

const bookSchema = new Schema({
    id: { type: Number, unique: true },
    userId: {type: Schema.Types.ObjectId, required: true },
    title: {type: String, required: true},
    course: {type: String, required: true, unique: false, select: false},
    university: {type: String, required: true, unique: false, select: false},
    price: {type: Number, required: true, unique: false, select: false},
});

bookSchema.pre('save', async function (next) {
    if (this.isNew) {

        this.id = await getNextSequenceValue('userId');
    }
    next();
});

type Book = InferSchemaType<typeof bookSchema>;

export default model<Book>("Book", bookSchema);