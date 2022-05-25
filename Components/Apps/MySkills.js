import React, { useState } from 'react'
import { View, Text } from 'react-native'
import HeaderView from '../HeaderView'
import styles from '../../css/SeperationStyle'
import { DataTable } from 'react-native-paper'

function MySkills() {
    const [rows, setRows] = useState([{
        "EmpId": 100021,
        "SkillCode": "",
        "ExpInMonths": 0,
        "Level": "",
        "WorkingSince": new Date(),
        "LastUsed": new Date(),
        "VerifiedBy": 100021,
        "IsVerified": null,
        "VerifiedDate": null
    }])
    return (
        <>
            <HeaderView />
            <View>
                <Text style={styles.titleStyle}>MySkills</Text>
                <DataTable>
                    <DataTable.Header >

                        <DataTable.Title >Skills</DataTable.Title>
                        <DataTable.Title>Level</DataTable.Title>
                        <DataTable.Title>Working Since</DataTable.Title>
                        <DataTable.Title>Last Used</DataTable.Title>
                        <DataTable.Title>Experience (Months)</DataTable.Title>

                    </DataTable.Header>

                    {/* {
            rows.map((e, i)=>(
                   <tr key={i}>
                    
                    <td>
                      <Select
                            id={i}
                            name={i}
                            className="myskill"  
                            placeholder="Select Skill"
                            options={
                              skill.map((e) => ({
                                  label: e.Technology,
                                  value: e.TechnologyId,
                                  disabled:(technology.includes(e.Technology))
                           }))  
                          }
                            // options={skillOptions} 
                            maxMenuHeight={150}
                            onChange={SkillsChange}
                            isOptionDisabled={(option) => option.disabled}
                            isDisabled={edit}
                            value={skillOptions =="" ?"":skillOptions.filter(x => x.label == label[i]["SkillsLabel"])}
                            required                            
                          />  
                    </td>                    
                    <td>
                      <Select
                            id={i}
                            name={i}
                            className="myskill"  
                            placeholder="Select Level"  
                            options={optionsLevel} 
                            maxMenuHeight={150}
                            onChange={LevelChange} 
                            value={optionsLevel =="" ?"":optionsLevel.filter(x => x.label === levelLabel[i]["LevelLabel"])}                                         
                            required                            
                          />  
                    </td>      
                    <td >
                      <MuiPickersUtilsProvider utils={DateFnsUtils} >
                          <KeyboardDatePicker
                            disableFuture
                            disableToolbar
                            openTo="date"
                            variant="inline"
                            format="dd/MM/yyyy"
                            id="date-picker-inline"
                            views={["year", "month", "date"]}
                            KeyboardButtonProps={{
                              "aria-label": "change date"
                            }}               
                            className="myskill" 
                            value={rows[i].WorkingSince}
                            onChange={(date)=>WorkingSince(i,date)} 
                            keyboardIcon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-calendar2-week tealblue" viewBox="0 0 16 16">
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"/>
                  <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4zM11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                </svg>}              
                          />
                        </MuiPickersUtilsProvider></td>

                        <td >
                      <MuiPickersUtilsProvider utils={DateFnsUtils} >
                          <KeyboardDatePicker
                            disableFuture
                            disableToolbar
                            openTo="date"
                            variant="inline"
                            format="dd/MM/yyyy"
                            id="date-picker-inline"
                            views={["year", "month", "date"]}
                            KeyboardButtonProps={{
                              "aria-label": "change date"
                            }}               
                            className="myskill" 
                            value={rows[i].LastUsed}
                            onChange={(date)=>LastUsed(i,date)} 
                            keyboardIcon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-calendar2-week tealblue" viewBox="0 0 16 16">
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"/>
                  <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4zM11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                </svg>}              
                          />
                        </MuiPickersUtilsProvider></td>
                    
                    <td><Input 
                    className="myskill" 
                    isDisabled={true}
                     value={rows[i].ExpInMonths}
                    ></Input></td>
                                   
                 </tr> 
             
            ))}                   
                      */}
                </DataTable>
            </View>
        </>
    )
}

export default MySkills