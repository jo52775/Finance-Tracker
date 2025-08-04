import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  type SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Dayjs } from "dayjs";

type AddTransactionButtonProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

type CategoryListItem = {
  category_id: number;
  category_name: string;
};

function TransactionModal({ open, setOpen }: AddTransactionButtonProps) {
  const [descriptionText, setDescriptionText] = useState<string>("");
  const [amountText, setAmountText] = useState<string>("");
  const [dateText, setDateText] = useState<Dayjs | null>();
  const [recurringFrequency, setRecurringFrequency] =
    useState<string>("One-time");
  const [endDateText, setEndDateText] = useState<Dayjs | null>();
  const [isIncome, setIsIncome] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [categoryList, setCategoryList] = useState<CategoryListItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const errorMessages = {
    'invalidDate' : 'Please enter a valid date.',
    'endDateBeforeStartDate' : 'End date must be after the start date.',
    '':''
  }

  useEffect(() => {
    const fetchTransactionCategories = async () => {
      const API_URL = "http://localhost:5000";

      try {
        const response = await fetch(
          `${API_URL}/api/categories/expenseCategories`
        );
        if (!response) {
          throw new Error(`Error retrieving response`);
        }
        const data = await response.json();
        setCategoryList(data.categories);
      } catch (error) {
        throw new Error("Error during fetching Transaction Categories.");
      }
    };
    fetchTransactionCategories();
  }, []);

  useEffect(() => {
    if (isIncome) {
      setCategory("Income");
    } else {
      setCategory("");
    }
  }, [isIncome]);

  useEffect(() => {
    if (recurringFrequency === 'One-time') {
      setEndDateText(null);
    } 
  }, [recurringFrequency]);

  const handleSubmit = async() => {
    console.log('Submitting....');
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;
    setDescriptionText(input);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const isValidCurrency = (str: string) =>
      /^(0|[1-9]\d*)(\.\d{0,2})?$/.test(str);

    if (isValidCurrency(input) || input === "") {
      setAmountText(input);
    }
  };

  const handleRecurringChange = (event: SelectChangeEvent) => {
    setRecurringFrequency(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };


  return (
    <div className="transaction-modal-container">
      <form onSubmit={handleSubmit}>
        <h2 className="transaction-title"> Add Transaction </h2>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                defaultChecked
                color={!isIncome ? "primary" : "primary"}
                onChange={() => setIsIncome((prev) => !prev)}
              />
            }
            label={
              <span style={{ color: "black" }}>
                {" "}
                {!isIncome ? "Expense" : "Income"}{" "}
              </span>
            }
          />
        </FormGroup>
        <TextField
          autoFocus
          required
          value={descriptionText}
          onChange={handleDescriptionChange}
          margin="dense"
          label="Transaction Name"
          variant="outlined"
          fullWidth
          sx={{ marginTop: "20px" }}
          slotProps={{ htmlInput: { maxLength: 50 }}}
        />
        <TextField
          required
          value={amountText}
          onChange={handleAmountChange}
          placeholder="0.00"
          margin="dense"
          label="Amount"
          variant="outlined"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            },
          }}
          sx={{ marginTop: "20px" }}
        />
        <FormControl fullWidth sx={{ marginTop: "20px" }}>
          <InputLabel id="recurringFreqLabel">
            {" "}
            Transaction Frequency{" "}
          </InputLabel>
          <Select
            id="recurring-frequency-select"
            value={recurringFrequency}
            onChange={handleRecurringChange}
            labelId="recurringFreqLabel"
            label="Transaction Frequency"
          >
            <MenuItem value={"One-time"}> One-time </MenuItem>
            <MenuItem value={"Daily"}>Daily</MenuItem>
            <MenuItem value={"Weekly"}>Weekly</MenuItem>
            <MenuItem value={"Bi-weekly"}>Bi-weekly</MenuItem>
            <MenuItem value={"Monthly"}>Monthly</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            required
            value={dateText}
            onChange={(date) => setDateText(date)}
            label={`${recurringFrequency !== "One-time" ? "Start" : ""} Date`}
            sx={{ marginTop: "20px" }}
            fullWidth
            onError={(reason) => {
              if (reason) {
                setError(true);
              }
            else{
              setError(false);
            }}}
          />
        </LocalizationProvider>
        {recurringFrequency !== "One-time" && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              value={endDateText}
              onChange={(date) => setEndDateText(date)}
              label={"End Date"}
              sx={{ marginTop: "20px" }}
              fullWidth
              onError={(reason) => {
              if (reason) {
                setError(true);
              }
            else{
              setError(false);
            }}}
            />
          </LocalizationProvider>
        )}
        {!isIncome && (
          <FormControl fullWidth sx={{ marginTop: "20px" }}>
            <InputLabel id="categoryLabel"> Transaction Category </InputLabel>
            <Select
              id="category-select"
              value={category}
              onChange={handleCategoryChange}
              labelId="categoryLabel"
              label="Transaction Category"
              required
            >
              {categoryList.map((category) => (
                <MenuItem
                  key={category.category_id}
                  value={category.category_name}
                >
                  {" "}
                  {category.category_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <Button onClick={handleClose} sx={{ marginTop: "20px" }}>
          {" "}
          Cancel{" "}
        </Button>
        <Button type="submit" disabled={error} sx={{ marginTop: "20px" }}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default TransactionModal;
