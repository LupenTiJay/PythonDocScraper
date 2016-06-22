var htmlparser = require("htmlparser2");


LineReaderSync = require("line-reader-sync")
lrs = new LineReaderSync("pythonDocs/tutorial/introduction.html");

while(true){
  var line = lrs.readline()
  if(line === null){
    console.log("EOF");
  }else{
    console.log("line without \n",line)
  }
  
}
//  Discover title first ->	 title

//  check for explanation -> explanation

//  check for pre tag -> example

// var titleFlag = false;
// var explainFlag = false;
// var codeExample = false;
// /////
// var title = '';
// var description = '';
// var example = '';


// var writeLine = ['','',''];
// var parser = new htmlparser.Parser({
// 	onopentag: function(name, attribs){
// 		if(name === "title")
// 		{
// 			console.log("<title>");
// 			titleFlag = true;
// 			explainFlag = false;
// 			codeExample = false;
// 		}
// 		if(name === "pre")
// 		{
// 			console.log("<pre> open");
// 			titleFlag = true;
// 			explainFlag = false;
// 			codeExample = true;
// 		}

// 	},
// 	ontext: function(text){
// 		console.log(text);

// 	},
// 	onprocessinginstruction: function(name , data)
// 	{
// 		if (name == 'pre')
// 		{
// 			console.log(data);
// 		}
// 	},
// 	onclosetag: function(tagname){
// 		if(tagname === "title"){
// 			console.log("</title>");
// 		}
// 	}
// }, {decodeEntities: true});



// parser.write("<pre> 11<p>asa </p> </pre>");




// parser.end();