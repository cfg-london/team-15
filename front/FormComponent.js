import React from 'react';

class FormComponent extends React.Component {
   render() {
      return (
         <div>
            <form>
              <input type="radio" name="urgent" /> URGENT
              <input type="radio" name="urgent" /> IMMEDIATE ATTENTION
              
            </form>
         </div>
      );
   }
}

export default FormComponent;
