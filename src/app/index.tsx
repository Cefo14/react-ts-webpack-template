import HelloWorld from '../components/HelloWorld';

import { ReactComponent as Vector } from '../assets/vector.svg';
import image from '../assets/cheems.png';

import './App.scss';

const App = () => (
  <div className="App__container">
    <HelloWorld />
    <Vector />
    <img
      alt="cheems"
      src={image}
      width={250}
      height={250}
    />
  </div>
);

export default App;
