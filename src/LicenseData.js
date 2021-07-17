import React, { Component } from 'react'
import Web3 from 'web3'
// import TodoList from './TodoList'
import { CAR_PARK_LICENSE_ABI, CAR_PARK_LICENSE_ADDRESS } from './config'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class LicenseData extends Component {
    componentWillMount() {
      this.loadBlockchainData()
     
    }
    componentDidUpdate(prevProbs){
      if(prevProbs.idLicense !== this.props.idLicense)
      {
        this.loadBlockchainData()
      }
      // window.ethereum.on('accountsChanged', async function (accounts) {
        // this.setState({ account: accounts[0] })
        // const web3 = new Web3(Web3.givenProvider || "https://ropsten.infura.io/v3/6dceabae937a4be7b39efbdbc91bc487")
        // const carPark = new web3.eth.Contract(CAR_PARK_LICENSE_ABI, CAR_PARK_LICENSE_ADDRESS)
        // this.setState({ carPark })
        // const surName = await carPark.methods.SurName(this.state.account).call();
        // this.setState({surName});
        // const firstName = await carPark.methods.FirstName(this.state.account).call();
        // this.setState({firstName});
        // const birthDate = await carPark.methods.BirthDate(this.state.account).call();
        // this.setState({birthDate});
        // const birthPlace = await carPark.methods.BirthPlace(this.state.account).call();
        // this.setState({birthPlace});
        // const vehicleNumber = await carPark.methods.VehicleNumber(this.state.account).call();
        // this.setState({vehicleNumber});
        

      // }.bind(this))
      // this.loadBlockchainData()
    }
  
    async loadBlockchainData() {
      await window.ethereum.send('eth_requestAccounts');
      const web3 = new Web3(Web3.givenProvider || "https://ropsten.infura.io/v3/6dceabae937a4be7b39efbdbc91bc487")
      const accounts = await web3.eth.getAccounts()
      this.setState({ account: accounts[0] })
      const carPark = new web3.eth.Contract(CAR_PARK_LICENSE_ABI, CAR_PARK_LICENSE_ADDRESS)
      this.setState({ carPark })
      this.setState({idLicense:this.props.idLicense})
      const surName = await carPark.methods.IDtoSurName(this.state.idLicense).call();
      this.setState({surName});
      const firstName = await carPark.methods.IDtoFirstName(this.state.idLicense).call();
      this.setState({firstName});
      const birthDate = await carPark.methods.IDtoBirthDate(this.state.idLicense).call();
      this.setState({birthDate});
      const birthPlace = await carPark.methods.IDtoBirthPlace(this.state.idLicense).call();
      this.setState({birthPlace});
      const vehicleNumber = await carPark.methods.IDtoVehicleNumber(this.state.idLicense).call();
      this.setState({vehicleNumber});
      const idReleaseDate = await carPark.methods.IDreleasedate(this.state.idLicense).call();
      this.setState({idReleaseDate});
      const idExpireDate = await carPark.methods.IDexpiredate(this.state.idLicense).call();
      this.setState({idExpireDate});
      const today = new Date().getTime();
      const expiredate = new Date(idExpireDate).getTime();
      if (expiredate < today) this.setState({licenseState : "expired"})
      else this.setState({licenseState : "licensed"})
      if (this.state.idLicense === '') this.setState({licenseState : "no licensed"})
      console.log(this.state.licenseState,today,expiredate);
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
        idLicense:'',
        idReleaseDate:'',
        idExpireDate:'',
        licenseState:''
        
      }
      // this.setState({idLicense: probs.idLicense})
      // this.createTask = this.createTask.bind(this)
    }

    render() {
        return (
          <div>
            {(this.state.licenseState == "licensed")
              ?<div style = {{color : '#3367D6'}}> This Data is licensed</div>
              :(this.state.licenseState == "expired")
              ?<div style = {{color : '#fb9401'}}>This Licensed is Expired at {this.state.idExpireDate}</div>
              :(this.state.licenseState == "no licensed")
              ?<div style = {{color : '#fb0101'}}> This Data is not licensed</div>
              :null
            }
            
            {(this.state.licenseState === "no licensed")
              ? null
              : <Card  variant="outlined" >
              <CardContent>                            
                <div>
                VehicleNumber : {this.state.vehicleNumber}
                </div>
                                         
                <div>
                SurName : {this.state.surName}
                </div>
              
                <div>
                FirstName : {this.state.firstName}
                </div>
              
                <div>
                BirthDate : {this.state.birthDate}
                </div>
              
                <div>
                BirthPlace : {this.state.birthPlace}
                </div>
              </CardContent>
            </Card>
           
            }
            
          </div>

           
        );
    }
  }
  
  export default LicenseData;