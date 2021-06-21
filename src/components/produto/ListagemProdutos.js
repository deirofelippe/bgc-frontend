import React from 'react';
import { Link as LinkRouterDom, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletar } from '../../redux/actions/produtoActions';
import { adicionar } from '../../redux/actions/carrinhoActions';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
   icon: {
      marginRight: theme.spacing(2),
   },
   heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
   },
   heroButtons: {
      marginTop: theme.spacing(4),
   },
   cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
   },
   card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
   },
   cardMedia: {
      paddingTop: '56.25%', // 16:9
   },
   cardContent: {
      flexGrow: 1,
   },
   footer: {
      backgroundColor: "#d6d6d6",
      padding: theme.spacing(6),
   },
}));

const ListagemProdutos = (props) => {
   const classes = useStyles();
   const history = useHistory();

   const handleDelete = (id) => {
      if (window.confirm("Tem certeza que deseja deletar?")) {
         props.deletar_produto(id)
      }
   }

   const handleSubmit = (id_produto, id_usuario) => {
      if (login.logado === false) {
         alert("Faça login para reservar um produto.")
         return
      }
      props.adicionar_no_carrinho({ id_produto, id_usuario })
   }

   const handleEdit = (id_produto) => {
      history.push(`/produto/atualizacao/${id_produto}`)
   }

   const formatarPreco = preco => {
      const formatter = new Intl.NumberFormat('pt-BR',
         { style: 'currency', currency: 'BRL' }
      );

      return formatter.format(preco)
   }

   const produtos = props.produtos
   const login = props.login

   return (
      <React.Fragment>
         <CssBaseline />
         <main>
            <Container className={classes.cardGrid} maxWidth="md">
               <Grid container spacing={4}>
                  {produtos.map((produto) => (
                     <Grid item key={produto.id} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                           <LinkRouterDom to={`/produto/${produto.id}`}>
                              <CardMedia
                                 className={classes.cardMedia}
                                 image="https://source.unsplash.com/random"
                                 title="Image title"
                              />
                           </LinkRouterDom>
                           <CardContent className={classes.cardContent}>
                              <Typography gutterBottom variant="h5" component="h2">
                                 <Link to={`/produto/${produto.id}`} variant="body2" component={LinkRouterDom}>{produto.nome}</Link>
                              </Typography>
                              <Typography>
                                 {produto.descricao}
                              </Typography>
                              <Typography gutterBottom variant="h5" component="h2">
                                 {formatarPreco(produto.preco)}
                              </Typography>
                           </CardContent>
                           <CardActions>
                              <Button onClick={() => handleSubmit(produto.id, login.id)}
                                 size="small" variant="contained" color="primary" fullWidth>
                                 Reservar
                              </Button>
                              {login.tipo_de_usuario === 'ADMIN' &&
                                 <>
                                    <Button onClick={() => handleEdit(produto.id)}
                                       size="small" variant="outlined" color="primary">
                                       Editar
                                    </Button>
                                    <Button onClick={() => handleDelete(produto.id)}
                                       size="small" variant="outlined" color="primary">
                                       Deletar
                                    </Button>
                                 </>
                              }
                           </CardActions>
                        </Card>
                     </Grid>
                  ))}
               </Grid>
            </Container>
         </main>
      </React.Fragment>
   )
}

const mapStateToProps = state => ({
   produtos: state.produtos,
   login: state.login
})

const mapDispatchToProps = dispatch => ({
   deletar_produto: (id) => dispatch(deletar(id)),
   adicionar_no_carrinho: (ids) => dispatch(adicionar(ids))
})

export default connect(mapStateToProps, mapDispatchToProps)(ListagemProdutos);