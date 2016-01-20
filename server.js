var express = require('express');
var app = express();

// body-parser is used to add the body object to request objects (req.body)
// it contains POST data sent from clients
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
	extended: true
}));


// our "database"
var threads = [{id: 1, title: 'Titel', text: 'hello'}];

// this route matches GET requests for /threads
app.get('/threads', function (req, res) {
	res.json({ threads: threads });
});


app.get('/threads/:id', function (req, res) {
	var thread = threads[req.params.id];

	res.json(thread);
});


app.put('/threads/:id', function (req, res) {
	var id = req.params.id;
	var status = 'ERROR';

	if (typeof threads[id] !== 'undefined') {
		threads[id].title = req.body.title;
		threads[id].text = req.body.text;

		status = 'OK';
	}

	// there is no true right or wrong answer for how a response should look like
	// if it works for your needs it's probably fine. can always be changed later
	res.json({ status: status });
});


app.post('/threads', function (req, res) {
	threads.push({
		id: req.body.id,
		title: req.body.title,
		text: req.body.text
	});

	// insertId could be useful if you want to allow the client to find the newly created resource
	res.json({ status: 'CREATED', insertId: threads.length - 1 });
});


app.delete('/threads/:id', function (req, res) {
	delete threads[req.params.id];

	res.json({ status: 'OK', message: 'deleted successfully' });
});



var server = app.listen(3000, function () {
	console.log('Server started. Listening to connections on port 3000\n');
});