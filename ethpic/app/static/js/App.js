import React from 'react';
import Navbar from './Navbar';
import Login from './Login';
import Gallery from './Gallery';
import Map from './Map';
import Upload from './Upload';
import update from "react-addons-update";
import lightwallet from 'eth-lightwallet';
import async from 'async';
import Web3 from 'web3';
import HookedWeb3Provider from 'hooked-web3-provider';
import SignerProvider from 'ethjs-provider-signer';
import sign from 'ethjs-signer';
import Alert from './Alert';
import Loader from './Loader';

// const server_side = "http://139.59.72.137:8080/ipfs/";

var App = React.createClass ({
  getInitialState(){
    return{
      loggedIn: false,
      requestLogin: false,
      dashOpen: false,
      uploaderOpen: false,
      showLoader: false,
      userName: '',
      curLat : 22,
      curLng : 87,
      seed: '',
      showAlert: false,
      markers: [],
      data: [],
      global_keystore: '',
      addresses: [],
      web3: '',
      ether: [],
      pwDerivedKey: '',
      pic: 0,
      coin: 0,
      ipfs: 'http://139.59.72.137:8080',
      ethereum: 'http://139.59.72.137:8545'
    }
  },

  render() {
    return (
      <div className="App">
        <Navbar ipfs={this.state.ipfs} ethereum={this.state.ethereum} showUserPics={this.showUserPics} loggedIn={this.state.loggedIn} showLogin={this.showLogin}  showDash={this.showDash} userName={this.state.userName}/>
        <Login ipfs={this.state.ipfs} ethereum={this.state.ethereum} setIPs={this.setIPs} requestLogin={this.state.requestLogin} cancelLogin={this.cancelLogin} doLogin={this.doLogin} doSignUp={this.doSignUp}/>
        <Map ipfs={this.state.ipfs} ethereum={this.state.ethereum} functionCall={this.functionCall} createVault={this.createVault} signTransactions={this.signTransactions} ref="map" markerData={this.state.markers} setCurLatLng={this.setCurLatLng} addresses={this.state.addresses} toggleShowUpload={this.toggleShowUpload} updateMarkers={this.updateMarkers}/>
        <Gallery ipfs={this.state.ipfs} ethereum={this.state.ethereum} functionCall={this.functionCall} ether={this.state.ether} coin={this.state.coin} pic={this.state.pic} showUserPics={this.showUserPics} updateValues={this.updateValues}  data={this.state.data} addresses={this.state.addresses} open={this.state.dashOpen} getBalances={this.getBalances} hideDash={this.hideDash} logout={this.logout} username={this.state.userName}/>
        <Upload ipfs={this.state.ipfs} ethereum={this.state.ethereum} functionCall={this.functionCall} showUserPics={this.showUserPics} markerData={this.state.markers} addresses={this.state.addresses} updateValues={this.updateValues} updateMarkers={this.updateMarkers} setCurLatLng={this.setCurLatLng} toggleShowUpload={this.toggleShowUpload} showUpload={this.state.uploaderOpen} loggedIn={this.state.loggedIn} user={this.state.userName} curLat={this.state.curLat} curLng={this.state.curLng}/>
        <Alert ipfs={this.state.ipfs} ethereum={this.state.ethereum} showAlert={this.state.showAlert} info={this.state.seed} done={this.done} />
        <Loader ipfs={this.state.ipfs} ethereum={this.state.ethereum} showLoader={this.state.showLoader} />
      </div>
    );
  },

  done(){
    this.setState({
      showAlert: false
    })
  },

  setIPs(ipfs1, ethereum1) {
    this.setState({ipfs: ipfs1, ethereum:ethereum1});
    alert("Changed IP Addresses! \nIPFS: " + ipfs1 + "\nEthereum: " + ethereum1);
  },

  updateMarkers(marker){
    this.setState({markers:marker});
    console.log('marker data from app:');
    console.log(this.state.markers);
  },

  toggleShowUpload(){
    this.setState({uploaderOpen: this.state.uploaderOpen ? false : true, dashOpen: false})
    this.refs.map.closeImageView();
  },

  setCurLatLng(point){
    this.setState({curLng: point.lng(), curLat: point.lat()});
  },

  showLogin(){
    this.setState({requestLogin:true});
    this.refs.map.closeImageView();
  },

  cancelLogin(){
    this.setState({requestLogin:false});
  },

  doLogin(randomSeed,password){

    this.createVault(password, randomSeed);

  },

  createVault(password, randomSeed, cb) {
    var that = this;
    lightwallet.keystore.createVault({
      password: password,
      seedPhrase: randomSeed, // Optionally provide a 12-word seed phrase
      // salt: fixture.salt,     // Optionally provide a salt.
                                 // A unique salt will be generated otherwise.
      hdPathString: "m/44'/60'/0'/0"    // Optional custom HD Path String
    }, function (err, ks) {

      // Some methods will require providing the `pwDerivedKey`,
      // Allowing you to only decrypt private keys on an as-needed basis.
      // You can generate that value with this convenient method:
      ks.keyFromPassword(password, function (err, pwDerivedKey) {
        if (err) throw err;

        that.state.pwDerivedKey = pwDerivedKey;
        // generate five new address/private key pairs
        // the corresponding private keys are also encrypted
        ks.generateNewAddress(pwDerivedKey, 1);
        var addr = ks.getAddresses();
        console.log(ks);
        console.log(ks.exportPrivateKey(addr[0], pwDerivedKey));
        var private_key = ks.exportPrivateKey(addr[0], pwDerivedKey);

        ks.passwordProvider = function (callback) {
          var pw = prompt("Please enter password", "Password");
          callback(null, pw);
        };

        // var provider = new SignerProvider('http://139.59.72.137:8545', {
        //   signTransaction: (rawTx, cb) => cb(null, sign.sign(rawTx, '0x'+private_key)),
        //   accounts: (cb) => cb(null, ['0x'+addr[0]]),
        // });

        var provider = new HookedWeb3Provider({
          host: that.state.ethereum,
          transaction_signer: ks
        });

        ethDB.web3.setProvider(provider);

        that.setState({
              requestLogin:false,
              loggedIn: true,
              userName: 'Generate Something',
              global_keystore: ks,
              addresses: addr
            });
        that.showUserPics();
        that.updateValues();
        if(cb)
          cb();

        // Now set ks as transaction_signer in the hooked web3 provider
        // and you can start using web3 using the keys/addresses in ks!
      });
    });
  },

  doSignUp(password){

    console.log('Generate the words and store them as username... the password is : ', password);
    var randomSeed = lightwallet.keystore.generateRandomSeed();
    console.log(randomSeed);
    this.setState({
      seed: randomSeed,
      showAlert: true
    });
    this.createVault(password, randomSeed);

  },

  getBalances() {
    var ks = this.state.global_keystore;
    console.log(ks);
    var addresses = ks.getAddresses();
    console.log(addresses);

    var web3 = new Web3();
    var web3Provider = new HookedWeb3Provider({
      host: this.state.ethereum,
      transaction_signer: ks
    });

    web3.setProvider(web3Provider);

    var that = this;
    async.map(addresses, web3.eth.getBalance, function(err, balances) {
      console.log(addresses, balances);
      var ethers = [];
      balances.forEach(function(new_listitem, j){
        ethers.push(new_listitem/1.0e18);
      });
      that.setState({ether: ethers});
    });

  },

  showDash(){
    this.setState({dashOpen:this.state.dashOpen ? false:true, uploaderOpen:false});
    this.getBalances();
    this.refs.map.closeImageView();
  },

  hideDash(){
    this.setState({dashOpen:false});
    this.refs.map.closeImageView();
  },

  logout(){
    this.setState({data: []});
    this.setState({dashOpen: false, loggedIn: false});
  },

  showUserPics() {
    this.setState({data: []});
    var that = this;

    this.functionCall(this.state.addresses[0],'getNumberOfPhotos',[],function(err, photos){

      var arr = [...Array(photos.c[0]).keys()];
      console.log(arr);

      arr.forEach(function(listitem, curr){
        that.functionCall(that.state.addresses[0],'getPhoto',[curr],function(err, values){

          console.log(values);
          let { data } = that.state;
          data = update(data, {
            $push: [
              {
                id: curr,
                name: "",
                image: that.state.ipfs + '/ipfs/' + values[1]
              }
            ],
          });
          that.setState({ data });

        });
      });
    });
  },

  add0x (input) {
    if (typeof(input) !== 'string') {
      return input;
    }
    else if (input.length < 2 || input.slice(0,2) !== '0x') {
      return '0x' + input;
    }
    else {
      return input;
    }
  },

  // signTransactions(functionName, args) {
  //   var web3 = new Web3();
  //   web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

  //   var gasPrice = 50000000000
  //   var gas = 3141592
  //   var txOptions = {
  //       gasPrice: gasPrice,
  //       gasLimit: gas,
  //       value: 10000000
  //   };
  //   console.log(web3.eth.getTransactionCount(this.add0x(this.state.addresses[0])));
  //   txOptions.to = this.add0x(ethDB.address);
  //   var nonce =  web3.eth.getTransactionCount(this.add0x(this.state.addresses[0]));
  //   txOptions.nonce = nonce;
  //   var registerTx = lightwallet.txutils.functionTx(ethDB.abi, functionName, args, txOptions);
  //   console.log(registerTx, this.state.global_keystore, this.add0x(this.state.pwDerivedKey), this.add0x(this.state.addresses[0]));
  //   var signedRegisterTx = lightwallet.signing.signTx(this.state.global_keystore, this.add0x(this.state.pwDerivedKey), this.add0x(registerTx), this.add0x(this.state.addresses[0]));
  //   console.log(signedRegisterTx);

  //   var web3Provider = new HookedWeb3Provider({
  //     host: "http://localhost:8545",
  //     transaction_signer: this.state.global_keystore
  //   });
  //   console.log(web3Provider);
  //   var tx = web3.eth.sendRawTransaction(this.add0x(signedRegisterTx), function(err, hash){
  //     console.log(err, hash);
  //   });
  //   // var rpt = web3.eth.getTransactionReceipt(this.add0x(tx));
  //   // console.log(tx, rpt);
  //   return tx;


  // }


  updateValues() {
    var that = this;

    // var args = [];
    // args.push({from: this.props.addresses[0], to: ethDB.address});

    this.functionCall(this.state.addresses[0],'getNumberOfPhotos',[],function(err, photos){
      console.log("PIC", photos);
      that.setState({
        pic: photos.c[0]
      });
    });
    this.functionCall(this.state.addresses[0],'getNumberOfCoins',[],function(err, coins){
      console.log("COIN", coins);
      that.setState({
        coin: coins.c[0]
      });
    });
    // this.props.getBalances();
  },

  functionCall(fromAddr,functionName,functionArgs,cb) {
    var ks = this.state.global_keystore;
    console.log(ks);
    var addresses = ks.getAddresses();
    console.log(addresses);
    this.setState({ showLoader:true });
    var that = this;

    var web3 = new Web3();
    var web3Provider = new HookedWeb3Provider({
      host: that.state.ethereum,
      transaction_signer: ks
    });

    web3.setProvider(web3Provider);
    // var fromAddr = document.getElementById('functionCaller').value
    // var contractAddr = document.getElementById('contractAddr').value
    var abi = ethDB.abi
    var contractAddr=this.add0x(ethDB.address);
    var contract = web3.eth.contract(abi).at(contractAddr)
    // var functionName = document.getElementById('functionName').value
    var args = functionArgs
    // var valueEth = document.getElementById('sendValueAmount').value
    var value = 0;//parseFloat(valueEth)*1.0e18
    var gasPrice = 50000000000
    var gas = 3141592
    args.push({from: fromAddr, value: value, gasPrice: gasPrice, gas: gas})
    var callback = function(err, txhash) {
      console.log('error: ' + err)
      console.log('txhash: ' + txhash, txhash.length)
      if (typeof(txhash) === 'string' && txhash.slice(0,2) == '0x') {
        var res = '';
        while(true){
          res = web3.eth.getTransaction(that.add0x(txhash));
          console.log('tnx', res);
          if (res.blockNumber != null)
            break;
        }
        console.log('getTransaction', null, res);
        that.setState({ showLoader:false });
        cb(null, res);
      } else {
        that.setState({ showLoader:false });
        cb(err, txhash);
      }
    }
    args.push(callback)
    console.log("args:",args)
    contract[functionName].apply(this, args)
  }

})

export default App;
