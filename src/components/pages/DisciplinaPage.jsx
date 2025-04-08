import React, { useState } from "react";
import "@styles/disciplinaPage.css";

const conteudos = {
  "Introdução à Disciplina": {
    videos: ["https://www.youtube.com/embed/vVGTZLnnpdM"],
    questoes: [
      "O que são sistemas digitais?",
      "Qual a diferença entre lógica booleana e lógica comum?"
    ],
    slides: ["https://drive.google.com/file/d/1ZAx/view"],
    links: [
      { url: "https://www.inf.ufpe.br/~if675/", texto: "Página da disciplina IF675" }
    ]
  },
  "Conceitos Fundamentais": {
    videos: ["https://www.youtube.com/embed/6z7GQewK-Ks"],
    questoes: [
      "Explique o funcionamento de portas lógicas AND e OR.",
      "Como os flip-flops são utilizados em circuitos?"
    ],
    slides: ["https://drive.google.com/file/d/1YMg/view"],
    links: [
      { url: "https://pt.wikipedia.org/wiki/Porta_l%C3%B3gica", texto: "Artigo sobre portas lógicas" }
    ]
  },
  "Álgebra Booleana": {
    videos: ["https://www.youtube.com/embed/3X9w5z8z2cM"],
    questoes: [
      "Quais são as principais leis da álgebra booleana?",
      "Como simplificar expressões booleanas utilizando mapas de Karnaugh?"
    ],
    slides: ["https://drive.google.com/file/d/1Booleana/view"],
    links: [
      { url: "https://pt.wikipedia.org/wiki/%C3%81lgebra_booleana", texto: "Wikipedia - Álgebra Booleana" }
    ]
  },
  "Circuitos Combinacionais": {
    videos: ["https://www.youtube.com/embed/4circuitos"],
    questoes: [
      "O que são circuitos combinacionais?",
      "Explique o funcionamento de um multiplexador e de um demultiplexador."
    ],
    slides: ["https://drive.google.com/file/d/1Circuitos/view"],
    links: [
      {
        url: "https://www.tutorialspoint.com/digital_circuits/digital_circuits_combinational_circuits.htm",
        texto: "TutorialsPoint - Circuitos Combinacionais"
      }
    ]
  },
  "Circuitos Sequenciais": {
    videos: ["https://www.youtube.com/embed/5sequenciais"],
    questoes: [
      "Qual a diferença entre circuitos combinacionais e sequenciais?",
      "Como os registradores são utilizados em circuitos sequenciais?"
    ],
    slides: ["https://drive.google.com/file/d/1Sequenciais/view"],
    links: [
      { url: "https://pt.wikipedia.org/wiki/Circuito_sequencial", texto: "Wikipedia - Circuito Sequencial" }
    ]
  },
  "Memórias Digitais": {
    videos: ["https://www.youtube.com/embed/6memorias"],
    questoes: [
      "Quais são os principais tipos de memórias digitais?",
      "Explique o funcionamento de uma memória RAM."
    ],
    slides: ["https://drive.google.com/file/d/1Memorias/view"],
    links: [
      {
        url: "https://pt.wikipedia.org/wiki/Mem%C3%B3ria_(inform%C3%A1tica)",
        texto: "Wikipedia - Memória (Informática)"
      }
    ]
  },
  "Introdução a Microcontroladores": {
    videos: ["https://www.youtube.com/embed/7microcontroladores"],
    questoes: [
      "O que é um microcontrolador e como ele difere de um microprocessador?",
      "Quais são as principais aplicações de microcontroladores?"
    ],
    slides: ["https://drive.google.com/file/d/1Microcontroladores/view"],
    links: [
      {
        url: "https://pt.wikipedia.org/wiki/Microcontrolador",
        texto: "Wikipedia - Microcontrolador"
      }
    ]
  }
};

const abas = ["Vídeos", "Questões", "Documentos", "Links"];

export default function SistemasDigitais() {
  const [conteudoSelecionado, setConteudoSelecionado] = useState("Introdução à Disciplina");
  const [abaAtiva, setAbaAtiva] = useState("Vídeos");
  const [mostrarListaExercicios, setMostrarListaExercicios] = useState(false);

  const material = conteudos[conteudoSelecionado];

  return (
    <div className="page-wrapper">
      <aside className="sidebar">
        <h1 className="titulo">Sistemas Digitais</h1>
        <header className="disciplina-header">
          <p><strong>Código:</strong> CIN1234</p>
          <p><strong>Professor:</strong> Professor Cristiano</p>
        </header>

        <h3>Conteúdos</h3>
        {Object.keys(conteudos).map((nome) => (
          <button
            key={nome}
            onClick={() => {
              setConteudoSelecionado(nome);
              setMostrarListaExercicios(false);
            }}
            className={`sidebar-button ${conteudoSelecionado === nome ? "active" : ""}`}
          >
            {nome}
          </button>
        ))}

        <h3 className="sidebar-section">Provas e Listas</h3>
        <button
          className={`sidebar-button ${mostrarListaExercicios ? "active" : ""}`}
          onClick={() => setMostrarListaExercicios(true)}
        >
          Lista de Exercícios
        </button>
      </aside>

    
  {/* ✅ Novo container para agrupar tudo */}
  <div className="conteudo-container">
    {!mostrarListaExercicios && (
      <div className="tabs">
        {abas.map((aba) => (
          <button
            key={aba}
            onClick={() => setAbaAtiva(aba)}
            className={`tab-button ${abaAtiva === aba ? "active" : ""}`}
          >
            {aba}
          </button>
        ))}
      </div>
    )}

    <div className="content-display">
      {mostrarListaExercicios ? (
        <>
          <h2>📎 Lista de Exercícios</h2>
          <p>Acesse o documento no link abaixo:</p>
          <a
            href="https://docs.google.com/document/d/1jVcxJdn4XyiLgnGd8vKi4LPy0uEZK1_vlOCB6wj7OzA/edit"
            target="_blank"
            rel="noopener noreferrer"
            className="lista-link"
          >
            Abrir Documento .docx no Google Docs
          </a>
        </>
      ) : (
        <>
          <h2>{conteudoSelecionado}</h2>

          {abaAtiva === "Vídeos" && (
            <div className="video-section">
              {material.videos.map((url, idx) => (
                <div key={idx} className="video-frame">
                  <iframe src={url} allowFullScreen title={`video-${idx}`} />
                </div>
              ))}
            </div>
          )}

          {abaAtiva === "Questões" && (
            <ul className="text-list">
              {material.questoes.map((q, idx) => (
                <li key={idx}>{q}</li>
              ))}
            </ul>
          )}

          {abaAtiva === "Documentos" && (
            <ul className="text-list">
              {material.slides.map((s, idx) => (
                <li key={idx}>
                  <a href={s} target="_blank" rel="noopener noreferrer">
                    Ver slide {idx + 1}
                  </a>
                </li>
              ))}
            </ul>
          )}

          {abaAtiva === "Links" && (
            <ul className="text-list">
              {material.links.map((link, idx) => (
                <li key={idx}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.texto}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  </div>
</div>
  );
}