pragma solidity ^0.4.7;

contract ethDB{

    struct Photo {
		uint timestamp;
		string photoString;
		int photoLon;
		int photoLat;
		uint photoTopic;
		uint numberOfUpvotes;
	}

    mapping(address => uint) _numberOfPhotos;
    mapping(address => mapping (uint => Photo)) _users;
    mapping(address => bool) isRegisteredAddress;
    mapping(address => uint) userCoins;
    uint coinVault;

    mapping(uint=> address) registeredAddresses;
    uint _numberOfUsers;

    // constructor
    function ethDB(){
        _numberOfUsers=0;
        coinVault=1000000;
    }
    // upload a new photo
	function postPhoto(string photoString,int photoLon,int photoLat,uint photoTopic) returns (int result) {
	    if(!isRegisteredAddress[msg.sender]){
	        ++_numberOfUsers;
	        registeredAddresses[_numberOfUsers]=msg.sender;
	        isRegisteredAddress[msg.sender]=true;
	        userCoins[msg.sender]=90;

	    }
		if (bytes(photoString).length > 160) {
			// photo contains more than 160 bytes
			result = -1;
		}else {
			_users[msg.sender][_numberOfPhotos[msg.sender]].timestamp=now;
			_users[msg.sender][_numberOfPhotos[msg.sender]].photoString=photoString;
			_users[msg.sender][_numberOfPhotos[msg.sender]].photoLon=photoLon;
			_users[msg.sender][_numberOfPhotos[msg.sender]].photoLat=photoLat;
			_users[msg.sender][_numberOfPhotos[msg.sender]].photoTopic=photoTopic;
			_users[msg.sender][_numberOfPhotos[msg.sender]].numberOfUpvotes=0;
			_numberOfPhotos[msg.sender]++;
			userCoins[msg.sender]+=10;
			result = 0; // success
		}
	} 

	// delete a photo of the user who's sending calls
	function deletePhoto(uint photoId) returns (uint successs) {
	    if(photoId>= _numberOfPhotos[msg.sender])
	        return 0;
	    if(photoId< _numberOfPhotos[msg.sender]){
	        _users[msg.sender][photoId].timestamp= _users[msg.sender][ _numberOfPhotos[msg.sender]-1].timestamp;
	        _users[msg.sender][photoId].photoString= _users[msg.sender][ _numberOfPhotos[msg.sender]-1].photoString;
	        _users[msg.sender][photoId].photoLon= _users[msg.sender][ _numberOfPhotos[msg.sender]-1].photoLon;
	        _users[msg.sender][photoId].photoLat= _users[msg.sender][ _numberOfPhotos[msg.sender]-1].photoLat;
	        _users[msg.sender][photoId].photoTopic= _users[msg.sender][ _numberOfPhotos[msg.sender]-1].photoTopic;
	        _numberOfPhotos[msg.sender]--;
	        if(userCoins[msg.sender]>9){
	            userCoins[msg.sender]-=10;

	        }else{
	            userCoins[msg.sender]=0;
	        }
	        return 2;
	    }else{
	        return 1;
	    }

	}
	// get number of photos of the user who's sending calls
	function getNumberOfPhotos() constant returns (uint numberOfPhotos) {
		return _numberOfPhotos[msg.sender];
	}
	// retrieve photo data of the user who's sending calls
	function getPhoto(uint photoId) constant returns ( uint timestamp, string photoString, int photoLon,int photoLat,uint photoTopic,uint upvotes) {
		// returns two values
		photoString =_users[msg.sender][photoId].photoString;
		timestamp = _users[msg.sender][photoId].timestamp;
		photoLon =_users[msg.sender][photoId].photoLon;
		photoLat =_users[msg.sender][photoId].photoLat;
		photoTopic =_users[msg.sender][photoId].photoTopic;
		upvotes=_users[msg.sender][photoId].numberOfUpvotes;
	}
	// get total number of users
	function getNumberOfUsers() constant returns (uint numberOfUsers) {
	    return _numberOfUsers;
	}
	// get number of photos of the (userId)th user
	function getNumberOfPhotosByUID(uint userId) constant returns (uint numberOfPhotos){
	    return _numberOfPhotos[registeredAddresses[userId]];
	}
	// get (photoId)th photo of (userId)th user
	function getPhotoByUID(uint userId,uint photoId) constant returns ( uint timestamp, string photoString, int photoLon,int photoLat,uint photoTopic,uint upvotes) {
	    timestamp = _users[registeredAddresses[userId]][photoId].timestamp;
	    photoString = _users[registeredAddresses[userId]][photoId].photoString;
	    photoLon = _users[registeredAddresses[userId]][photoId].photoLon;
	    photoLat =_users[registeredAddresses[userId]][photoId].photoLat;
	    photoTopic =_users[registeredAddresses[userId]][photoId].photoTopic;
	    upvotes=_users[registeredAddresses[userId]][photoId].numberOfUpvotes;
	    return (timestamp, photoString, photoLon, photoLat, photoTopic, upvotes);
	}
	// upvote (photoId)th photo of (userId)th user
	function upvote(uint userId,uint photoId){
		if(userCoins[msg.sender]>=10){
	    _users[registeredAddresses[userId]][photoId].numberOfUpvotes++;
	    userCoins[registeredAddresses[userId]]+=10;
	    userCoins[msg.sender]-=10;
		}
	}
	// returns the balance of `msg.sender`
    function getNumberOfCoins() constant returns (uint coins) {
		return userCoins[msg.sender];
	}
}
