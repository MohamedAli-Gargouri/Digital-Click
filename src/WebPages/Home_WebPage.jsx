import React,{Component} from 'react';

import ManageServer from '../components/ManageServer';

import NotificationBell from '../components/Notification.jsx';
import AddServer from '../components/AddServer';
import AddVirtualMachine from '../components/AddVirtualMachine';
import AddClient from '../components/AddClient';
import ManageClients from '../components/ManageClients';
import Image1 from '../components/images/Landing_Page.jpg'
import Image from 'react-bootstrap/Image'
import Button from '@mui/material/Button';

class Home extends Component {
    state = {  } 
    render() { 
        return (
            
            <div class="shadow-lg p-3 m-3  bg-body rounded">
          <div class="shadow-lg p-3 m-3  bg-body rounded"style={{
        backgroundColor:"rgba(237, 238, 240,0.9)",
        /* backgroundImage: `url(${Image})`, */
      
        backgroundImage: `url(${Image1})`,
      backgroundRepeat  : 'no-repeat',
      backgroundSize:'Cover',
      borderradius: "20px",
      borderwidth:"20px"
      ,height:"490px"
      
    }}>
        <div class="d-flex justify-content-center">
         <Image   src={require('../components/images/Digital_Click.gif')} style={{
                marginTop:"10px",
                Height:"200px",
                width:"500px",
                
                
            }} alt="Digital Click"/>
            
          
            </div>
            
        </div>
        </div>
        );
    }
}
 
export default Home;