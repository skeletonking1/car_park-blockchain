import React, { Component } from 'react'
import Web3 from 'web3'
// import TodoList from './TodoList'
import { CAR_PARK_LICENSE_ABI, CAR_PARK_LICENSE_ADDRESS } from './config'
import {Container, Button} from '@material-ui/core';
import Card from '@material-ui/core/Card';
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
        const surName = await carPark.methods.SurName(this.state.account).call();
        this.setState({surName});
        const firstName = await carPark.methods.FirstName(this.state.account).call();
        this.setState({firstName});
        const birthDate = await carPark.methods.BirthDate(this.state.account).call();
        this.setState({birthDate});
        const birthPlace = await carPark.methods.BirthPlace(this.state.account).call();
        this.setState({birthPlace});
        const vehicleNumber = await carPark.methods.VehicleNumber(this.state.account).call();
        this.setState({vehicleNumber});

      }.bind(this))
    }
    
   
  
    async loadBlockchainData() {
      await window.ethereum.send('eth_requestAccounts');
            

      const web3 = new Web3(Web3.givenProvider || "https://ropsten.infura.io/v3/6dceabae937a4be7b39efbdbc91bc487")
  
      const accounts = await web3.eth.getAccounts()
      this.setState({ account: accounts[0] })
      const carPark = new web3.eth.Contract(CAR_PARK_LICENSE_ABI, CAR_PARK_LICENSE_ADDRESS)
      this.setState({ carPark })
      const surName = await carPark.methods.SurName(this.state.account).call();
      this.setState({surName});
      const firstName = await carPark.methods.FirstName(this.state.account).call();
      this.setState({firstName});
      const birthDate = await carPark.methods.BirthDate(this.state.account).call();
      this.setState({birthDate});
      const birthPlace = await carPark.methods.BirthPlace(this.state.account).call();
      this.setState({birthPlace});
      const vehicleNumber = await carPark.methods.VehicleNumber(this.state.account).call();
      this.setState({vehicleNumber});

      this.setState({ loading: false })
    }

    constructor(props) {
      super(props)
      this.state = {
        account: '',
        surName:'',
        firstName:'',
        birthDate:'',
        birthPlace:'',
        vehicleNumber:'',
        loading: true
      }
      // this.createTask = this.createTask.bind(this)
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
                        License
                        </div>
                        
                        <Card  variant="outlined" className="w-75 m-4">
                          <CardContent>
                            <div>
                              your account : {this.state.account}
                            </div>
                            </CardContent>

                        </Card>
                        <Card  variant="outlined" className="w-75 m-4">
                          <CardContent>                            
                            <div>
                            VehicleNumber : {this.state.vehicleNumber}
                            </div>
                          </CardContent>
                        </Card>

                        <Card  variant="outlined" className="w-75 m-4">
                          <CardContent>                            
                            <div>
                            SurName : {this.state.surName}
                            </div>
                          </CardContent>
                        </Card>
                        <Card  variant="outlined" className="w-75 m-4">
                          <CardContent>                            
                            <div>
                            FirstName : {this.state.firstName}
                            </div>
                          </CardContent>
                        </Card>
                        <Card  variant="outlined" className="w-75 m-4">
                          <CardContent>                            
                            <div>
                            BirthDate : {this.state.birthDate}
                            </div>
                          </CardContent>
                        </Card>
                        <Card  variant="outlined" className="w-75 m-4">
                          <CardContent>                            
                            <div>
                            BirthPlace : {this.state.birthPlace}
                            </div>
                          </CardContent>
                        </Card>


                        

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