let newspapers = new Map();

class Newspaper{
  constructor(publisher, date, file){
    this.publisher = publisher;
    this.date = date;
    this.file = file;
  }
  getDetails(){
    return {publisher: this.publisher,
      date: this.date,
      file: this.file
    };
  }
}

function getHashKey(pub, d) {
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

function createNewspaper(){
  let pub = $(".publisher")[0].value;
  let d = $(".date")[0].value;
  let f = URL.createObjectURL($(".file")[0].files[0]);

  //console.log(pub + d + f);
  let news = new Newspaper(pub,d,f);
  //get hash key
  let key = getHashKey(pub, d);
  newspapers.set(key, news);
  //console.log("Success");
  $("#doneCreation").text("Success");
}

function findNewspaper(){
  let pub = $(".publisherFind")[0].value;
  let d = $(".dateFind")[0].value;
  //get hash key
  let find = newspapers.get(getHashKey(pub, d));
  if(find !== undefined){
    //console.log("Success");
    let results = find.getDetails();
    $("#results").html("<a href='"+results.file+"' download>Download here</a>");
  }else{
    $("#results").text("Sorry, that newspaper does not appear to exist.");
  }
}




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
