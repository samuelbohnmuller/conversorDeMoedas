import './App.css';
import Conversor from './Componentes/Conversor/Conversor';
import ImagemCarteira from './Componentes/ImagemCarteira/ImagemCarteira';

function App() {
  return (
    <>
      <div className='centralizar'>
        <div>
          <h3 className='texto'>Conversor de Moedas</h3>
        </div>
        <div className='quadro'>
          <Conversor/>
        </div>
        <ImagemCarteira/>
      </div>
    </>
  );
}

export default App;
