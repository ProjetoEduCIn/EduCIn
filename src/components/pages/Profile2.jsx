import React, { useState } from "react";
import "@styles/Profile.css";

const Profile2 = ({ onPageChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(""); // Curso selecionado
  const [selectedSubjects, setSelectedSubjects] = useState([]); // Disciplinas escolhidas

  // Lista de cursos e disciplinas
  const courses = {
    "Engenharia da Computação": 
    ["AINDA NÃO CONCLUI NENHUMA",
      "MA026 – CÁLCULO DIFERENCIAL E INTEGRAL 1", 
      "MA036 – GEOMETRIA ANALÍTICA 1", 
      "CIN0001 – INTRODUÇÃO À PROGRAMAÇÃO", 
      "CIN0002 – LABORATÓRIO DE PROGRAMAÇÃO 1", 
      "CIN0003 – INTRODUÇÃO A COMPUTAÇÃO", 
      "MA027 – CÁLCULO DIFERENCIAL E INTEGRAL 2", 
      "CIN0004 – FUNDAMENTOS DE ÁLGEBRA LINEAR", 
      "CIN0005 – FUNDAMENTOS DE PROGRAMAÇÃO IMPERATIVA", 
      "CIN0006 – LABORATÓRIO DE PROGRAMAÇÃO 2", 
      "CIN0006 – LABORATÓRIO DE PROGRAMAÇÃO 2", 
      "CIN0007 – SISTEMAS DIGITAIS", 
      "CIN0008 – LABORATÓRIO DE SISTEMAS DIGITAIS", 
      "MA128 – CÁLCULO DIFERENCIAL E INTEGRAL 3", 
      "FI006 – FÍSICA GERAL 1", 
      "CIN0010 – MATEMÁTICA DISCRETA PARA COMPUTAÇÃO", 
      "CIN0009 – ALGORITMOS E ESTRUTURA DE DADOS", 
      "CIN0011 – ORGANIZAÇÃO E ARQUITETURA DE COMPUTADORES", 
      "CIN0012 – LABORATÓRIO DE ORGANIZAÇÃO E ARQUITETURA DE COMPUTADORES", 
      "MA129 – CÁLCULO DIFERENCIAL E INTEGRAL 4",
      "FI108 – FÍSICA GERAL 3", 
      "CIN0013 – INFORMÁTICA E SOCIEDADE", 
      "CIN0014 – LÓGICA PARA COMPUTAÇÃO", 
      "CIN0015 – SISTEMAS OPERACIONAIS", 
      "CIN0016 – ESTATÍSTICA E PROBABILIDADE PARA COMPUTAÇÃO", 
      "CIN0017 – COMPLEMENTAÇÃO DE MATEMÁTICA PARA COMPUTAÇÃO", 
      "EL390 – CIRCUITOS ELÉTRICOS 1", 
      "EL398 – LABORATÓRIO DE CIRCUITOS ELÉTRICOS 1", 
      "CIN0033 – TEORIA DA COMPUTAÇÃO", 
      "CIN0018 – FUNDAMENTOS DE REDES DE COMPUTADORES", 
      "CIN0019 – BANCO DE DADOS", 
      "CIN0020 – SINAIS E SISTEMAS PARA COMPUTAÇÃO", 
      "CIN0021 – ELETROMAGNETISMO", 
      "CIN0022 – ELETRÔNICA PARA COMPUTAÇÃO", 
      "CIN0023 – LABORATÓRIO DE ELETRÔNICA", 
      "CIN0024 – INTRODUÇÃO AO APRENDIZADO DE MÁQUINA", 
      "CIN0025 – ENGENHARIA DE SOFTWARE E SISTEMAS", 
      "CIN0026 – PRINCÍPIOS DE COMUNICAÇÕES", 
      "CIN0027 – FUNDAMENTOS DE SISTEMAS DE CONTROLE", 
      "CIN0028 – PROCESSAMENTO DE SINAIS", 
      "CIN0029 – SISTEMAS EMBARCADOS", 
      "CIN0030 – LABORATÓRIO DE SISTEMAS EMBARCADOS", 
      "CIN0031 – TEORIA E IMPLEMENTAÇÃO DE LINGUAGENS DE PROGRAMAÇÃO", 
      "CIN0032 – PROJETO CO-DESENVOLVIMENTO HARDWARE / SOFTWARE", 
      "CIN0034 – TRABALHO DE CONCLUSÃO DE CURSO 1", 
      "CIN0036 – TRABALHO DE CONCLUSÃO DE CURSO 2"],
    
    "Ciência da Computação": 
    ["AINDA NÃO CONCLUI NENHUMA", 
      "CIN0132 – MATEMÁTICA DISCRETA", 
      "CIN0130 – SISTEMAS DIGITAIS", 
      "CIN0133 – INTRODUÇÃO À PROGRAMAÇÃO", 
      "CIN0131 – CONCEPÇÃO DE ARTEFATOS DIGITAIS", 
      "MA026 – CÁLCULO DIFERENCIAL E INTEGRAL 1", 
      "CIN0135 – ESTRUTURAS DE DADOS ORIENTADAS A OBJETOS", 
      "CIN0134 – ARQUITETURA DE COMPUTADORES E SISTEMAS OPERACIONAIS", 
      "CIN0136 – DESENVOLVIMENTO DE SOFTWARE", 
      "CIN0138 – ÁLGEBRA VETORIAL E LINEAR PARA COMPUTAÇÃO", 
      "CIN0140 – ALGORITMOS", "CIN0137 – BANCO DE DADOS", 
      "CIN0139 – INTEGRAÇÃO E EVOLUÇÃO DE SISTEMAS DE INFORMAÇÃO", 
      "CIN0142 – ESTATÍSTICA E PROBABILIDADE PARA COMPUTAÇÃO", 
      "CIN0141 – LÓGICA PARA COMPUTAÇÃO", 
      "CIN0143 – INTRODUÇÃO A SISTEMAS DISTRIBUÍDOS E REDES DE COMPUTADORES", 
      "CIN0144 – APRENDIZADO DE MÁQUINA E CIÊNCIA DE DADOS", 
      "CIN0148 – TEORIA DA COMPUTAÇÃO", 
      "CIN0145 – PROGRAMAÇÃO CONCORRENTE", "CIN0146 – PROGRAMAÇÃO FUNCIONAL", 
      "CIN0147 – METODOLOGIA CIENTÍFICA", 
      "CIN0149 – INFORMÁTICA E SOCIEDADE", 
      "CIN0150 – COMPILADORES", 
      "CIN0151 – TRABALHO DE CONCLUSÃO DE CURSO"],

    "Sistemas de Informação": 
    ["CIN0132 – MATEMÁTICA DISCRETA PARA COMPUTAÇÃO", 
    "CIN0130 – SISTEMAS DIGITAIS", 
    "CIN0133 – INTRODUÇÃO À PROGRAMAÇÃO", 
    "CIN0131 – CONCEPÇÃO DE ARTEFATOS DIGITAIS", 
    "MA026 – CÁLCULO DIFERENCIAL E INTEGRAL 1", 
    "CIN0135 – ESTRUTURA DE DADOS ORIENTADAS A OBJETOS",
    "CIN0134 – ARQUITETURA DE COMPUTADORES E SISTEMAS OPERACIONAIS", 
    "CIN0136 – DESENVOLVIMENTO DE SOFTWARE", 
    "CIN0138 – ÁLGEBRA VETORIAL E LINEAR PARA COMPUTAÇÃO", 
    "CIN0140 – ALGORITMOS", 
    "CIN0137 – BANCO DE DADOS", 
    "CIN0139 – INTEGRAÇÃO E EVOLUÇÃO DE SISTEMAS DE INFORMAÇÃO", 
    "CIN0141 – LÓGICA PARA COMPUTAÇÃO", 
    "CIN0143 – INTRODUÇÃO A SISTEMAS DISTRIBUÍDOS E REDES DE COMPUTADORES", 
    "CIN0144 – APRENDIZADO DE MÁQUINA E CIÊNCIA DE DADOS", 
    "CIN0183 – EMPREENDIMENTOS EM INFORMÁTICA", "CIN0184 – ASPECTOS SÓCIO-ECONÔMICOS DE SISTEMAS DE INFORMAÇÃO", 
    "CGA0002 – ADMINISTRAÇÃO CONTEMPORÂNEA", 
    "CIN0187 – ARQUITETURA EMPRESARIAL", 
    "CIN0186 – GESTÃO DE PROCESSOS DE NEGÓCIO", 
    "CIN0188 – ESTÁGIO OBRIGATÓRIO", 
    "CIN0189 – ANÁLISE E PROJETO DE SISTEMAS DE INFORMAÇÃO", 
    "CIN0190 – COMUNICAÇÃO TÉCNICA E CIENTÍFICA", 
    "CIN0191- TRABALHO DE CONCLUSÃO DE CURSO"
    ]
  };

  // Abrir/Fechar Modal
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Atualizar seleção de disciplinas
  const handleSubjectSelect = (subject) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
  };

  return (
    <div className="container2">
        <h1>Escolha seu curso</h1>
        <select className="select-curso" onChange={(e) => setSelectedCourse(e.target.value)}>
          <option value="">Selecione um curso</option>
          {Object.keys(courses).map((course) => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>

        <button 
        className="botao-selecionar" 
        onClick={toggleModal} disabled={!selectedCourse}>
          Selecione as Disciplinas já Cursadas
        </button>

        {/* Modal de Seleção de Disciplinas */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Toda vitória deverá ser contada!</h2>
              <p>selecione as disciplinas que você já concluiu</p>
              {selectedCourse && (
                <ul className="lista-disciplinas">
                {courses[selectedCourse].map((subject) => (
                  <li key={subject}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedSubjects.includes(subject)}
                        onChange={() => handleSubjectSelect(subject)}
                      />
                      {subject}
                    </label>
                  </li>
                ))}
              </ul>
              
              )}
              <button onClick={toggleModal}>Fechar</button>
            </div>
        </div>
      )}

      <button className="continue-button" onClick={() => onPageChange("content")} disabled={selectedSubjects.length === 0}>
        Continuar
      </button>
    </div>
  );
};

export default Profile2;
