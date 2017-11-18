import React from 'react';
import LocationComponent from './LocationComponent.js';
import {geolocated} from 'react-geolocated';
import { Steps } from 'antd';
const Step = Steps.Step;

class FormComponent extends React.Component {

  constructor() {
    super();
    this.state = {urgency: 0,
                  show: '',
                  location: '',
                  latitude: '',
                  longitude: '',
                  step: 0,
                  specifics: ''};
    this.makeUrg = this.makeUrg.bind(this);
    this.makeLong = this.makeLong.bind(this);
    this.pickHealth = this.pickHealth.bind(this);
    this.pickSocial = this.pickSocial.bind(this);
    this.pickLegal = this.pickLegal.bind(this);
    this.pickFuture = this.pickCrisis.bind(this);
    this.pickDomestic = this.pickDomestic.bind(this);
    this.pickFinancial = this.pickFinancial.bind(this);
    this.storeLocation = this.storeLocation.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.increaseStep1 = this.increaseStep1.bind(this);
    this.increaseStep2 = this.increaseStep2.bind(this);
    this.decreaseStep0 = this.decreaseStep0.bind(this);
    this.decreaseStep1 = this.decreaseStep1.bind(this);
  }

  storeLocation() {
    this.setState({location: <LocationComponent updateForm={this.updateLocation} />});
  }

  increaseStep1(e){
    e.preventDefault();
    this.setState({step: 1});
    this.setState({show:
      (<div>
       <input type='radio' name='type' value='Health' /> Health
       <input type='radio' name='type' value='Social' /> Social Isolation
       <input type='radio' name='type' value='Legal' /> Legal
       <input type='radio' name='type' value='Crisis' /> Crisis
       <input type='radio' name='type' value='Future' /> Later Life Planning
       <input type='radio' name='type' value='Domestic' /> Domestic Assistance
       <input type='radio' name='type' value='Financial' /> Money and Benefits
       <input type='text' name='type' value='Other' />
       <div>
        Specifics (optional) <input type='text' onChange={this.increaseStep2}/>
       </div>
       <button onClick={this.increaseStep2} className='button-block'>Next</button>
       </div>)});
  }

  decreaseStep0(e){
    e.preventDefault();
    this.setState({step: 0});
  }

  increaseStep2(e){
    e.preventDefault();
    this.setState({step: 2});
    this.setState({show: (<div>
    <div>
    <input type='checkbox' onChange={this.storeLocation}/>Share location
    </div>
    <input type='checkbox' required /> Consent to LinkAge+
    <input type='submit' value='Send' />
   </div>)});
  }

  decreaseStep1(e){
    e.preventDefault();
    thi.setState({step: 1});
  }

  updateLocation(lat, long) {
    this.setState({latitude: lat});
    this.setState({longitude: long});
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
    if(this.state.step == 0)
    this.setState({show:
       (
         <div>
          <div>
            <div>
              Who has the problem? <input type='text' name='who' required />
            </div>
            <div>
              Their contact <input type='text' name='phone' required onChange={this.increaseStep1}/>
            </div>
          </div>
          <button onClick={this.increaseStep1} className='button-block'> Next</button>
         </div>)});
  }

  makeLong() {
  this.setState({urgency: 2});
  this.setState({show:
     (<div>
      <div>
        <div>
        Your function:
        <select name='function'>
          <option value='police'>Police</option>
          <option value='family'>Family member</option>
          <option value='doctor'>Doctor</option>
          <option value='volunteer'>Volunteer</option>
          <option value='firefighter'>Fire Fighter</option>
          <option value='socialworker'>Social Worker</option>
          <option value='other' >Other</option>
        </select>
        </div>
        <div>
        Who has the problem? <input type='text' name='who' required />
        </div>
        <div>
        Their contact: <input type='text' name='phone' required />
        </div>
        <div>
        Their address: <input type='text' name='address' required />
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
       <input type='text' name='type' placeholder='Other' />
      </div>
      <div>
      <input type='checkbox' onChange={this.storeLocation}/>Share location
      </div>
      <input type='checkbox' required /> Consent to LinkAge+
      <input type='submit' value='Send' />
  </div>) });
  }

   render() {

     let buttons = (this.state.urgency == 0) ? (<div>
                     What seems to be the problem?
                     <h2>
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

    let ssteps = (this.state.urgency == 1) ?
    <Steps current={this.state.step} >
    <Step title="Person" description="Add the details" />
    <Step title="Problem" description="Describe the problem" />
    <Step title="Finishing" description="Location and consent" />
    </Steps> : '';

    let form = (this.state.urgency != 0 ) ? (
      <div>
      {ssteps}
    <form action='/api/referral/add' method='POST'>
    {this.state.show}
    {this.state.specifics}
    <input type='hidden' name='urgent' value={(this.state.urgency==1)} />
    <input type='hidden' name='latitude' value={this.state.latitude} />
    <input type='hidden' name='longitude' value={this.state.longitude} />
   </form></div>) : '';

       return (

         <div>
         {buttons}
         {form}
         {this.state.location}
         </div>
       );
   }
}

export default FormComponent;
