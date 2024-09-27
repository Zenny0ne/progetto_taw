/**
 * id
 * user_id
 * starter price
 * reserve price
 * book_id
 * threads list
 * offers list
 */

import { InferSchemaType, model, Schema } from "mongoose";
import { getNextSequenceValue } from "./counter"; 

const auctionSchema = new Schema({
    id: { type: Number, unique: true, required: true },
    userId: {type: Number, required: true },
    starter_price: {type: Number, required: true},
    reserve_price: {type: Number, require: true},
    bookId: {type: Number, required: true},
    threads_list: {type: Array, required:true},
    offers_list: {type: Array, required: true}
});

auctionSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.id = await getNextSequenceValue('userId');
    }
    next();
});

type Auction = InferSchemaType<typeof auctionSchema>;

export default model<Auction>("Book", auctionSchema);
