import HelloWorld from '../components/HelloWorld';
import { ReactComponent as Vector } from './vector.svg';
import './App.scss';

const App = () => (
  <div className="App__container">
    <HelloWorld />
    <Vector />
  </div>
);

export default App;
