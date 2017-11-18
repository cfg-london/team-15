import React from 'react';
import FormComponent from './FormComponent.js';
import LogoComponent from './LogoComponent.js';
import HeaderComponent from './HeaderComponent.js';

class App extends React.Component {
   render() {
      return (
         <div>
           <HeaderComponent />
           <div className="main-content-wrap">
            <FormComponent />
           </div>
         </div>
      );
   }
}

export default App;
