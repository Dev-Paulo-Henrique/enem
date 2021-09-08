import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home } from "./pages/Home"
import { Room } from "./pages/Room"
import { AuthContextProvider } from './contexts/AuthContext'
import { AdminRoom } from "./pages/AdminRoom"
import { Profile } from "./pages/Profile"
import { Play } from "./pages/Play"
import { Fav } from "./pages/Favoritos"
import { CN } from "./pages/matter/Ciencia-da-natureza"
import { CH } from "./pages/matter/Ciencia-humana"

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/main/" component={Room} />
          <Route path="/play/" exact component={Play} />
          <Route path="/admin/" exact component={AdminRoom} />
          <Route path="/fav/" exact component={Fav} />
          <Route path="/user/:id" exact component={Profile} />
          <Route path="/matter/ciencias-da-natureza/" exact component={CN} />
          <Route path="/matter/ciencias-humana/" exact component={CH} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
