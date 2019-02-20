# lottie-format-converter
lottie script to convert json files to the new lottie format

#how to use
```js
var fs = require('fs');
var json_converter = require('./src/index.js');

fs.readFile("./data.json",  "utf8",  function(error, data){
	json_converter(data).then(function(data){
		fs.writeFile("./export.json", JSON.stringify(data), function(err) {
		    if(err) {
		        return console.log(err);
		    }

		    console.log("The file was saved!");
		});
	})
	.catch((err)=> {
		console.log('errror', err)
	})
	
})
```

#traverse directory
```js
var fs = require('fs');
var json_converter = require('./src/index.js');

function loadJsonFile(path, fileName) {
	fs.readFile(path + fileName,  "utf8",  function(error, data){
		json_converter(data).then(function(data){
			var exportFileName = path.split('/').join('_') + fileName;
			fs.writeFile("./exports/"+exportFileName, JSON.stringify(data), function(err) {
			    if(err) {
			        return console.log(err);
			    }

			    console.log("The file was saved!");
			});
		})
		.catch((err)=> {
			console.log(path + fileName, err)
		})
		
	})
}

function iterateFolder(path) {
	fs.readdir(path, function(err, items) {
	 	items.forEach((item)=> {
	 		var stats = fs.statSync(path + item);
	 		if(stats.isDirectory()) {
	 			iterateFolder(path + item + '/')
	 		} else {
	 			if(item.indexOf('.json') !== -1) {
	 				loadJsonFile(path, item);
	 			}
	 		}
	 	})
	});
}

iterateFolder('jsons/');
```
