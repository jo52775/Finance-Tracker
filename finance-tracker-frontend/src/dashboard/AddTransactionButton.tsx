import { useState } from "react";
import "../App.css";
import { Button } from "@mui/material";

type AddTransactionButtonProps = {
  setOpen: (open: boolean) => void;
};

function AddTransactionButton({setOpen}: AddTransactionButtonProps) {
  return (
    <>
      <div className="add-transaction-container">
        <Button
          variant="contained"
          fullWidth
          onClick={() => {setOpen(true)}}
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
