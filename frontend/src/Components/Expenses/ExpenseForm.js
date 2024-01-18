import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../context/globalContext";
import Button from "../Button/Button";
import { plus } from "../../utils/Icons";

function ExpenseForm() {
  const { addExpense, error, setError } = useGlobalContext();
  const [inputState, setInputState] = useState({
    category: "",
    date: "",
    destination: "",
    title: "",
    amount: "",
    description: "",
    file: "",
  });

  const { category, date, destination, title, amount, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({
      ...inputState,
      [name]: !!e.target.files ? e.target.files[0] : e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    Object.keys(inputState).map((i) => {
      let value = inputState[i];
      formData.append(i, value);
    });
    addExpense(formData);
    setInputState({
      title: "",
      amount: "",
      date: "",
      category: "",
      description: "",
      destination: "",
    });
  };

  return (
    <ExpenseFormStyled style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "start", alignItems: "center"}} onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <div className="selects input-control">
        <select
          required
          value={category}
          name="category"
          id="category"
          onChange={handleInput("category")}
        >
          <option value="" disabled>
            Tipo de pago
          </option>
          <option value="Efectivo">Efectivo</option>
          <option value="Tarjeta">Tarjeta</option>
          <option value="Transferencia">Transferencia</option>
        </select>
      </div>
      <div className="input-control">
        <DatePicker
          id="date"
          placeholderText="Fecha"
          selected={date}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => {
            setInputState({ ...inputState, date: date });
          }}
        />
      </div>
      <div className="input-control">
        <input
          type="text"
          value={destination}
          name={"destination"}
          placeholder="Destinatario"
          onChange={handleInput("destination")}
        />
      </div>
      <div className="input-control">
        <input
          type="text"
          value={title}
          name={"title"}
          placeholder="Concepto"
          onChange={handleInput("title")}
        />
      </div>
      <div className="input-control">
        <input
          value={amount}
          type="text"
          name={"amount"}
          placeholder={"Monto"}
          onChange={handleInput("amount")}
        />
      </div>
      <div className="input-control">
        <textarea
          name="description"
          value={description}
          placeholder="Haga un Comentario"
          id="description"
          cols="30"
          rows="4"
          onChange={handleInput("description")}
        ></textarea>
      </div>
      <div className="input-control">
        <p>Adjuntar Ticket/Factura</p>
        <input type="file" onChange={handleInput("comprobante")} />
      </div>
      <div className="submit-btn">
        <Button
          name={"Agregar Egreso"}
          icon={plus}
          bPad={".8rem 1.6rem"}
          bRad={"30px"}
          bg={"var(--color-accent"}
          color={"#fff"}
        />
      </div>
    </ExpenseFormStyled>
  );
}

const ExpenseFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  input,
  textarea,
  select {
    width: 350px;
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }
  .input-control {
    input {
      width: 350px;
    }
    p {
      font-size: 1.5rem;
      padding-bottom: 10px;
    }
  }

  .selects {
    select {
      width: 350px;
      color: rgba(34, 34, 96, 0.4);
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;
export default ExpenseForm;
