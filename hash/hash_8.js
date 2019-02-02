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
    let count = 0;
    while(curr.next != null){
      curr = curr.next;
      count += 1;
    }
    curr.next = new Node(item);

  }
}

class Newspaper{
  constructor(publisher, date, file){
    this.publisher = publisher;
    this.date = date;
    this.file = file;
  }
}

class newspaperMap{
  constructor(){
    this.map = new Array(10);
    this.items = 0;
  }
  addHelper(key, item, m){
        //check if an item is at that location
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
            let k = this.getHashKey(ll[j].publisher, ll[j].date);

            //TODO: put into newMap
            this.addHelper(k, ll[j], newMap);
          }
        }
      }
      this.map = newMap;
    }

    let key = this.getHashKey(item.publisher, item.date);
    //console.log(key);
    this.addHelper(key, item, this.map);
    //add to items
    this.items += 1;
  }

  find(publisher, date){
    //get hashkey
    let mapLength = this.map.length;
    let key = this.getHashKey(publisher, date);
    //console.log(key);

    //if items with the key exist
    if(this.map[key%mapLength]){
      //get all items in an array
      let arr = this.map[key%mapLength].all();
      for(let i = 0; i < arr.length; i++){
        if(arr[i].publisher === publisher && arr[i].date === date){
          return arr[i];
        }
      }
    }

      return null;
  }

  getHashKey(pub, d) {
      var hash= 0;
      if (pub.length == 0) {
          return hash;
      }
      for (var i = 0; i < pub.length; i++) {
          var char = pub.charCodeAt(i);
          hash = ((hash<<5)-hash)+char;
          hash = hash & hash; // Convert to 32bit integer
      }
      if (d.length == 0) {
          return d;
      }
      for (var i = 0; i < d.length; i++) {
          var char = d.charCodeAt(i);
          hash = ((hash<<5)-hash)+char;
          hash = hash & hash; // Convert to 32bit integer
      }
      return hash;
  }

}

function createNewspaper(){
  let pub = $(".publisher")[0].value;
  let d = $(".date")[0].value;
  let f = URL.createObjectURL($(".file")[0].files[0]);

  //console.log(pub + d + f);
  let news = new Newspaper(pub,d,f);

  //add to map
  nMap.add(news);

  $("#doneCreation").text("Success");
}

function findNewspaper(){
  let pub = $(".publisherFind")[0].value;
  let d = $(".dateFind")[0].value;
  //get hash key
  let results = nMap.find(pub, d);

  if(results){
    $("#results").html("<a href='"+results.file+"' download>Download here</a>");
  }else{
    $("#results").text("Sorry, that newspaper does not appear to exist.");
  }
}


let nMap = new newspaperMap();

//
// showFile(blob){
//   // It is necessary to create a new blob object with mime-type explicitly set
//   // otherwise only Chrome works like it should
//   var newBlob = new Blob([blob], {type: "application/pdf"})
//
//   // IE doesn't allow using a blob object directly as link href
//   // instead it is necessary to use msSaveOrOpenBlob
//   if (window.navigator && window.navigator.msSaveOrOpenBlob) {
//     window.navigator.msSaveOrOpenBlob(newBlob);
//     return;
//   }
//
//   // For other browsers:
//   // Create a link pointing to the ObjectURL containing the blob.
//   const data = window.URL.createObjectURL(newBlob);
//   var link = document.createElement('a');
//   link.href = data;
//   link.download="file.pdf";
//   link.click();
//   setTimeout(function(){
//     // For Firefox it is necessary to delay revoking the ObjectURL
//     window.URL.revokeObjectURL(data);
//   , 100}
// }
//
// fetch([url to fetch], {[options setting custom http-headers]})
// .then(r => r.blob())
// .then(showFile)
