import { Button } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import '../ClienOnBoarding/FormButton'
import AddResponse from './AddResponse';
import axios from '../../../axios'
import ResponseTable from './ResponseTable'

function Response({setRefresh,EmpId}) {
    const [FormOpen, setFormOpen] = useState(false);
    const [tableData, setTableData] = useState([])
    const [clientDropdown, setClientDropdown] = useState([]);
  const [leadDropdown, setLeadDropdown] = useState([])
    let arr = JSON.parse(sessionStorage.getItem("EmpDetails"));
  let EmployeeLevel = arr.emplevelid
  let EmployeeId = arr.empid
    const OpenForm = () =>
    {
        setFormOpen(prev => !prev)
    };
    useEffect(() => {
       refreshTable()
    }, [])
    function refreshTable() {
        axios.get("customer_master").then((res) => {
            setClientDropdown(res.data)
          })
          axios.get("presales_capture_lead").then((res) => {
            setLeadDropdown(res.data)
          })
        axios.get('presales_response?ResponseSubmittedBy=eq.'+arr.empid+'&IsActive=eq.Y')
        .then((res)=>{setTableData(res.data)
        })
        }
    return (
        <div>
        <div className='Form_Button'>          
            <Button onClick={OpenForm} variant="contained" style={{marginTop:"20px", marginBottom:"20px" ,backgroundColor:"rgb(3, 37, 108)", color:'white'}}>Create Proposal</Button>             
            <AddResponse FormOpen = {FormOpen} setFormOpen = {setFormOpen} setRefresh={setRefresh} EmpId={EmpId} clientDropdown={clientDropdown} setClientDropdown={setClientDropdown} leadDropdown={leadDropdown} setLeadDropdown={setLeadDropdown} refreshTable={refreshTable}/>       
        </div>
        <ResponseTable tableData={tableData} clientDropdown={clientDropdown} setClientDropdown={setClientDropdown} leadDropdown={leadDropdown} setLeadDropdown={setLeadDropdown} refreshTable={refreshTable}/>   
        </div>
    )
}

export default Response