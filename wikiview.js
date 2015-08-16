var results;
var ViewModel = function() {
	var self = this;
//	var baseURL = 'https://en.wikipedia.org/w/api.php';
	self.wikiArticles = ko.observableArray();

	var WikiItem = function(wid,wtitle,wextract) {
		var self = this;
		self.wikhref = ko.observable('http://en.wikipedia.org?curid=' + wid);
		self.wiktitle = ko.observable(wtitle);
		self.wikextract = ko.observable(wextract);
		// self.wikthumb = ko.observable(wthumb);
	};

	var wikiFetch = $.ajax( {
		url: 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&format=json&exsentences=1&exlimit=max&exintro=&explaintext=&exsectionformat=plain&generator=search&gsrnamespace=0&callback=?&gsrsearch=herman+hesse',
		dataType: 'jsonp',
		type: 'POST',
		headers: { 'Api-User-Agent': 'FCC-alf808/1.0 (akademe@gmail.com)' },
		success: function (x) {
			results = x;
		}
	});

	$.when(wikiFetch).done(function() {
		var pagelist = Object.keys(results.query.pages);
		var res = pagelist.map(function(key) { return results.query.pages[key]; });
		res.sort(function(a,b) { return a.index - b.index; });
		res.forEach(function(item) {
			var wikiitem = new WikiItem(item.pageid,item.title,item.extract);
			self.wikiArticles.push(wikiitem);
		});
	});
};

ko.applyBindings(new ViewModel());
