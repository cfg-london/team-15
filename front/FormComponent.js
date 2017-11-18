import React from 'react';

class FormComponent extends React.Component {

  // Take the buttons in as a give prop.

  constructor() {
    super();
    this.state = {urgency: 0,
                  show: '',
                  specifics: '',
                  activatedButtons: []
                };
    this.makeUrg = this.makeUrg.bind(this);
    this.makeLong = this.makeLong.bind(this);
    this.pickHealth = this.pickHealth.bind(this);
    this.pickSocial = this.pickSocial.bind(this);
    this.pickLegal = this.pickLegal.bind(this);
    this.pickFuture = this.pickCrisis.bind(this);
    this.pickDomestic = this.pickDomestic.bind(this);
    this.pickFinancial = this.pickFinancial.bind(this);

    this.probTypeHandler = this.probTypeHandler.bind(this);
  }

  // If component mounts, set all buttons to the activated state.
  componentDidMount(){

    var probTitles = [];

    // Create the prob Titles array from props passed into Form component.
    this.props.probTypes.forEach(prob => {
      probTitles.push(prob.title);
    });

    // Set all buttons to activated at first.
    this.setState({
      activatedButtons: this.props.probTypes
    });
  }

  probTypeHandler(event){
    event.preventDefault(); // Prevent the form from being submitted.

    // When we click a given element, we want to disable all the rest.s

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

    // Get all buttons
    var buttons = this.props.probTypes.map(prob => {
        return (
          <ProblemButton
            title={prob.title}
            iconCode={prob.iconCode}
            clickHandler={this.probTypeHandler}
          />
        );
      });

    this.setState({urgency: 1});
    this.setState({show:
       (<div>

         <h2> Urgent Referral Request </h2>
         <p> Enter the details below and we'll assess the situation as soon as we can. </p>

        <div>
          <div>
          Who are we worried about? <input placeholder="John Smith" type='text' name='who'/>
          </div>
          <div>
          How can we reach this person? <input placeholder="+44 123 456 7890" type='text' name='phone' />
          </div>
        </div>

        <div className="probTypes-container">
          {buttons}
        </div>
        <div>
         Anything else we should know?
         <input placeholder="E.g. Ran out of medication" type='text'/>
        </div>
        <label class="control switch success">
        <span class="control-label small">
          *I consent to the forwarding of this data to TOYNBE HALL.
        </span>
          <input type="checkbox" name="checkbox" />
          <span class="control-indicator"></span>
        </label>
        <input type='submit' value='Submit Referral' />
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
          <form action='54.194.5.169:8000/api/refferral/add' method='POST'>
          {this.state.show}
          {this.state.specifics}
         </form>
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
class ProblemButton extends React.Component {

  render(){

    return (

      <button className="probType-button" onClick={this.props.clickHandler.bind(this)} className="button button-pill button-xl">
        <i style={{marginRight: '5px'}} className={"fa " + this.props.iconCode} aria-hidden="true"></i>
         {this.props.title}
      </button>


    );

  }

}

export default FormComponent;
