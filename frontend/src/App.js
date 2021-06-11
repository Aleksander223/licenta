import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Aside from "./components/Aside";

import Login from "./components/Login";
import MenuBar from "./components/MenuBar";
import TokenLogin from "./components/TokenLogin";
import Evaluations from "./pages/Evaluations";

import Homepage from "./pages/Homepage";
import Tokens from "./pages/Tokens";
import SessionView from "./pages/SessionView";
import Quiz from "./pages/Quiz";
import { AppContext } from "./services/context";
import { isLoggedIn, typeOfUser } from "./services/util";

import {useState} from "react";
import Professors from "./pages/Professors";
import Groups from "./pages/Groups";
import Courses from "./pages/Courses";
import Timetable from "./pages/Timetable";
import Session from "./pages/Session";
import Report from "./pages/Report";

function App() {
  const [aside, setAside] = useState(true);

  return (
    <AppContext.Provider value={{
      aside,
      setAside
    }}>
    <MenuBar />
    <br/>
    <br/>
    <BrowserRouter>
      <Switch>
        <Route exact path="/admin/login" component={Login}></Route>
        <Route exact path="/" component={TokenLogin}></Route>
        {isLoggedIn() == 2 && <Route exact path="/admin" component={Homepage}></Route>}
        {isLoggedIn() == 2 && <Route exact path="/tokens" component={Tokens}></Route>}
        {isLoggedIn() == 2 && <Route exact path="/professors" component={Professors}></Route>}
        {isLoggedIn() == 2 && <Route exact path="/courses" component={Courses}></Route>}
        {isLoggedIn() == 2 && <Route exact path="/groups" component={Groups}></Route>}
        {isLoggedIn() == 2 && <Route exact path="/timetable" component={Timetable}></Route>}
        {isLoggedIn() == 2 && <Route exact path="/session" component={Session}></Route>}
        {isLoggedIn() == 2 && <Route exact path="/session/view" component={() => <SessionView final={false} />}></Route>}
        {isLoggedIn() == 2 && <Route exact path="/session/view/final" component={() => <SessionView final={true} />}></Route>}
        {isLoggedIn() == 2 && typeOfUser() != 0 && <Route exact path="/report" component={Report}></Route>}
        {isLoggedIn() == 1 && <Route path="/quiz/:session/:course/:courseName/:professor/:professorName/:type" component={Quiz}></Route>}
        {isLoggedIn() == 1 && <Route exact path="/evaluate" component={Evaluations}></Route>}
        <Route component={() => <Redirect to="/"/>}></Route>
      </Switch>
    </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
