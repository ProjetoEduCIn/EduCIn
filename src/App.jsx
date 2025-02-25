import './styles/index.css';
import Header from './components/Header';
import Main from './components/Main';
import '@styles/index.css';

function App() {
  console.log("Componente App carregado!");

  return (

    <div>
      <Header />
      <Main />
    </div>
  );
}

export default App;