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
            selectedCurrencyOption: null,
            CurrencyOptions: [],
            StatusOptions: [],
            selectedStatusOption: null
        };

        this.baseState = this.state
    }

    componentWillMount() {
        this.getCurrencyOptions();
        this.GetStatusOptions();
    }

    resetForm = () => {
        this.setState(this.baseState)
        this.getCurrencyOptions();
        this.GetStatusOptions();
    }

    GetStatusOptions() {
        const options = [
            { value: 'A', label: 'Approved' },
            { value: 'R', label: 'Failed/Rejected' },
            { value: 'D', label: 'Finished/Done' }
        ]
        this.setState({ StatusOptions: options });
    }

    async getCurrencyOptions() {
        const res = await axios.get('http://localhost:53293/api/Transaction/Currency')
        const data = res.data

        const options = data.map((currElement, index) => ({
            "value": data[index],
            "label": data[index]
        }))
        this.setState({ CurrencyOptions: options })
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
        this.setState({ selectedStatusOption: optionSelected });
        console.log(optionSelected.label);
    }

    selectCurrencyChange(optionSelected) {
        this.setState({ selectedCurrencyOption: optionSelected });
        console.log(optionSelected.label);
    }

    render() {

        const self = this;
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
                                value={self.state.transDateStart}
                                onChange={(v, f) => self.transDateStartChange(v, f)} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Transaction End Date</Label>
                            <DatePicker id="trans-end-datepickerr"
                                dateFormat={"DD-MM-YYYY"}
                                size={"md"}
                                style={datepicker}
                                value={self.state.transDateEnd}
                                onChange={(v, f) => self.transDateEndChange(v, f)} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Transaction Status</Label>
                            <Select
                                id="select-status"
                                value={self.state.selectedStatusOption}
                                options={self.state.StatusOptions}
                                onChange={(value) => self.selectStatusChange(value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Currency</Label>
                            <Select
                                id="select-currency"
                                value={self.state.selectedCurrencyOption}
                                options={self.state.CurrencyOptions}
                                onChange={(value) => self.selectCurrencyChange(value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button style={btnsearch} size="md">Search</Button>{' '}
                            <Button style={btnclear} onClick={() => self.resetForm()} size="md">Clear</Button>{' '}
                        </FormGroup>
                    </Form>
                </Jumbotron>
            </div>
        );
    }
}


export default TransactionReport;