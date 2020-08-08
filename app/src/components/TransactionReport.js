import React from 'react';
import { Jumbotron, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import Select from 'react-select'
import DatePicker from 'reactstrap-date-picker'


class TransactionReport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filename: '',
            filesize: 0.00,
            transaction: [],
            error: '',
            success: '',
            transDateStart: new Date().toISOString(),
            transDateEnd: new Date().toISOString(),
            selectStatus: '',
            currency:''
        };
    }

    transDateStartChange(value, formattedValue) {
        this.setState({
            transDateStart: value,
            formattedValue: formattedValue
        })
    }

    transDateEndChange(value, formattedValue) {
        this.setState({
            transDateEnd: value,
            formattedValue: formattedValue
        })
    }

    selectStatusChange(optionSelected) {
        this.setState({ selectStatus: optionSelected.value });
        console.log(optionSelected.label);
    }

    selectCurrencyChange(optionSelected) {
        this.setState({ currency: optionSelected.value });
        console.log(optionSelected.label);
    }

    render() {

        const formgroup = {
            justifyContent: "center"
        };

        const datepicker = {
            width: "150px"
        };

        const btnsearch = {
            color: "white",
            backgroundColor: "#337ab7",
            width: "80px"
        };
        const btnclear = {
            color: "white",
            backgroundColor: "#337ab7",
            marginLeft: "5px",
            width: "80px"
        };

        const options = [
            { value: 'A', label: 'Approved' },
            { value: 'R', label: 'Failed/Rejected' },
            { value: 'D', label: 'Finished/Done' }
        ]

        const CurrencyOptions = [
            { value: 'USD', label: 'USD' },
            { value: 'THB', label: 'THB' }
        ]

        return (
            <div>
                <Jumbotron>
                    <h1 className="display-3">Transaction Report</h1>
                    <br></br>
                    <Form inline style={formgroup}>
                        <FormGroup>
                            <Label>Transaction Start Date</Label>
                            <DatePicker id="trans-start-datepicker"
                                dateFormat={"DD-MM-YYYY"}
                                size={"md"}
                                style={datepicker}
                                value={this.state.transDateStart}
                                onChange={(v, f) => this.transDateStartChange(v, f)} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Transaction End Date</Label>
                            <DatePicker id="trans-end-datepickerr"
                                dateFormat={"DD-MM-YYYY"}
                                size={"md"}
                                style={datepicker}
                                value={this.state.transDateEnd}
                                onChange={(v, f) => this.transDateEndChange(v, f)} />
                        </FormGroup>
                        <FormGroup>
                        <Label>Transaction Status</Label>
                            <Select
                                id="select-status"
                                options={options}
                                onChange={(value) => this.selectStatusChange(value)}
                            />
                        </FormGroup>
                        <FormGroup>
                        <Label>Currency</Label>
                            <Select
                                id="select-currency"
                                options={CurrencyOptions}
                                onChange={(value) => this.selectCurrencyChange(value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button style={btnsearch} size="md">Search</Button>{' '}
                            <Button style={btnclear} size="md">Clear</Button>{' '}
                        </FormGroup>
                    </Form>
                </Jumbotron>
            </div>
        );
    }
}


export default TransactionReport;