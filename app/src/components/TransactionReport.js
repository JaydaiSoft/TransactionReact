import React from 'react';
import { Jumbotron, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import axios from 'axios';
import Select from 'react-select'
import DatePicker from 'reactstrap-date-picker'
import DataTable from 'react-data-table-component'


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
            selectedStatusOption: null,
            loading: false
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

    getParameters() {
        const self = this;
        if (self.state.selectedCurrencyOption == null) {
            alert("Please Select Currency")
            self.setState({ error: "Please Select Currency" })
            return null;
        }
        if (self.state.selectedStatusOption == null) {
            alert("Please Select Status")
            self.setState({ error: "Please Select Status" })
            return null;
        }
        const param = {
            curencyCode: self.state.selectedCurrencyOption.value,
            transactionStatus: self.state.selectedStatusOption.value,
            transDateStart: self.state.transDateStart,
            transDateEnd: self.state.transDateEnd
        }
        return param;
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

    async search() {
        const self = this;
        self.setState({ loading: true });
        let param = self.getParameters();
        if (param != null) {
            let url = 'http://localhost:53293/api/Transaction?CurrencyCode=' + encodeURIComponent(param.curencyCode) +
                '&TransactionStatus=' + encodeURIComponent(param.transactionStatus) +
                '&transDateFrom=' + encodeURIComponent(param.transDateStart) + '&transDateTO=' + encodeURIComponent(param.transDateEnd);
            await axios.get(url)
                .then((response) => {
                    console.log(response);
                    let transactionItems = response.data.transactionItems;

                    const Transaction = transactionItems.map((item) => ({
                        "TransactionDate":item.transactionDate,
                        "TransactionId": item.transactionId,
                        "Payment": item.payment,
                        "Status": item.status
                    }))
                    self.setState({ transaction: Transaction });
                    self.setState({ loading: false });
                }, (error) => {
                    console.log(error);
                    if (error.response.status = 404) {
                        self.setState({ transaction: [] })
                    }
                    self.setState({ loading: false });
                    return false;
                });
        }
        else {
            self.setState({ transaction: [] })
            self.setState({ loading: false });
        }
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

        const columns = [
            {
                name: 'TransactionDate',
                selector: 'TransactionDate',
                sortable: true,
            },
            {
                name: 'TransactionId',
                selector: 'TransactionId',
                sortable: true,
            },
            {
                name: 'Payment',
                selector: 'Payment',
                sortable: true,
            },
            {
                name: 'Status',
                selector: 'Status',
                sortable: true,
                center: true,
            },
        ];

        const customStyles = {
            rows: {
                style: {
                    minHeight: '72px', // override the row height
                }
            },
            headCells: {
                style: {
                    paddingLeft: '8px', // override the cell padding for head cells
                    paddingRight: '8px',
                },
            },
            cells: {
                style: {
                    paddingLeft: '8px', // override the cell padding for data cells
                    paddingRight: '8px',
                },
            },
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
                                minDate={new Date().toISOString()}
                                onChange={(v, f) => self.transDateStartChange(v, f)} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Transaction End Date</Label>
                            <DatePicker id="trans-end-datepickerr"
                                dateFormat={"DD-MM-YYYY"}
                                size={"md"}
                                style={datepicker}
                                value={self.state.transDateEnd}
                                minDate={new Date().toISOString()}
                                onChange={(v, f) => self.transDateEndChange(v, f)} />
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
                            <Label>Transaction Status</Label>
                            <Select
                                id="select-status"
                                value={self.state.selectedStatusOption}
                                options={self.state.StatusOptions}
                                onChange={(value) => self.selectStatusChange(value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button style={btnsearch} onClick={() => this.search()} size="md">Search</Button>{' '}
                            <Button style={btnclear} onClick={() => self.resetForm()} size="md">Clear</Button>{' '}
                        </FormGroup>
                    </Form>
                    <div>
                        <DataTable
                            id='transactionTable'
                            noHeader={true}
                            columns={columns}
                            data={self.state.transaction}
                            striped={true}
                            highlightOnHover={true}
                            noDataComponent={"No Transaction"}
                            responsive={true}
                            fixedHeader={true}
                            progressPending={self.state.loading}
                            style={customStyles}
                            hide={"md"}
                            pagination={true}
                            paginationPerPage={10}
                            paginationRowsPerPageOptions={[5,10, 15, 20, 25, 30]}
                            dense={true}
                        />
                    </div>
                </Jumbotron>
            </div>
        );
    }
}


export default TransactionReport;