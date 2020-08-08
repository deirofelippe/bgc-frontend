import React, { Component } from 'react';
import gerarID from '../../utils/GerarID';

class FormProduto extends Component {
   constructor(props) {
      super(props);
      this.state = {}
      this.limparCampos();
      this.handleChange = this.handleChange.bind(this)
   }

   handleChange(event){
      const { name, value } = event.target
      this.setState({ [name]: value })
   }

   limparCampos(){
      const produto = {
         id: gerarID(),
         nome: '',
         descricao: '',
         preco: '',
      }
      this.setState(produto)
   }

   render() {
      return (
         <form onSubmit={(event) => {
            this.props.handleSubmit(event, this.state)
            this.limparCampos()
         }}>
            <label>Nome: </label>
            <input type="text" 
               name="nome" 
               value={this.state.nome} 
               onChange={this.handleChange} />

            <label>Descrição: </label>
            <input type="text" 
               name="descricao" 
               value={this.state.descricao} 
               onChange={this.handleChange} />
            
            <label>Preço: </label>
            <input type="text" 
               name="preco" 
               value={this.state.preco} 
               onChange={this.handleChange} />

            <input type="submit" value="Cadastrar" />
         </form>
      );
   }
}

export default FormProduto;