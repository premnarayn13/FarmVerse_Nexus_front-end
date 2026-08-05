import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  addExpense,
  generateExpenseId,
} from "../../Services/ExpenseService";
import "../FarmCropComponent/FarmEntry.css";

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
    generateExpenseId().then((response) => {
      setNewId(response.data);
    });
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

    addExpense(payload)
      .then(() => {
        setSaving(false);
        setFlag(true);
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
      tempErrors.expenseName = "Expense name is required";
      isValid = false;
    }

    if (!expense.unitName.trim()) {
      tempErrors.unitName = "Unit name is required";
      isValid = false;
    }

    if (
      expense.ratePerUnit === "" ||
      Number(expense.ratePerUnit) <= 0
    ) {
      tempErrors.ratePerUnit = "Enter valid rate";
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
      expenseId: "",
      expenseName: "",
      unitName: "",
      ratePerUnit: "",
    });
  };

  const returnBack = () => {
    navigate("/farmer-menu");
  };

  return (
    <div className="farm-entry-page">
      <div className="farm-entry-wrap">
        <div className="farm-card">

          <div className="farm-card-scene">
            <div className="farm-sun"></div>

            <svg
              className="farm-hills"
              viewBox="0 0 400 90"
              preserveAspectRatio="none"
            >
              <path
                d="M0,90 L0,55 C60,20 100,70 160,45 C220,20 260,60 400,30 L400,90 Z"
                className="farm-hill farm-hill-back"
              />

              <path
                d="M0,90 L0,70 C80,40 140,80 210,55 C280,30 320,65 400,50 L400,90 Z"
                className="farm-hill farm-hill-front"
              />
            </svg>
          </div>

          <div className="farm-card-header">
            <span className="farm-eyebrow">
              Expense Records
            </span>

            <h3 className="farm-title">
              New Expense Entry
            </h3>

            <p className="farm-subtitle">
              Add expense items used in agriculture.
            </p>
          </div>

          <div className="farm-card-body">

            <form>

              <div className="farm-field">
                <label className="farm-label">
                  Expense ID
                </label>

                <input
                  className="farm-input farm-input-readonly"
                  value={newId}
                  readOnly
                />
              </div>

              <div className="farm-field">
                <label className="farm-label">
                  Expense Name
                </label>

                <input
                  className={`farm-input ${
                    errors.expenseName ? "has-error" : ""
                  }`}
                  name="expenseName"
                  value={expense.expenseName}
                  onChange={onChangeHandler}
                  placeholder="Example : Fertilizer"
                />

                {errors.expenseName && (
                  <small className="farm-error">
                    {errors.expenseName}
                  </small>
                )}
              </div>

              <div className="farm-field">
                <label className="farm-label">
                  Unit Name
                </label>

                <input
                  className={`farm-input ${
                    errors.unitName ? "has-error" : ""
                  }`}
                  name="unitName"
                  value={expense.unitName}
                  onChange={onChangeHandler}
                  placeholder="Example : Kg, Litre, Hour"
                />

                {errors.unitName && (
                  <small className="farm-error">
                    {errors.unitName}
                  </small>
                )}
              </div>

              <div className="farm-field">
                <label className="farm-label">
                  Cost Per Unit
                </label>

                <input
                  type="number"
                  className={`farm-input ${
                    errors.ratePerUnit ? "has-error" : ""
                  }`}
                  name="ratePerUnit"
                  value={expense.ratePerUnit}
                  onChange={onChangeHandler}
                  placeholder="Enter Cost"
                />

                {errors.ratePerUnit && (
                  <small className="farm-error">
                    {errors.ratePerUnit}
                  </small>
                )}
              </div>

              <div className="farm-actions">

                <button
                  type="button"
                  className="farm-btn farm-btn-primary"
                  onClick={handleValidation}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <span className="farm-spinner"></span>
                      Saving...
                    </>
                  ) : (
                    <>Save</>
                  )}
                </button>

                <button
                  type="button"
                  className="farm-btn farm-btn-ghost"
                  onClick={clearAll}
                >
                  Reset
                </button>

                <button
                  type="button"
                  className="farm-btn farm-btn-outline"
                  onClick={returnBack}
                >
                  Back
                </button>

              </div>

            </form>

            {flag && (
              <div className="farm-toast">
                Expense Added Successfully!
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default ExpenseEntry;