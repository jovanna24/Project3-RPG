import './Home.css';
import MainMenu from '../../components/MainMenu';


const Home = () => {

  const [isGameStarted, setIsGameStarted] = useState(false);

  const startGame = () => {
    setIsGameStarted(true);
  };

  const goToMainMenu = () => {
    setIsGameStarted(false);
  };

  return (
    <div className="home">
      {!isGameStarted ? (
        <MainMenu onStart={startGame} />
      ) : (
        <CharacterComponent onGameOver={goToMainMenu} />
      )}
    </div>
  );    
}

export default Home
