import { Route } from 'react-router-dom';
import './App.css';
import Home from './components/home/home';
import LandingPage from './components/landingPage/landingPage';
import NavBar from './components/NavBar/NavBar';
import { PokemonCreate } from './components/PokemonCreate/PokemonCreate';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';
function App() {
  return (
    <div className="App">
      <Route path = '/(home)' component={NavBar}/>
      <Route path ='/' exact component={LandingPage}/>
      <Route path = '/home' exact component={Home}/>
      <Route path='/pokemons/:id' component={PokemonDetail}/>
      <Route path= '/create' component={PokemonCreate}/>
    </div>
  );
}

export default App;
