import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fazerLogout } from '../redux/actions/loginActions';

const BarraNavegacao = (props) => {
   const useStyles = makeStyles((theme) => ({
      root: {
         '& > * + *': {
            marginLeft: theme.spacing(2),
         },
      },
   }));
   const classes = useStyles();

   const handleLogout = event => {
      event.preventDefault()
      props.fazerLogout()
   }

   const login = props.login

   return (
      <Typography className={classes.root}>
         <Link to="/">
            Listar produtos
         </Link>

         {login.tipoDeUsuario === 'ADMIN' &&
            <>
               <Link to="/produto/formulario">
                  Cadastrar produto
               </Link>
               <Link to="/usuarios">
                  Listar usuários
               </Link>
               <Link to="/usuario/formulario">
                  Cadastrar usuário
               </Link>
            </>
         }

         <Link to="/reserva">
            Historico de reservas
         </Link>
         
         {login.logado === false 
            ? <Link to="/login">Login</Link>
            : 
               <>
                  <Link to={`/usuario/${login.id}`}>Olá, {login.nome}</Link>
                  <button onClick={handleLogout}>Logout</button>
               </>
         }
      </Typography>
   );
}

const mapStateToProps = (state) => ({
   login: state.login
})

const mapDispatchToProps = (dispatch) => ({
   fazerLogout: () => dispatch(fazerLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(BarraNavegacao);