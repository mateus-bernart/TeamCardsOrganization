import { IColaborador } from "../../compartilhado/interfaces/IColaboradores";
import "./colaborador.css";
import { AiFillHeart, AiOutlineHeart, AiFillCloseCircle } from "react-icons/ai";
import React from "react";

interface ColaboradorProps {
  colaborador: IColaborador;
  corDeFundo: string;
  aoDeletar: (valor: string) => void;
  aoFavoritar: (valor: string | undefined) => void;
}

const Colaborador = ({
  colaborador,
  corDeFundo,
  aoDeletar,
  aoFavoritar,
}: ColaboradorProps) => {
  function favoritar() {
    aoFavoritar(colaborador.id);
  }

  const propsFavorito = {
    size: 25,
    onClick: favoritar,
  };

  return (
    <div className="colaborador">
      <AiFillCloseCircle
        size={25}
        className="deletar"
        onClick={() => aoDeletar(colaborador.nome)}
      />
      <div className="cabecalho" style={{ backgroundColor: corDeFundo }}>
        <img src={colaborador.imagem} alt={colaborador.nome} />
      </div>
      <div className="rodape">
        <h4>{colaborador.nome}</h4>
        <h5>{colaborador.cargo}</h5>
        <div className="favoritar">
          {colaborador.favorito ? (
            <AiFillHeart {...propsFavorito} color="red" />
          ) : (
            <AiOutlineHeart {...propsFavorito} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Colaborador;
