module.exports = function(grunt) {
	grunt.initConfig({
		compress: {
			gzip: {
				options: {
					mode: 'gzip'
				},
				expand: true,
				cwd: 'obj/',
				src: ['*.obj'],
				dest: '.tmp/'
			}
		},

		clean: {
			gzip: '.tmp/' 
		},

		copy: {
			gzip: {
				files: [{
					expand: true,
					cwd: '.tmp/',
					dest: 'gzip/',
					src: ['*.obj.gz'],
					ext: '.obj'
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('gzip', ['compress:gzip', 'copy:gzip', 'clean:gzip']);
};