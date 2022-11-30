import {useEffect} from 'react'
import {useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiClient from './url/index';
import Router from './routes';
import './App.css';
import { userAction } from './store/slices/UserSlice';

function App() {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const fetchUserData = async(token) =>{
    try{
     const response = await axios.get('http://192.168.1.54:3000/localadmin/auth/my-account',{
      headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:`Bearer ${token}`,    

    }
     })
     if(response.status === 200){
      dispatch(userAction.setUser(response.data))
      console.log('user data=',response.data)
      navigate('/')
   }
    }
    catch(err){
      console.log('error')
    }
   }
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      dispatch(userAction.setIsAuthenticated(true))
      dispatch(userAction.setToken(token))
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      dispatch(userAction.setIsAuthenticated(true))
      fetchUserData(token)
    }
   
    else{
      navigate('/login')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (<Router />);
}

export default App;
