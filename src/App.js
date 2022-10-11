import Home from "./routes/home/home.component"
import Navigation from "./components/navigation-bar/navigation-bar.component";
import { Routes, Route, Outlet } from "react-router-dom";
import SignIn from "./components/sign-in/sign-in.component";


const Shop = () =>{
  return (
    <div>
      <h1>I am the shop component</h1>
    </div>
  );
}


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home />}/> 
        <Route path='shop' element={<Shop/>}/>
        <Route path='sign-in' element={<SignIn/>}/>
      </Route>    
    </Routes>
 );
}

export default App;
