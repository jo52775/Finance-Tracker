import express from "express";
import { supabase } from "../db/supabase.js";

const router = express.Router();

router.post("/transaction", async (req, res) => {
  const transaction = {
    'transaction_date': req.body.transaction_date,
    'user_id': req.body.user_id,
    'amount': req.body.amount,
    'recurring_frequency': req.body.recurring_frequency,
    'income': req.body.income,
    'category_id': req.body.category_id,
    'description': req.body.description,
    'end_date': req.body.end_date
  };

  const { data, error } = await supabase
    .from("Transaction")
    .insert([transaction]);
  if (error) {
    return res
      .status(404)
      .json({ error: "Supabase Error: Unable to create transaction" });
  }
  return res.status(200).json({ message: "Transaction created." });
});

export default router;
