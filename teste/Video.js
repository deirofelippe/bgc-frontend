import React from 'react';
import {connect} from 'redux';
//se colocar um action aqui, vai do componente p store

function Video({ activeModule, activeLesson }) {
   return (
      <div>
         <strong>{activeModule.title}</strong>
         <span>{activeLesson.title}</span>
      </div>
   );
}

//pega do state p componente
export default connect(state => ({
      activeModule: state.course.activeModule,
   activeLesson: state.course.activeLesson
}))(Video);