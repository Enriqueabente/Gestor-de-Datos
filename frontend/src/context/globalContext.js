import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomesPagina, setIncomesPagina] = useState(1);
  const [expensesPagina, setExpensesPagina] = useState(1);
  const [incomes, setIncomes] = useState([]);
  const [incomesCount, setIncomesCount] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expensesCount, setExpensesCount] = useState(0);
  const [error, setError] = useState(null);

  //calculate incomes
  const addIncome = async (income) => {
    await axios
      .post(`${BASE_URL}add-income`, income, {
        headers: {
          "content-ype": "multipart/form-data",
        },
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    await getIncomes(1);
  };

  const updateIncome = async (income) => {
    await axios
      .post(`${BASE_URL}update-income`, income, {
        headers: {
          "content-ype": "multipart/form-data",
        },
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    await getIncomes();
  };

  const getIncomes = async (pagina) => {
    const response = await axios.get(`${BASE_URL}get-incomes?pagina=${pagina}`);
    setIncomes(response.data.builtData);
    setIncomesCount(response.data.count);
    setIncomesPagina(parseInt(response.data.pagina));
  };

  const deleteIncome = async (id) => {
    await axios.delete(`${BASE_URL}delete-income/${id}`);
    await getIncomes(1);
  };

  const totalIncome = () => {
    let totalIncome = 0;

    if (incomes.length > 0) {
      incomes.forEach((income) => {
        totalIncome = totalIncome + income.amount;
      });
    }

    return totalIncome;
  };

  //calculate incomes
  const addExpense = async (income) => {
    await axios
      .post(`${BASE_URL}add-expense`, income, {
        headers: {
          "content-ype": "multipart/form-data",
        },
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    getExpenses(1);
  };

  const getExpenses = async (pagina) => {
    const response = await axios.get(
      `${BASE_URL}get-expenses?pagina=${pagina}`
    );
    setExpenses(response.data.builtData);
    setExpensesCount(response.data.count);
    setExpensesPagina(parseInt(response.data.pagina));
  };

  const deleteExpense = async (id) => {
    const res = await axios.delete(`${BASE_URL}delete-expense/${id}`);
    getExpenses(1);
  };

  const totalExpenses = () => {
    let totalIncome = 0;

    if (expenses.length > 0) {
      expenses.forEach((income) => {
        totalIncome = totalIncome + income.amount;
      });
    }

    return totalIncome;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    let new_incomes =
      incomes.length > 0
        ? incomes.map((i) => {
            return { ...i, possitive: true };
          })
        : [];
    let new_expenses =
      expenses.length > 0
        ? expenses.map((i) => {
            return { ...i, possitive: false };
          })
        : [];
    const history = [...new_incomes, ...new_expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        updateIncome,
        getIncomes,
        incomes,
        incomesCount,
        incomesPagina,
        deleteIncome,
        expenses,
        expensesCount,
        expensesPagina,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
