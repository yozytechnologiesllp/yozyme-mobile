import React, { useState, useEffect } from 'react';
import { Row, Col, CardHeader, Card, CardBody, CardTitle, Table } from 'reactstrap'
import moment from 'moment';
import { Button } from 'reactstrap';
import axios from '../../../axios';
import './ResponseApproval.css'
import "react-multi-carousel/lib/styles.css";
import ResponseApprovalReport from './ResponseApprovalReport';
// import PromoApprovalLevel2 from './PromoApprovalLevel2';
// import PromoLevel1Report from './PromoLevel1Report';
// import PromoLevel2Report from './PromoLevel2Report';


function ResponseLevel1Approval({ EmpId }) {
    const [responseApproval, setResponseApproval] = useState([])
    const [promoApproval2, setPromoApproval2] = useState([])
    const [levelReport, setLevelReport] = useState([])
    const [level2Report, setLevel2Report] = useState([])
    const [remarks, setRemarks] = useState("");
    const [remarksValidation, setRemarksValidation] = useState(false)
    const [salaryBreakUpDetailsRevision, setSalaryBreakUpDetailsRevision] = useState([])
    const [report, setReport] = useState([])
    const [checkApprove, setCheckApprove] = useState([])
    const [salaryStructureDetails, setSalaryStructureDetails] = useState([])

    function refresh() {
        axios.get("company_approvals?ModuleUniqueKey=eq.PRESALERESP&ApprovedBy=eq."+EmpId).then((res) => {
            console.log(res.data)
           setResponseApproval(res.data);
        });
        axios.get("rpc/fun_promotionapprovalreport?managerid=" + EmpId).then((res) => {
            setLevelReport(res.data);
        });
    }

    useEffect(() => {
        refresh()
    }, []);



    function approved(item) {
        setRemarksValidation(false)
        if (remarks != "") {
            axios.patch('promotion_transaction?PromotionId=eq.' + item.promotionid, {
                Level1ApproverRemarks: remarks,
                Level1ApprovedDate: moment().format("YYYY-MM-DDThh:mm:ss A"),
                IsApprovedbyLevel1: "Y"
            })
                .then((res) => {
                    alert('Approved')
                    let notificationData = {
                        CreatedDate: moment()
                            .utcOffset("+05:30")
                            .format("YYYY-MM-DDTHH:mm:ss"),
                        CreatedBy: EmpId,
                        NotifyTo: item.nominatedby,
                        AudienceType: "Individual",
                        Priority: "High",
                        Subject: "Promotion Level 1 is Approved",
                        Description: item.level1approverfn + " " + item.level1approverln + " is approved level 1 promotion for " + item.empfn + " " + item.empln,
                        IsSeen: "N",
                        Status: "New",
                    };
                    axios
                        .post("notification?NotifyTo=eq." + item.nominatedby, notificationData)
                        .then((res) => console.log(res))
                        .catch((error) => console.log(error));

                    let notificationData1 = {
                        CreatedDate: moment()
                            .utcOffset("+05:30")
                            .format("YYYY-MM-DDTHH:mm:ss"),
                        CreatedBy: EmpId,
                        NotifyTo: item.level2approver,
                        AudienceType: "Individual",
                        Priority: "High",
                        Subject: "Promotion send for level2 approve",
                        Description: item.level1approverfn + " " + item.level1approverln + " is approved level 1 promotion for " + item.empfn + " " + item.empln + " and send for level 2 approver",
                        IsSeen: "N",
                        Status: "New",
                    };
                    axios
                        .post("notification?NotifyTo=eq." + item.level2approver, notificationData1)
                        .then((res) => console.log(res))
                        .catch((error) => console.log(error));

                    refresh()
                })
                .catch((e) => { alert(e) })
        }
        else if (remarks == "") {
            setRemarksValidation(true)
        }

    }

    function declined(item) {

        setRemarksValidation(false)
        if (remarks != "") {
            axios.patch('promotion_transaction?PromotionId=eq.' + item.promotionid, {
                Level1ApproverRemarks: remarks,
                Level1ApprovedDate: moment().format("YYYY-MM-DDThh:mm:ss A"),
                IsApprovedbyLevel1: "N",
                IsFullyApproved: "N",
                IsPromoNominated: "C"

            })
                .then((res) => {
                    alert('Declined')
                    let notificationData = {
                        CreatedDate: moment()
                            .utcOffset("+05:30")
                            .format("YYYY-MM-DDTHH:mm:ss"),
                        CreatedBy: EmpId,
                        NotifyTo: item.nominatedby,
                        AudienceType: "Individual",
                        Priority: "High",
                        Subject: "Promotion Level 1 declined",
                        Description: item.level1approverfn + " " + item.level1approverln + "  is declined level 1 promotion for " + item.empfn + " " + item.empln,
                        IsSeen: "N",
                        Status: "New",
                    };
                    axios
                        .post("notification?NotifyTo=eq." + item.nominatedby, notificationData)
                        .then((res) => console.log(res))
                        .catch((error) => console.log(error));


                    refresh()
                })
                .catch((e) => { alert(e) })

        }
        else if (remarks == "") {
            setRemarksValidation(true)
        }

    }

    function handleChange(e) {
        setRemarks({
            ...remarks,
            [e.target.id]: e.target.value
        })

    }


    return (
        <div>
            {
                responseApproval.filter((e) => (e.ReferenceDetails!=null && e.ApprovalLevel!=null && e.IsOnHold=="Y" && e.IsActive=="Y")).length != 0 ?
                    <div className="cardDesign">
                        {
                            responseApproval.filter((e) => (e.ReferenceDetails!=null && e.ApprovalLevel!=null && e.IsOnHold=="Y" && e.IsActive=="Y")).map((item) => (

                                <Card className="mx-2 approveCard">
                                    <CardTitle className="CardTitleStyle">Requested for Response Approval</CardTitle>
                                    <CardBody>
                                        <Row className="cardContentStyle">
                                            <Col md="6">
                                                <h6>Client Name:</h6>
                                                <label>{item.ReferenceDetails.ClientName}</label>
                                                <h6>Client Budget:</h6>
                                                <label>{item.ReferenceDetails.ClientBudget}</label>
                                                <h6>Client Ask:</h6>
                                                <label>
                                                    {item.ReferenceDetails.ClientAsk}
                                                </label>
                                                <h6>Preferable Techstack :</h6>
                                                <label>
                                                    {item.ReferenceDetails.PreferableTechStack}
                                                </label>
                                                <h6>FTE'S Required:</h6>
                                                <label>
                                                    {item.ReferenceDetails.TotalFTEsRequired}
                                                </label>
                                            </Col>
                                            <Col md="6">
                                                <h6>Client Country:</h6>
                                                <label>{item.ReferenceDetails.Country}</label>
                                                <h6>Amount Quoted:</h6>
                                                <label>{item.ReferenceDetails.AmoutQuoted+" "}{item.ReferenceDetails.AmoutQuotedCurrency}</label>
                                                <h6>Requirement Title:</h6>
                                                <label>{item.ReferenceDetails.RequirementTitle}</label>
                                                <h6>Execution Type:</h6>
                                                <label>{item.ReferenceDetails.ExecutionType}</label>
                                            </Col>
                                        </Row>                                        <Row >
                                            <label className="remarksLabel">Approver remarks :</label>
                                        </Row>
                                        <Row>
                                            <textarea className="remarks" id={item.promotionid} onChange={(event) => handleChange(event)} value={remarks[item.promotionid]} />
                                        </Row>
                                        {
                                            remarksValidation ?
                                                <label className="alert">*This field is required</label>
                                                :
                                                null
                                        }
                                        <Row>
                                            <Button className="Card_Button_Color_Approve buttonApprove buttonStyle" 
                                            //onClick={() => { approved(item) }}
                                            >
                                                Approve
                                            </Button>
                                            <Button className="Card_Button_Color_Approve buttonApprove buttonStyle" 
                                            //onClick={() => { approved(item) }}
                                            >
                                                Send To Requster
                                            </Button>
                                            <Button color="danger buttonApprove buttonStyle" 
                                            //onClick={() => { declined(item) }}
                                            >
                                                Decline
                                            </Button>
                                        </Row>
                                    </CardBody>
                                </Card>
                            ))
                        }
                    </div>
                    :
                        <div className="noPending">There is no pending for Response approval </div>
            }
             
                    <ResponseApprovalReport responseApproval={responseApproval} />
                   
        </div>
    )
}
export default ResponseLevel1Approval;