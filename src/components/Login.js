import React, { useState } from 'react';
import { Link as LinkRouterDom, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { fazer_login } from '../redux/actions/loginActions';
import { verificar_login_existe } from '../services/usuarioService';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
   paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
   },
   avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
   },
   form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
   colorError: {
      color: theme.palette.error.dark
   },
   inputBorderColor: {
      borderColor: theme.palette.error.dark
   },
}));

const Login = props => {
   const classes = useStyles();

   const [login, setLogin] = useState({
      email: 'f@gmail.com',
      senha: '123'
   })

   const [msg, setMsg] = useState('')

   let history = useHistory()

   const handleChange = event => {
      const { name, value } = event.target
      setLogin({ ...login, [name]: value })
   }

   const handleSubmit = (event) => {
      event.preventDefault()
      const usuarios = props.usuarios

      if (verificar_login_existe(usuarios, login)) {
         props.fazer_login({ login, usuarios })
         history.push('/')
      } else {
         setMsg('Dados estão errados ou não existe')
      }
   }

   return (
      <Container component="main" maxWidth="xs">
         <CssBaseline />
         <div className={classes.paper}>
            <Avatar className={classes.avatar}>
               <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
               Login
            </Typography>
            <Typography variant="body2" className={classes.colorError} align="center">
               {msg}
            </Typography>
            <form
               onSubmit={(event) => handleSubmit(event)}
               className={classes.form}
               noValidate
            >

               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  className={classes.inputColor}
                  value={login.email}
                  onChange={handleChange}
               />
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="senha"
                  label="senha"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={login.senha}
                  onChange={handleChange}
               />
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
               >
                  Fazer login
               </Button>
               <Grid container>
                  <Grid item>
                     <Link variant="body2" component={LinkRouterDom} to="/usuario/formulario">Se cadastrar</Link>
                  </Grid>
               </Grid>
            </form>
         </div>
      </Container>
   );
}

const mapStateToProps = (state) => ({
   usuarios: state.usuarios,
   login: state.login,
})

const mapDispatchToProps = (dispatch) => ({
   fazer_login: (dados) => dispatch(fazer_login(dados)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);