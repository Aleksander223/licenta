import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Aside from "./components/Aside";

import Login from "./components/Login";
import MenuBar from "./components/MenuBar";
import TokenLogin from "./components/TokenLogin";
import Evaluations from "./pages/Evaluations";

import Homepage from "./pages/Homepage";
import Tokens from "./pages/Tokens";
import Upload from "./pages/Upload";
import { isLoggedIn } from "./services/util";

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
        {isLoggedIn() == 2 && <Route exact path="/admin" component={Homepage}></Route>}
        <Route exact path="/tokens" component={Tokens}></Route>
        <Route exact path="/upload" component={Upload}></Route>
        {isLoggedIn() == 1 && <Route exact path="/evaluate" component={Evaluations}></Route>}
        <Route component={() => <Redirect to="/"/>}></Route>
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
