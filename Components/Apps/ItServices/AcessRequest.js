import {Text, View, TextInput, StyleSheet, ScrollView} from 'react-native';
import HeaderView from '../../HeaderView';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';
import React, {useState, useEffect, useContext} from 'react';
import Empcard from './Empcard';
import axios from '../../../axios';
import StoreContext from '../../../store/StoreContext';
import {DataTable} from 'react-native-paper';

function AcessRequest({navigation}) {
  const [whois, setwhois] = useState('');
  const [who, setwho] = useState('');
  const {employee_Data, user_detail, employee_Image, tokenData} = useContext(StoreContext);
  const [valid, setvalid] = React.useState(false);

  const [otheruser, Setotheruser] = React.useState(false);
  const [otheruserid, Setotheruserid] = React.useState('');
  const [search, Setsearch] = React.useState(false);
  const [userdata, Setuserdata] = useState([]);
  const [applicationname, Setapplicationname] = useState([]);
  const [reasontype, setresontype] = useState([]);
  const [allcess, setallcess] = useState([]);
  const [appselected, setappselected] = useState([]);
  const [aitems, setaitems] = useState([
    {label: 'select app ', value: 'select app'},
  ]);
  const [roles, setroles] = useState([
    {label: 'select app ', value: 'select app'},
  ]);

  const [rtype, setrtype] = useState([]);
  const [reasonitem, setresonitem] = useState([]);
  const [acessitem, setacessitem] = useState([]);
  const [roleitem, setroleitem] = useState([]);
  const [id, setid] = useState(0);
  const [carddaata, setcarddaata] = useState([]);

  const options = [
    {label: 'Self', value: 'Self'},
    {label: 'Someone', value: 'Someone'},
  ];

  function dropdownChange(item) {
    if (item.value == 'Someone') {
      setwho('Y');
      axios
        .get(`/rpc/fun_assetallocreport?empid=${otheruserid}`)
        .then(res => {
          //   Setuserassettype(res.data);
          // console.log(res.data, 'tester detail')
        })
        .catch(e => {
          // console.log(e);
        });

      Setotheruser(true);

      data();
    } else {
      setwho('N');

      axios
        .get(`/rpc/fun_assetallocreport?empid=${employee_Data.EmpId}`)
        .then(res => {
          //   Setuserassettype(res.data);
          // console.log(res.data, 'tester detail')
        })
        .catch(e => {
          // console.log(e);
        });

      Setotheruser(false);
      Setuserdata([]);
    }
    // Setdropdownitem()
  }

  useEffect(() => {
    axios
      .get(`itrequest_itemtype_master`)
      .then(res => {
        //   Setuserassettype(res.data);

        console.log(res.data, 'dddddddddddddddddddddddddd');
        Setapplicationname(res.data);

        // console.log(res.data, 'tester detail')
      })
      .catch(e => {
        // console.log(e);
      });

    axios
      .get(`itrequest_reason_master`)
      .then(res => {
        //   Setuserassettype(res.data);

        console.log(res.data, 'dddddddddddddddddddddddddd');
        setresontype(res.data);

        // console.log(res.data, 'tester detail')
      })
      .catch(e => {
        // console.log(e);
      });

    axios
      .get(`application_access_master`)
      .then(res => {
        //   Setuserassettype(res.data);

        setallcess(res.data);

        // console.log(res.data, 'tester detail')
      })
      .catch(e => {
        // console.log(e);
      });
  }, []);

  let applicationnames = applicationname.filter(x => {
    if (x.ItemTypeCategory == 'AAR') {
      return x;
    }
  });
  console.log(applicationnames, 'vvvvvvvvvvvvvv');

  let applicationmap = applicationnames.map(item => ({
    label: item.Description,
    value: item.ITRequestItemTypeId,
  }));

  let reasondropdown = reasontype.filter(x => {
    if (x.ReasonCategory == 'AAR') {
      return x;
    }
  });

  let reasonitems = reasondropdown.map(item => ({
    label: item.Description,
    value: item.ITRequestReasonId,
  }));

  let checkuser = userdata.map(x => {
    return x.EmpId;
  });
  function checkuserid(id) {
    let k = checkuser.find(x => {
      if (x == parseInt(id)) {
        return x;
      }
    });

    if (k == undefined) {
      alert('enter valid user id');
    }
    return k;
  }

  function data() {
    axios
      .get(`employee_master?IsActive=eq.Y`)
      .then(res => {
        Setuserdata(res.data);
        console.log('dataaaaaaaaa', userdata);

        // console.log(res.data, 'tester detail')
      })
      .catch(e => {
        // console.log(e);
      });
  }

  function getdata(item) {
    console.log(allcess, 'gogo');

    let fdatas = allcess.filter(x => {
      if (x.ApplicationKey == item.label) {
        return x;
      }
    });

    if (fdatas[0] != undefined) {
      let k = fdatas[0].AccessTypesSupported;
      let ur = fdatas[0].UserRolesSupported;

      console.log(k, 'its kkkk');
      console.log(ur, 'its kkk2k');

    

      let aaaitem = k.map(x => {
        return {
          label: x.AccessName,
          value: x.AccessCode,
        };
      });

      console.log(aaaitem);

      let role = ur.map(x => {
        return {
          label: x.RoleName,
          value: x.RoleCode,
        };
      });
      console.log(role, 'rrrrrrrrrrrr');

      setroles(role);
      setaitems(aaaitem);
    } else {
      alert('not defined');
    }
  }

  function removecard(id) {
    let b = carddaata.filter(x => {
      if (x.id != id) {
        return x;
      }
    });
    setcarddaata(b);
  }

  function submit() {
    for (let items of carddaata) {
      let notificationData = {
        CreatedDate: moment().utcOffset('+05:30').format('YYYY-MM-DDTHH:mm:ss'),
        CreatedBy: employee_Data.EmpId,
        NotifyTo: 500001,
        AudienceType: 'Individual',
        Priority: 'High',
        Subject: 'Request for Access',
        Description: 'Application Access Requested by  ' + employee_Data.EmpId,
        IsSeen: 'N',
        Status: 'New',
      };

      const User_requestData = {
        RequestType: 'AAR',
        RequestedBy: parseInt(employee_Data.EmpId),
        ProjectId: 300001,
        AssignedGroup: 'ITSM',
        AssignedTo: 600001,
        DepartmentCode: null,
        SubmittedDate: moment().format('yyyy-MM-DD'),
        ReasonCode: items.Reason.value,
        ItemType: items.Appname.value,
        UserJustification: null,
        NewAssignee: null,
        ExpectedDate: null,
        ApprovalLevel1: 100005,
        Level1ApprovedDate: null,
        ApprovalLevel1Remarks: null,
        IsApprovedByLevel1: null,
        ApprovalLevel2: 600001,
        Level2ApprovedDate: null,
        ApprovalLevel2Remarks: null,
        IsApprovedByLevel2: null,
        IsOnhold: null,
        IsWithdrawn: null,
        WithdrawnDate: null,
        WithdrawnRemarks: null,
        Attachments: null,
        FulfillmentReference: null,
        UpdateNotes: null,
        IsActive: null,
        Status: null,
        UpdateNotes: [
          {
            NoteSno: null,
            DateTime: null,
            NoteUpdatedBy: null,
            NoteUpdatedByFN: null,
            NotesDetails: null,
          },
        ],
        ReferenceDetails: {
          ApplicationName: items.Appname.label,
          Reason: items.Reason.label,
          Accesslevel: items.Acess.label,
          Role: items.Role.label,
        },
        NewAssigneeDetails: {
          EmpName: null,
          EmpLevel: null,
          EmpDesig: null,
        },
        IsSelfRequest: whois.label == 'Self' ? 'Y' : 'N',
        RaisingOnBehalfDetails: who == 'Y' ? parseInt(otheruserid) : null,
        IsAcknowledged: null,
        SentForVerification: null,
        IsReworkRequired: null,
        IsRequestFulfilled: null,
        IsFullyApproved: null,
        IsRequireApproval: null,
      };

      axios
      .post(`itrequest_details?RequestedBy=eq.${employee_Data.EmpId}`, User_requestData)
      .then((res) => {
        

        axios
          .post("notification?NotifyTo=eq." + 500001, notificationData)
          .then((res) => console.log(res))
          .catch((error) => console.log(error));
      }).catch(e=>{
        console.log(e)
      })

      console.log(User_requestData, 'data');
    }

    reset();
  }

  function reset() {
    setcarddaata([]);
    Setotheruserid('');
    setwho('');
    Setsearch(false);
    Setotheruser(false);
    setwhois('');
    setresonitem([]);
    setacessitem([]);
    setappselected([]);
    setroleitem([{label: 'select app ', value: 'select app'}]);
    setacessitem([{label: 'select app ', value: 'select app'}]);
    setaitems([{label: 'select app ', value: 'select app'}]);
    setroles([{label: 'select app ', value: 'select app'}]);
  }

  function creating(check) {
    if (
      appselected.label &&
      reasonitem.label &&
      acessitem.label &&
      roleitem.label && check
    ) {
      carddaata.push({
        id: id,
        Appname: appselected,
        Reason: reasonitem,
        Acess: acessitem,
        Role: roleitem,
        buttonid: id,
      });
      alert('created');
      console.log(carddaata);
    } else {
      alert('please fill the details');
    }
  }
  return (
    <ScrollView style={styles.formcontainer}>
      <View style={{margin: '5%'}}>
        <Text style={styles.heading}>REQUEST FORM</Text>
        <Text style={styles.labelStyle}>Raising For :</Text>
        <View style={{flex: 1, display: 'flex'}}>
          <Dropdown
            data={options}
            style={styles.dropdownStyle}
            placeholder="Select"
            onChange={item => {
              setwhois(item);
              dropdownChange(item);
            }}
            value={whois.value}
            labelField="label"
            valueField="value"
            maxHeight={160}
          />
        </View>

        {otheruser ? (
          <View>
            <Text style={styles.labelStyle}>Raising On Behalf :</Text>
            <View style={styles.searchdiv}>
              <TextInput
                style={styles.searchinput}
                placeholder="employee id"
                placeholderTextColor="grey"
                onChangeText={value => {
                  Setotheruserid(value);
                  Setsearch(false);
                }}
                value={otheruserid}
                keyboardType="numeric"

                // onPressOut={()=>{
                //   Sethidenav(false)

                // }}

                //   onSubmitEditing={(e) => getuserdetail()}
              />
              <Text
                style={styles.btn}
                on
                onPress={() => {
                  Setsearch(true);

                  checkuserid(otheruserid);
                }}>
                get info
              </Text>
            </View>

            {search ? (
              <Empcard userdata={userdata} userid={otheruserid} />
            ) : null}
          </View>
        ) : null}
        {/* <View style={styles.dropdongendiv}>


<DataTable style={styles.productcard}>
        <DataTable.Row >
        <DataTable.Cell><Text style={styles.labelStyle}>Apllication Name :</Text></DataTable.Cell>
        <DataTable.Cell><View style={{flex:1,
                    display:'flex'}}>
                    <Dropdown
                     data={applicationmap}
                     style={styles.dropdowntwo}
                        placeholder="Select"
                        dropdownPosition='bottom'

                        onChange={(item) => {  
                          setappselected(item)
                          getdata(item);
                        //  setwhois(item)
                        //  dropdownChange(item) 
                                      }
                                      }
                          value={appselected.value}
                          labelField='label'
                          valueField='value'
                          maxHeight={160}

/>
  </View></DataTable.Cell>
        
        
         </DataTable.Row>
         <DataTable.Row >
        <DataTable.Cell><Text style={styles.labelStyle}>Reason Type :</Text></DataTable.Cell>
        <DataTable.Cell><View style={{flex:1,
                    display:'flex'}}>
                    <Dropdown
                     data={reasonitems}
                     style={styles.dropdowntwo}
                        placeholder="Select"
                        dropdownPosition='bottom'

                        onChange={(item) => {  
                          setrtype(item)
                        //  setwhois(item)
                        //  dropdownChange(item) 
                                      }
                                      }
                          value={rtype.value}
                          labelField='label'
                          valueField='value'
                          maxHeight={160}

/>
  </View></DataTable.Cell>
        
        
         </DataTable.Row>

         <DataTable.Row>
        <DataTable.Cell><Text style={styles.labelStyle}>Access Level :</Text></DataTable.Cell>
        <DataTable.Cell><View style={{flex:1,
                    display:'flex'}}>
                    <Dropdown
                     data={aitems}
                     style={styles.dropdowntwo}
                        placeholder="Select"
                        dropdownPosition='bottom'

                        onChange={(item) => {  
                        //  setwhois(item)
                        //  dropdownChange(item) 
                                      }
                                      }
                          labelField='label'
                          valueField='value'
                          maxHeight={160}

/>
  </View></DataTable.Cell>
        
        
         </DataTable.Row>

         <DataTable.Row >
        <DataTable.Cell><Text style={styles.labelStyle}>Role :</Text></DataTable.Cell>
        <DataTable.Cell><View style={{flex:1,
                    display:'flex'}}>
                    <Dropdown
                     data={roles}
                     style={styles.dropdowntwo}
                     dropdownPosition='bottom'

                        placeholder="Select"
                        onChange={(item) => {  
                        //  setwhois(item)
                        //  dropdownChange(item) 
                                      }
                                      }
                                      
                         
                          labelField='label'
                          valueField='value'
                          maxHeight={160}

/>
  </View></DataTable.Cell>
        
        
         </DataTable.Row>

         <View style={styles.containerbutton}>
           <Text style={styles.btns} onPress={()=>{

            

    
            
           }}>Create</Text>
          
           </View>
               </DataTable> 
               </View>

<View> */}
        <View style={styles.dropdongendiv}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: '2%',
              marginTop: '1%',
            }}>
            <Text style={styles.labelStyle}>Apllication Name :</Text>
            <View style={{flex: 1, display: 'flex'}}>
              <Dropdown
                data={applicationmap}
                style={styles.dropdowntwo}
                placeholder="Select"
                dropdownPosition="bottom"
                onChange={item => {
                  setappselected(item);
                  getdata(item);
                  //  setwhois(item)
                  //  dropdownChange(item)
                }}
                value={appselected.value}
                labelField="label"
                valueField="value"
                maxHeight={160}
              />
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: '2%',
            }}>
            <Text style={styles.labelStyle}>Reason Type :</Text>
            <View style={{flex: 1, display: 'flex', width: '50%'}}>
              <Dropdown
                data={reasonitems}
                style={styles.dropdowntwo}
                dropdownPosition="bottom"
                placeholder="Select"
                onChange={item => {
                  setresonitem(item);
                }}
                value={reasonitem.value}
                labelField="label"
                valueField="value"
                maxHeight={160}
              />
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: '2%',
            }}>
            <Text style={styles.labelStyle}>Access Level :</Text>
            <View style={{flex: 1, display: 'flex'}}>
              <Dropdown
                data={aitems}
                style={styles.dropdowntwo}
                placeholder="Select"
                onChange={item => {
                  //  setwhois(item)
                  //  dropdownChange(item)
                  setacessitem(item);
                }}
                value={acessitem.value}
                labelField="label"
                valueField="value"
                maxHeight={160}
              />
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: '2%',
            }}>
            <Text style={styles.labelStyle}>Role :</Text>
            <View style={{flex: 1, display: 'flex'}}>
              <Dropdown
                data={roles}
                style={styles.dropdowntwo}
                dropdownPosition="bottom"
                placeholder="Select"
                onChange={item => {
                  //  setwhois(item)
                  //  dropdownChange(item)
                  setroleitem(item);
                }}
                value={roleitem.value}
                labelField="label"
                valueField="value"
                maxHeight={160}
              />
            </View>
          </View>
          <View style={styles.containerbutton}>
            <Text
              style={styles.btns}
              onPress={() => {
                setid(id + 1);

                if (whois.label == 'Someone') {
                  if (checkuserid(otheruserid) != undefined) {
                    // setvalid(true);
                    creating(true)
                  } else {
                    creating(false)
                  }
                } else if (whois.label == 'Self') {
                 
                  creating(true)

                }else if(whois.label==undefined){
                  alert('please fill the details');
                }
              
               
              }}>
              Create
            </Text>
          </View>
        </View>
      </View>

      <View style={{margin: '5%'}}>
        {carddaata.length == 0
          ? null
          : carddaata.map(x => {
              return (
                <DataTable style={styles.productcard}>
                  <DataTable.Row>
                    <DataTable.Cell>Application Name :</DataTable.Cell>
                    <DataTable.Cell>{x.Appname.label}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>Reason Type :</DataTable.Cell>
                    <DataTable.Cell>{x.Reason.label}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>Access Level :</DataTable.Cell>
                    <DataTable.Cell>{x.Acess.label}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>Role :</DataTable.Cell>
                    <DataTable.Cell>{x.Role.label}</DataTable.Cell>
                  </DataTable.Row>

                  <View style={styles.containerbutton}>
                    <Text
                      style={styles.btnr}
                      onPress={() => {
                        removecard(x.buttonid);
                      }}>
                      Delete
                    </Text>
                  </View>
                </DataTable>
              );
            })}
      </View>
      {/* <View style={styles.containerbutton}>
           <Text style={styles.btns} onPress={()=>{
           
            submit();
            alert('submited')

           
              
            
           }}>Submit</Text>
          
           </View> */}
      <View style={styles.containerbutton}>
        <Text
          style={styles.btns}
          onPress={() => {
            if (carddaata.length != 0) {
              submit();
              alert('submited');
            } else {
              alert('there is no request to submit');
            }
          }}>
          Submit
        </Text>
        <Text
          style={styles.btnr}
          onPress={() => {
            reset();
            alert('reseted sucessfully');
          }}>
          Reset
        </Text>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  formcontainer: {
    display: 'flex',
    flex: 1,

    backgroundColor: 'white',
  },
  btns: {
    backgroundColor: '#007FFF',
    color: 'white',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    paddingRight: 14,
    fontSize: 20,
    width: '35%',
    textAlign: 'center',
  },
  containerbutton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',

    backgroundColor: '#007FFF',
    color: 'white',
    padding: '3%',
    margin: '5%',
    marginTop: '5%',
  },
  dropdongendiv: {
    marginTop: '3%',
    backgroundColor: '#F0F8FF',
    padding: 1,
  },
  searchinput: {
    height: 40,
    margin: 12,

    marginRight: 0,
    borderWidth: 2,
    width: '70%',
    padding: 10,
    borderRadius: 5,
    borderColor: '#2d9afa',
  },
  btn: {
    backgroundColor: '#2d9afa',
    color: '#fff',
    padding: '2%',
    display: 'flex',
    borderRadius: 5,
    textAlign: 'center',
    width: '20%',
  },
  btnr: {
    backgroundColor: 'rgba(251,0,0,0.7)',
    color: 'white',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    paddingRight: 14,
    fontSize: 20,
    width: '35%',
    textAlign: 'center',
  },
  searchdiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelStyle: {
    margin: '1%',
    fontSize: 16,
    color: 'darkblue',
    marginBottom: '1%',
    width: '50%',
  },
  dropdownStyle: {
    borderRadius: 9,
    borderWidth: 2,
    borderColor: 'skyblue',
    // paddingLeft:18,
    //  fontSize: 30,
    color: 'black',
    display: 'flex',
    padding: 5,
    // marginBottom:'25%',
    height: 'auto',
    marginTop: 5,
  },
  dropdowntwo: {
    borderRadius: 9,
    borderWidth: 2,
    borderColor: 'skyblue',
    // paddingLeft:18,
    //  fontSize: 30,
    color: 'black',
    display: 'flex',
    padding: 3,
    // marginBottom:'25%',

    //   marginRight:0,
    //  width:140,
  },
  productcard: {
    margin: '2%',
    backgroundColor: '#F0F8FF',
    padding: 20,
    borderRadius: 5,
    display: 'flex',
    // margin: '5%',
    // marginRight:'5%'
  },
});

export default AcessRequest;
