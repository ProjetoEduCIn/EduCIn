import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Educin</title>
  <link rel="shortcut icon" href="imagens/logoDR_4.ico" type="image/x-icon" />
  <link rel="stylesheet" href="FolhasCSS/Classes.css" />
  <link rel="stylesheet" href="FolhasCSS/Tags.css" />
  <link rel="stylesheet" href="FolhasCSS/Ids.css" />
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n        * {\n            margin: 0;\n            padding: 0;\n            box-sizing: border-box;\n        }\n    "
    }}
  />
  <header>
    <div className="Container">
      <div
        style={{ margin: "5px auto", height: 10 }}
        className="LinhaSeparadora"
      />
      <h1 className="TituloIndex">Telas</h1>
      <div
        style={{ margin: "5px auto", height: 10 }}
        className="LinhaSeparadora"
      />
    </div>
  </header>
  <main>
    <a href="Telas/PaginaDeLogin.html">Login</a>
    <a href="Telas/PaginaInicial.html">Inicial</a>
    <a href="Telas/PaginaDeConteudos.html">Conteudos</a>
  </main>
</>
    
  )
}

export default App
