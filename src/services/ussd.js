const axios = require("axios");
const UssdMenu = require("ussd-menu-builder");
const { buyAirtime, fetchBalance } = require("../controllers/airtime");
let sessions = {};
let menu = new UssdMenu();
let name = '';
let email = '';
let phoneNumber = '';
menu.sessionConfig({
  start: (sessionId, callback)=>{
      // initialize current session if it doesn't exist
      // this is called by menu.run()
      if(!(sessionId in sessions)) sessions[sessionId] = {};
      callback();
  },
  end: (sessionId, callback)=>{
      // clear current session
      // this is called by menu.end()
      delete sessions[sessionId];
      callback();
  },
  set: (sessionId, key, value, callback) => {
      // store key-value pair in current session
      sessions[sessionId][key] = value;
      callback();
  },
  get: (sessionId, key, callback)=>{
      // retrieve value by key in current session
      let value = sessions[sessionId][key];
      callback(null, value);
  }
});

// Define menu states
menu.startState({
  run: () => {
    // use menu.con() to send response without terminating session
    menu.con(
      "How can we be of service today? Resond with corresponding number of your choice:" + "\n1. Register Claim" + "\n2. Policy Status" + "\n3. Buy Insurance" + "\n4. Insurance Payment"
    );
  },
  // next object links to next state based on user input
  next: {
    "1": "registerClaim",
    "2": "buyAirtime",
    "3": "buyInsurance",
    "4": "insurancePayment",
  },
 
});

menu.state("registerClaim", {
  run: () => {
    // fetch balance
    menu.con(
      "Kindly Select the Claim of your choice:" + "\n1. Car Claim" + "\n2. Health Claim" + "\n3. Buy policy" 
    );
  },
  // next object links to next state based on user input
  next: {
    "1": "registration",
    "2": "healthClaim",
    "3": "buyPolicy",
  },
});
menu.state('registration', {
  run: function(){
      menu.con('Enter your name');
  },
  next: {
      '*[a-zA-Z]+': 'registration.name'
  }
});

menu.state('registration.name', {
  run: function(){
      name = menu.val;
      menu.session.set('name', name);
      menu.con('Enter your email');
  },
  next: {
      '*\\w+@\\w+\\.\\w+': 'registration.email'
  }
});
menu.state('registration.email', {
  run: function(){
    email = menu.val;
    menu.session.set('name', email);
    menu.con('Enter Phone Number');
},
next: {
    '*\\d+': 'registration.phoneNumber'
}
});
menu.state('registration.phoneNumber', {
    run: function(){
      phoneNumber = menu.val;

        menu.end('You entered: ' + name +' '+ email+ ' '+ phoneNumber);
    
    }
  });

module.exports = menu;
