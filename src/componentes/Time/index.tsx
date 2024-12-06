import Colaborador from "../Colaborador";
import hexToRgba from "hex-to-rgba";
import "./time.css";
import React from "react";
import { IColaborador } from "../../compartilhado/interfaces/IColaboradores";
import { ITime } from "../../compartilhado/interfaces/ITimes";

interface TimeProps {
  aoDeletar: (valor: string) => void;
  time: ITime;
  colaboradores: IColaborador[];
  mudarCor: (cor: string, id: number | undefined) => void;
  aoFavoritar: (valor: string | undefined) => void;
}

const Time = ({
  time,
  colaboradores,
  aoDeletar,
  mudarCor,
  aoFavoritar,
}: TimeProps) => {
  return (
    colaboradores.length > 0 && (
      <section
        className="time"
        style={{
          backgroundImage: "url(/imagens/fundo.png)",
          backgroundColor: hexToRgba(time.cor, "0.6"),
        }}
      >
        <input
          type="color"
          className="input-cor"
          value={time.cor}
          onChange={(evento) => {
            mudarCor(evento.target.value, time.id);
          }}
        />
        <h3 style={{ borderColor: time.cor }}>{time.nome}</h3>
        <div className="colaboradores">
          {colaboradores.map((colaborador, indice) => (
            <Colaborador
              aoFavoritar={aoFavoritar}
              key={indice}
              colaborador={colaborador}
              corDeFundo={time.cor}
              aoDeletar={aoDeletar}
            />
          ))}
        </div>
      </section>
    )
  );
};

export default Time;
