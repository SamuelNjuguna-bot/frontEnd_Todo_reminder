import { Typography, Box, Card, TextField,Button } from '@mui/material'
import { useState } from 'react';
import { toast, ToastContainer} from "react-toastify"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useCookies} from "react-cookie"
const API_URl = "http://localhost:3000";


function Login() {
    const navigate = useNavigate("")
    const [identifier, setIndetifier] = useState("")
    const [password, setPassword] = useState("")
  const [cookie, setCookie] = useCookies(['login'])
    async function handleSignIn() {
        if(!identifier || !password){

            toast.error("all Fields are a must")
            return;
        }
        else{
            const signIn = await axios.post(`${API_URl}/login`,{password, identifier})
            const data = signIn.data
            setCookie("login", data.token)
              if(data){
              navigate('/')
            }
        }
    }
  return (
<Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap="3rem"
    >
      <Typography
        component="h1"
        variant="h4"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        Log In
      </Typography>
      <ToastContainer position="top-center" />
      <Card
        sx={{
          width: "30rem",
          height: "15rem",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          padding: "2px",
        }}
      >
        <Typography variant="h5" textAlign="center">
          Please Enter Your Details Below
        </Typography>
        <TextField
          fullWidth
          label="Enter name or email"
          onChange={(e) => {
            setIndetifier(e.target.value);
          }}
        >
          Username Or Email
        </TextField>
        <TextField
          fullWidth
          label="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          
        >
          Password
        </TextField>
        <Button fullWidth variant="contained" onClick={handleSignIn}>
          Sign In
        </Button>
      </Card>
    </Box>
  )
}

export default Login
