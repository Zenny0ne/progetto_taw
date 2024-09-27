import { model, Schema } from "mongoose";

const counterSchema = new Schema({
  _id: { type: String, required: true },  // Nome della sequenza (es. "userId", "orderId")
  sequence_value: { type: Number, required: true, default: 0 }
});

const Counter = model("Counter", counterSchema);

export async function getNextSequenceValue(sequenceName: string): Promise<number> {
  const sequenceDocument = await Counter.findByIdAndUpdate(
    { _id: sequenceName },          
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }      
  );
  return sequenceDocument?.sequence_value || 1;  
}

