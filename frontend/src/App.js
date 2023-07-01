import './App.css';

import {BrowserRouter, Routes, Route, Navigate, useLocation} from 'react-router-dom'
import Home from './pages/Home/Home';
import Navigation from './Components/shared/Navigation/Navigation';
import Authenticate from './pages/Authenticate/Authenticate';
import Activate from './pages/Activate/Activate';
import Rooms from './pages/Rooms/Rooms';
import { useSelector } from 'react-redux'
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';
import Room from './pages/Room/Room';


function App() {
    const {loading} = useLoadingWithRefresh()
    return (
        loading ? (
            'Loading...'
        ) :(
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route path='/' 
                        element={
                            <GuestRoute>
                                <Home />
                            </GuestRoute>
                        } 
                    />
                    <Route path='/authenticate' 
                        element={
                            <GuestRoute>
                                <Authenticate />
                            </GuestRoute>
                        } 
                    />
                    <Route path='/activate' 
                        element={
                            <SemiProtectedRoute>
                                <Activate />
                            </SemiProtectedRoute>
                        } 
                    />
                    <Route path='/rooms' 
                        element={
                            <ProtectedRoute>
                                <Rooms />
                            </ProtectedRoute>
                        } 
                    />
                    <Route path='/room/:id' 
                        element={
                            <ProtectedRoute>
                                <Room />
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
            </BrowserRouter>
        )
    );
}


//check video 5 for this logic

const GuestRoute = ({children}) =>{
    const {isAuth} = useSelector((state)=> state.auth)
    const location = useLocation()
    return !isAuth ? children : <Navigate to="/rooms"  state={{from : location}} />
    
}

const SemiProtectedRoute = ({children}) =>{
    const {isAuth, user} = useSelector((state)=> state.auth)
    const location = useLocation()
    return !isAuth ? <Navigate to="/" state={{from : location}} /> : isAuth && !user.activated ? children  :  <Navigate to="/rooms"  state={{from : location}} />
}

const ProtectedRoute = ({children}) =>{
    const {isAuth, user} = useSelector((state)=> state.auth)
    const location = useLocation()
    return !isAuth ? <Navigate to="/" state={{from : location}} /> : isAuth && !user.activated ? <Navigate to="/activate"  state={{from : location}} />  :  children
}


export default App;
