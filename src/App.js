import { useEffect, useState } from "react";
import Banner from "./componentes/Banner";
import Formulario from "./componentes/Formulario";
import Rodape from "./componentes/Rodape";
import Time from "./componentes/Time";
import { v4 as uuidv4 } from "uuid";

function App() {
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

  // const inicial = [
  //   {
  //     id: uuidv4(),
  //     nome: "Mateus Bernart",
  //     cargo: "Dev",
  //     imagem: "https://github.com/mateus-bernart.png",
  //     time: times[0].nome,
  //     favorito: false,
  //   },
  // ];

  const [colaboradores, setColaboradores] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/colaboradores")
      .then((resposta) => resposta.json())
      .then((dados) => {
        setColaboradores(dados);
      });
  }, []);

  function deletarColaborador(nome) {
    setColaboradores(
      colaboradores.filter((colaborador) => colaborador.nome !== nome)
    );
  }

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

  function resolverFavorito(id) {
    setColaboradores(
      colaboradores.map((colaborador) => {
        if (colaborador.id === id) {
          colaborador.favorito = !colaborador.favorito;
        }
        return colaborador;
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
      <Banner />
      {formularioVisivel ? (
        <Formulario
          aoCriarTime={cadastrarTime}
          times={times.map((time) => time.nome)}
          aoCadastrar={(colaborador) =>
            setColaboradores([...colaboradores, colaborador])
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
            aoFavoritar={resolverFavorito}
            mudarCor={mudarCor}
            key={indice}
            time={time}
            colaboradores={colaboradores.filter(
              (colaborador) => colaborador.time === time.nome
            )}
            aoDeletar={deletarColaborador}
          />
        ))}
      </section>
      <Rodape />
    </div>
  );
}

export default App;
