import React, { Component } from 'react';

class FormProduto extends Component {
   
   handleSubmit = () => {
   }

   render() {
      return (
         <div>
            <form onSubmit={this.handleSubmit}>
               <label>Nome: </label>
               <input type="text" name="nome" />

               <label>Descrição: </label>
               <input type="text" name="descricao" />
               
               <label>Preço: </label>
               <input type="text" name="preco" />

               <input type="submit" value="Enviar" />
            </form>
         </div>
      );
   }
}

export default FormProduto;