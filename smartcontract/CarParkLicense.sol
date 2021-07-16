pragma solidity ^0.5.0;

contract CarParkLicense {
  
  
  mapping(string => string) public VehicleNumbertoID;
  mapping(string => mapping(string=>mapping(string=>mapping(string=>string)))) public UserdatatoID;
  mapping(string => string) public IDreleasedate;
  mapping(string => string) public IDexpiredate;
  mapping(string => string) public IDtoVehicleNumber;
  mapping(string => string) public IDtoSurName;
  mapping(string => string) public IDtoFirstName;
  mapping(string => string) public IDtoBirthDate;
  mapping(string => string) public IDtoBirthPlace; 
  
  
  
  constructor() public {
  
      }

  function AddLicense(string memory _surname,string memory _firstname,string memory _birthdate,string memory _birthplace,string memory _idlicense,string memory _releasedate,string memory _expiredate,string memory _vehiclenumber) public {
      VehicleNumbertoID[_vehiclenumber] =_idlicense;
      UserdatatoID[_surname][_firstname][_birthdate][_birthplace] = _idlicense;
      IDtoSurName[_idlicense] = _surname;
      IDtoFirstName[_idlicense] = _firstname;
      IDtoBirthPlace[_idlicense] = _birthplace;
      IDtoBirthDate[_idlicense] = _birthdate;
      IDtoVehicleNumber[_idlicense] = _vehiclenumber;
      IDreleasedate[_idlicense] = _releasedate;
      IDexpiredate[_idlicense] = _expiredate;
  }
  
}