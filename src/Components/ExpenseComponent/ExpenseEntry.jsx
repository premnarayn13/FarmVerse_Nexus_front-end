import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  addAgroExpense,
  getNewExpenseId,
} from "../../Services/AgroExpenseService";

import farmBg from "../../assets/bg.png";
import "../../CSS/ExpenseEntryCss.css";

const ExpenseEntry = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [flag, setFlag] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newId, setNewId] = useState("");

  const [expense, setExpense] = useState({
    expenseId: "",
    expenseName: "",
    unitName: "",
    ratePerUnit: "",
  });

  useEffect(() => {
    getNewExpenseId()
      .then((response) => {
        setNewId(response.data);

        setExpense((prev) => ({
          ...prev,
          expenseId: response.data,
        }));
      })
      .catch((error) => console.log(error));
  }, []);

  const onChangeHandler = (event) => {
    setFlag(false);

    const { name, value } = event.target;

    setExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveExpense = (event) => {
    event.preventDefault();

    setSaving(true);

    const payload = {
      ...expense,
      expenseId: newId,
    };

    addAgroExpense(payload)
      .then(() => {
        setSaving(false);
        setFlag(true);

        setTimeout(() => {
          navigate("/farmer-menu");
        }, 1500);
      })
      .catch((error) => {
        setSaving(false);
        console.log(error);
      });
  };

  const handleValidation = (event) => {
    event.preventDefault();

    let tempErrors = {};
    let isValid = true;

    if (!expense.expenseName.trim()) {
      tempErrors.expenseName = "Expense Name is required";
      isValid = false;
    }

    if (!expense.unitName.trim()) {
      tempErrors.unitName = "Unit Name is required";
      isValid = false;
    }

    if (expense.ratePerUnit === "" || Number(expense.ratePerUnit) <= 0) {
      tempErrors.ratePerUnit = "Enter valid Cost Per Unit";
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) {
      saveExpense(event);
    }
  };

  const clearAll = () => {
    setErrors({});
    setFlag(false);

    setExpense({
      expenseId: newId,
      expenseName: "",
      unitName: "",
      ratePerUnit: "",
    });
  };

  const returnBack = () => {
    navigate("/farmer-menu");
  };

  return (
    <div
      className="expense-page"
      style={{
        backgroundImage: `url(${farmBg})`,
      }}
    >
      {/* Background Overlay */}
      <div className="expense-overlay"></div>

      {/* Main Card */}
      <div className="expense-card">
        {/* Header */}
        <div className="expense-header">
          <div className="expense-icon">
            <i className="bi bi-cash-stack"></i>
          </div>

          <div>
            <h2>New Expense Entry</h2>
            <p>Record agriculture-related expenses</p>
          </div>
        </div>

        {/* Body */}
        <div className="expense-body">
          {/* Expense ID */}
          <div className="expense-field">
            <label>
              <i className="bi bi-fingerprint"></i>
              Expense ID
            </label>

            <input
              type="text"
              value={newId}
              readOnly
              className="readonly-input"
            />
          </div>

          {/* Expense Name */}
          <div className="expense-field">
            <label>
              <i className="bi bi-receipt"></i>
              Expense Name
            </label>

            <input
              type="text"
              name="expenseName"
              value={expense.expenseName}
              onChange={onChangeHandler}
              placeholder="Example: Fertilizer"
            />

            {errors.expenseName && (
              <small className="expense-error">
                <i className="bi bi-exclamation-circle"></i>
                {errors.expenseName}
              </small>
            )}
          </div>

          {/* Unit Name */}
          <div className="expense-field">
            <label>
              <i className="bi bi-box-seam"></i>
              Unit Name
            </label>

            <input
              type="text"
              name="unitName"
              value={expense.unitName}
              onChange={onChangeHandler}
              placeholder="Example: Kg, Bag, Litre"
            />

            {errors.unitName && (
              <small className="expense-error">
                <i className="bi bi-exclamation-circle"></i>
                {errors.unitName}
              </small>
            )}
          </div>

          {/* Rate */}
          <div className="expense-field">
            <label>
              <i className="bi bi-currency-rupee"></i>
              Cost Per Unit
            </label>

            <div className="price-input">
              <span>₹</span>

              <input
                type="number"
                min="0"
                name="ratePerUnit"
                value={expense.ratePerUnit}
                onChange={onChangeHandler}
                placeholder="Enter cost per unit"
              />
            </div>

            {errors.ratePerUnit && (
              <small className="expense-error">
                <i className="bi bi-exclamation-circle"></i>
                {errors.ratePerUnit}
              </small>
            )}
          </div>

          {/* Buttons */}
          <div className="expense-buttons">
            <button
              type="button"
              className="save-btn"
              onClick={handleValidation}
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Saving...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle me-2"></i>
                  Save Expense
                </>
              )}
            </button>

            <button type="button" className="reset-btn" onClick={clearAll}>
              <i className="bi bi-arrow-clockwise me-2"></i>
              Reset
            </button>

            <button type="button" className="back-btn" onClick={returnBack}>
              <i className="bi bi-arrow-left me-2"></i>
              Back
            </button>
          </div>

          {/* Success */}
          {flag && (
            <div className="expense-success">
              <i className="bi bi-check-circle-fill"></i>

              <div>
                <strong>Expense Added Successfully!</strong>
                <small>Returning to Farmer Menu...</small>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseEntry;