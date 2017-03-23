pragma solidity ^0.4.7;
contract EthPic {
  mapping(address => string[]) userData;
  mapping(string => string[]) topicData;

  function add_data(string photo_hash, string topic) {
    // TODO: check if photo already exist
    userData[msg.sender].push(photo_hash);
    topicData[topic].push(photo_hash);
  }

  function get_user(uint index) constant returns (string retVal) {
    if (userData[msg.sender].length > index)
      return userData[msg.sender][index];
    return "Not there";
  }

  function get_topic(string topic, uint index) constant returns (string retVal) {
    if (topicData[topic].length > index)
      return topicData[topic][index];
    return "Not there";
  }

  function del_photo(string photo_hash, string topic) {
    uint i;
    
    // for user database
    for (i = 0; i < userData[msg.sender].length; i++) {
      if (sha3(userData[msg.sender][i]) == sha3(photo_hash))
        break;
    }
    if (i != userData[msg.sender].length - 1)
      userData[msg.sender][i] = userData[msg.sender][userData[msg.sender].length - 1];
    delete userData[msg.sender][userData[msg.sender].length - 1];
    userData[msg.sender].length--;

    // for topic database
    for (i = 0; i < topicData[topic].length; i++) {
      if (sha3(topicData[topic][i]) == sha3(photo_hash))
        break;
    }
    if (i != topicData[topic].length - 1)
      topicData[topic][i] = topicData[topic][topicData[topic].length - 1];
    delete topicData[topic][topicData[topic].length - 1];
    topicData[topic].length--;
  }

  function addr() constant returns (address retVal) {
    return msg.sender;
  }
}

