import { BrowserRouter,  Route, Switch } from 'react-router-dom'
import { Home } from "./pages/Home"
import { Room } from "./pages/Room"
import { AuthContextProvider } from './contexts/AuthContext'
import { AdminRoom } from "./pages/AdminRoom"

function App() {

  return (
    <BrowserRouter>
    <AuthContextProvider>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/main/" component={Room}/>
        <Route path="/admin/rooms/:id" component={AdminRoom}/>
        </Switch>
    </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
