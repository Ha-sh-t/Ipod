import Ipod from './components/Ipod.jsx';
import headingStyle from '../src/Styles/ipod.module.css';
function App() {
  return (
    <div className={headingStyle.ipodContainer}>
      <Ipod />
    </div>
  );
}

export default App;
