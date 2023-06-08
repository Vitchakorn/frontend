import React, { useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { loginUrl } from './components/api/api';
import './SignIn.css'
import { Alert } from '@mui/material';

const defaultTheme = createTheme();

async function loginUser(credentials) {
  return fetch(loginUrl, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(data => data.json())

 }
 

 async function register(mandatory) {
    return fetch('http://localhost:5001/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mandatory)
    }).then(data => data.json())
   }

export default function SignInDrawer() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [Singup, setSignup] = useState(false);
  const [newEmail, setNewEmail] = useState();
  const [newPassword, setNewPassword] = useState();
  const [username, setUsername] = useState();   

  const handleLogin = async e => {
    e.preventDefault();
    const response = await loginUser({
      email,
      password
    });
    console.log(response)
    if ('accessToken' in response) {
      localStorage.setItem('accessToken', response['accessToken']);
      localStorage.setItem('admin', response['admin']);
      console.log(JSON.stringify(response['user']))
      localStorage.setItem('user', JSON.stringify(response['user']));
      window.location.href = "/home";
    } else {
      alert(response.message); 
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/users/register' , {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email : newEmail , password : newPassword, username : username }),
      })
      const data = await response.json();
      if (data.message === "Register the user") {
        alert(data.message)
        window.location.reload(); 
      } else {
        alert(data.message); 
      }
    }catch (error) {
        console.error(error);
    }};
    
  

  const handleButtonClick = () => {
    setSignup(!Singup);
    setEmail(null);
    setPassword(null);
    setNewEmail(null);
    setNewPassword(null);
    setUsername(null);
  };


  return (
    <div className="bg-img">
        
        <div className="signin-container">
            {Singup ? (
                <Container component="main" maxWidth="xs" sx={{bgcolor: 'white' }}>

                <Box
                    sx={{
                    padding: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 2, bgcolor: 'secondary.main' }}>
                    <SensorOccupiedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Sing Up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="newEmail"
                        label="Email Address"
                        name="newEmail"
                        value={newEmail}
                        onChange={e => setNewEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="newPassword"
                        label="Your password"
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="username"
                        label="username"
                        type="text"
                        id="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Submit
                    </Button>
                    <Grid container>
                        <Grid item>
                        <Link href="#" variant="body2" onClick={handleButtonClick}>
                            {"back"}
                        </Link>
                        </Grid>
                    </Grid>
                    </Box>
                </Box>
    
                </Container>
            ) : (

                <Container component="main" maxWidth="xs" sx={{bgcolor: 'white' }}>
            <Box
                sx={{
                padding: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 2, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign in
                </Typography>
                <Box component="form" onSubmit={handleLogin} noValidate >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"

                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item>
                    <Link href="#" variant="body2" onClick={handleButtonClick}>
                        {"Don't have an account? Sign Up"}
                    </Link>
                    </Grid>
                </Grid>
                </Box>
            </Box>

            </Container>
            )

            }
            
      
    </div>
    </div>
  );
}
