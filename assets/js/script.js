$(document).ready(function() {  

	//keyup funtion for input field
    $(".keywords-title").keyup(function(){
	  //get input value and pass to setKeywords function
      var title = $(".keywords-title").val();
	  
	  var keywords_list = setKeywords(title);
	  
      $("#keywords-table-data").html(formatKeywords(keywords_list));
	  
	  //hide default div
	  $("default-data").hide();
	  
    });

	//function to set the keywords
    function setKeywords(title){
		//set keywords variable to empty and set minimum word length
		var keywords = "";
		var min_lenght = 4;
		
        var split = title.split(" ");
        for(var i = 0; i < split.length; i++) {
			//remove possible dot
        	var text = split[i].replace(/\./g,'');
			
			//check if word meets criteria
            if(meetsCriteria(text, keywords, min_lenght)){
			  //add to keywords string separated by comma
              keywords += text+",";
            } 
        }
                
		//remove possible consecutive commas
		keywords = keywords.replace(/^,|,$|(,)+/g, '$1');
		
        //remove last appended comma
        keywords = keywords.replace(/,\s*$/, "");
		
        return keywords;
    }
	
	
	//function to check if text meets criteria
	function meetsCriteria(text, current_keywords, min_lenght){
		//words to exclude
        var exclude_array = ['a','about','all','also','and','as','at','be','because','but','by','can','come','could','day','do','even','find','first','for','from','get','give','go','have','he','her','here','him','his','how','I','if','in','into','it','its','just','know','like','look','make','man','many','me','more','my','new','no','not','now','of','on','one','only','or','other','our','out','people','say','see','she','so','some','take','tell','than','that','the','their','them','then','there','these','they','thing','think','this','those','time','to','two','up','use','very','want','way','we','well','what','when','which','who','will','with','would','year','you','your','has','was','why'];
        
		//check if word meets lenght, not number, not a duplicate, and not in exclude array
		if(text.length >= min_lenght && !$.isNumeric(text) && (current_keywords.indexOf(text) < 0) && (jQuery.inArray(text.toLowerCase(), exclude_array) < 0)) {
		  return true;
		} 
		return false;
	}
	
	//format keywords csv string to table data
	function formatKeywords(keywords){
		var str_array = keywords.split(',');
		var return_data = "";
		var loop_count = 1;

		for(var i = 0; i < str_array.length; i++) {
		   // trim the excess whitespace.
		   str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
		   
		   // format as table data with copy
		   return_data += "<tr><td>Keyword</td><td id='keyword-"+loop_count+"' value='"+str_array[i]+"'>"+str_array[i]+"</td><td><a href='#' class='copy-btn' data-clipboard-target='#keyword-"+loop_count+"'><i class='fas fa-copy text-danger'></i></a></td></tr>";
		   //alert(str_array[i]);
		   loop_count++;
		}
		
		return return_data;
	}
});