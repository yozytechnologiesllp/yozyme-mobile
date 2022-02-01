import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import moment from 'moment';
import {Table} from "reactstrap"
import PatchedPagination from "../../../PatchedPagination";
import { toast } from "react-toastify";
toast.configure();

function ResponseApprovalReport({responseApproval}) {
    const viewFile = (ResponseDocument) => {
        console.log(ResponseDocument.length)
        if (ResponseDocument == null || ResponseDocument=="" || ResponseDocument.length==0) {
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

    <div className="Table" >
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
      <MaterialTable
        title={"Response Approval"}
        components={{ Pagination: PatchedPagination }}
        columns={[
          
          { title: "Client Name", field: "ReferenceDetails.ClientName" },
          { title: "Client Ask", field: "ReferenceDetails.Country" },
          { title: "Prefered TechStack", field: "ReferenceDetails.PreferableTechStack" },
          {title:"Amount Quoted", field:"ReferenceDetails.AmoutQuoted"},
          { title: "Approved Status", field: "IsApproved" },
          { title: "Approved Date", field: "ApprovedDate", defaultSort:'asc' },
        ]}


        data={responseApproval === "" ? "" : responseApproval .filter((e)=>(e.ReferenceDetails!=null && e.ApprovedDate!=null))
        .map((e) => {
          return {
            ...e,
            "IsApproved": e.IsApproved == "Y" ? "Approved" : e.IsRejected=="Y"? "Declined":"Pending",
          }
        })}
        detailPanel={rowData => {
          return (
            <div style={{ fontSize: 13, color: 'white', backgroundColor: '#E0FFFF' }}>
             <Table class="table table-bordered">
                                <thead className="tableHeader">
                                    <th></th>
                                    <th > <label > Employee Level</label></th>

                                   

                                    <th>
                                        <label >Employee Designation</label></th>
                                        <th >
                                        <label >Promoted Date</label></th>

                                </thead>
                                <tr>
                                    <td>Current </td>
                                    <td>
                                        {rowData.currentemplevel}
                                    </td>
                                 
                                    <td>{rowData.currentdesignation}
                                    </td>
                                    <td>
                                        {moment(rowData.lastpromoted, "YYYY-MM-DD").format("DD MMM YYYY")}
                                    </td>

                                </tr>


                                <tr>
                                    <td>Promoted To</td>
                                    <td>
                                        {rowData.newlevel}
                                    </td>
                                   
                                    <td>{rowData.newdesignation}
                                    </td>
                                    <td>
                                        {moment(rowData.newpromoeffectivefrom, "YYYY-MM-DD").format("DD MMM YYYY")}
                                    </td>

                                </tr>
                               
                            </Table>

            </div>
          )
        }
        }
        actions={[
            {
              icon: "assignment",
              tooltip: "File",
              onClick: (event, rowData) => {
                  console.log(rowData)
                viewFile(rowData.ReferenceDetails.ResponseDocument)
              },
            }
          ]}
        options={{
          actionsColumnIndex: -1,
          exportAllData: true,
          exportButton: true,
          columnResizable: true,
          filtering: false,
          sorting: true,
          paging: true,
          pageSize: 20,       // make initial page size
          emptyRowsWhenPaging: false,   //to make page size fix in case of less data rows
          pageSizeOptions: [20, 30, 40, 50],    // rows selection options
          headerStyle: {
            backgroundColor: '#8FD6E1',
            color: '#03256C',
            // textAlign : "center",
            fontSize: "13px",
            // padding:"10px",
            fontWeight: 'bold'
          },
          cellStyle: {
            // textAlign:'left',

          }

        }}



      />


    </div>
  )
}

export default ResponseApprovalReport
