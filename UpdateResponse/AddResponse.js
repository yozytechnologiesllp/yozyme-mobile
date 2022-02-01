import { Button, Dialog, IconButton, TextField } from "@material-ui/core";
import { Row, Col, Container } from "reactstrap";
import React, { useState, useEffect } from "react";
import CloseIcon from "@material-ui/icons/Close";
import "./AddResponse.css";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Button as Button1 } from "@material-ui/core";
import Select from "react-select";
import validator from "validator";
import csc from "country-state-city";
import axios from "../../../axios";
import { toast } from "react-toastify";
import filesAxios from "../../../filesAxios";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import moment from "moment";
import { Table } from 'reactstrap'
import { isEmptyObject } from "jquery";
import { FieldArray } from "formik";

function AddResponse({ FormOpen, setFormOpen, setRefresh, EmpId, clientDropdown, leadDropdown, setClientDropdown, setLeadDropdown, refreshTable }) {
  const initialValidation = {
    responseDetailValidation:false,
    techStackValidation:false,
    executionTypeValidation:false,
    projectDurationValidation:false,
    amountQuotedValidation:false,
    AttachmentFileNameValidation:false
  };

  const [techDetail, setTechDetail] = useState([])
  const [client, setClient] = useState("")
  const [clientData, setClientData] = useState()
  const [lead, setLead] = useState("")
  const [leadData, setLeadData] = useState()
  const [responseDetail, setResponseDetail] = useState("")
  const [executionType, setExecutionType] = useState("")
  const [projectDuration, setProjectDuration] = useState("")
  const [amount, setAmount] = useState("")
  const [techStack, setTechStack] = useState([])
  const [roleDetail, setRoleDetail] = useState([])
  const [MDAFileAttachment, setMDAFileAttachment] = useState("");
  const [AttachmentFileName, setAttachmentFileName] = useState("");
  const [validation, setValidation] = useState(initialValidation)
  const [rows, setRows] = useState([{
    "Site": "",
    "FTECount": 1,
    "Role": "",
    "Skill": "",
    "Country": ""
  }])
  var alphaExp = /^[a-zA-Z]+$/;
  let Contries = csc.getAllCountries();
  let arr = JSON.parse(sessionStorage.getItem("EmpDetails"));

  useEffect(() => {
    axios.get('technology_master')
      .then(res => { setTechDetail(res.data) })
    axios.get('designation_master')
      .then(res => { setRoleDetail(res.data) })
  }, []);

  const handleAddRows = () => {
    let data = [...rows]
    data.push({
      "Site": "",
      "FTECount": 1,
      "Role": "",
      "Skill": "",
      "Country": ""
    })
    setRows(data)
  }

  const handleDeleteRows = () => {
    let data = [...rows]
    data.pop()
    setRows(data)
  }

  const re = /^[0-9\b]+$/;
  const handleInputResponse = (e) => {
    setResponseDetail(e.target.value)
  }
  const handleInputDuration = (e) => {
    if (re.test(e.target.value) || e.target.value === '') { setProjectDuration(e.target.value) }
  }
  const handleInputAmount = (e) => {
    if (re.test(e.target.value) || e.target.value === '') { setAmount(e.target.value) }
  }
  
  const fileUpload = (e) => {
    if(client!="") {
    const formData = new FormData();
    let temp = e.target.files[0];
    formData.append("ClientName",clientData.ClientName );
    formData.append("file", temp);
    filesAxios.post("filesystem/proposalFileUpload", formData).then((res) => {
      toast(`File is Uploaded`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        draggable: true,
      });
      setAttachmentFileName(res.data.filename);
      axios
        .post("/file_details", {
          Filename: res.data.filename,
          FileIdentifier: "ProposalFile details",
          Extension: res.data.filename.split(".")[1],
          LocalServerPath: "/ProposalFile/",
          Application: "YozySuite",
          WebPath: "/filesystem/proposalFileUpload/",
          Module: "Pre Sales",
          EmpId: EmpId,
          IsActive: "Y",
          Status: null,
        })
        .then((res1) =>  {axios
        .get("file_details?Filename=eq."+ res.data.filename)
        .then((res2)=>{
          setMDAFileAttachment(res2.data)
         })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});
}
  };
  const clientOptions = clientDropdown.map((x) => {
    return {
      value: x,
      label: x.ClientName,
    };
  });
  const leadOptions = leadDropdown.map((x) => {
    return {
      value: x,
      label: x.RequirementTitle,
    };
  });
  const techOptions = techDetail.map((x) => { return { label: x.Technology, value: x.TechnologyId } })
  const roleOptions = roleDetail.map((x) => { return { label: x.EmpLevel + "-" + x.Designation, value: x.TechnologyId } })

  const executionOption = [
    { label: "TM", value: "TM" },
    { label: "FP", value: "FP" },
    { label: "IA", value: "IA" },
  ]
  const onShoreOption = [
    { label: "OnSite", value: "OnSite" },
    { label: "OffShore", value: "OffShore" },
  ]
  const onSiteChange = (e, name) => {
    let data = [...rows]
    data.splice(name.name, 1, {
      "Site": e.value,
      "FTECount": rows[name.name].FTECount,
      "Role": rows[name.name].Role,
      "Skill": rows[name.name].Skill,
      "Country": rows[name.name].Country
    })
    setRows(data)
  }
  const countryChange = (e, name) => {
    let data = [...rows]
    data.splice(name.name, 1, {
      "Site": rows[name.name].Site,
      "FTECount": rows[name.name].FTECount,
      "Role": rows[name.name].Role,
      "Skill": rows[name.name].Skill,
      "Country": e.label
    })
    setRows(data)
  }

  const onChangeRole = (e, name) => {
    let data = [...rows]
    data.splice(name.name, 1, {
      "Site": rows[name.name].Site,
      "FTECount": rows[name.name].FTECount,
      "Role": e.label,
      "Skill": rows[name.name].Skill,
      "Country": rows[name.name].Country
    })
    setRows(data)
  }

  const onChangeTechnology = (e, name) => {
    let data = [...rows]
    data.splice(name.name, 1, {
      "Site": rows[name.name].Site,
      "FTECount": rows[name.name].FTECount,
      "Role": rows[name.name].Role,
      "Skill": e.label,
      "Country": rows[name.name].Country
    })
    setRows(data)
  }

  function submit() {
    let len = 0;
    setValidation(initialValidation)
    if(client=="") { alert("Please Choose Client") }
    else if(lead=="") { alert("Please Choose Lead") }
    else if(responseDetail=="") { setValidation({...validation,["responseDetailValidation"]: true})} 
    else if(techStack.length==0) { setValidation({...validation,["techStackValidation"]: true}) } 
    else if(executionType=="") { setValidation({...validation,["executionTypeValidation"]: true}) }
    else if(projectDuration=="") { setValidation({...validation,["projectDurationValidation"]: true}) }
    else if(amount=="") { setValidation({...validation,["amountQuotedValidation"]: true}) }
    else if(AttachmentFileName=="") { setValidation({...validation,["AttachmentFileNameValidation"]: true}) }
    else if(rows.length!=0) {
      rows.map((e, i)=>{
         if(e.Site==""){
          alert("Please choose Site in row "+(i+1))
        }
        else if(e.Country==""){
          alert("Please Choose Country in row "+(i+1))
        }
        else if(e.Role==""){
          alert("Please choose Role in row "+(i+1))
        }
        else if(e.Skill=="") {
          alert("please choose Skill in row "+(i+1))
        }
        else {
          len++;
          if(rows.length==len ) {
            let postData ={
              LeadId: leadData.LeadId,
              LeadDetails   : {
                ClientAsk: leadData.ClientAsk,
                RequirementTitle: leadData.RequirementTitle,
                PreferableTechStack: leadData.PreferableTechStack,
                ClientBudget: leadData.ClientBudget
              },
              ClientId: clientData.ClientId,
              ClientDetails: {
                ClientName: clientData.ClientName,
                Country: clientData.ClientCountry,
                Email: clientData.ContactDetails.Email,
                Phone: clientData.ContactDetails.Phone
              },
              ResponseSubmittedBy: arr.empid,
              ResponseSubmittedByDetails: {
                FN: arr.firstname,
                LN: arr.lastname
              },
              ResponseSubmittedDate: moment(),
              ResponseDetails: responseDetail,
              ResponseDocument: MDAFileAttachment == "" ? "" : AttachmentFileName,
              ProposedTechStack: techStack,
              ExecutionType: executionType,
              ProjectDuration: projectDuration,
              AmoutQuoted: amount,
              AmoutQuotedCurrency: "USD",
              TotalFTEsRequired: rows.length,
              FTEsSplitup: rows,
              SubmittedTo: {
                Contact: clientData.ContactDetails.Name,
                Designation: clientData.ContactDetails.Designation,
                Email: clientData.ContactDetails.Email,
                Phone: clientData.ContactDetails.Phone
              },
              IsFullyApproved: null,
              IsOnhold: "Y",
              ResponseRevisions: null,
              IsActive: "Y",
              Status: null
            } 
            axios.post('presales_response',postData)
            .then((res)=>{
              alert('Proposal Created')
              axios.get('presales_response?select=ResponseId&order=ResponseSubmittedDate.desc&limit=1')
              .then((res)=>{ console.log(res.data[0].ResponseId)
            axios.post('company_approvals',{
              ModuleUniqueKey: "PRESALERESP",
              RequesterId: arr.empid,
              RequesterDetails: {
                  FN: arr.firstname,
                  LN: arr.lastname
              },
              ApprovedBy: 600001,
              ApprovedByDetails: {
                  FN: "Finance",
                  LN: "Manager"
              },
              RequesterRemarks: null,
                ApprovalLevel: 1,
              IsOnHold: "Y",
              IsActive:"Y",
              ReferenceId: res.data[0].ResponseId,
              ReferenceDetails: {
                  ClientAsk: leadData.ClientAsk,
                  RequirementTitle: leadData.RequirementTitle,
                  PreferableTechStack: leadData.PreferableTechStack,
                  ClientBudget: leadData.ClientBudget,
                  ClientName: clientData.ClientName,
                  ClientCountry: clientData.ClientCountry,
                  ExecutionType: executionType,
                  ProjectDuration: projectDuration,
                  AmoutQuoted: amount,
                  AmoutQuotedCurrency: "USD",
                  TotalFTEsRequired: rows.length,
                  ResponseDocument: MDAFileAttachment == "" ? "" : AttachmentFileName,
                  ResponseDetails: responseDetail,
              }
          })
          .catch((e)=>{console.log(e)})
        })
          setFormOpen(false)
          setClient("")
          setClientData()
          setLead("")
          setLeadData()
          setResponseDetail("")
          setExecutionType("")
          setProjectDuration("")
          setAmount("")
          setTechStack([])
          setMDAFileAttachment("");
          setAttachmentFileName("");
          setValidation(initialValidation)
          setRows([{
            "Site": "",
            "FTECount": 1,
            "Role": "",
            "Skill": "",
            "Country": ""
          }])
        refreshTable()})
            .catch((e)=>{console.log(e)})
        }
        }
      })
    }
    else if(rows.length==0) {
      alert("Please add No of FTE's required")
    }
   
   
  }

  const handleReset = () => {
    setFormOpen(false)
    setClient("")
    setClientData()
    setLead("")
    setLeadData()
    setResponseDetail("")
    setExecutionType("")
    setProjectDuration("")
    setAmount("")
    setTechStack([])
    setMDAFileAttachment("");
    setAttachmentFileName("");
    setValidation(initialValidation)
    setRows([{
      "Site": "",
      "FTECount": 1,
      "Role": "",
      "Skill": "",
      "Country": ""
    }])
    setFormOpen(true)
  }

  return (
      <Dialog open={FormOpen} maxWidth="lg">
        <div>
          <div className="FormBoxResponse">
            <FormControl>
              <div className="Emp_Form_HeaderResponse">
                <h2 style={{ color: "#03256C", margin: "auto" }}>
                  {" "}
                  Create a Proposal
                </h2>

                <IconButton>
                  <CloseIcon onClick={() => 
                  {setFormOpen(false)
                   setClient("")
                   setClientData()
                   setLead("")
                   setLeadData()
                   setResponseDetail("")
                   setExecutionType("")
                   setProjectDuration("")
                   setAmount("")
                   setTechStack([])
                   setMDAFileAttachment("");
                   setAttachmentFileName("");
                   setValidation(initialValidation)
                   setRows([{
                     "Site": "",
                     "FTECount": 1,
                     "Role": "",
                     "Skill": "",
                     "Country": ""
                   }])}} />
                </IconButton>
              </div>

              <div className="InputForm">
                <Container fluid>
                  <Row className="firstRow">
                    <label>Client:</label>
                    <Select
                      className="rowDropdown"
                      placeholder="Select Client"
                      options={clientOptions}
                      maxMenuHeight={150}
                      onChange={(e) => { setClient(e.label)
                      setClientData(e.value) }}
                      value={clientOptions.filter((option) => option.label == client)}
                      required
                    />
                    <label className="firstLabel">Lead:</label>
                    <Select
                      className="rowDropdown"
                      placeholder="Select Lead"
                      options={leadOptions}
                      maxMenuHeight={150}
                      onChange={(e) => { setLead(e.label)
                      setLeadData(e.value) }}
                      value={leadOptions.filter((option) => option.label == lead)}
                      required
                    />
                  </Row>
                  <Row className="Emp_columnResponse ">
                    <Col>
                      <label>Response Details:</label>
                      <input type="textInput"
                        variant="outlined"
                        label="Response Details *"
                        size="small"
                        name="ResponseDetails"
                        className="overlapStyle pb-3"
                        value={responseDetail}
                        type="textarea"
                        onChange={handleInputResponse}
                      />
                      {validation.responseDetailValidation?<label className="alertMsg">*Enter response Detail</label>:null}
                    </Col>
                    <Col>
                      <label>TechStack:</label>
                      <Select
                        className="rowDropdownSelect"
                        placeholder="Select TechStack"
                        isMulti
                        options={techOptions}
                        maxMenuHeight={150}
                        onChange={(e) => {
                          let value = Array.isArray(e)
                            ? e.map((x) => {
                              let robj = {};
                              robj["TechnologyId"] = x.value;
                              robj["Technology"] = x.label;
                              return robj;
                            })
                            : null
                          setTechStack(value)
                        }}
                        required
                      />
                      {validation.techStackValidation?<label>*Choose TechStack</label>:null}
                    </Col>
                    <Col>
                      <label>Execution Type:</label>
                      <Select
                        className="rowDropdownSelect"
                        placeholder="Execution Type"
                        options={executionOption}
                        maxMenuHeight={150}
                        onChange={(e) => { setExecutionType(e.label) }}
                        value={executionOption.filter((option) => option.label == executionType)}
                        required
                      />
                      {validation.executionTypeValidation?<label>* Choose Execution Type</label>:null}
                    </Col>
                    <Col>
                      <label>Project Duration:</label>
                      <input type="textInput"
                        variant="outlined"
                        label="Project Duration"
                        size="small"
                        name="ProjectDuration"
                        className="overlapStyle pb-3"
                        value={projectDuration}
                        type="textArea"
                        onChange={handleInputDuration}
                      />
                      {validation.projectDurationValidation?<label>* Enter Project Duration</label>:null}
                    </Col>
                    <Col>
                      <label>Amount Quoted :</label>
                      <input type="textInput"
                        variant="outlined"
                        label="Amount Quoted"
                        size="small"
                        name="AmountQuoted"
                        className="overlapStyle pb-3"
                        value={amount}
                        type="textArea"
                        onChange={handleInputAmount}
                      />
                      {validation.amountQuotedValidation?<label>*Enter Amount</label>:null}
                    </Col>

                  </Row>
                 
                      <Row className="d-flex justify-content-center pb-3 ">
                        <Button
                          onClick={() => { handleDeleteRows() }}
                          variant="contained"
                          color="secondary"
                          style={{ backgroundColor: "#1565C0" }}
                        >-</Button>

                        <Button
                          onClick={() => { handleAddRows() }}
                          variant="contained"
                          color="secondary"
                          style={{ backgroundColor: "#1565C0" }}
                        >+</Button>
                      </Row>
                      
                  <Table hover>
                    <thead >
                      <tr >
                        <th >FTE Count</th>
                        <th >Onsite / Offshore</th>
                        <th >Country</th>
                        <th >Role</th>
                        <th >Skill</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        rows.map((e, i) => (
                          <tr key={i}>

                            <td  className="fteCount pb-3">
                              <input

                                className="fteCount pb-3"
                                variant="outlined"
                                id={i}
                                name={i}
                                value={i + 1}
                              //onChange={handleInputChange}
                              />
                            </td>
                            <td>
                              <Select
                                id={i}
                                name={i}
                                placeholder="Select onSite/offShore"
                                options={onShoreOption}
                                maxMenuHeight={150}
                                onChange={onSiteChange} 
                                // value={onShoreOption =="" ?"":onShoreOption.filter(x => x.label === rows[i])}                                         
                                required
                              />
                            </td>

                            <td>
                              <Select
                                id={i}
                                name={i}
                                placeholder="Select Country"
                                options={
                                  Contries.map((e) => ({
                                    label: e.name
                                  }))
                                } 
                                maxMenuHeight={150}
                                onChange={countryChange}
                                required
                              />
                            </td>
                            <td>
                              <Select
                                id={i}
                                name={i}
                                placeholder="Select Role"
                                options={roleOptions}
                                maxMenuHeight={150}
                                onChange={onChangeRole}
                                required
                              />
                            </td>

                            <td>
                              <Select
                                id={i}
                                name={i}
                                className="myskill"
                                placeholder="Select Skill"
                                options={techOptions}
                                maxMenuHeight={150}
                                onChange={onChangeTechnology}
                                required
                              />
                            </td>
                          </tr>

                        ))}
                    </tbody>
                  </Table>
                </Container>
              </div>
            </FormControl>
  <Row className="d-flex justify-content-center ">
                        <div >
                          <label htmlFor="upload-photo" className="Ndafile ">
                            <input
                              style={{ display: "none" }}
                              id="upload-photo"
                              type="file"
                              
                              name="upload-photo"
                              onChange={(e) => fileUpload(e)}
                            />
                            <Button1                     
                              variant="contained"
                              color="default"
                              component="span"                             
                              startIcon={<CloudUploadIcon />}
                              //disabled={AttachmentFileName ? true : false}
                            >
                              File-Upload
                            </Button1>
                          </label>
                        </div>  
                       
                        {validation.AttachmentFileNameValidation?<label>*Please Choose File</label>:null}          
                    </Row>
                    {AttachmentFileName != null ? (
                          <div className="d-flex justify-content-center leadfilename">
                            <label class="pettycol-25">FileName : </label>
                            <label class="pettycol-75">
                              {AttachmentFileName}
                            </label>
                          </div>
                        ) : (
                          ""
                        )}
            <div className="Form_Button">
              <Button
                type="reset"
                variant="contained"
                color="secondary"
                onClick={()=>{handleReset()}}
                style={{ backgroundColor: "#fd377a" }}
              >
                Reset
              </Button>



              <Button
                variant="contained"
                type="submit"
                style={{ backgroundColor: "#00f2c3" }}
                onClick={()=>{submit()}}
              >
                Submit
              </Button>

            </div>
          </div>
        </div>
      </Dialog>
  );
}

export default AddResponse;
