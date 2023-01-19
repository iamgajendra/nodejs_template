
'use strict';
const {Storage} = require('@google-cloud/storage');
const fs = require('fs')
const key = require('../config/key/orgconnect-151511e9ed45.json')

const gcs = new Storage({
  projectId: 'orgconnect',
  keyFilename: '/app/config/key/orgconnect-151511e9ed45.json'
});

const bucketName = 'bucket-name-for-upload'
const bucket = gcs.bucket(bucketName);

function getPublicUrl(filename) {
    // const file = bucket.file(filename);
    // return file.publicUrl();
  return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
}

let ImgUpload = {};

ImgUpload.uploadToGcs = (req, res, next) => {
    console.log(process.cwd())
  if(!req.file) return next();

  // Can optionally add a path to the gcsname below by concatenating it before the filename
  const gcsname = req.file.originalname;
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
    next();
  });

  stream.end(req.file.buffer);
}

module.exports = ImgUpload;