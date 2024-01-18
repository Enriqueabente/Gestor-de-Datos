import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/globalContext";

function History() {
  const { transactionHistory } = useGlobalContext();

  const [...history] = transactionHistory();

  return (
    <HistoryStyled>
      <h2>Historial</h2>
      {history.map((item) => {
        const { id, title, amount, type, possitive } = item;
        return (
          <div key={id} className="history-item">
            <p
              style={{
                color: possitive === false ? "red" : "var(--color-green)",
              }}
            >
              {title}
            </p>

            <p
              style={{
                color: possitive === false ? "red" : "var(--color-green)",
              }}
            >
              {possitive === false
                ? `-${amount <= 0 ? 0 : amount.toLocaleString()}`
                : `+${amount <= 0 ? 0 : amount.toLocaleString()}`}
            </p>
          </div>
        );
      })}
    </HistoryStyled>
  );
}

const HistoryStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .history-item {
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export default History;
