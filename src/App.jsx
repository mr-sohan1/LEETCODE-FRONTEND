import { Routes, Route,Navigate } from "react-router";
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel"
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from "./authSlice";
import { useEffect } from "react";


function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

 if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}

  return (
    <Routes>
      <Route path="/" element={ isAuthenticated ? <Homepage /> : <Navigate to="/signup" replace />}/>
      <Route path="/login" element={ isAuthenticated ? <Navigate to="/" replace /> : <Login /> }/>
      <Route path="/signup" element={  isAuthenticated ? <Navigate to="/" replace /> : <Signup /> }/>
      <Route path="/admin" element={<AdminPanel/>}></Route>
    </Routes >
  );
}

export default App;
