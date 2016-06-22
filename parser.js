var htmlparser = require("htmlparser2");


LineReaderSync = require("line-reader-sync")
// lrs = new LineReaderSync("pythonDocs/tutorial/introduction.html");
lrs = new LineReaderSync("pythonDocs/tutorial/controlflow.html");
// lrs = new LineReaderSync("test.html");


var obtainPreTagFlag = false;	// When true, linereader begins to pick everything in <pre>
var topicIndex = -1;			// first occurance of <div class="section"...>
var sectionIndex = -1;			// second occurance of <div class="section"...>
var subSectionIndex = -1;		// third occurance of <div class="section"...>
								// Note, more may be added, check html before parsing
var highlightIndex = -1;		// When highlight div is found, in which contains the 
var divStack = [];

//algorithm for scraping

//	On open tag
//	push whenever there is a div onto dicStack
// 	if attribs is section, set section to divStack.length - 1
//	if subsection 

//	attribs is highlight, set Obtain Pre to true and set highlight index


var parser = new htmlparser.Parser({

	onopentag: function(name, attribs)
	{
		if (name == "div")
		{
			if(attribs.class === "section")
			{
				//Check if section is 0, if not then change subsection

				if(topicIndex == -1)
				{
					topicIndex = divStack.length
				}
				else
				{
					if(sectionIndex == -1)
					{
						sectionIndex = divStack.length;
					}
					else
					{
						subSectionIndex = divStack.length;
					}	
				}


				divStack.push(attribs.id);
			}

			else if(attribs.class === "highlight")
			{
				highlightIndex = divStack.length;
				obtainPreTagFlag = true;// set the flag
				divStack.push(attribs.id);
			}
			else
			{
				divStack.push();
			}
		}
	},
	ontext: function(text){
		// console.log(text);

	},
	onclosetag: function(name)
	{
		if(name == "pre")
		{
			obtainPreTagFlag = false;
		}
		if (name == "div")
		{
			
			if(divStack.length - 1 == highlightIndex)
			{
				highlightIndex = -1;
				// obtainPreTagFlag = false;
			}

			if (divStack.length - 1 == subSectionIndex)
			{
				subSectionIndex = -1;
			}

			if(divStack.length - 1 == sectionIndex)
			{
				sectionIndex = -1;
			}

			if(divStack.length - 1 == subSectionIndex)
			{
				topicIndex = -1;
			}
		}
	}
}, {decodeEntities: true});





// loop which reads line by line and parses them
var line = '';
var tmp = '<pre>' + '\n';


while(line != null){
  var line = lrs.readline()
  if(line === null)
  {
  	// Do something
  }
  else{

    if (obtainPreTagFlag == true)
    {
    	tmp += line + '\n';
    }
    else
    {
    	if(tmp != '<pre>' + '\n')
    	{
    		console.log("topic: " + divStack[topicIndex] + " section: " + divStack[sectionIndex] + " subsection: " + divStack[subSectionIndex]);
    		console.log(tmp + '\n');
    	}
    	
    	tmp = '<pre>' + '\n';
    }
        parser.write(line);
  }
  
}

parser.end();