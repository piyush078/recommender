exports = module.exports = function() {
	return {
        name: 'session',
        secret: "whatyalisten",
        proxy: true,
        resave: true,
        httpOnly: true,
        duration: 30 * 60 * 1000,
        activeDuration: 5 * 60 * 1000,
        saveUninitialized: true
	};
}();