import React from "react";
import "./Conversor.css";
import { useState, useEffect } from "react";

export default function Conversor() {
  const [moedasNomes, setMoedasNomes] = useState();
  const [moedasSiglas, setMoedasSiglas] = useState();
  const [moedaAConverter, setMoedaAConverter] = useState("USD");
  const [moedaConvertida, setMoedaConvertida] = useState("BRL");
  const [quantidade, setQuantidade] = useState(1);
  const [resultado, setResultado] = useState();

  useEffect(() => {
    fetch("https://api.frankfurter.app/currencies")
      .then((resposta) => resposta.json())
      .then((resposta) => {
        setMoedasSiglas(Object.keys(resposta));
        setMoedasNomes(Object.values(resposta));
      });
  }, []);

  useEffect(() => {
    if (quantidade !== "" && quantidade !== "0" && moedaAConverter !== moedaConvertida) {
        fetch(`https://api.frankfurter.app/latest?amount=${quantidade}&from=${moedaAConverter}&to=${moedaConvertida}`)
            .then((resposta) => resposta.json())
            .then((resposta) => {
              setResultado(Object.values(resposta.rates)[0]);
              console.log(Object.values(resposta.rates)[0]);
            });
    }
  }, [quantidade, moedaConvertida, moedaAConverter]);

  return (
    <>
      {moedasNomes !== undefined && moedasSiglas !== undefined ? (
        <div>
          <div className="envolveLabelEInput1">
            <p className="label">Informe o valor: </p>
            <input
              className="inputSelect"
              type="number"
              value={quantidade}
              onChange={(valor) => setQuantidade(valor.target.value)}
            />
          </div>
          <select
            className="inputMoeda1"
            id="opcoes1"
            value={moedaAConverter}
            onChange={(valor) => setMoedaAConverter(valor.target.value)}
          >
            {moedasSiglas.map((moeda, id) => (
              <option key={id} value={moeda}>
                {moedasNomes[id]}
              </option>
            ))}
          </select>
          <select
            className="inputMoeda2"
            id="opcoes2"
            value={moedaConvertida}
            onChange={(valor) => setMoedaConvertida(valor.target.value)}
          >
            {moedasSiglas.map((moeda, id) => (
              <option key={id} value={moeda}>
                {moedasNomes[id]}
              </option>
            ))}
          </select>
          <div className="envolveLabelEInput2">
            <p className="label2">Resultado: </p>
            <p className="pValor" value={resultado}>{resultado}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
