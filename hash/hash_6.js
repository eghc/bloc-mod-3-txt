
class Node{
  constructor(item){
    this.value = item;
    this.next = null;
  }
}

//only used for each value in the array
class LinkedList{
  constructor(item){
    this.head = new Node(item);
  }
  find(item){
    let curr = this.head;
    while(curr != null){
      if(curr.value === item){
        return curr.value;
      }
      curr = curr.next;
    }
  }
  all(){
    let arr = [];
    let curr = this.head;
    while(curr != null){
      arr.push(curr.value);
      curr = curr.next;
    }
    return arr;
  }
  add(item){
    let curr = this.head;
    while(curr.next != null){
      curr = curr.next;
    }
    curr.next = new Node(item);

  }
}

class customerMap{
  constructor(){
    this.map = new Array(10);
    this.items = 0;
  }
  addHelper(key, item, m){
        //check if an item is at that location
        console.log(key);
        console.log(m.length);
        if(m[key%m.length]){
          //handle collision w/ linked list
          m[key%m.length].add(item);
        }else{
          //insert into that spot
          m[key%m.length] = new LinkedList(item);
        }
  }
  add(item){
    let mapLength = this.map.length;
    //resize array
    if(this.items/this.map.length > 0.75){
      //create new map of exponential size
      let newMap = new Array(this.map.length*this.map.length);

      //get each item of the map and put in new mapLength
      for(let i = 0; i < this.map.length; i++){
        //if it is not an empty spot
        if(this.map[i]){
          //get all items from the LinkedList
          let ll = this.map[i].all();
          for(let j = 0; j < ll.length; j++){
            //get the keys of each item
            let k = this.getHashKey(ll[j].phone);

            //TODO: put into newMap
            this.addHelper(k, ll[j], newMap);
          }
        }
      }
      this.map = newMap;
    }

    let key = this.getHashKey(item.phone);
    console.log(key);
    this.addHelper(key, item, this.map);
    //add to items
    this.items += 1;
  }
  find(phone){
    //get hashkey
    let mapLength = this.map.length;
    let key = this.getHashKey(phone);
    //console.log(key);

    //if items with the key exist
    if(this.map[key%mapLength]){
      //get all customers with the phone number in an array
      let arr = this.map[key%mapLength].all();
      let newArr = [];
      for(let i = 0; i < arr.length; i++){
        if(arr[i].phone === phone){
          newArr.push(arr[i]);
        }
      }
      return newArr;

    }

      return null;
  }
  getHashKey(num) {
      var hash = 0;
      num = num.toString();
      if (num.length == 0) {
          return hash;
      }
      for (var i = 0; i < num.length; i++) {
          var char = num.charCodeAt(i);
          hash = ((hash<<5)-hash)+char;
          hash = hash & hash; // Convert to 32bit integer
      }
      //console.log(hash);
      return hash;
  }
}

class Customer{
  constructor(name){
    this.name = name;
    this.phone = -1;
    this.address = "";
  }
}

function createCustomer(){
  //do checks for user input
  //console.log($('.Phone'));
  let number = $('.Phone')[0].value;
  if(number.length != 10){
    $("#doneCreation").html("Not a valid phone number");
  }
  else{
    let newCustomer = new Customer($('.Name')[0].value);
    let newCustomerAddress1 = $('.Address1')[0].value;
    let newCustomerAddress2 = $('.Address2')[0].value;
    number = parseInt(number);
    newCustomer.phone  = number;
    newCustomer.address = newCustomerAddress1 + " " + newCustomerAddress2;

    //print success message
    $("#doneCreation").html("<p>Success</p>");

    //add to map
    cMap.add(newCustomer);
  }
  console.log(cMap.map);
}

function findCustomer(){
  //console.log($('.PhoneFind'));
  let number = parseInt($('.PhoneFind')[0].value);
  //let checkKey = getHashKey(number);
  //console.log(number);

  let customer = cMap.find(number);
  console.log(customer);

  if(customer){
    console.log("yep");
    let str = "<table><tr><th>Name</th> <th>Phone</th> <th>Address</th> </tr>";
    for(var i = 0; i < customer.length; i++){
      str += "<tr>";
      str += "<td>" + customer[i].name+ "</td>";
      str += "<td>" + customer[i].phone + "</td>";
      str += "<td>" + customer[i].address + "</td>";

      str += "</tr>";
    }
    str += "</table>";
    $("#results").html(str);

  }else{

    $("#results").html("Could not find customer with that phone number");
  }
}

let cMap = new customerMap();
