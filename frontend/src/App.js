import {BrowserRouter, Switch, Route} from "react-router-dom";
import Aside from "./components/Aside";

import Login from "./components/Login";
import MenuBar from "./components/MenuBar";
import TokenLogin from "./components/TokenLogin";
import Evaluations from "./pages/Evaluations";

import Homepage from "./pages/Homepage";
import Tokens from "./pages/Tokens";
import Upload from "./pages/Upload";

function App() {
  return (
    <>
    <MenuBar />
    <br/>
    <br/>
    <BrowserRouter>
      <Switch>
        <Route exact path="/admin/login" component={Login}></Route>
        <Route exact path="/" component={TokenLogin}></Route>
        <Route exact path="/admin" component={Homepage}></Route>
        <Route exact path="/tokens" component={Tokens}></Route>
        <Route exact path="/upload" component={Upload}></Route>
        <Route exact path="/evaluate" component={Evaluations}></Route>
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
