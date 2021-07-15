import React from 'react'
import {Container, Button} from '@material-ui/core';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import AccessibleOutlinedIcon from '@material-ui/icons/AccessibleOutlined';

const Home = props => {

    const goPage = (page) => {
        props.history.push(page);
    }

    return (
        <Container maxWidth="sm">
            <div style={{padding: '40px'}}>
                <div className="d-flex flex-column align-items-center border border-4 h-100">
                    <div className="d-flex justify-content-between align-items-center w-100 px-4 mt-4">
                        <LocalParkingIcon color="primary" style ={{fontSize : 70}}/>
                        <AccessibleOutlinedIcon color="primary" style ={{fontSize : 70}}/>
                    </div>
                    <div className="my-4" style ={{fontSize : 70 , color: '#0b3c6d'}}>
                        Car Park
                    </div>
                    <Button variant="outlined" onClick={() => goPage("/new-license")} className="w-75 m-4" color="primary">
                        New License
                    </Button>
                    <Button variant="outlined" onClick={() => goPage("/verification")} className="w-75 my-4" color="primary">
                        License 
                    </Button>
                    <Button variant="outlined" onClick={() => goPage("/license-verification")} className="w-75 my-4" color="primary">
                        License Verification
                    </Button>
                </div>
            </div>
      </Container>
    );    
}
  
export default Home;