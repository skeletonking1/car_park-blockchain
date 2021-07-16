import React, { Component } from 'react'
import Web3 from 'web3'
// import TodoList from './TodoList'
import { CAR_PARK_LICENSE_ABI, CAR_PARK_LICENSE_ADDRESS } from './config'
import {Container, Button} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import AccessibleOutlinedIcon from '@material-ui/icons/AccessibleOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';



class Home extends Component {
    componentWillMount() {
      this.loadBlockchainData()
    }
    componentDidMount(){
      window.ethereum.on('accountsChanged', async function (accounts) {
        this.setState({ account: accounts[0] })
        const web3 = new Web3(Web3.givenProvider || "https://ropsten.infura.io/v3/6dceabae937a4be7b39efbdbc91bc487")
        const carPark = new web3.eth.Contract(CAR_PARK_LICENSE_ABI, CAR_PARK_LICENSE_ADDRESS)
        this.setState({ carPark })
      }.bind(this))
    }
  
    async loadBlockchainData() {
      await window.ethereum.send('eth_requestAccounts');
      const web3 = new Web3(Web3.givenProvider || "https://ropsten.infura.io/v3/6dceabae937a4be7b39efbdbc91bc487")
  
      const accounts = await web3.eth.getAccounts()
      this.setState({ account: accounts[0] })
      const carPark = new web3.eth.Contract(CAR_PARK_LICENSE_ABI, CAR_PARK_LICENSE_ADDRESS)
      this.setState({ carPark })
      this.setState({ loading: false })
    }
    async createLicense() {
      this.setState({ loading: true })
      // const userData = {
      //   surName: this.state.surName,
      //   firstName: this.state.firstName,
      //   birthDate: this.state.birthDate,
      //   birthPlace: this.state.birthPlace
      // };
      this.state.carPark.methods.AddLicense(this.state.surName,this.state.firstName, this.state.birthDate, this.state.birthPlace,this.state.idLicense,this.state.releaseDate,this.state.expireDate,this.state.vehicleNumber).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
    }
    constructor(props) {
      super(props)
      this.state = {
        account: '',
        surName:'',
        firstName:'',
        birthDate: new Date(),
        birthPlace:'',
        vehicleNumber:'',
        idLicense:'',
        releaseDate:'',
        expireDate:'',
        loading: true
      }
      this.createLicense = this.createLicense.bind(this)
    }
    goPage= (page)=> {
      this.props.history.push(page);
    }
    render() {
        return (
          // <div className = "col-md-6">
          <div>
            <Container maxWidth="sm">
                <div style={{ padding: '40px'}}>
                    <div className="d-flex flex-column align-items-center border border-4 h-100">
                        <div className="d-flex justify-content-between align-items-center w-100 px-4 mt-4">
                          <LocalParkingIcon color="primary" style ={{fontSize : 70}}/>
                          <Button variant="" onClick={() => this.goPage("/")} color="primary">
                            <HomeOutlinedIcon color="primary" style ={{fontSize : 50}} onClick={() => this.goPage("/")} />
                          </Button>
                          <AccessibleOutlinedIcon color="primary" style ={{fontSize : 70}}/>
                         
                          
                        </div>
                        <div className="my-4" style ={{fontSize : 50 , color: '#0b3c6d'}}>
                        New License 
                        </div>
                        
                        <Card  variant="outlined" className="w-75 m-4">
                          <CardContent>
                            <div>
                              your account : {this.state.account}
                            </div>
                            </CardContent>

                        </Card>
                        <TextField className="w-75 m-4" id="surname_text" label="SurName" variant="outlined" 
                          value = {this.state.surName} onChange={(evt) => this.setState({surName:evt.target.value})} />
                        <TextField className="w-75 m-4" id="firstname_text" label="FirstName" variant="outlined" 
                          value = {this.state.firstName} onChange={(evt) => this.setState({firstName:evt.target.value})} />
                        <TextField
                        id="date"
                        label="Birthday"
                        variant="outlined"
                        type="date"
                        value = {this.state.birthDate} 
                        onChange={(evt) => this.setState({birthDate:evt.target.value})}                        
                        className="w-75 m-4"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                        {/* <TextField className="w-75 m-4" id="birthdate_text" label="Birth Date" variant="outlined" 
                          value = {this.state.birthDate} onChange={(evt) => this.setState({birthDate:evt.target.value})} /> */}
                        <TextField className="w-75 m-4" id="birthplace_text" label="Birth Place" variant="outlined" 
                          value = {this.state.birthPlace} onChange={(evt) => this.setState({birthPlace:evt.target.value})} />
                        <TextField className="w-75 m-4" id="idlicense_text" label="ID License" variant="outlined" 
                          value = {this.state.idLicense} onChange={(evt) => this.setState({idLicense:evt.target.value})} />
                        {/* <TextField className="w-75 m-4" id="releasedate_text" label="License Release Date" variant="outlined" 
                          value = {this.state.releaseDate} onChange={(evt) => this.setState({releaseDate:evt.target.value})} /> */}
                        <TextField
                        id="releasedate_text"
                        label="License Release Date"
                        variant="outlined"
                        type="date"
                        value = {this.state.releaseDate} 
                        onChange={(evt) => this.setState({releaseDate:evt.target.value})}                        
                        className="w-75 m-4"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        />
                        <TextField className="w-75 m-4" id="expiredate_text" label="License Expire Date" variant="outlined" 
                          value = {this.state.expireDate} onChange={(evt) => this.setState({expireDate:evt.target.value})} />
                        <TextField
                        id="expiredate_text"
                        label="ExpireDate"
                        variant="outlined"
                        type="date"
                        value = {this.state.expireDate} 
                        onChange={(evt) => this.setState({expireDate:evt.target.value})}                        
                        className="w-75 m-4"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        />
                        <TextField className="w-75 m-4" id="vehiclenumber_text" label="Vehicle Number Plate" variant="outlined" 
                          value = {this.state.vehicleNumber} onChange={(evt) => this.setState({vehicleNumber:evt.target.value})} />
                      {this.state.loading
                      ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                      : <Button variant="contained" color="primary" className = "m-4" onClick = {this.createLicense}>
                          Ok
                        </Button>
                      }
                        

                    </div>
                </div>
            </Container>
            {/* <div className="d-flex justify-content-center">
            
              <div className = "col-md-6">
  
              
              
                <div className="row">
                  
                  <main role="main" className="col-lg-12 d-flex justify-content-center">
                    { this.state.loading
                      ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                      : <TodoList tasks={this.state.tasks} createTask={this.createTask} />
                    }
                  </main>
                </div>
              </div>
            </div> */}
          </div>
           
        );
    }
  }
  
  export default Home;