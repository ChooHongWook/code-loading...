import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom"; // 이 구문을 넣어주세요

// Home 컴포넌트
function Home() {
  return (
    <div>
      <h1>Home</h1>
      <a> home 내용</a>
    </div>
  );
}

// MyContent 컴포넌트
function MyContent() {
  return <h1>MyContent</h1>;
}

// Memo 컴포넌트
function Memo() {
  return <h1>Memo</h1>;
}

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
            {/* Link 컴포넌트를 이용하여 경로를 연결합니다 */}
          </li>
          <li>
            <Link to="/mycontent">MyContent</Link>
          </li>
          <li>
            <Link to="/memo">Memo</Link>
          </li>
        </ul>
      </nav>
      {/* 주소경로와 우리가 아까 만든 3개의 컴포넌트를 연결해줍니다. */}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/mycontent">
          {" "}
          {/* 경로를 설정하고 */}
          <MyContent /> {/* 컴포넌트를 연결합니다. */}
        </Route>
        <Route path="/memo">
          <Memo />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
