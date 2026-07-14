import { Routes, Route,Navigate } from "react-router";
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from "./authSlice";
import { useEffect } from "react";


function App(){

   const dispatch = useDispatch();
    const {isAuthenticated,user,loading} = useSelector((state)=>state.auth);
  
    // check initial authentication
    useEffect(() => {
      dispatch(checkAuth());
    }, [dispatch]);

    return(
    <Routes>
      <Route path="/" element={isAuthenticated ?<Homepage></Homepage>:<Navigate to="/signup" />}></Route>
      <Route path="/login" element={isAuthenticated?<Navigate to="/" />:<Login></Login>}></Route>
      <Route path="/signup" element={isAuthenticated?<Navigate to="/" />:<Signup></Signup>}></Route>
    </Routes>
    )
}

export default App;
