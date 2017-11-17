import React from 'react';

class FormComponent extends React.Component {

  constructor() {
    super();
    this.state = {urgency: 0,
                  show: '',
                  specifics: ''};
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
        <select>
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
      Can you go out?
      <select name='goOut'>
        <option value='true'> Yes</option>
        <option value='false'> No</option>
      </select>
      </div>)});
  }

  pickLegal(){
    this.setState({specifics: (<div>
      </div>)});
  }

  pickCrisis(){
    this.setState({specifics: (<div>
      </div>)});
  }

  pickFuture(){
    this.setState({specifics: (<div>
      </div>)});
  }

  pickDomestic(){
    this.setState({specifics: (<div>
      </div>)});
  }

  pickFinancial(){
    this.setState({specifics: (<div>
      </div>)});
  }

  makeUrg() {
    this.setState({urgency: 1});
    this.setState({show:
       (<div>
        <div>
          <div>
          Who ? <input type='text' name='who'/>
          </div>
          <div>
          Contact <input type='text' name='phone' />
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
       <div>
        Specifics (optional) <input type='text'/>
       </div>
      </div>
  </div>) });
  }

   render() {

       return (
         <div>
          <input type="radio" name="urgent" onChange={this.makeUrg} /> URGENT
          <input type="radio" name="urgent" onChange={this.makeLong}/> IMMEDIATE ATTENTION
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
