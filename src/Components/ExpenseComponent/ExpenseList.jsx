import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  getAllExpenses,
  deleteExpenseById,
} from "../../Services/ExpenseService";

import "../../DisplayView.css";

const ExpenseList = () => {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);

  const loadExpenses = () => {
    getAllExpenses()
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

  const removeExpense = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      deleteExpenseById(id).then(() => {
        setExpenses(expenses.filter((item) => item.expenseId !== id));
      });
    }
  };

  const returnBack = () => {
    navigate("/farmer-menu");
  };

  return (
    <div>
      <div className="container">
        <div
          className="card shadow-lg border-0 rounded-4"
          style={{ width: "80%", height: "auto" }}
        >
          <div className="card-header bg-success text-white text-center">
            <h3
              className="mb-0"
              style={{ color: "white", fontWeight: "bold" }}
            >
              Expense Item List
            </h3>
          </div>

          <div className="card-body">

            <div className="table-responsive">

              <table className="table table-bordered table-hover text-center align-middle">

                <thead className="table-success">
                  <tr>
                    <th>Expense ID</th>
                    <th>Expense Name</th>
                    <th>Unit</th>
                    <th>Cost Per Unit</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {expenses.length > 0 ? (
                    expenses.map((expense) => (
                      <tr key={expense.expenseId}>
                        <td>{expense.expenseId}</td>
                        <td>{expense.expenseName}</td>
                        <td>{expense.unitName}</td>
                        <td>{expense.ratePerUnit}</td>

                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              removeExpense(expense.expenseId)
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">
                        No Expenses Available
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>

            </div>

            <div className="text-center mt-3">
              <button
                className="btn btn-warning"
                onClick={returnBack}
              >
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