import React,{Component,useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import LoadingSpinner from './LoadingSpinner';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import NavBar from "./Navbar"

class AddServer extends Component {
  state = { OSs:[], isLoading:true,VMs:[],Status:false }
  
  

  constructor()
  {
    super()
    this.SelectedOSID=1
    this.SelectedVMID=1
   
  }
  onChangeHandler = (e) => {
    const index = e.target.selectedIndex;   
      const el = e.target.childNodes[index]     
      const option =  el.getAttribute('id');
      this.SelectedOSID=option;  
     
  }
  onChangeHandler2 = (e) => {
    const index = e.target.selectedIndex;   
      const el = e.target.childNodes[index]     
      const option =  el.getAttribute('id');
      this.SelectedVMID=option;  
   
  }
  handlesubmit=(props)=>
  {
    this.setState({Status:true})
    props.preventDefault();
    let PropsString=""
    let i=0
    let url="http://127.0.0.1:8000/api/CreateServerPartition"
    for(i=0;i<9;i++)
    {
     if(i==0)
     {
       PropsString='?'+props.target[i].name+'='+props.target[i].value
     }
     else
     {
      if(props.target[i].name=="OperatingSystem_ID")
      {
        
        PropsString=PropsString+"&"+props.target[i].name+"="+this.SelectedOSID
        
      }
      
      else
      {
        PropsString=PropsString+"&"+props.target[i].name+"="+props.target[i].value
      }
       
     }
     
    }
    const queryParams = new URLSearchParams(window.location.search);
    let srvid = queryParams.get('ServerID');
    console.log(url+PropsString)
    this.SERVERAPICALL(url+PropsString)
    setTimeout(() => {window.location.replace("ManageServerPartitions?ServerID="+srvid)}, 2000);

  }
  SERVERAPICALL = async (url) => {
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

  TurnoffLoadingScreen=()=>{

    this.setState({isLoading: false})
  }

componentDidMount =()=>
{
let Json=null 
let url="http://127.0.0.1:8000/api/GetAllOSs"
let url2="http://127.0.0.1:8000/api/GetAllVMs"

Json=this.SERVERAPICALL(url)
Json.then((result)=>{
let OSs_List=[]
result.map((server)=>{
OSs_List.push(server) 
}
)

this.setState({OSs:OSs_List})
}
);

Json=this.SERVERAPICALL(url2)
Json.then((result)=>{
let VMs_List=[]
result.map((server)=>{
VMs_List.push(server) 
}
)

this.setState({VMs:VMs_List},()=>{
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
        const queryParams = new URLSearchParams(window.location.search);
     let srvid = queryParams.get('ServerID');
        return ( 
          <>
          <NavBar/>
          
          <div class="d-flex justify-content-center" style={{margin:"10px"}}>
          <div class="shadow  p-5  mb-5 mt-5 bg-light rounded" >
                <div class="shadow  p-1  mb-1  bg-light rounded">
                <div class="d-flex justify-content-center mb-4">
                <Image  style={{width: '150px',height:'150px'}} src={require('./images/Server_Logo.gif')}/>
                </div>
                </div>
                <MDBContainer style={{marginTop:"30px"}}>
                  

<Form onSubmit={this.handlesubmit}>
<Container>
  <Row>
  <Col><Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Partition Name:</Form.Label>
        <Form.Control required type="text" placeholder="Enter Server name"
        name="PartitionName" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
      
  </Row>


  
      <Row>
        
        <Col>  <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Partition IP Adress:</Form.Label>
        <Form.Control required type="text" minlength="7" maxlength="15" size="15" pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$" placeholder="Enter Server IP " 
        name="SVMP_IP_Adress" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
        <Col> <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Partition MAC Adress:</Form.Label>
        <Form.Control required type="text"  pattern="^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$" placeholder="Enter Server MAC address " 
        name="SVMP_MAC_Adress"/>
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
        
      </Row>
      <Row>
       
        <Col>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Operating System:</Form.Label>
        <Form.Select required
        name="OperatingSystem_ID"  onChange={this.onChangeHandler}>
          
        {
        this.state.OSs.map((OS)=>{
          
          return(
            <option id={OS.OperatingSystem_ID}>{OS.OperatingSystem_Company_Name +" "+OS.OperatingSystem_Name } </option>
          )
        })
       } 
       
        </Form.Select>
       
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
        
        <Col><Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Number of Allocated Cores </Form.Label>
        <Form.Control type="number"  placeholder="Enter Number of VCores per CPU "
        name="Nb_Allocated_Cores" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
      </Row>

      <Row>
        
        <Col><Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >	Partition Allocated RAM:</Form.Label>
        <Form.Control type="number"  placeholder="Enter RAM size"
        name="Allocated_RAM" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
        
        
      </Row>
      <Row>
      <Form.Group className="mb-3" controlId="formBasicEmail">  
          <Form.Label
                style={{color: 'black'}}
                >Backup </Form.Label>      
            <Form.Select required name="Backup" >
              <option>Enabled</option>
              <option>Disabled</option>
              
            </Form.Select>
           
            <Form.Text className="text-muted">
              
            </Form.Text>
          </Form.Group>
        
      </Row>
      <Row>
       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Description:</Form.Label>
        <Form.Control type="text"  placeholder="Enter Server description " name="Description" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      </Row>
      <Row>
      
      </Row>
      <Row>
      <Form.Group className="mb-3" controlId="formBasicEmail">
       
        <Form.Control type="text"  
        name="Server_ID" hidden value={srvid}/>
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      </Row>
    </Container>
      <div class="row justify-content-center">
      <button type="Submit" class="btn btn-outline-primary btn-rounded" data-mdb-ripple-color="dark">Create Partition</button>
     
</div>
      
    </Form>
    </MDBContainer>




    </div>
    <Modal
        size="lg"
        show={this.state.Status}
        onHide={() => {this.setState({Status:false})}}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
           
Ajouter un VM
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>VM ajouté avec succès</Modal.Body>
      </Modal>

     </div>
     
     
    
          </>
        );
      }
    }
}
 
export default AddServer;