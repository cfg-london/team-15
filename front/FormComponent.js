import React from 'react';
import LocationComponent from './LocationComponent.js';
import {geolocated} from 'react-geolocated';
import { Steps } from 'antd';
const Step = Steps.Step;

class FormComponent extends React.Component {

  // Take the buttons in as a give prop.

  constructor() {
    super();
    this.state = {urgency: 0,
                  show: '',
                  problemField: '',
                  activeButton: '',
                  location: '',
                  latitude: '',
                  longitude: '',
                  step: 0,
                  specifics: '',
                  submitDisabled: 0,
                  buttons: []};
    this.makeUrg = this.makeUrg.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.probTypeHandler = this.probTypeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);

  }

  handleSubmit(e) {
    e.preventDefault();

    var outputJSON = {};

    $(e.target).serializeArray().forEach(item => {

      outputJSON[item.name] = item.value;

    });

    console.log(outputJSON);

    // Send a post request to the Django endpoint.
    $.post('http://54.194.5.169:8000/api/referral/add', outputJSON);

  }

  // If component mounts, set all buttons to the activated state.
  componentDidMount(){

    $(document).ready(function(){

      console.log("JQUERY LOADED");

      setTimeout(function(){
        $('form#mainForm').submit(e => {
          e.preventDefault();


          var outputJSON = {};

          console.log($(this).serializeArray());

          $(this).serializeArray().forEach(item => {

            outputJSON[item.name] = item.value;

          });

          console.log(outputJSON);

        });
      }, 3000);


    })

  }

  probTypeHandler(event){

    event.preventDefault(); // Prevent the form from being submitted.

    // When we click a given element, we want to disable all the rest.
    this.setState({
      activeButton: event.target.innerText
    });

  }

  onSubmitHandler(){

    // Create the secret inputs.
    this.setState({
      problemField: (
        <input type="checkbox" name="problem" value={this.state.activeButton} />
      )
    });

  }

  storeLocation() {

    console.log(this.state.submitDisabled);
    this.setState({submitDisabled: 1});
    this.setState({
      location: <LocationComponent updateForm={this.updateLocation} />
    });

  }


  getButtons(){

    // Get all buttons
   this.setState({buttons:
      this.props.probTypes.map(prob => {
       return (
         <ProblemRadio
           key={prob.title}
           title={prob.title}
           iconCode={prob.iconCode}
         />
       );
     })});
  }

  increaseStep1(e){

    // e.preventDefault();

    let buttons = this.props.probTypes.map(prob => {
     return (
       <ProblemRadio
         key={prob.title}
         title={prob.title}
         iconCode={prob.iconCode}
       />
     );
   });

    //  var buttons = this.state.buttons;
    this.setState({step: 1});
    this.setState({show:
      (<div>

        <div className="probTypes-contafiner">
        {buttons}
        </div>

       <div>
        Specifics (optional) <input name="specifics" type='text'/>
       </div>
       </div>)});
  }

  decreaseStep0(e){
    e.preventDefault();
    this.setState({step: 0});
  }

  increaseStep2(e){
    // e.preventDefault();
    this.setState({step: 2});
    this.setState({show: (<div>
    <div>

     <div >

      Anything else we should know?
       <input name="extra" placeholder="E.g. Ran out of medication" type='text'/>
       </div>

        <label className="control switch success">
        <span className="control-label small">
          *I consent to the forwarding of this data to TOYNBE HALL.
        </span>
          <input name="consent" type="checkbox" name="checkbox" />
          <span className="control-indicator"></span>
        </label>

        <label className="control switch success">
        <span className="control-label small">
          (Optional) Share your location.
        </span>
        <input name="location" type='checkbox' onChange={this.storeLocation}/>
          <span className="control-indicator"></span>
        </label>

    </div>
    <input name="submitBtn" disabled={this.state.submitDisabled === 0 ? false : true} type='submit' value='Send' />
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
      What is the crisis? <input name="crisis" type='text' />
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

    let buttons = this.props.probTypes.map(prob => {
     return (
       <ProblemRadio
         key={prob.title}
         title={prob.title}
         iconCode={prob.iconCode}
       />
     );
   });

    this.setState({urgency: 1});
    if(this.state.step == 0)
    this.setState({show:
       (
         <div>
          <div>
        <div>
          <div>
          Who are we worried about? <input name="name" placeholder="John Smith" type='text' required name='who'/>
          </div>
          <div>
          How can we reach this person? <input name="phone" placeholder="+44 123 456 7890" type='text' name='phone' required />
          </div>
        </div>
          </div>

         <div>

           <div className="probTypes-contafiner">
           {buttons}
           </div>

          <div>
           Specifics (optional) <input name="extrainfo" type='text'/>
          </div>
          </div>)

          <div>
          <div>


           <div >
            Anything else we should know?
             <input name="extrainfo" placeholder="E.g. Ran out of medication" type='text'/>
             </div>

              <label className="control switch success">
              <span className="control-label small">
                *I consent to the forwarding of this data to TOYNBE HALL.
              </span>
                <input name="consent" type="checkbox" name="checkbox" />
                <span className="control-indicator"></span>
              </label>

              <label className="control switch success">
              <span className="control-label small">
                (Optional) Share your location.
              </span>
              <input name="location" type='checkbox' onChange={this.storeLocation}/>
                <span className="control-indicator"></span>
              </label>

          </div>
          <input name="submitBtn" disabled={this.state.submitDisabled === 0 ? false : true} type='submit' value='Send' />
         </div>
         </div>)
       });
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
       <input type='radio' name='category_name' value='Health' onChange={this.pickHealth} /> Health
       <input type='radio' name='category_name' value='Social' onChange={this.pickSocial} /> Social Isolation
       <input type='radio' name='category_name' value='Legal' onChange={this.pickLegal} /> Legal
       <input type='radio' name='category_name' value='Crisis' onChange={this.pickCrisis} /> Crisis
       <input type='radio' name='category_name' value='Future' onChange={this.pickFuture} /> Later Life Planning
       <input type='radio' name='category_name' value='Domestic' onChange={this.pickDomestic} /> Domestic Assistance
       <input type='radio' name='category_name' value='Financial' onChange={this.pickFinancial} /> Money and Benefits
       <input type='text' name='category_name' placeholder='Other' />
      </div>
      <div>
      <input name="shareLocation" type='checkbox' onChange={this.storeLocation}/>Share location
      </div>
      <input name="consent" type='checkbox' required /> Consent to LinkAge+
      <input name="submtBtn" type='submit' value='Send' />
  </div>) });
  }

   render() {

     if(this.state.latitude!==''){
       this.stetState({disabledSubmit: 0});
     }

     let buttons = (this.state.urgency == 0) ? (
                 <div>
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


    let form = (this.state.urgency != 0 ) ? (
      <div>
        <h2> Urgent Referral Request </h2>
        <p> Enter the details below and we'll assess the situation as soon as we can. </p>
    <form onSubmit={this.handleSubmit}>
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

// Pass in a problem type handler as a prop to this component.
//
/**
 * Takes in a iconCode & problem name as props and returns the button.
 * Also takes in a problem type handler which will be defined by the
 * parent container and passed to it as a prop.
 * @type {Object}
 */
class ProblemRadio extends React.Component {

  render(){
    return (

      <span>
        <label className="control radio">
        <input type="radio" name="probType" />
          <span className="control-indicator"></span>
          <span className="control-label">
          <i style={{marginRight: '10px'}} className={"fa "+this.props.iconCode} aria-hidden="true"></i>
          {this.props.title}</span>
        </label>
      </span>


    );

  }

}
//
// class ProblemRadio extends React.Component {
//
// }

export default FormComponent;
