import React from 'react';
import Rotas from './Rotas';
import BarraNavegacao from './BarraNavegacao';
import { BrowserRouter as Router } from 'react-router-dom'
import { SnackbarProvider } from 'notistack';

const App = () => {

   return (
      <SnackbarProvider maxSnack={2}>
         <Router>
            <nav>
               <BarraNavegacao />
            </nav>
            <section>
               <main>
                  <Rotas />
               </main>
            </section>
         </Router>
      </SnackbarProvider>
   );
}

export default App;