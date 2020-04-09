import React, { Component } from 'react';
import getWeb3 from './getWeb3';
import DaiTokenMock from './contracts/DaiTokenMock.json';

// Components
import Navbar from './components/Navbar';
import Header from './components/Header';
import Form from './components/Form';
import Table from './components/Table';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      daiTokenMock: null,
      balance: 0,
      transactions: [],
      web3: null,
    }
    this.transaction = this.transaction.bind(this)
  }

  async componentDidMount() {
    const web3 = await getWeb3();
    this.setState({ web3 })
    // console.log(web3);
    const accounts = await web3.eth.getAccounts();
    // console.log(accounts);
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = DaiTokenMock.networks[networkId];
    // console.log(deployedNetwork)
    if (deployedNetwork) {
      const daiTokenMock = new web3.eth.Contract(
        DaiTokenMock.abi,
        deployedNetwork.address,
      );
      this.setState({ daiTokenMock });
      // console.log(this.state.daiTokenMock);
      const walletBallance = await daiTokenMock.methods.balanceOf(this.state.account).call();
      // por defaul trae la cantidad en wei's y hay que convertirla a ETH
      this.setState({ balance: web3.utils.fromWei(walletBallance.toString(), 'Ether') });
      console.log(this.state.balance);
      const transactions = await daiTokenMock.getPastEvents('Transfer',{ fromBlock: 0, toBlock: 'latest', filter: { from: this.state.account } });
      this.setState({ transactions })
      console.log(this.state.transactions)
    }
  };

  transaction(amount, recipient){
    this.state.daiTokenMock.methods.transfer(recipient, amount).send({ from: this.state.account })
  }

    render() {
      return (
        <div>
          <Navbar account={this.state.account} />
          <Header balance={this.state.balance} />
          <Form web3={this.stateweb3} transaction={this.transaction} />
          <Table transactions={this.state.transactions} web3={this.state.web3} />
        </div>
      );
    }
  }

  export default App;
