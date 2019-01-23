let customerMap = new Map();

class Customer{
  constructor(name){
    this.name = name;
    this.phone = -1;
    this.address = "";
  }
  setPhone(num){
    this.phone = num;
  }
  setAddress(address){
    this.address = address;
  }
  getPhone(){
    return this.phone;
  }
  getName(){
    return this.name;
  }
  getAddress(){
    return this.address;
  }
}

function getHashKey(num) {
    var hash = 0;
    if (num.length == 0) {
        return hash;
    }
    for (var i = 0; i < num.length; i++) {
        var char = num.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    console.log(hash);
    return hash;
}

function createCustomer(){
  //do checks for user input
  let number = $('.Phone')[0].value;
  let checkKey = getHashKey(number);
  if(number.length != 10){
    $(".doneCreation").innerHTML = "Not a valid phone number";
  }
  else if (customerMap.has(checkKey)) {
    $(".doneCreation").innerHTML = "Phone number is already associated with another customer.";
  }
  else{
    let newCustomer = new Customer($('.Name')[0].value);
    let newCustomerAddress1 = $('.Address1')[0].value;
    let newCustomerAddress2 = $('.Address2')[0].value;
    number = parseInt(number);
    newCustomer.setPhone(number);
    newCustomer.setAddress(newCustomerAddress1 + " " + newCustomerAddress2);

    //print success message
    $(".doneCreation").innerHTML = "Success";

    //add to map
    customerMap.set(checkKey,newCustomer);
  }
}

function findCustomer(){
  let number = document.getElementsByName('PhoneFind')[0].value;
  let checkKey = getHashKey(number);
  //console.log(hash);

  let customer = customerMap.get(checkKey);

  if(customer === null || customer === undefined){
    document.getElementById("results").innerHTML = "Could not find customer with that phone number";
  }else{
    document.getElementById("results").innerHTML = customer.getName() + "<br>" + customer.getPhone() + "<br>" + customer.getAddress();
  }
}
