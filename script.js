/* instagramfeeder by Trakina 2016
 * https://github.com/Trakina/instagramfeeder
 * 
 * This is free and unencumbered software released into the public domain.
 * 
 * Anyone is free to copy, modify, publish, use, compile, sell, or
 * distribute this software, either in source code form or as a compiled
 * binary, for any purpose, commercial or non-commercial, and by any
 * means.
 * 
 * In jurisdictions that recognize copyright laws, the author or authors
 * of this software dedicate any and all copyright interest in the
 * software to the public domain. We make this dedication for the benefit
 * of the public at large and to the detriment of our heirs and
 * successors. We intend this dedication to be an overt act of
 * relinquishment in perpetuity of all present and future rights to this
 * software under copyright law.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 * 
 * For more information, please refer to <http://unlicense.org>
 */

var instagramUser = "leaverou"; // instagram user
var howManyPosts = 6; // 20 max
var idOfTheContainer = "instagramPosts"; // post container will have this id
var postContainerTag = "div"; // each post will be inside one of these elements
var postContainerClass = "col-xs-6 col-sm-4"; //  each post container will have this css class (OPTIONAL, leave empty if not needed)
var imageSize = "thumbnail"; // "low" (320x320), "standard"(640x640) or "thumbnail"(150x150, this one is already cropped by instagram itself)
var imageClass = "img-responsive" // img element will have this css class (OPTIONAL, leave empty if not needed)

function putposts(json){
    if(json.query.count){ 
	var data = json.query.results.json;
	$.each(data.items, function(i,v){
	    if(i < howManyPosts){
		switch(imageSize){
		    case "low":
			var image = v.images.low_resolution.url;
			break;
		    case "standard":
			var image = v.images.standard_resolution.url;
			break;
		    case "thumbnail":
			var image = v.images.thumbnail.url;
			break;
		}
		var postHtml = '<'+postContainerTag+' class="' + postContainerClass + '">' + 
		    '<a href="' + v.link + '" target="_blank"><img class="' + imageClass + '" src="' + image + '" /></a>' + 
		    '</' + postContainerTag + '>';
		$("#"+idOfTheContainer).append(postHtml);
	    }
	});
    }
}

function fetchinstagram(){
    var url = "https://www.instagram.com/" + instagramUser + "/media";
    var yql="select *  from json where url='" + url + "';";
    yql="http://query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent(yql) + "&format=json&callback=putposts";
    getinstagramjson(yql);
}

function getinstagramjson(url) {
    var script = document.createElement('script');
    script.setAttribute('src', url);
    script.setAttribute('type', 'text/javascript');
    document.getElementsByTagName('body')[0].appendChild(script);
}

$(document).ready(function(){
    fetchinstagram();
});