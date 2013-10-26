var fs = require('fs');
var dir = 'models/individual/';

var files = fs.readdirSync(dir);

var chunk_size = 1000;

var vertex_line = /^v /;
var face_line = /^f /;
var smoothing_line = /^s /;

var chunks = {};

files.forEach(function(file, idx) {

	var local_vertex_idx = 0;
	var chunk_idx = Math.floor(idx/chunk_size);

	if (!chunks[chunk_idx]) chunks[chunk_idx] = {
		str: '',
		vertices: 0
	};

	chunks[chunk_idx].str += 'o ' + file.replace(/\.obj$/, '') + '\n';

	var lines = fs.readFileSync(dir + file, 'utf8').split(/\r?\n/);
	lines.forEach(function(line) {
		if (line.match(vertex_line)) {
			local_vertex_idx++;
			chunks[chunk_idx].vertices++;
			chunks[chunk_idx].str += line + '\n';
		} else if (line.match(face_line)) {
			var fline = 'f ' + line.substring(2).split(' ').map(function(pair) {
				return parseInt(pair, 10) + chunks[chunk_idx].vertices - local_vertex_idx;
			}).join(' ');
			chunks[chunk_idx].str += fline + '\n';
		} else if (line.match(smoothing_line)) {
			chunks[chunk_idx].str += line + '\n';
		}
	});
});

for (var i in chunks) {
	fs.writeFileSync('models/merged/' + i + '.obj', chunks[i].str);
}