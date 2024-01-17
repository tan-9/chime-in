
import axios from "axios"
import { UserContext, UserContextProvider } from "./userContext.jsx";
import Routes from "./Routes.jsx";

function App() {
  axios.defaults.baseURL = 'http://localhost:5000';
  axios.defaults.withCredentials = true;
  
  return (
    <UserContextProvider>
      <Routes/>
    </UserContextProvider>
  )
}

export default App
