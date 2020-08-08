import React from 'react';
import { Jumbotron, Button,Spinner  } from 'reactstrap';
import axios from 'axios';
import ReactFileReader from 'react-file-reader';
import * as xml2js from 'xml2js';


class TransactionUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filename: '',
      filesize:0.00,
      transaction: [],
      error: '',
      success:''
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
    this.setState({ success: '' });
  }

  async upload() {
    const self = this;
    if(self.state.filesize > 1){
      self.setState({error:"File size is too large for upload"});
      alert(self.state.error);
      return false;
    }

    if(self.state.error.length > 0){
      alert(self.state.error);
      return false;
    }

    const url = 'http://localhost:53293/api/Transaction/uploadtransactions';

    let data = {
      transactionPayloads: self.state.transaction
  };

    await axios.post(url, data)
      .then((response) => {
        console.log(response);
        self.setState({ success: response.data.message });
        self.setState({ transaction: [] });
        self.setState({ filename: '' });
      }, (error) => {
        console.log(error);
        self.setState({ filename: '' });
        self.setState({ error: error.message });
        alert(self.state.error);
        return false;
      });
  }


  handleFiles = files => {
    var reader = new FileReader();
    const self = this;
    let file = files[0];
    let size = file.size
    let maxsize = (size/1024);
    self.setState({filesize:maxsize});
    self.setState({error:''});

    reader.onload = function (e) {
      e.preventDefault();
      let transactionPayloads = [];
      let transaction = {};

      if (file.type === "text/xml") {
        const parser = new xml2js.Parser({ strict: false, trim: true });
        parser.parseString(reader.result, (err, result) => {
          result.TRANSACTIONS.TRANSACTION.forEach((element) => {
            transaction = {
              transactionId: element.TRANSACTIONID[0].trim(),
              amount:element.PAYMENTDETAILS[0].AMOUNT[0].trim(),
              currencyCode:element.PAYMENTDETAILS[0].CURRENCYCODE[0].trim(),
              TransactionDate: element.TRANSACTIONDATE[0].trim(),
              Status: element.STATUS[0].trim()
            };

            transactionPayloads.push(transaction);

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
          let dt  = element.TransactionDate.trim().split(/\-|\s/)
          var dateParts = dt[0].split("/");
          var fulldate = dateParts[2]+"-"+dateParts[1]+"-"+dateParts[0]+"T"+dt[1]+"Z";
          transaction = {
            transactionId: element.TransactionId.trim(),
            amount:element.Amount.trim(),
            currencyCode:element.CurrencyCode.trim(),
            transactionDate:fulldate,
            status: element.Status.trim()
          };

          transactionPayloads.push(transaction);
        })
      }
      else{
        self.setState({error:"Unknown format"});
      }


      self.SetTransactions(transactionPayloads);
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
          <h1 className="display-3">Transaction Upload</h1>
          <br></br>
          <p className="lead">{this.state.filename}</p>
          <p className="lead" style={error}>{this.state.error}</p>
          <p className="lead">{this.state.success}</p>
          <span style={inline}>
            <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv,.xml'}>
              <Button style={btnbrowse} size="md">Browse</Button>{' '}
            </ReactFileReader>
            <Button style={btnupload} onClick={() => this.upload()} size="md">Upload</Button>{' '}
          </span>
        </Jumbotron>
      </div>
    );
  }
}


export default TransactionUpload;