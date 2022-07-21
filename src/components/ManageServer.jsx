import React,{Component,useState} from 'react';
import './ManageServer.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { MDBBtn } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Cookies from 'universal-cookie';
import AddIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image'
import { render } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';
import { Route, Redirect } from 'react-router'

export function Popup(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 const CallAPI = async (url) => {
    try {
      const response = await fetch(url,{
        method: "GET",
        headers: {
          "access-control-allow-origin" : "*",
          "Content-type": "application/json; charset=UTF-8"
        }});
      const json = await response.json();
      
      return(json)
    } catch (error) {
      console.log("error", error);
      return("Error:Yes");
    }
  };



  const handleDelete = ()=>{

let url="http://localhost:8000/api/RemoveServerByID?ServerID="+props.Server_ID
  CallAPI(url);
  console.log(url);
    setShow(false);
    setTimeout(function () {
      window.location.replace('ManageServers')
  }, 1000);
    
    
  }

  return (
    <>
    <IconButton aria-label="delete" size="large" onClick={handleShow}>
  <DeleteIcon fontSize="inherit" />
</IconButton>
      

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>{"Are you sure you want to delete server ID"}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No don't delete
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Yes Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


class MangeServer extends Component {
    state = { modalShow:false,Servers:[],isLoading: true
      
    } 
 

     CallServerListAPI = async (url) => {
      try {
        const response = await fetch(url,{
          method: "GET",
          headers: {
            "access-control-allow-origin" : "*",
            "Content-type": "application/json; charset=UTF-8"
          }});
        const json = await response.json();
        
        return(json)
      } catch (error) {
        console.log("error", error);
        return("Error:Yes");
      }
    };

    CheckIdentification= ()=>
  {
    var CryptoJS = require("crypto-js");
    const cookies = new Cookies();
    let Username=cookies.get("Username")
      let Password_ciphered=cookies.get("Password")
       if(Username || Password)
       {
        var bytes = CryptoJS.AES.decrypt(Password_ciphered, 'DigitalClick');
        var Password = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        const url = "http://localhost:8000/api/SignIn?Username="+Username+"&Password="+Password
        const CallSignInAPI = async (url) => {
          try {
            const response = await fetch(url);
            const json = await response.json();
            
            return(json)
          } catch (error) {
            console.log("error", error);
            return("Error:Yes");
          }
        };
      let Json=CallSignInAPI(url)
      let LoggedIn=0
      Json.then((result)=>{
        for( var property in result)
        {
          if(property==="UserValidated" && result[property]==="Yes")
          {
  
                      LoggedIn=1;  
          }
        }
        if(LoggedIn===0)
        {
          window.location.replace('/SignIn')
         
        }
        
  
       }
       );
     
       }
       else
       {
        window.location.replace('/SignIn')
        
       } 


       

  }
  TurnoffLoadingScreen=()=>{
    setTimeout(function () {
  }, 1000);

    this.setState({isLoading: false})
  }
  componentDidMount(){
    this.CheckIdentification(); 
    const cookies = new Cookies();
    var CryptoJS = require("crypto-js");
    let Username=cookies.get("Username")
    let Password_ciphered=cookies.get("Password")
    var bytes = CryptoJS.AES.decrypt(Password_ciphered, 'DigitalClick');
      var Password = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    let url ="http://localhost:8000/api/GetAllServers?Username="+Username+"&Password="+Password
  let Json= this.CallServerListAPI(url)
   
  Json.then((result)=>{
     let Server_List=[]
    
    result.map((server)=>{
      Server_List.push(server) 
    }
    )
    
    this.setState({Servers:Server_List}, () => {
      this.TurnoffLoadingScreen();
  })
    
   }
   );
  
}
  
    render() {
             

      if(this.state.isLoading)
      {
        return (
          <div class="d-flex justify-content-center" style={{margin:"10px"}}>
          <LoadingSpinner id="Spinner"/>         
      </div>
        )
       
      }
      else
      {
        return (
         

          <div class="container mt-10" >
 
                                              <div class="row">                       
                          {
          
                           this.state.Servers.map((server)=>{
          
                            return(
                              
                              <div class="col-md-4 col-sm-6" id="ProductsContainerID">    
                               
                           <div class="card m-2 shadow">
                            
                            <a class="card-img-tiles" href="#" data-abc="true">
                            
                               <div class="inner">
                                 <div class="main-img">
          <Container>
            <Row>
              <Col> <nobr><label style={{fontSize:"10px"}}>Server:</label>
                               <p style={{fontSize:"10px"}}class="text-muted">{server.Server_Name} </p></nobr></Col>
              <Col><nobr><label style={{fontSize:"10px"}}>Server Location:</label>
                               <p style={{fontSize:"10px"}} class="text-muted">{server.Server_Location}</p></nobr></Col>
                               
            </Row>
            <Row>
            <Col><nobr><label style={{fontSize:"10px"}}>IP-Address:</label>
                               <p style={{fontSize:"10px"}} class="text-muted">{server.Server_IP_Adress}</p></nobr></Col>
              <Col><nobr><label style={{fontSize:"10px"}}>MAC-Address:</label>
                               <p style={{fontSize:"10px"}} class="text-muted">{server.Server_MAC_Adress}</p></nobr></Col>
                           
            </Row>
            <Row>
              <Col><nobr><label style={{fontSize:"10px"}}>OS</label>
                               <p style={{fontSize:"10px"}} class="text-muted">{server.OperatingSystem_Company_Name+' '+server.OperatingSystem_Name}</p></nobr></Col>
              <Col><nobr><label style={{fontSize:"10px"}}>Number of Sockets:</label>
                               <p style={{fontSize:"10px"}} class="text-muted">{server.Nb_Sockets}</p></nobr></Col>
                               
            </Row>
            <Row>
              <Col><nobr><label style={{fontSize:"10px"}}>Number of V-Cores:</label>
                               <p style={{fontSize:"10px"}} class="text-muted">{server.Nb_Cores}</p></nobr></Col>
              <Col><nobr><label style={{fontSize:"10px"}}>RAM</label>
                               <p style={{fontSize:"10px"}} class="text-muted">{server.RAM+"GB"}</p></nobr></Col>
                               
            </Row>
            <Row>
              <Col><nobr><label style={{fontSize:"10px"}}>Number of Disks:</label>
                               <p style={{fontSize:"10px"}} class="text-muted">{server.Nb_Harddrive}</p>
                            
                               </nobr></Col>
                               <Col><nobr><label style={{fontSize:"10px"}}>BIOS</label>
                               <p style={{fontSize:"10px"}} class="text-muted">{server.BIOS}</p></nobr></Col>
              <Col><nobr><label style={{fontSize:"10px"}}>Server Type:</label>
                               <p style={{fontSize:"10px"}} class="text-muted">{server.Server_Type}</p></nobr></Col>
                               <Col><nobr><label style={{fontSize:"10px"}}>Backup:</label>
                               <p style={{fontSize:"10px"}} class="text-muted">{server.Backup}</p></nobr></Col>              
                               
            </Row>
            
            
          
          </Container>
                                
                               
                               
                               
                                 </div>
                                
                                 <div class="thumblist">
                                 <Image  src={require('./images/Server_Logo.gif')} class="img-fluid" alt="Responsive image"/>
                                 <Image  src={'https://countryflagsapi.com/png/'+server.Server_Country} class="img-fluid" />
                                  
                                  <Container>
                                  <Row>
               
               
                </Row>
                                  <Row>
                <Col>
                <IconButton  href={"EditServer?ServerID="+server.Server_ID} aria-label="delete" size="large">
            <AddIcon fontSize="inherit" />
          </IconButton>
                </Col>
                <Col>
                <Popup  show={this.state.modalShow}
                  onHide={() => this.state.modalShow=true}
                  Server_ID={server.Server_ID}
                  />
                </Col>
               
                </Row>
                                  </Container>
                                  </div>
                               </div></a>
                             <div class="card-body text-center">
                              <Container>
                              <Row>
              <Col><nobr><label style={{fontSize:"10px"}}>Bought Date:</label>
                               <p style={{fontSize:"10px"}} class="text-muted">{server.created_at}</p></nobr></Col>
                               <Col><nobr><label style={{fontSize:"10px"}}>Description:</label>
                               <p style={{fontSize:"10px"}} class="text-muted">{server.Description}</p></nobr></Col>
              <Col><nobr><label style={{fontSize:"10px"}}>Next Facturation Date:</label>
                               <p style={{fontSize:"10px"}} class="text-muted">{server.NextFacturationDate}</p></nobr></Col>
                               
            </Row>
            <Row>
              <Col><nobr><label style={{fontSize:"10px"}}>Payment Type:</label>
                               <p style={{fontSize:"10px"}} class="text-muted">{server.Server_Type}</p></nobr></Col>
                               
              <Col><nobr><label style={{fontSize:"10px"}}>Server Provider:</label>
                               <p style={{fontSize:"10px"}} class="text-muted">{server.service_Provider_Company_Name}</p></nobr></Col>
                               
            </Row>
            <Row>
              
              
                               
            </Row>
            
                              </Container>
                              
                               
                               
                               <a class="btn btn-outline-primary btn-sm" href={"ManageServerPartitions?ServerID="+server.Server_ID} data-abc="true" style={{margin:"10px",padding:"10px"}}>View VM Partitions </a>
                               
                               <a class="btn btn-outline-primary btn-sm" href={"ManageServerContracts?ServerID="+server.Server_ID} data-abc="true" style={{margin:"10px",padding:"10px"}}>View Contracts</a>
                             </div>
                           </div>
                         </div>
                         
          
                            )
                           })
          
          
          
                          }
                          
          
                       
                        
                         
                         
                         
                       </div>
                       
                       </div>
          
                  );
      }




        
    }
}
 
export default MangeServer;