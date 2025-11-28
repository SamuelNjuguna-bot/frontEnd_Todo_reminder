import { Box, Card, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios"
import  {useNavigate} from "react-router-dom"
function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const API_URl = "http://localhost:3000";


  const navigate = useNavigate()
  async function handleSignUp() {
    if (!name || !email || !Password || !confirmPassword) {
      toast.error("All fields Must be filled");
      return;
    }
    else if(Password !== confirmPassword){
        toast.error("Password must match")
    }
    else{
    const signup = await axios.post(`${API_URl}/signup`,{name, email, Password})
    const data = signup.data
    if(data){
      toast.success("You were registered in Successfuly")
      navigate('/login')
    }
    else(
      toast.error("Mmmmmmmmmh something went wrong")
    )
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
        SignUp
      </Typography>
      <ToastContainer position="top-center" />
      <Card
        sx={{
          width: "30rem",
          height: "22rem",
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
          label="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        >
          Name
        </TextField>
        <TextField
          fullWidth
          label="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
        >
          Email
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
        <TextField
          fullWidth
          label="Confirm Password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          type="password"
        //   color={(Password.length<8) ? "error" :"success"}
        //   helperText={(Password.length < 8) ? "password must be greater than 8 characters" : ""}
        >
          Confirm Password
        </TextField>
        <Button fullWidth variant="contained" onClick={handleSignUp}>
          Sign Up
        </Button>
      </Card>
    </Box>
  );
}

export default SignUp;
