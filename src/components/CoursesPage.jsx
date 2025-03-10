import React from "react";
import "@styles/CursoPage.css";

const courses = {
  "Engenharia da Computação": {
    "1º Período": [
      "MA026 – CÁLCULO DIFERENCIAL E INTEGRAL 1",
      "MA036 – GEOMETRIA ANALÍTICA 1",
      "CIN0001 – INTRODUÇÃO À PROGRAMAÇÃO",
      "CIN0002 – LABORATÓRIO DE PROGRAMAÇÃO 1",
      "CIN0003 – INTRODUÇÃO A COMPUTAÇÃO"
    ],
    "2º Período": [
      "MA027 – CÁLCULO DIFERENCIAL E INTEGRAL 2",
      "CIN0004 – FUNDAMENTOS DE ÁLGEBRA LINEAR",
      "CIN0005 – FUNDAMENTOS DE PROGRAMAÇÃO IMPERATIVA",
      "CIN0006 – LABORATÓRIO DE PROGRAMAÇÃO 2",
      "CIN0007 – SISTEMAS DIGITAIS",
      "CIN0008 – LABORATÓRIO DE SISTEMAS DIGITAIS"
    ],
    "3º Período": [
      "MA128 – CÁLCULO DIFERENCIAL E INTEGRAL 3",
      "FI006 – FÍSICA GERAL 1",
      "CIN0010 – MATEMÁTICA DISCRETA PARA COMPUTAÇÃO",
      "CIN0009 – ALGORITMOS E ESTRUTURA DE DADOS",
      "CIN0011 – ORGANIZAÇÃO E ARQUITETURA DE COMPUTADORES",
      "CIN0012 – LABORATÓRIO DE ORGANIZAÇÃO E ARQUITETURA DE COMPUTADORES"
    ],
    "4º Período": [
      "MA129 – CÁLCULO DIFERENCIAL E INTEGRAL 4",
      "FI108 – FÍSICA GERAL 3",
      "CIN0013 – INFORMÁTICA E SOCIEDADE",
      "CIN0014 – LÓGICA PARA COMPUTAÇÃO",
      "CIN0015 – SISTEMAS OPERACIONAIS",
      "CIN0016 – ESTATÍSTICA E PROBABILIDADE PARA COMPUTAÇÃO"
    ],
    "5º Período": [
      "CIN0017 – COMPLEMENTAÇÃO DE MATEMÁTICA PARA COMPUTAÇÃO",
      "EL390 – CIRCUITOS ELÉTRICOS 1",
      "EL398 – LABORATÓRIO DE CIRCUITOS ELÉTRICOS 1",
      "CIN0033 – TEORIA DA COMPUTAÇÃO",
      "CIN0018 – FUNDAMENTOS DE REDES DE COMPUTADORES",
      "CIN0019 – BANCO DE DADOS"
    ],
    "6º Período": [
      "CIN0020 – SINAIS E SISTEMAS PARA COMPUTAÇÃO",
      "CIN0021 – ELETROMAGNETISMO",
      "CIN0022 – ELETRÔNICA PARA COMPUTAÇÃO",
      "CIN0023 – LABORATÓRIO DE ELETRÔNICA",
      "CIN0024 – INTRODUÇÃO AO APRENDIZADO DE MÁQUINA",
      "CIN0025 – ENGENHARIA DE SOFTWARE E SISTEMAS"
    ],
    "7º Período": [
      "CIN0026 – PRINCÍPIOS DE COMUNICAÇÕES",
      "CIN0027 – FUNDAMENTOS DE SISTEMAS DE CONTROLE",
      "CIN0028 – PROCESSAMENTO DE SINAIS",
      "CIN0029 – SISTEMAS EMBARCADOS",
      "CIN0030 – LABORATÓRIO DE SISTEMAS EMBARCADOS",
      "CIN0031 – TEORIA E IMPLEMENTAÇÃO DE LINGUAGENS DE PROGRAMAÇÃO"
    ],
    "8º Período": [
      "CIN0032 – PROJETO CO-DESENVOLVIMENTO HARDWARE / SOFTWARE"
    ],
    "9º Período": [
      "CIN0034 – TRABALHO DE CONCLUSÃO DE CURSO 1",
      "CIN0035 – ESTÁGIO OBRIGATÓRIO"
    ],
    "10º Período": [
      "CIN0036 – TRABALHO DE CONCLUSÃO DE CURSO 2"
    ]
  },
  
  "Ciência da Computação": {
    "1º Período": [
      "CIN0132 – MATEMÁTICA DISCRETA",
      "CIN0130 – SISTEMAS DIGITAIS",
      "CIN0133 – INTRODUÇÃO À PROGRAMAÇÃO",
      "CIN0131 – CONCEPÇÃO DE ARTEFATOS DIGITAIS"
    ],
    "2º Período": [
      "MA026 – CÁLCULO DIFERENCIAL E INTEGRAL 1",
      "CIN0135 – ESTRUTURAS DE DADOS ORIENTADAS A OBJETOS",
      "CIN0134 – ARQUITETURA DE COMPUTADORES E SISTEMAS OPERACIONAIS",
      "CIN0136 – DESENVOLVIMENTO DE SOFTWARE"
    ],
    "3º Período": [
      "CIN0138 – ÁLGEBRA VETORIAL E LINEAR PARA COMPUTAÇÃO",
      "CIN0140 – ALGORITMOS",
      "CIN0137 – BANCO DE DADOS",
      "CIN0139 – INTEGRAÇÃO E EVOLUÇÃO DE SISTEMAS DE INFORMAÇÃO"
    ],
    "4º Período": [
      "CIN0142 – ESTATÍSTICA E PROBABILIDADE PARA COMPUTAÇÃO",
      "CIN0141 – LÓGICA PARA COMPUTAÇÃO",
      "CIN0143 – INTRODUÇÃO A SISTEMAS DISTRIBUÍDOS E REDES DE COMPUTADORES",
      "CIN0144 – APRENDIZADO DE MÁQUINA E CIÊNCIA DE DADOS"
    ],
    "5º Período": [
      "CIN0148 – TEORIA DA COMPUTAÇÃO",
      "CIN0145 – PROGRAMAÇÃO CONCORRENTE",
      "CIN0146 – PROGRAMAÇÃO FUNCIONAL",
      "CIN0147 – METODOLOGIA CIENTÍFICA",
      "CIN0149 – INFORMÁTICA E SOCIEDADE"
    ],
    "6º Período": [
      "CIN0150 – COMPILADORES"
    ],
    "9º Período": [
      "CIN0151 – TRABALHO DE CONCLUSÃO DE CURSO"
    ]},

  "Sistemas de Informação": {
    "1º Período": [
      "CIN0132 – MATEMÁTICA DISCRETA PARA COMPUTAÇÃO",
      "CIN0130 – SISTEMAS DIGITAIS",
      "CIN0133 – INTRODUÇÃO À PROGRAMAÇÃO",
      "CIN0131 – CONCEPÇÃO DE ARTEFATOS DIGITAIS"
    ],
    "2º Período": [
      "MA026 – CÁLCULO DIFERENCIAL E INTEGRAL 1",
      "CIN0135 – ESTRUTURA DE DADOS ORIENTADAS A OBJETOS",
      "CIN0134 – ARQUITETURA DE COMPUTADORES E SISTEMAS OPERACIONAIS",
      "CIN0136 – DESENVOLVIMENTO DE SOFTWARE"
    ],
    "3º Período": [
      "CIN0138 – ÁLGEBRA VETORIAL E LINEAR PARA COMPUTAÇÃO",
      "CIN0140 – ALGORITMOS",
      "CIN0137 – BANCO DE DADOS",
      "CIN0139 – INTEGRAÇÃO E EVOLUÇÃO DE SISTEMAS DE INFORMAÇÃO"
    ],
    "4º Período": [
      "CIN0142 – ESTATÍSTICA E PROBABILIDADE PARA COMPUTAÇÃO",
      "CIN0141 – LÓGICA PARA COMPUTAÇÃO",
      "CIN0143 – INTRODUÇÃO A SISTEMAS DISTRIBUÍDOS E REDES DE COMPUTADORES",
      "CIN0144 – APRENDIZADO DE MÁQUINA E CIÊNCIA DE DADOS"
    ],
    "5º Período": [
      "CIN0183 – EMPREENDIMENTOS EM INFORMÁTICA",
      "CIN0184 – ASPECTOS SÓCIO-ECONÔMICOS DE SISTEMAS DE INFORMAÇÃO",
      "CGA0002 – ADMINISTRAÇÃO CONTEMPORÂNEA"
    ],
    "6º Período": [
      "CIN0187 – ARQUITETURA EMPRESARIAL",
      "CIN0186 – GESTÃO DE PROCESSOS DE NEGÓCIO",
      "CIN0188 – ESTÁGIO OBRIGATÓRIO"
    ],
    "7º Período": [
      "CIN0189 – ANÁLISE E PROJETO DE SISTEMAS DE INFORMAÇÃO",
      "CIN0190 – COMUNICAÇÃO TÉCNICA E CIENTÍFICA"
    ],
    "8º Período": [
      "CIN0191 – TRABALHO DE CONCLUSÃO DE CURSO"
    ]
}
};

const DisciplinaCard = ({ nome }) => (
  <div className="disciplina-card">
    <h3>{nome}</h3>
  </div>
);

const CursoPage = ({ curso }) => {
  const periodos = courses[curso] || {};

  return (
    <div className="curso-container">
      <h2>{curso}</h2>
      {Object.entries(periodos).map(([periodo, disciplinas]) => (
        <div key={periodo} className="periodo-container">
          <h3 className="periodo-title">{periodo}</h3>
          <div className="disciplinas-container">
            {disciplinas.map((disciplina, index) => (
              <DisciplinaCard key={index} nome={disciplina} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CursoPage;
