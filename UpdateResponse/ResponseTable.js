import React, { useState, useEffect } from "react";
// import "./LeadCaptureTable.css";
import axios from "../../../axios";
import { toast } from "react-toastify";
import MaterialTable from "material-table";
import EditResponse from './EditResponse'
import moment from "moment";
import { Row, Col, Table } from "reactstrap";
import PatchedPagination from "../../../PatchedPagination";
import { Dialog } from "@material-ui/core";
import { Button, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
toast.configure();

function ResponseTable({ setRefresh, tableData, EmpId, clientDropdown, setClientDropdown, leadDropdown, setLeadDropdown, refreshTable }) {

  const [selectedRow, setSelectedRow] = useState(null);
  const [editing, setEditing] = useState(false);
  const [deleteData, setDeleteData] = useState(false);
  const [Values, setValues] = useState({});
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
  const [AttachmentFileName, setAttachmentFileName] = useState(null);
  const [responseId, setResponseId] = useState()
  const [rows, setRows] = useState([{
    "Site": "",
    "FTECount": 1,
    "Role": "",
    "Skill": "",
    "Country": ""
  }])

  const handleDelete = (rowData) => {
    let Deactivate = 
      {
        IsActive: "N",
      };
      console.log(responseId)
    axios
      .patch("presales_response?ResponseId=eq."+responseId, Deactivate )
      .then((res) => {
        axios.get('company_approvals?ReferenceId=eq.'+responseId)
        .then((res)=>{console.log(res.data[0],
          axios.patch('company_approvals?ApprovalId=eq.'+res.data[0].ApprovalId,{
            IsActive:"N",
            IsOnHold:"C"
        })
        .then((res)=>{console.log(res.data)})
          )})
        alert("Proposal Deleted");
        axios.get('')
        setDeleteData(false);
        refreshTable()
      });
  };

  const Columns = [
    {
      title: "Client",
      field: "ClientDetails.ClientName",
      type: "numeric",
      headerStyle: {
        maxWidth: 50, // <--- ADD THIS AND IT WILL WORK
        height: 10,
        maxHeight: 150,
        width: 50,
        textAlign: "center",
      },
      cellStyle: {
        height: 10,
        maxHeight: 200,
        width: 10,
        maxWidth: 100,
        textAlign: "center",
      },
      defaultSort: "asc",
    },
    { title: "Requirement Title", field: "LeadDetails.RequirementTitle" },
    { title: "Response Details", field: "ResponseDetails" },
    { title: "No of FTE", field: "TotalFTEsRequired" },
    { title: "Amount Quoted", field: "AmoutQuoted" },
    { title: "Submitted Data", field: "ResponseSubmittedDate" },
  ];

  const viewFile = (ResponseDocument) => {
    if (ResponseDocument == null || ResponseDocument=="") {
      toast.error(`Proposal File Not Uploaded`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        draggable: true,
      });
    }
    else {
            window.open("https://files.yozytech.com/ProposalFile/" + ResponseDocument)
    }
  }

  return (
    <div>
      <Dialog open={deleteData}>
        <div className="Lead_Delete">
          <div className="Lead_Delete_Card">
            <div className="Lead_Delete_Header">
              <h2 style={{ color: "#03256C", margin: "auto" }}>
                {" "}
                Delete Proposal
              </h2>
              <IconButton>
                <CloseIcon onClick={() => setDeleteData(false)} />
              </IconButton>
            </div>
            <h4>{Values.ClientName} </h4>
            <span>Do you want to Delete the Proposal?</span>
            <div className="Lead_Delete_Button">
              <Button
                variant="contained"
                type="submit"
                style={{ backgroundColor: "#00f2c3" }}
                onClick={handleDelete}
              >
                Ok
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                type="reset"
                variant="contained"
                color="secondary"
                style={{ backgroundColor: "#fd377a" }}
                onClick={() => setDeleteData(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
     </Dialog>

      <div className="Table">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        ></link>
        <MaterialTable
          title={"Response Details"}
          columns={Columns.map((e) => e)}
          data={tableData === "" ? "" : tableData.map((e) => {
          return {
            ...e,
            "ResponseSubmittedDate": moment(e.ResponseSubmittedDate).format("DD MMM YYYY"),
          }
        })}
          components={{
            Pagination: PatchedPagination,
          }}
          detailPanel={(rowData) => {
            return (
              <div style={{ fontSize: 13, color: 'white', backgroundColor: '#E0FFFF' }}>
                <Table class="table table-bordered">
                  <thead className="tableHeader">
                    <th>Client Ask</th>
                    <th > <label >Requirement Title</label></th>
                    <th > <label > Preferable TechStack</label></th>
                    <th>  <label >Client Budget</label></th>
                    <th ><label >Client Name</label></th>
                    <th > <label > Client Country</label></th>
                    <th><label>Response Details</label></th>
                    <th><label >Submitted To</label></th>
                    <th><label>Submitted Date</label></th>
                  </thead>
                  <tr>
                    <td>{rowData.LeadDetails.ClientAsk}</td>
                    <td>{rowData.LeadDetails.RequirementTitle}</td>
                    <td>{rowData.LeadDetails.PreferableTechStack}</td>
                    <td>{rowData.LeadDetails.ClientBudget}</td>
                    <td>{rowData.ClientDetails.ClientName}</td>
                    <td>{rowData.ClientDetails.Country}</td>
                    <td>{rowData.ResponseDetails}</td>
                    <td>{rowData.SubmittedTo.Contact}</td>
                    <td>{moment(rowData.ResponseSubmittedDate).format("DD-MMM-YYYY")}</td>
                  </tr>
                </Table>
              </div>
            );
          }}
          options={{
            actionsColumnIndex: -1,
            exportAllData: true,
            exportButton: true,
            columnResizable: true,
            filtering: false,
            sorting: true,
            paging: true,
            pageSize: 20, // make initial page size
            emptyRowsWhenPaging: false, //to make page size fix in case of less data rows
            pageSizeOptions: [6, 12, 20, 50], // rows selection options

            rowStyle: (rowData) => ({
              backgroundColor:
                selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
            }),
            headerStyle: {
              backgroundColor: "#8FD6E1",
              color: "#03256C",
              textAlign: "center",
              fontSize: "16px",
              padding: "2px",
            },
            cellStyle: {
              textAlign: "left",
              fontSize: "13px",
              padding: "5px",
            },
          }}
          actions={[
            {
              icon: "assignment",
              tooltip: "File",
              onClick: (event, rowData) => {
                viewFile(rowData.ResponseDocument)
              },
            },
            {
              icon: "edit",
              tooltip: "Edit",
              onClick: (event, rowData) => {
                setEditing(true)
                setRows(rowData.FTEsSplitup)
                setLead(rowData.LeadDetails.RequirementTitle)
                setClient(rowData.ClientDetails.ClientName)
                setClientData(clientDropdown.filter(x=>x.ClientId==rowData.ClientId)[0])
                setLeadData(leadDropdown.filter(x=>x.LeadId==rowData.LeadId)[0])
                setResponseDetail(rowData.ResponseDetails)
                setExecutionType(rowData.ExecutionType)
                setProjectDuration(rowData.ProjectDuration)
                setAmount(rowData.AmoutQuoted)
                setResponseId(rowData.ResponseId)
                setTechStack(rowData.ProposedTechStack)
               setAttachmentFileName(rowData.ResponseDocument)
              }
            },
            {
              icon: "delete",
              tooltip: "Delete",
              onClick: (event, rowData) => {setDeleteData(true)
              setResponseId(rowData.ResponseId)},
            },
          ]}
        />
      </div>
      <EditResponse editing={editing} setEditing={setEditing} clientDropdown={clientDropdown} setClientDropdown={setClientDropdown}
        leadDropdown={leadDropdown} setLeadDropdown={setLeadDropdown}
        techDetail={techDetail} setTechDetail={setTechDetail}
        client={client} setClient={setClient}
        clientData={clientData} setClientData={setClientData}
        lead={lead} setLead={setLead}
        leadData={leadData} setLeadData={setLeadData}
        responseDetail={responseDetail} setResponseDetail={setResponseDetail}
        executionType={executionType} setExecutionType={setExecutionType}
        projectDuration={projectDuration} setProjectDuration={setProjectDuration}
        amount={amount} setAmount={setAmount}
        techStack={techStack} setTechStack={setTechStack}
        roleDetail={roleDetail} setRoleDetail={setRoleDetail}
        MDAFileAttachment={MDAFileAttachment} setMDAFileAttachment={setMDAFileAttachment}
        AttachmentFileName={AttachmentFileName} setAttachmentFileName={setAttachmentFileName}
        setRows={setRows} rows={rows} responseId={responseId} refreshTable={refreshTable}/>
    </div>
  );
}
export default ResponseTable;
