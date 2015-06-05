Router.configure({
	layoutTemplate: 'layout'
});
Router.route('/', function(){
	this.render('home', {to: "body"});
});

Router.route('/gameroom', function(){
	this.render('bomberman', {to: "body"});
});
Router.route('/lobby', function(){
	this.render('lobby', {to: "body"});
});