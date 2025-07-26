import { useState } from "react";
import "../App.css";
import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function AddTransactionButton() {
  return (
    <>
      <div className="add-transaction-container">
        <Button
          startIcon={<AddCircleIcon />}
          variant="contained"
          fullWidth
          sx={{ backgroundColor: "#4B0082", fontWeight: "bold" }}
        >
          {" "}
          Add Transaction{" "}
        </Button>
      </div>
    </>
  );
}

export default AddTransactionButton;
