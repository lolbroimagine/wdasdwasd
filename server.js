const http = require('http');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields) => {
      if (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('An error occurred while saving your idea.');
        return;
      }

      const username = fields.username;
      const idea = fields.idea;

      if (username && idea) {
        const textToSave = `Username: ${username}\nIdea: ${idea}`;
        const filePath = path.join(__dirname, 'Ideas', `${username}.txt`);

        fs.writeFile(filePath, textToSave, (err) => {
          if (err) {
            console.error(err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('An error occurred while saving your idea.');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Idea submitted successfully!');
          }
        });
      } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Please enter a username and your idea.');
      }
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method not allowed.');
  }
});

server.listen(8080, () => {
  console.log('Server is running on port 8080');
});
