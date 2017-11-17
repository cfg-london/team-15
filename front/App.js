import React from 'react';
import FormComponent from './FormComponent.js';
import LogoComponent from './LogoComponent.js';

class App extends React.Component {
   render() {
      return (
         <div>
         <LogoComponent />
         <FormComponent />
         </div>
      );
   }
}

export default App;
