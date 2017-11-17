import React from 'react';

class FormComponent extends React.Component {

  constructor() {
    super();
    this.state = {urgency: 0,
                  show: ''};
    this.makeUrg = this.makeUrg.bind(this);
    this.makeLong = this.makeLong.bind(this);
  }

  makeUrg() {
    this.setState({urgency: 1});
    this.setState({show:
       (<div>
       <form action='/api/referral/add' method='POST'>
        <div>
          <div>
          Your name: <input type='text' name='sender'/>
          </div>
          <div>
          Who ? <input type='text' name='who'/>
          </div>
          <div>
          Contact <input type='text' name='phone' />
          </div>
        </div>
        <div>
         <input type='radio' name='type' /> Health
         <input type='radio' name='type' /> Social Isolation
         <input type='radio' name='type' /> Legal
         <input type='radio' name='type' /> Crisis
         <input type='radio' name='type' /> Getting out and about
         <input type='radio' name='type' /> Later Life Planning
         <input type='radio' name='type' /> Domestic Assistance
         <input type='radio' name='type' /> Money and Benefits
         <div>
          Specifics (optional) <input type='text'/>
         </div>
        </div>
        <input type='submit' value='Send' />
       </form>
    </div>) });
  }

  makeLong() {
  this.setState({urgency: 2});
  }

   render() {

       return (
         <div>
          <input type="radio" name="urgent" onChange={this.makeUrg} /> URGENT
          <input type="radio" name="urgent" onChange={this.makeLong}/> IMMEDIATE ATTENTION
          {this.state.show}
         </div>
       );
   }
}

export default FormComponent;
