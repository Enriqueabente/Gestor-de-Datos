import React, { useState } from "react";
import styled from "styled-components";
import { dateFormat } from "../../utils/dateFormat";
import DatePicker from "react-datepicker";
import {
  bitcoin,
  book,
  calender,
  card,
  circle,
  clothing,
  comment,
  dollar,
  food,
  freelance,
  medical,
  money,
  piggy,
  stocks,
  takeaway,
  trash,
  tv,
  users,
  yt,
  eye,
  edit,
} from "../../utils/Icons";
import Button from "../Button/Button";
import EditForm from "../Form/EditForm";
import { useGlobalContext } from "../../context/globalContext";

function IncomeItem(data) {
  const { updateIncome, error, setError } = useGlobalContext();
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [inputState, setInputState] = useState({
    title: data.title,
    amount: data.amount,
    date: data.date,
    category: data.category,
    description: data.description,
  });

  const { title, amount, date, category, description } = inputState;

  if (viewModal != false) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
          left: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.3)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <p
          onClick={() => setViewModal(false)}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            color: "white",
            fontSize: "35px",
            cursor: "pointer",
            zIndex: 9,
          }}
        >
          X
        </p>
        <iframe
          src={"http://localhost:8000" + viewModal.substring(1)}
          style={{ width: "80%", height: "80%" }}
        ></iframe>
      </div>
    );
  }

  const handleInput = (name) => (e) => {
    setInputState({
      ...inputState,
      [name]: !!e.target.files ? e.target.files[0] : e.target.value,
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    Object.keys(inputState).map((i) => {
      let value = inputState[i];
      formData.append(i, value);
    });
    formData.append("id", data.id);
    updateIncome(formData);
    setEditModal(false);
  };

  if (editModal != false) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
          left: 0,
          bottom: 0,
          backgroundColor: "#e0dede",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "25px" }}>
          <p style={{ fontSize: "45px", color: "#000" }}>Editar Registro</p>
        </div>
        <div style={{ paddingLeft: "25px" }}>
          <FormStyled
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "start",
              alignItems: "center",
            }}
            onSubmit={handleSubmit}
          >
            {error && <p className="error">{error}</p>}
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
                value={amount.toLocaleString()}
                type="text"
                name={"amount"}
                placeholder={"Monto"}
                onChange={handleInput("amount")}
              />
            </div>
            <div className="input-control">
              <DatePicker
                id="date"
                placeholderText="Fecha"
                value={JSON.stringify(date)}
                dateFormat="dd/mm/yyyy"
                onChange={(date) => {
                  setInputState({ ...inputState, date: date });
                }}
              />
            </div>
            <div className="selects input-control">
              <select
                required
                value={category}
                name="category"
                id="category"
                onChange={handleInput("category")}
              >
                <option value="" disabled>
                  Seleccionar Tipo
                </option>
                <option value="salary">Salario</option>
                <option value="freelancing">Freelancing</option>
                <option value="investments">Inversiones</option>
                <option value="bitcoin">Bitcoin</option>
                <option value="bank">Transferencia Bancaria</option>
                <option value="youtube">Youtube</option>
                <option value="other">Otro</option>
              </select>
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

            <div className="submit-btn">
              <Button
                name={"Guardar Cambios"}
                icon={edit}
                bPad={".8rem 1.6rem"}
                bRad={"30px"}
                bg={"var(--color-accent"}
                color={"#fff"}
              />
            </div>
          </FormStyled>
        </div>
        <div style={{ width: "100%", textAlign: "center", padding: "50px" }}>
          <button
            style={{ width: "20%", padding: "10px" }}
            onClick={() => setEditModal(false)}
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  const categoryIcon = () => {
    switch (data.category) {
      case "salary":
        return money;
      case "freelancing":
        return freelance;
      case "investments":
        return stocks;
      case "stocks":
        return users;
      case "bitcoin":
        return bitcoin;
      case "bank":
        return card;
      case "youtube":
        return yt;
      case "other":
        return piggy;
      default:
        return money;
    }
  };

  const expenseCatIcon = () => {
    switch (data.category) {
      case "education":
        return book;
      case "groceries":
        return food;
      case "health":
        return medical;
      case "subscriptions":
        return tv;
      case "takeaways":
        return takeaway;
      case "clothing":
        return clothing;
      case "travelling":
        return freelance;
      case "other":
        return circle;
      default:
        return money;
    }
  };

  return (
    <IncomeItemStyled indicator={data.indicatorColor}>
      <div
        style={{
          border: "2px solid black",
        }}
        className="icon"
      >
        {data.type === "expense" ? expenseCatIcon() : categoryIcon()}
      </div>
      <div className="content">
        {editModal == false && (
          <div className="text">
            <h5>{data.title}</h5>
            <p>
              {dollar} {data.amount.toLocaleString()}
            </p>
            <p>
              {calender} {dateFormat(data.date)}
            </p>
            {!!data.description && (
              <p>
                {comment}
                {data.description}
              </p>
            )}
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "end",
            width: "50%",
          }}
          className="btn-con"
        >
          {data.filePath.map((i, idx) => {
            let imageIndex = idx + 1;
            return (
              <div
                key={idx}
                style={{
                  margin: "10px",
                }}
              >
                <Button
                  icon={eye}
                  bPad={"15px"}
                  bRad={"5px"}
                  bg={"var(--primary-color"}
                  color={"#fff"}
                  iColor={"#fff"}
                  hColor={"var(--color-green)"}
                  onClick={() => setViewModal(i.path)}
                  name={i.type + ": " + imageIndex}
                />
              </div>
            );
          })}
          <div
            style={{
              marginLeft: "10px",
            }}
          >
            {/* <Button
              icon={edit}
              bPad={"1rem"}
              bRad={"50%"}
              bg={"var(--primary-color"}
              color={"#fff"}
              iColor={"#fff"}
              hColor={"var(--color-green)"}
              onClick={() => setEditModal(true)}
            /> */}
            <Button
              icon={trash}
              bPad={"1rem"}
              bRad={"50%"}
              bg={"var(--primary-color"}
              color={"#fff"}
              iColor={"#fff"}
              hColor={"var(--color-green)"}
              onClick={() => data.deleteItem(data.id)}
            />
          </div>
        </div>
      </div>
    </IncomeItemStyled>
  );
}

const IncomeItemStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #a1a1a1;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 3rem;
  width: 100%;
  color: #222260;
  .icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ffffff;
    i {
      font-size: 2.6rem;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 0.2rem;
    h5 {
      font-size: 1.3rem;
      padding-left: 2rem;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background: ${(props) => props.indicator};
      }
    }
  }
`;

const FormStyled = styled.form`
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

export default IncomeItem;
