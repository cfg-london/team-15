import React from 'react';
import FormComponent from './FormComponent.js';
import LogoComponent from './LogoComponent.js';
import HeaderComponent from './HeaderComponent.js';

var probTypes = [
{
  title: "Health",
  iconCode: "fa-medkit"
},
{
  title: "Social Isolation",
  iconCode: "fa-user-o"
},
{
  title: "Crisis",
  iconCode: "fa-exclamation-triangle"
}
];

class App extends React.Component {
   render() {
      return (
         <div>
           <HeaderComponent />
           <div className="main-content-wrap">
            <FormComponent probTypes={probTypes} />
           </div>
         </div>
      );
   }
}

export default App;
