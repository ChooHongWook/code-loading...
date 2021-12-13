import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import dummyTweets from './dumy/dummyData';

function App() {
  return (
    <div className="App">
      <Home dummyTweets={dummyTweets}/>
    </div>
  );
}

export default App;
