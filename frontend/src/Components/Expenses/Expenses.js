import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import IncomeItem from "../IncomeItem/IncomeItem";
import ExpenseForm from "./ExpenseForm";

function Expenses() {
  const {
    expensesPagina,
    expensesCount,
    expenses,
    getExpenses,
    deleteExpense,
    totalExpenses,
  } = useGlobalContext();

  let pages = Math.ceil(expensesCount / 10);

  const [filteredExpenses, setFilteredExpenses] = useState([]);

  useEffect(() => {
    getExpenses(1);
  }, []);

  const [searchString, setsearchString] = useState("");

  const setSearch = (val) => {
    let newFilteredExpenses = [];
    expenses.map((expense) => {
      if (expense.title.toLowerCase().indexOf(val.toLowerCase()) > -1) {
        newFilteredExpenses.push(expense);
      }
    });
    setFilteredExpenses(newFilteredExpenses);
  };

  const clearSearch = () => {
    setsearchString("");
    setFilteredExpenses([]);
  };

  return (
    <ExpenseStyled>
      <InnerLayout>
        <h1>Egresos</h1>
        <h2 className="total-income">
          Egresos Totales: <span>${totalExpenses().toLocaleString()}</span>
        </h2>
        <div className="income-content">
          <div className="form-container">
            <ExpenseForm />
          </div>
          <div className="incomes">
            <div
              style={{
                margin: "10px",
              }}
            >
              <input
                onChange={(e) => setsearchString(e.target.value)}
                style={{
                  padding: "10px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(255,255,255,0.7)",
                  border: "none",
                  width: "85%",
                }}
                type="text"
                placeholder="Realizar Búsqueda"
                value={searchString}
              />
              <button
                style={{ padding: 6, margin: 3, borderRadius: 6 }}
                onClick={() => setSearch(searchString)}
              >
                Buscar
              </button>
              <button
                style={{ padding: 6, margin: 3, borderRadius: 6 }}
                onClick={clearSearch}
              >
                X
              </button>
            </div>
            {filteredExpenses.length > 0 &&
              filteredExpenses.map((expense) => {
                const {
                  id,
                  title,
                  amount,
                  date,
                  category,
                  description,
                  type,
                  files,
                } = expense;

                return (
                  <IncomeItem
                    key={id}
                    id={id}
                    title={title}
                    description={description}
                    amount={amount}
                    date={date}
                    type={type}
                    category={category}
                    indicatorColor="var(--color-green)"
                    deleteItem={deleteExpense}
                    filePath={files}
                  />
                );
              })}
            {expenses.length > 0 &&
              filteredExpenses.length == 0 &&
              expenses.map((expense) => {
                const {
                  id,
                  title,
                  amount,
                  date,
                  category,
                  description,
                  type,
                  files,
                } = expense;

                return (
                  <IncomeItem
                    key={id}
                    id={id}
                    title={title}
                    description={description}
                    amount={amount}
                    date={date}
                    type={type}
                    category={category}
                    indicatorColor="var(--color-green)"
                    deleteItem={deleteExpense}
                    filePath={files}
                  />
                );
              })}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div>
                <p style={{ color: "black", fontSize: "45px" }}>
                  {"Total registros: " + expensesCount}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  width: "40%",
                }}
              >
                {expensesPagina > 1 && (
                  <button
                    style={{
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                      fontSize: "35px",
                      borderRadius: "1rem",
                    }}
                    onClick={() => getExpenses(expensesPagina - 1)}
                  >
                    Retroceso
                  </button>
                )}
                <p
                  style={{
                    color: "black",
                    fontSize: "45px",
                    cursor: "default",
                    marginLeft: "25px",
                    marginRight: "25px",
                    border: "1px solid black",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    borderRadius: "1rem",
                  }}
                >
                  {"Página: " + expensesPagina}
                </p>
                {expensesPagina == pages ? (
                  ""
                ) : (
                  <button
                    style={{
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                      fontSize: "35px",
                      borderRadius: "1rem",
                    }}
                    onClick={() => getExpenses(expensesPagina + 1)}
                  >
                    Siguiente
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </InnerLayout>
    </ExpenseStyled>
  );
}

const ExpenseStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }
  .income-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    .incomes {
      flex: 1;
    }
  }
`;

export default Expenses;
