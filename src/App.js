import { useEffect, useReducer, useState } from "react";
import Banner from "./componentes/Banner";
import Formulario from "./componentes/Formulario";
import Rodape from "./componentes/Rodape";
import Time from "./componentes/Time";
import { v4 as uuidv4 } from "uuid";
import colaboradoresReducer, {
  initialColaboradoresState,
} from "./colaboradoresReducer";

function App() {
  const [colaboradores, dispatchColaboradores] = useReducer(
    colaboradoresReducer,
    initialColaboradoresState
  );

  const [times, setTimes] = useState([
    {
      id: uuidv4(),
      nome: "Programação",
      cor: "#57C278",
    },
    {
      id: uuidv4(),
      nome: "Front-End",
      cor: "#82CFFA",
    },
    {
      id: uuidv4(),
      nome: "Data Science",
      cor: "#A6D157",
    },
    {
      id: uuidv4(),
      nome: "Devops",
      cor: "#E06B69",
    },
    {
      id: uuidv4(),
      nome: "UX e Design",
      cor: "#DB6EBF",
    },
    {
      id: uuidv4(),
      nome: "Mobile",
      cor: "#FFBA05",
    },
    {
      id: uuidv4(),
      nome: "Inovação e Gestão",
      cor: "#FF8A29",
    },
  ]);

  // const [colaboradores, setColaboradores] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/colaboradores")
      .then((resposta) => resposta.json())
      .then((dados) => {
        dispatchColaboradores({ tipo: "SET_COLABORADORES", payload: dados });
      });
  }, []);

  function mudarCor(cor, id) {
    setTimes(
      times.map((time) => {
        if (time.id === id) {
          time.cor = cor;
        }
        return time;
      })
    );
  }

  function cadastrarTime({ nome, cor }) {
    setTimes([...times, { nome, cor, id: uuidv4() }]);
  }

  const [formularioVisivel, setIsFormularioVisivel] = useState(true);

  const toggleEscondeForm = () => {
    setIsFormularioVisivel(!formularioVisivel);
  };

  return (
    <div>
      <Banner
        enderecoImagem="/imagens/banner.png"
        textoAlternativo="Banner pessoas e times"
      />
      {formularioVisivel ? (
        <Formulario
          aoCriarTime={cadastrarTime}
          times={times.map((time) => time.nome)}
          aoCadastrar={(colaborador) =>
            dispatchColaboradores({
              tipo: "ADD_COLABORADOR",
              payload: colaborador,
            })
          }
        />
      ) : (
        ""
      )}

      <section className="times">
        <section className="times-header">
          <h1>Minha organização</h1>
          <img
            src="/imagens/btn-icone.png"
            alt="teste"
            style={{ backgroundColor: "blue", borderRadius: "20px" }}
            onClick={toggleEscondeForm}
          />
        </section>
        {times.map((time, indice) => (
          <Time
            mudarCor={mudarCor}
            key={indice}
            time={time}
            colaboradores={colaboradores.filter(
              (colaborador) => colaborador.time === time.nome
            )}
            aoFavoritar={(id) =>
              dispatchColaboradores({ tipo: "TOGGLE_FAVORITO", payload: id })
            }
            aoDeletar={(nome) =>
              dispatchColaboradores({
                tipo: "DELETE_COLABORADOR",
                payload: nome,
              })
            }
          />
        ))}
      </section>
      <Rodape />
    </div>
  );
}

export default App;
