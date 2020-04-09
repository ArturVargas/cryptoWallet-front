import React from 'react';

const Table = ({ transactions, web3 }) => (
  <div className="col-12">
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Recipient</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {
          transactions.map((trans, idx) => {
            return (
              <tr key={idx}>
                <th>{trans.returnValues.to}</th>
                <th>{web3.utils.fromWei(trans.returnValues.value.toString(), 'Ether')}</th>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  </div>
);

export default Table;