import {Button, ButtonGroup, Card, TextField, Typography,Box, Alert} from "@mui/material"
import { useState } from "react"
import {useMutation} from "@tanstack/react-query"
import axios from "axios"
function Homepage() {

  const[title,setTitle] = useState("")
  const[content, setContent] = useState("")
  const[error, setError] = useState("")
  const[success, setSuccess] = useState("")
  
 const{isPending, mutate} = useMutation(
    {
      mutationFn: async (payload) => {
        const response = await axios.post("http://localhost:3000/create", {payload})
        return response.data
      },

      onSuccess: async (data) => {
        setSuccess(data.message)
      },

      onError: async () => {
        console.log(error)
      },
    }
  )




  async function handleAddTodo(params) {
    setError("")
    if(!title || !content){
      setError("All fileds are recquired !!!")
      return
    }
    else{
    const  payload={title, content}
    mutate(payload)

    }

  }


  return (
    <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:'center', gap:"40px"}}>
      <Typography variant="h1" >Hello User</Typography>
      <Typography variant="h4" sx={{
        display:"flex",
        justifyContent:"center",

      }}> You can List the elements you want below</Typography>
       {success && <Alert severity="success">{success}</Alert>}
       {error && <Alert severity="error">{error}</Alert>}
      <Card elevation={4} sx={{display:"flex", flexDirection:"column", gap:"10px", justifyContent:"center", width:"40rem",height:"20rem", padding:"5px" , }}>
        <Typography textAlign="center"  component="h1" variant="h4">Add a Todo</Typography>
        <TextField label="Todo title" sx={{fontSize:"10px"}} onChange={(e)=>{
          setTitle(e.target.value)
        }} ></TextField>
        <TextField label="Todo content" onChange={(e)=>{
          setContent(e.target.value)
        }} ></TextField>


        <ButtonGroup  fullWidth sx={{display:"flex"}}>
             <Button variant="contained" onClick={handleAddTodo} disabled={isPending}>Add Todo</Button>
             <Button  >Mark as Complete</Button>
             <Button sx={{bgcolor:"red", color:"white", padding:'1rem'}}>Delete Todo</Button>
        </ButtonGroup>
        

      </Card>
    </Box>
  )
}

export default Homepage
