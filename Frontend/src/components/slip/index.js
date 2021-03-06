import React from 'react';
import './style.css';
import moment from 'moment';

export default class Slip extends React.Component {
    state = {
        startDate: new Date(),
        totalSalary: "",
        lastSalary : 0,
        days : "",
    }
    onChange = (e) => {
        this.props.onChange(e.target.value.replace(/\D/g, ""))
    }
    componentDidUpdate = (props) => {
        const { allowance, loan, salary } = this.props.staff;
        if (this.props.staff !== props.staff) {
            this.setState({
                ...this.state,
                totalSalary: (salary - loan + parseInt(allowance))
            })
        }
        if(this.props.days !== props.days){
            this.setState({
                ...this.state,
                days : this.props.days
            })
        }
    }
    render() {
        const { address, grade, allowance, loan, id, joiningDate, phone, position, salary, employeeName } = this.props.staff;
        const {days} = this.state;
        function numberToEnglish(n) {
            
            var string = n.toString(), units, tens, scales, start, end, chunks, chunksLen, chunk, ints, i, word, words, and = 'and';
            
            /* Remove spaces and commas */
            string = string.replace(/[, ]/g, "");
            
            /* Is number zero? */
            if (parseInt(string) === 0) {
                return 'zero';
            }

            /* Array of units as words */
            units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

            /* Array of tens as words */
            tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

            /* Array of scales as words */
            scales = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quatttuor-decillion', 'quindecillion', 'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'centillion'];

            /* Split user argument into 3 digit chunks from right to left */
            start = string.length;
            chunks = [];
            while (start > 0) {
                end = start;
                chunks.push(string.slice((start = Math.max(0, start - 3)), end));
            }

            /* Check if function has enough scale words to be able to stringify the user argument */
            chunksLen = chunks.length;
            if (chunksLen > scales.length) {
                return '';
            }

            /* Stringify each integer in each chunk */
            words = [];
            for (i = 0; i < chunksLen; i++) {

                chunk = parseInt(chunks[i]);

                if (chunk) {

                    /* Split chunk into array of individual integers */
                    ints = chunks[i].split('').reverse().map(parseFloat);

                    /* If tens integer is 1, i.e. 10, then add 10 to units integer */
                    if (ints[1] === 1) {
                        ints[0] += 10;
                    }

                    /* Add scale word if chunk is not zero and array item exists */
                    if ((word = scales[i])) {
                        words.push(word);
                    }

                    /* Add unit word if array item exists */
                    if ((word = units[ints[0]])) {
                        words.push(word);
                    }

                    /* Add tens word if array item exists */
                    if ((word = tens[ints[1]])) {
                        words.push(word);
                    }

                    /* Add 'and' string after units or tens integer if: */
                    if (ints[0] || ints[1]) {


                        if( ints[2] && ! i && chunksLen ) {
                            console.log("RUN 104 SLIP")
                            words.push( and );
                        }

                    }

                    /* Add hundreds word if array item exists */
                    if ((word = units[ints[2]])) {
                        words.push(word + ' hundred');
                    }

                }

            }
            return words.reverse().join(' ');

        }
        const calculateSalary = (this.state.totalSalary / 26) * days;
        let totalSalary = calculateSalary.toFixed(0).toString().split('');
        totalSalary.reverse();
        totalSalary[0] = "0";
        totalSalary[1] = "0";
        totalSalary[2] = "0";
        totalSalary = totalSalary.reverse().join('');
        function toStr(params) {
            return params.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }

        function test(v) {
            // var sep = ('string' == typeof v) ? '"' : '';
            return (numberToEnglish(v));
        }
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="test_wrapper">
                            <div className="div1">
                                <div className="" style={{ backgroundColor: "green", height: 100, width: "25%" }}>

                                </div>
                                <div style={{ width: "50%" }}>
                                    SALARY SLIP
                                </div>
                                <div className="" style={{ backgroundColor: "green", height: 100, width: "25%" }}>

                                </div>
                            </div>
                            <div className="div2">
                                <div className="div2_wrap col-lg-6" style={{ borderRight: "1px solid black" }}>
                                    <div className="div2_test text_padding">
                                        <span>Employee ID </span>
                                        <p>: {id}</p>
                                    </div>
                                    <div className="div2_test text_padding">
                                        <span>Name </span>
                                        <p style={{ fontWeight: 500 }}>: {employeeName}</p>
                                    </div>
                                    <div className="div2_test text_padding">
                                        <span>Phone</span>
                                        <p>: {phone}</p>
                                    </div>
                                    <div className="div2_test text_padding">
                                        <span>Address</span>
                                        <p>: {address}</p>
                                    </div>
                                </div>
                                <div className="div2_wrap col-lg-6">
                                    <div className="div2_test text_padding">
                                        <span>Designation </span>
                                        <p>: {position}</p>
                                    </div>
                                    <div className="div2_test text_padding">
                                        <span>Grade</span>
                                        <p>: {grade}</p>
                                    </div>
                                    <div className="div2_test text_padding">
                                        <span>Joining Date </span>
                                        <p>: {moment(joiningDate).format("L")}</p>
                                    </div>
                                    <div className="div2_test text_padding">
                                        <span>Days Worked </span>:
                                        <input className="xxxx" type="text" value={days} onChange={(e) => this.onChange(e)} maxLength="2" placeholder="days?" />
                                    </div>
                                </div>
                            </div>
                            <div className="div3">
                                <div className="div3_test text_padding" style={{ borderRight: "1px solid black", width: "50%" }}>
                                    <span>Description</span>
                                </div>
                                <div className="div3_test text_padding" style={{ borderRight: "1px solid black", width: "25%" }}>
                                    <span>Earning</span>
                                </div>
                                <div className="div3_test text_padding" style={{ width: "25%" }}>
                                    <span>Deductions</span>
                                </div>
                            </div>
                            <div className="div4">
                                <div className="div4_test text_padding" style={{ borderRight: "1px solid black", width: "50%" }}>
                                    <p style={{ color: "black", paddingTop: "1.5em" }}>Basic Salary</p>
                                    <p style={{ color: "black" }}>Allowance</p>
                                    <p style={{ color: "black" }}>Loan</p>
                                    <p style={{ color: "black",paddingBottom: "2em" }}>Tax</p>
                                    
                                </div>
                                <div className="div4_test text_padding" style={{ borderRight: "1px solid black", width: "25%" }}>
                                    <p style={{ paddingTop: "1.5em" }}>{toStr(salary)} VND (26 days)</p>
                                    <p>{toStr(allowance)} VND</p>
                                    <p>&nbsp;</p>
                                    <p  style={{ color: "black",paddingBottom: "2em" }}>&nbsp;</p>
                                   
                                </div>
                                <div className="div4_test text_padding" style={{ width: "25%" }}>
                                    <p style={{ paddingTop: "1.5em" }}>&nbsp;</p>
                                    <p>&nbsp;</p>
                                    <p>{toStr(loan)} VND</p>
                                    <p  style={{ color: "black",paddingBottom: "2em" }}>0% Basic Salary</p>
                                   
                                </div>
                            </div>
                            <div className="div5">
                                <div className="div5_wrap" style={{ width: "50%", borderRight: "1px solid black" }}>
                                    <div className="div5_test " >
                                        <div style={{ paddingTop: "20px" }}>
                                            <p>Payment Date </p>
                                            <p>{moment(Date.now()).format("L")}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="div5_wrap" style={{ width: "50%" }}>
                                    <div className="div5_test text_padding" >
                                        <p style={{ borderBottom: "1px solid black ", fontSize: 22, padding: "10px 0", margin: 0 }}>NET SALARY</p>
                                        <p style={{ padding: "5px 0", margin: 0 }}>{days !== "" ? toStr(totalSalary) : "0"}</p>
                                        <p>{test(totalSalary)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}










