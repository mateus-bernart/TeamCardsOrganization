export const initialColaboradoresState = [];

export const colaboradoresReducer = (estado, acao) => {
  switch (acao.tipo) {
    case "SET_COLABORADORES":
      return acao.payload;

    case "ADD_COLABORADOR":
      return [...estado, acao.payload];

    case "DELETE_COLABORADOR":
      return estado.filter((colaborador) => colaborador.nome !== acao.payload);

    case "TOGGLE_FAVORITO":
      return estado.map((colaborador) =>
        colaborador.id === acao.payload
          ? { ...colaborador, favorito: !colaborador.favorito }
          : colaborador
      );

    default:
      throw new Error(`Unhandled action type: ${acao.tipo}`);
  }
};

export default colaboradoresReducer;
