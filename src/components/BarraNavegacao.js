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
      console.log('Fazer logout')
      props.fazerLogout()
   }

   const login = props.login

   return (
      <Typography className={classes.root}>
         <Link to="/">
            Listar produtos
         </Link>
         <Link to="/produto/form">
            Cadastrar produto
         </Link>
         {login.logado === false 
            ? <Link to="/login">Login</Link>
            : <button onClick={handleLogout}>Logout</button>
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