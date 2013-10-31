module.exports = function(grunt) {
	grunt.initConfig({
		compress: {
			obj: {
				options: {
					mode: 'gzip'
				},
				expand: true,
				cwd: 'obj/',
				src: ['*.obj'],
				dest: 'dist/'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-compress');
};