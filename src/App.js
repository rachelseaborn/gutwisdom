import Header from './Components/Header/Header';
import Auth from './Components/Auth/Auth';
import routes from './routes';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      {routes}
    </div>
  );
}

export default App;
