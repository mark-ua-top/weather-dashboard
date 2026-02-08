import './dstyle.css'
import 'normalize.css'
import './App.css';
import { Header } from './components/section/header/Header';
import { Hero } from './components/section/hero/Hero';
import { Weather } from './components/section/weather/Weather'

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Hero></Hero>
    </div>
  );
}

export default App;
