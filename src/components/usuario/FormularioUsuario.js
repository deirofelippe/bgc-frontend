import React, { useState } from 'react';
import { v1 } from 'uuid';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { adicionar } from '../../redux/actions/usuarioActions';
import { fazer_login_direto } from '../../redux/actions/loginActions';
import { buscar_CEP, verificar_email_existe } from '../../services/usuarioService';
import { validar_email } from '../../utils/validacoes';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
      marginTop: theme.spacing(3),
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
   formControl: {
      width: '100%',
   },
   colorError: {
      color: theme.palette.error.dark
   },
}));

const FormularioUsuario = props => {
   const classes = useStyles();

   const estado_inicial_usuario = () => {
      return {
         id: v1(), nome: '', email: '', senha: "", tipo_de_usuario: "CLIENTE",
      }
   }

   const estado_inicial_endereco = () => {
      return {
         cep: '', estado: '', cidade: '',
         bairro: '', endereco: '', numero: '',
      }
   }

   let history = useHistory()
   const [usuario, setUsuario] = useState(estado_inicial_usuario())
   const [endereco, setEndereco] = useState(estado_inicial_endereco())
   const [msg, setMsg] = useState('')

   const handleChangeEndereco = event => {
      const { name, value } = event.target
      setEndereco({ ...endereco, [name]: value })
   }
   const handleChangeUsuario = event => {
      const { name, value } = event.target
      setUsuario({ ...usuario, [name]: value })
   }

   const handleCEP = async event => {
      event.preventDefault()
      const cep = endereco.cep
      const dados = await buscar_CEP(cep)
      await setEndereco({
         ...endereco,
         estado: dados.uf, cidade: dados.localidade,
         bairro: dados.bairro, endereco: dados.logradouro
      })
   }

   const handleSubmit = async (event) => {
      event.preventDefault()

      if (usuario.nome === '') {
         setMsg('Digite um nome valido.')
         return
      }

      if (usuario.email === '') {
         setMsg('Digite um email valido.')
         return
      }

      if (!validar_email(usuario.email)) {
         setMsg('Digite um email valido.')
         return
      }

      if (usuario.senha === '') {
         setMsg('Digite uma senha valida.')
         return
      }

      if (verificar_email_existe(props.usuarios, usuario.email)) {
         setMsg('Email ja cadastrado.')
         return
      }

      const usuario_completo = {
         ...usuario,
         endereco: { ...endereco }
      }

      const login_usuario_cadastrado = {
         logado: true,
         id: usuario.id,
         email: usuario.email,
         nome: usuario.nome,
         tipoDeUsuario: usuario.tipo
      }

      await props.adicionar(usuario_completo)

      if (login.tipo_de_usuario === 'ADMIN') {
         history.push("/usuarios")
         return
      }

      await props.fazer_login_direto(login_usuario_cadastrado)
      history.push("/")
   }

   const login = props.login

   return (
      <Container component="main" maxWidth="sm">
         <CssBaseline />
         <div className={classes.paper}>
            <Avatar className={classes.avatar}>
               <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
               Sign up
            </Typography>
            <form className={classes.form} noValidate onSubmit={(event) => handleSubmit(event)}>
               <Grid container spacing={2}>
                  <Grid item xs={12}>
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="nome"
                        label="Nome"
                        name="nome"
                        autoComplete="nome"
                        value={usuario.nome}
                        onChange={handleChangeUsuario}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        value={usuario.email}
                        onChange={handleChangeUsuario}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="senha"
                        label="Senha"
                        type="password"
                        id="senha"
                        autoComplete="current-password"
                        value={usuario.senha}
                        onChange={handleChangeUsuario}
                     />
                  </Grid>
                  {login.tipo_de_usuario === 'ADMIN' &&
                     <>
                        <Grid item xs={12}>
                           <FormControl variant="outlined" className={classes.formControl}>
                              <InputLabel id="select-outlined-label">Tipo de usuário</InputLabel>
                              <Select
                                 labelId="select-outlined-label"
                                 id="select-outlined"
                                 name="tipo"
                                 value={usuario.tipo}
                                 onChange={handleChangeUsuario}
                                 label="Tipo de usuário"
                              >
                                 <MenuItem value="CLIENTE" selected>Cliente</MenuItem>
                                 <MenuItem value="ADMIN">Administrador</MenuItem>
                              </Select>
                           </FormControl>
                        </Grid>
                     </>
                  }
                  <Grid item xs={12}>
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="cep"
                        label="CEP"
                        placeholder="12345-678"
                        type="text"
                        id="cep"
                        autoComplete="cep"
                        value={endereco.cep}
                        onChange={handleChangeEndereco}
                        onBlur={handleCEP}
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        variant="outlined"
                        required
                        disabled
                        fullWidth
                        name="estado"
                        label="Estado"
                        type="text"
                        id="estado"
                        autoComplete="estado"
                        value={endereco.estado}
                        onChange={handleChangeEndereco}
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        variant="outlined"
                        required
                        disabled
                        fullWidth
                        name="cidade"
                        label="Cidade"
                        type="Text"
                        id="cidade"
                        autoComplete="cidade"
                        value={endereco.cidade}
                        onChange={handleChangeEndereco}
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        variant="outlined"
                        required
                        disabled
                        fullWidth
                        name="bairro"
                        label="Bairro"
                        type="text"
                        id="bairro"
                        autoComplete="bairro"
                        value={endereco.bairro}
                        onChange={handleChangeEndereco}
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        variant="outlined"
                        required
                        disabled
                        fullWidth
                        name="endereco"
                        label="Endereço"
                        type="text"
                        id="endereco"
                        autoComplete="endereco"
                        value={endereco.endereco}
                        onChange={handleChangeEndereco}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="numero"
                        label="Numero"
                        type="text"
                        id="numero"
                        autoComplete="numero"
                        value={endereco.numero}
                        onChange={handleChangeEndereco}
                     />
                  </Grid>
               </Grid>
               <h3 className={classes.colorError}>
                  {msg}
               </h3>
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
               >
                  Cadastrar
               </Button>
            </form>
         </div>
      </Container>
   );
}

const mapStateToProps = state => ({
   usuarios: state.usuarios,
   login: state.login
})

const mapDispatchToProps = dispatch => ({
   adicionar: (usuario) => dispatch(adicionar(usuario)),
   fazer_login_direto: (login) => dispatch(fazer_login_direto(login))
})

export default connect(mapStateToProps, mapDispatchToProps)(FormularioUsuario);