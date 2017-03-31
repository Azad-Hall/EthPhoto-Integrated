const web3 = require('web3')
function functionCall(fromAddr,functionName,functionArgs) {
  // var fromAddr = document.getElementById('functionCaller').value
  // var contractAddr = document.getElementById('contractAddr').value
  var abi = JSON.parse([{"constant":true,"inputs":[{"name":"userId","type":"uint256"},{"name":"photoId","type":"uint256"}],
  "name":"getPhotoByUID","outputs":[{"name":"timestamp","type":"uint256"},{"name":"photoString","type":"string"},{"name":"photoLon","type":"int256"},
  {"name":"photoLat","type":"int256"},{"name":"photoTopic","type":"uint256"},{"name":"upvotes","type":"uint256"},{"name":"downvotes","type":"uint256"}]
  ,"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"userId","type":"uint256"},{"name":"photoId","type":"uint256"}],
  "name":"downvote","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"photoId","type":"uint256"}],
  "name":"deletePhoto","outputs":[{"name":"successs","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],
  "name":"getNumberOfUsers","outputs":[{"name":"numberOfUsers","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":
  [{"name":"userId","type":"uint256"},{"name":"photoId","type":"uint256"}],"name":"upvote","outputs":[],"payable":false,"type":"function"},
  {"constant":false,"inputs":[{"name":"photoString","type":"string"},{"name":"photoLon","type":"int256"},{"name":"photoLat","type":"int256"},
  {"name":"photoTopic","type":"uint256"}],"name":"postPhoto","outputs":[{"name":"result","type":"int256"}],"payable":false,"type":"function"},
  {"constant":true,"inputs":[],"name":"getNumberOfPhotos","outputs":[{"name":"numberOfPhotos","type":"uint256"}],"payable":false,"type":"function"},
  {"constant":true,"inputs":[{"name":"userId","type":"uint256"}],"name":"getNumberOfPhotosByUID","outputs":[{"name":"numberOfPhotos","type":"uint256"}]
  ,"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"photoId","type":"uint256"}],"name":"getPhoto","outputs":[{"name":"timestamp",
  "type":"uint256"},{"name":"photoString","type":"string"},{"name":"photoLon","type":"int256"},{"name":"photoLat","type":"int256"},{"name":"photoTopic",
  "type":"uint256"},{"name":"upvotes","type":"uint256"},{"name":"downvotes","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],
  "payable":false,"type":"constructor"}])
  contractAddr="0xfcea15733dd2a1c623fc6a375ce2fbc8657f6860"
  var contract = web3.eth.contract(abi).at(contractAddr)
  // var functionName = document.getElementById('functionName').value
  var args = JSON.parse('[' + functionArgs + ']')
  // var valueEth = document.getElementById('sendValueAmount').value
  var value = 0;//parseFloat(valueEth)*1.0e18
  var gasPrice = 50000000000
  var gas = 2000000
  args.push({from: fromAddr, value: value, gasPrice: gasPrice, gas: gas})
  var callback = function(err, txhash) {
    console.log('error: ' + err)
    console.log('txhash: ' + txhash)
  }
  args.push(callback)
  contract[functionName].apply(this, args)
}
