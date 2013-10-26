var fs = require('fs');
var obj = fs.readFileSync('models/cluj.obj', 'utf8');

var object_line = /^o ([0-9]+)/;
var mtl_line = /^usemtl/;
var texture_line = /^vt/;
var vertex_line = /^v /;
var face_line = /^f /;
var smoothing_line = /^s /;

var str = '', file, global_vertex_idx = 0;
obj.split(/\r?\n/).forEach(function(line) {

	if (line.match(object_line)) {
		var ret = object_line.exec(line);
		if (str) {
			fs.writeFileSync(file, str, 'utf8');
		}
		file = 'models/individual/' + ret[1] + '.obj';
		str = '';
		local_vertex_idx = 0;
	} else if (line.match(texture_line)) {
		return;
	} else if (line.match(face_line)) {
		var pairs = line.substring(2).split(' ');
		var local_line = 'f ' + pairs.map(function(pair) {
			var idx = pair.split('/')[0];
			return idx - global_vertex_idx + local_vertex_idx;
		}).join(' ');
		str += local_line + '\n';
	} else if (line.match(vertex_line)) {
		global_vertex_idx++;
		local_vertex_idx++;
		str += line + '\n';
	} else if (line.match(smoothing_line)) {
		str += line + '\n';
	} else if (line.match(mtl_line)) {
		return;
	}
});