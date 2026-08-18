import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getAllAgroExpenses,
  deleteAgroExpense,
} from "../../Services/AgroExpenseService";

import farmBg from "../../assets/bg.png";

import "../../CSS/ExpenseListCss.css";

const ExpenseList = () => {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);

  // Load expenses
  const loadExpenses = () => {
    getAllAgroExpenses()
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  // Delete expense
  const removeExpense = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      deleteAgroExpense(id)
        .then(() => {
          setExpenses((prev) =>
            prev.filter((expense) => expense.expenseId !== id),
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // Back
  const returnBack = () => {
    navigate("/farmer-menu");
  };

  return (
    <div
      className="expense-list-page"
      style={{
        backgroundImage: `url(${farmBg})`,
      }}
    >
      {/* Background Overlay */}
      <div className="expense-list-overlay"></div>

      {/* Main Content */}
      <div className="expense-list-container">
        {/* Panel */}
        <div className="expense-list-panel">
          {/* Header */}
          <div className="expense-list-header">
            <div className="expense-list-icon">
              <i className="bi bi-cash-stack"></i>
            </div>

            <div>
              <h2>Expense Item List</h2>

              <p>Manage agriculture expense items</p>
            </div>
          </div>

          {/* Table Section */}
          <div className="expense-list-body">
            <div className="expense-table-wrapper">
              <table className="expense-table">
                <thead>
                  <tr>
                    <th>Expense ID</th>
                    <th>Expense Name</th>
                    <th>Unit</th>
                    <th>Rate Per Unit</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {expenses.length > 0 ? (
                    expenses.map((expense) => (
                      <tr key={expense.expenseId}>
                        <td>
                          <span className="expense-id">
                            {expense.expenseId}
                          </span>
                        </td>

                        <td>
                          <span className="expense-name">
                            {expense.expenseName}
                          </span>
                        </td>

                        <td>
                          <span className="unit-badge">{expense.unitName}</span>
                        </td>

                        <td>
                          <span className="expense-price">
                            ₹ {expense.ratePerUnit}
                          </span>
                        </td>

                        <td>
                          <button
                            type="button"
                            className="delete-expense-btn"
                            onClick={() => removeExpense(expense.expenseId)}
                          >
                            <i className="bi bi-trash"></i>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="no-expenses">
                        <i className="bi bi-inbox"></i>

                        <span>No Expenses Available</span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Back Button */}
            <div className="expense-back-container">
              <button
                type="button"
                className="expense-back-btn"
                onClick={returnBack}
              >
                <i className="bi bi-arrow-left-circle"></i>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;