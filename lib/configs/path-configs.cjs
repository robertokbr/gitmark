const path = require('path');

module.exports = {
  db: path.resolve(
    __dirname,
    '..',
    '..',
    'db.sqlite'
  ),
  notes: path.resolve(
    __dirname,
    '..',
    '..',
    'note.txt'
  ),
}