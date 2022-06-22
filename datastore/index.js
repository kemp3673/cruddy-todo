const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId(function(err, uniqueData) {
    let id = uniqueData;
    fs.writeFile(exports.dataDir + '/' + id + '.txt', text, (err) => {
      callback(null, {id, text});
    });
  });
};

exports.readAll = (callback) => {
  var resultData = [];
  fs.readdir(exports.dataDir, (err, files) => {
    if (files.length === 0) {
      callback(null, []);
    } else {
      files.forEach(function(filename) {
        fs.readFile(exports.dataDir + '/' + filename, 'utf-8', function(err, data) {
          resultData.push({text: data});
        });
      });
    }
  });
  done(callback(null, resultData));
};


//promise.all
// Promise.prototype.finally()
// Promise.prototype.catch()
// var resultData = [];
// var filesList = [];
// fs.readdir(exports.dataDir, (err, files) => {
//   if (files.length === 0) {
//     callback(null, []);
//   } else {
//     files.forEach(function(filename) {
//       fs.readFile(exports.dataDir + '/' + filename, 'utf-8', function(err, data) {
//         filesList.push({file: filename, text: data});
//       });
//       console.log('List: ', filesList);
//     });
//   }
// });



// var resultData = [];
// console.log(fs.readdir(exports.dataDir));
// fs.promises(fs.readdir(exports.dataDir, files))
//   .then(
//     files.forEach(function(filename) {
//       fs.readFile(exports.dataDir + '/' + filename, 'utf-8', function(err, data) {
//         resultData.push({text: data});
//       });
//     })
//   );
//.thenfinally(callback(null, resultData));
// };

// fs.promises.readdir(targetDir)

//     // If promise resolved and
//     // datas are fetched
//     .then(filenames => {
//         for (let filename of filenames) {
//             console.log(filename)
//         }
//     })

//     // If promise is rejected
//     .catch(err => {
//         console.log(err)
//     })



// var resultData = [];
// fs.readdir(exports.dataDir, (err, files) => {
//   //console.log('1');
//   // if (files.length === 0) {
//   //   callback(null, []);
//   // } else {
//   files.forEach(function(filename) {
//     fs.readFile(exports.dataDir + '/' + filename, 'utf-8', function(err, data) {
//       resultData.push({text: data});
//     });
//   });
//   //console.log('4');
//   //console.log('array: ', resultData);
//   callback(null, resultData);



exports.readOne = (id, callback) => {
  fs.readFile(exports.dataDir + '/' + id + '.txt', 'utf-8', function(err, data) {
    if (err) {
      callback(new Error('Not There Yo'));
    } else {
      callback(null, { id, text: data });
    }
  });
};

exports.update = (id, text, callback) => {
  fs.readdir(exports.dataDir, (err, files) => {
    if (!files.includes(id + '.txt')) {
      callback(new Error('File No Exist'));
    } else {
      fs.writeFile(exports.dataDir + '/' + id + '.txt', text, (err) => {
        callback(null, { id, text });
      });
    }
  });
};

exports.delete = (id, callback) => {
  fs.unlink(exports.dataDir + '/' + id + '.txt', (err) => {
    if (err) {
      callback(new Error('Error while deleting file'));
    } else {
      callback('Deleted');
    }
  });
};





// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
