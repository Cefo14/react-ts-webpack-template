import HelloWorld from '../components/HelloWorld';

import { ReactComponent as Vector } from '../assets/vector.svg';
import image from '../assets/cheems.webp';

import styles from './App.module.css';
import './App.scss';

const App = () => (
  <div className="App__container">
    <HelloWorld />
    <img
      alt="cheems"
      src={image}
      width={250}
      height={250}
    />
    <h1 className={styles.title}>
      Cheems
      <Vector />
    </h1>
  </div>
);

export default App;
