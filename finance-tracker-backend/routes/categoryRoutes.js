import express from "express";
import { supabase } from "../db/supabase.js";

const router = express.Router();

router.get("/expenseCategories", async (req, res) => {
  const { data, error } = await supabase
    .from("Category")
    .select()
    .neq("category_name", "Income");
  if (error) {
    return res
      .status(404)
      .json({ error: "Supabase Error: Unable to fetch categories" });
  }
  return res.status(200).json({ categories: data });
});

export default router;
