import { BrowserRouter,  Route, Switch } from 'react-router-dom'
import { Home } from "./pages/Home"
import { Room } from "./pages/Room"
import { AuthContextProvider } from './contexts/AuthContext'
import { AdminRoom } from "./pages/AdminRoom"
import { Play } from "./pages/Play"
import { CN } from "./pages/matter/Ciencia-da-natureza"

function App() {

  return (
    <BrowserRouter>
    <AuthContextProvider>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/main/" component={Room}/>
        <Route path="/play/" exact component={Play}/>
        <Route path="/admin/" exact component={AdminRoom}/>
        <Route path="/matter/ciencias-da-natureza/" exact component={CN}/>
        </Switch>
    </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
