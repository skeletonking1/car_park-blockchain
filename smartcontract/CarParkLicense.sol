pragma solidity ^0.5.0;

contract CarParkLicense {
  
  mapping(address => string) public SurName;
  mapping(address => string) public FirstName;
  mapping(address => string) public BirthDate;
  mapping(address => string) public BirthPlace;
  mapping(address => string) public IDLicense;
  mapping(address => string) public ReleaseDate;
  mapping(address => string) public ExpireDate;
  mapping(address => string) public VehicleNumber;
  
  constructor() public {
  
      }

  function AddLicense(string memory _surname,string memory _firstname,string memory _birthdate,string memory _birthplace,string memory _idlicense,string memory _releasedate,string memory _expiredate,string memory _vehiclenumber) public {
      SurName[msg.sender]=_surname;
      FirstName[msg.sender]=_firstname;
      BirthDate[msg.sender]=_birthdate;
      BirthPlace[msg.sender]=_birthplace;
      IDLicense[msg.sender]=_idlicense;
      ReleaseDate[msg.sender]=_releasedate;
      ExpireDate[msg.sender]=_expiredate;
      VehicleNumber[msg.sender]=_vehiclenumber;
    
  }
  function VerifyUserData(string memory _surname,string memory _firstname,string memory _birthdate,string memory _birthplace) public view returns (bool){
      if (!compareStrings(_surname,SurName[msg.sender])) return false;
      if (!compareStrings(_firstname,FirstName[msg.sender])) return false;
      if (!compareStrings(_birthdate,BirthDate[msg.sender])) return false;
      if (!compareStrings(_birthplace,BirthPlace[msg.sender])) return false;
      return true;
  }
  
  function VerifyVehicleNumber(string memory _vehiclenumber) public view returns (bool){
      return (compareStrings(_vehiclenumber,VehicleNumber[msg.sender]));
  }
  
  function compareStrings(string memory a, string memory b) private view returns (bool) {
    return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
      
  }

}