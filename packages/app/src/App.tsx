import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useShowme } from 'lib';

function App() {
  const { axiosInstance } = useShowme();

  const handleClickNetwork = async () => {
    await axiosInstance.get('https://httpstat.us/400');
  };

  const handleClickClient = () => {
    throw new Error("I'm an error")
  };
  
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleClickNetwork}>
          Generate Network error
        </button>
        <button onClick={handleClickClient}>
          Generate Client error
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
