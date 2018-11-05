
function makeEmbedUrl(url,id) {
	console.log("makeEmbedUrl!");
	
	
	

		var ststr = url.split("&t=")[1];
		var st = parseInt(ststr.charAt(0) * 60) + parseInt(ststr.substr(2, 3));
		
		var embedUrl = "http://www.youtube.com/embed/" + id + "?start=" + st;
		console.log("makeEmbedUrl: "+embedUrl);

return embedUrl	
}




module.exports = {
  makeEmbedUrl : makeEmbedUrl

  
  
}