import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import axios from 'axios';
import ReactFileReader from 'react-file-reader';
import * as xml2js from 'xml2js';


class TransactionUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filename: '',
      transaction: [],
      error: ''
    };
  }

  SetTransactions(data) {
    this.setState({ transaction: data });
    data.forEach((element) => {
      console.log(element);
    })
  }

  SetFileName(data) {
    this.setState({ filename: data });
  }

  async upload() {
    const self = this;
    const url = 'http://localhost:xxxxx/2C2P/transactionupload';
    const payload = self.state.transaction;

    await axios.post(url, payload)
      .then((response) => {
        console.log(response);
        self.setState({ transaction: [] });
        self.setState({ filename: '' });
      }, (error) => {
        console.log(error);
        self.setState({ error: error });
      });
  }


  handleFiles = files => {
    var reader = new FileReader();
    const self = this;
    let file = files[0];
    reader.onload = function (e) {
      e.preventDefault();
      let Transactions = [];
      let transaction = {};

      if (file.type === "text/xml") {
        const parser = new xml2js.Parser({ strict: false, trim: true });
        parser.parseString(reader.result, (err, result) => {
          result.TRANSACTIONS.TRANSACTION.forEach((element) => {
            transaction = {
              TransactionId: element.TRANSACTIONID[0],
              TransactionDate: element.TRANSACTIONDATE[0],
              PaymentDetails: { Amount: element.PAYMENTDETAILS[0].AMOUNT[0], CurrencyCode: element.PAYMENTDETAILS[0].CURRENCYCODE[0] },
              Status: element.STATUS[0]
            };

            Transactions.push(transaction);

          });
        });
      }
      else if (file.type === "application/vnd.ms-excel") {
        var csv = e.target.result;
        var lines = csv.split("\r\n");
        var result = [];

        var headers = lines[0].trim().split(",");

        for (var i = 1; i < lines.length - 1; i++) {

          var obj = {};
          var currentline = lines[i].trim().split(",");

          for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
          }
          result.push(obj);
        }

        result.forEach((element) => {
          transaction = {
            TransactionId: element.TransactionId,
            TransactionDate: element.TransactionDate,
            PaymentDetails: { Amount: element.Amount, CurrencyCode: element.CurrencyCode },
            Status: element.Status
          };

          Transactions.push(transaction);
        })
      }


      self.SetTransactions(Transactions);
      self.SetFileName(file.name);
    }

    reader.readAsText(files[0]);
  }

  render() {
    const btnbrowse = {
      color: "white",
      backgroundColor: "#337ab7",
    };
    const btnupload = {
      color: "white",
      backgroundColor: "#337ab7",
      marginLeft: "5px"
    };
    const inline = {
      display: "inline-flex",
      marginLeft: "5px"
    };
    const error = {
      fontWeight: "bold",
      color: "Red"
    };

    return (
      <div>
        <Jumbotron>
          <h1 className="display-3">2C2P Transaction Upload</h1>
          <br></br>
          <p className="lead">{this.state.filename}</p>
          <p className="lead" style={error}>{this.state.error}</p>
          <span style={inline}>
            <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv,.xml'}>
              <Button style={btnbrowse} size="sm">Browse</Button>{' '}
            </ReactFileReader>
            <Button style={btnupload} onClick={() => this.upload()} size="sm">Upload</Button>{' '}
          </span>
        </Jumbotron>
      </div>
    );
  }
}


export default TransactionUpload;