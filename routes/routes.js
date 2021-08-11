// Defining
const fs = require('fs');
const uniqid = require('uniqid');
const path = require('path');


module.exports = (app) => {
  // Get
  app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

  app.get('/api/notes', (req, res) => {
      res.json(database)
  })
  
  app.get('/api/notes:id', (req, res) => {
      const noteId = req.params.id;
      for (let i = 0; i < database.length; i++) {
          if (database[i].id === noteId) {
              res.json(database[i])
          }
      }
  })
  // Posting notes
  app.post('/api/notes', (req, res) => {

    const createNote = req.body;
  
    createNote.id = uniqid();

  
    fs.readFile(__dirname + '/../db/db.json', 'utf8', (error, data) => {
      error ? console.error(error) : console.log(data);
      let dataJson = JSON.parse(data);
    
      dataJson.push(createNote);
      
      fs.writeFile(__dirname + '/../db/db.json', JSON.stringify(dataJson), function (err) {
        if (err) throw err;
        console.log('Note Saved');
        res.send(dataJson);
      });
    })
  })
  // Deleting notes
  app.delete('/api/notes/:id', (req, res) => {
    const selector = req.params.id;


    fs.readFile(__dirname + '/../db/db.json', 'utf8', (error, data) => {
      error ? console.error(error) : console.log(data);
      let dataJson = JSON.parse(data);
      
      var newNote = dataJson.filter(x => {
        return x.id != selector;
      })
      
      fs.writeFile(__dirname + '/../db/db.json', JSON.stringify(newNote), function (err) {
        if (err) throw err;
        console.log('Note uppdated');
        res.send(newNote);
      });
    })
  })
}
// Html 
module.exports = (app) => {

  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
};