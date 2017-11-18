import React from 'react';

class FormComponent extends React.Component {

  constructor() {
    super();
    this.state = {urgency: 0,
                  show: '',
                  specifics: '',
                  buttons: ''};
    this.makeUrg = this.makeUrg.bind(this);
    this.makeLong = this.makeLong.bind(this);
    this.pickHealth = this.pickHealth.bind(this);
    this.pickSocial = this.pickSocial.bind(this);
    this.pickLegal = this.pickLegal.bind(this);
    this.pickFuture = this.pickCrisis.bind(this);
    this.pickDomestic = this.pickDomestic.bind(this);
    this.pickFinancial = this.pickFinancial.bind(this);
  }

  pickHealth(){
    this.setState({specifics: (<div>
        <select name='subtype'>
          <option value='Falls'>Falls</option>
          <option value='Medication'>Medication or Prescription</option>
          <option value='GP/Hospital'>Getting to GP/Hospital</option>
          <option value='Nursing'>Community nursing</option>
          <option value='Physio'>Physio Therapy</option>
        </select>
      </div>)});
  }

  pickSocial(){
    this.setState({specifics: (<div>
      <select name='subtype'>
        <option value='Suicide'>Potential Suicide</option>
        <option value='Friends'>No friends</option>
        <option value='Lost family'>Lost family</option>
      </select>
      </div>)});
  }

  pickLegal(){
    this.setState({specifics: (<div>
      <select name='subtype'>
        <option value='Housing'>Housing</option>
        <option value='Employment'>Employment</option>
        <option value='Welfare'>Welfare Benefits</option>
        <option value='Consumer'>Consumer</option>
        <option value='Immigration'>Immigration</option>
        <option value='Scams'>Scams and Rogue Traders</option>
      </select>
      </div>)});
  }

  pickCrisis(){
    this.setState({specifics: (<div>
      What is the crisis? <input type='text' />
      </div>)});
  }

  pickFuture(){
    this.setState({specifics: (<div>
      <select name='subtype'>
        <option value='Will'>Make a will</option>
        <option value='Funeral'>Planning and paying funerals</option>
        <option value='Equity'>Equity release</option>
        <option value='PayForCare'>Paying care</option>
      </select>
      </div>)});
  }

  pickDomestic(){
    this.setState({specifics: (<div>
      <select name='subtype'>
        <option value='Repairs'>Repairs</option>
        <option value='Neighbours'>Nuisance neighbours</option>
        <option value='Council issues'>Coucil issues</option>
        <option value='Adaptations'>Adaptations</option>
      </select>
      </div>)});
  }

  pickFinancial(){
    this.setState({specifics: (<div>
      <select name='subtype'>
        <option value='Debt'>Debt</option>
        <option value='Cards'>Credit cards arrears</option>
        <option value='CouncilTax'>Coucil tax arrears</option>
        <option value='Pensions'>Pensions</option>
      </select>
      </div>)});
  }

  makeUrg() {
    this.setState({urgency: 1});
    this.setState({show:
       (<div>
        <div>
          <div>
          Who has the problem? <input type='text' name='who'/>
          </div>
          <div>
          Their contact <input type='text' name='phone' />
          </div>
        </div>
        <div>
         <input type='radio' name='type' value='Health' /> Health
         <input type='radio' name='type' value='Social' /> Social Isolation
         <input type='radio' name='type' value='Legal' /> Legal
         <input type='radio' name='type' value='Crisis' /> Crisis
         <input type='radio' name='type' value='Future' /> Later Life Planning
         <input type='radio' name='type' value='Domestic' /> Domestic Assistance
         <input type='radio' name='type' value='Financial' /> Money and Benefits
         <div>
          Specifics (optional) <input type='text'/>
         </div>
        </div>
    </div>) });
  }

  makeLong() {
  this.setState({urgency: 2});
  this.setState({show:
     (<div>
      <div>
        <div>
        Your function:
        <select>
          <option value='police'>Police</option>
          <option value='family'>Family member</option>
          <option value='doctor'>Doctor</option>
          <option value='volunteer'>Volunteer</option>
        </select>
        </div>
        <div>
        Who has the problem? <input type='text' name='who'/>
        </div>
        <div>
        Their contact: <input type='text' name='phone' />
        </div>
        <div>
        Their address: <input type='text' name='address' />
        </div>
      </div>
      <div>
       <input type='radio' name='type' value='Health' onChange={this.pickHealth} /> Health
       <input type='radio' name='type' value='Social' onChange={this.pickSocial} /> Social Isolation
       <input type='radio' name='type' value='Legal' onChange={this.pickLegal} /> Legal
       <input type='radio' name='type' value='Crisis' onChange={this.pickCrisis} /> Crisis
       <input type='radio' name='type' value='Future' onChange={this.pickFuture} /> Later Life Planning
       <input type='radio' name='type' value='Domestic' onChange={this.pickDomestic} /> Domestic Assistance
       <input type='radio' name='type' value='Financial' onChange={this.pickFinancial} /> Money and Benefits
      </div>
  </div>) });
  }

   render() {

     let buttons = (this.state.urgency == 0) ? (<div>
       <h2>
                     What seems to be the problem?
                   </h2>
                   <button style={{height: 'auto'}} onClick={this.makeUrg} className="button button-xl button-block error position-center">
                     <i className="fa fa-2x fa-exclamation-circle" aria-hidden="true"></i>
                     <p> Someone needs urgent help </p>
                   </button>
                   <br />
                   <button style={{height: 'auto'}} onClick={this.makeLong} className="button button-xl warn button-block info">
                   <i className="fa fa-2x fa-handshake-o" aria-hidden="true"></i>
                     <p> Someone needs help </p>
                   </button>     </div>) : '';

       return (

         <div>
         {buttons}
          <form action='/api/referral/add' method='POST'>
          {this.state.show}
          {this.state.specifics}
          <input type='submit' value='Send' />
         </form>
         </div>
       );
   }
}

export default FormComponent;
