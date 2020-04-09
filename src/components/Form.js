import React, { Component } from 'react';
import getWeb3 from '../getWeb3';

class Form extends Component {
  constructor() {
    super()
    this.state = {
      web3: null
    }
  }
  async componentDidMount() {
    const web3 = await getWeb3();
    this.setState({ web3 })
  }

  render() {
    return (
      <div className="col-6 mx-auto mb-3">
        <form onSubmit={(event) => {
          event.preventDefault();
          const amount = this.state.web3.utils.toWei(this.amount.value, 'Ether');
          const recipient = this.recipient.value;
          console.log(amount, recipient);
          this.props.transaction(amount, recipient);
        }}>
          <div className="form-group">
            <label>Transfer Amount</label>
            <input
              type="text"
              className="form-control"
              id="amountSend"
              placeholder="10 DAY's"
              ref={ (input) => { this.amount = input}}
            />
          </div>
          <div className="form-group">
            <label>Recipient Address</label>
            <input
              type="text"
              className="form-control"
              id="recipient"
              placeholder="Recipient Address"
              ref={ (input) => { this.recipient = input}}
            />
          </div>
          <button className="btn btn-block btn-outline-info" type="submit">
            Enviar
      </button>
        </form>
      </div>
    );
  }
};

export default Form;