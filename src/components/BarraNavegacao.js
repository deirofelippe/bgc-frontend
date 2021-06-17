import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { fazer_logout } from '../redux/actions/loginActions';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AppBar from '@material-ui/core/AppBar';

const useStyles = makeStyles({
   root: {
      flexGrow: 1,
   },
});

const BarraNavegacao = (props) => {
   const classes = useStyles();

   let history = useHistory()

   const handleLogout = event => {
      event.preventDefault()
      props.fazer_logout()
      history.push('/')
   }

   const login = props.login
   let qtd_itens_carrinho = 0
   props.carrinho.forEach((item) => {
      if (item.id_usuario === props.login.id) {
         qtd_itens_carrinho += 1
      }
   })

   return (
      <Paper square className={classes.root}>
         <AppBar position="sticky">
            <Tabs>
               <Tab label="Listar produtos" to="/" component={Link} />

               {login.tipo_de_usuario === 'ADMIN' &&
                  <>
                     <Tab to="/produto/formulario"
                        label="Cadastrar produto"
                        component={Link} />
                     <Tab to="/usuarios"
                        label="Listar usuários"
                        component={Link} />
                     <Tab to="/usuario/formulario"
                        label="Cadastrar usuário"
                        component={Link} />
                  </>
               }

               {login.logado === false
                  ? <Tab to="/login"
                     label="Login"
                     component={Link} />
                  :
                  <>
                     <Tab to="/pedidos"
                        label="Historico de pedidos"
                        component={Link} />

                     <Tab to="/carrinho"
                        icon={<ShoppingCartIcon />}
                        label={qtd_itens_carrinho}
                        component={Link} />

                     <Tab to={`/usuario/${login.id}`}
                        label={`Olá, ${login.nome}`}
                        component={Link} />

                     <Tab onClick={handleLogout}
                        label="Logout" />
                  </>
               }
            </Tabs>
         </AppBar>
      </Paper>
   );
}

const mapStateToProps = (state) => ({
   login: state.login,
   carrinho: state.carrinho
})

const mapDispatchToProps = (dispatch) => ({
   fazer_logout: () => dispatch(fazer_logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(BarraNavegacao);