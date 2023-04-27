/**
 * Helper for implementing retries with backoff. Initial retry
 * delay is 1 second, increasing by 2x (+jitter) for subsequent retries
 *
 * @constructor
 */
// eslint-disable-next-line func-names
const RetryHandler = function () {
  this.interval = 1000; // Start at one second
  this.maxInterval = 60 * 1000; // Don't wait longer than a minute
};

/**
 * Invoke the function after waiting
 *
 * @param {function} fn Function to invoke
 */
// eslint-disable-next-line func-names
RetryHandler.prototype.retry = function (fn) {
  setTimeout(fn, this.interval);
  this.interval = this.nextInterval();
};

/**
 * Reset the counter (e.g. after successful request.)
 */
// eslint-disable-next-line func-names
RetryHandler.prototype.reset = function () {
  this.interval = 1000;
};

/**
 * Calculate the next wait time.
 * @return {number} Next wait interval, in milliseconds
 *
 * @private
 */
// eslint-disable-next-line func-names
RetryHandler.prototype.nextInterval = function () {
  const interval = this.interval * 2 + this.getRandomInt(0, 1000);
  return Math.min(interval, this.maxInterval);
};

/**
 * Get a random int in the range of min to max. Used to add jitter to wait times.
 *
 * @param {number} min Lower bounds
 * @param {number} max Upper bounds
 * @private
 */
// eslint-disable-next-line func-names
RetryHandler.prototype.getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
/**
 * Helper class for resumable uploads using XHR/CORS. Can upload any Blob-like item, whether
 * files or in-memory constructs.
 *
 * @example
 * var content = new Blob(["Hello world"], {"type": "text/plain"});
 * var uploader = new MediaUploader({
 *   file: content,
 *   token: accessToken,
 *   onComplete: function(data) { ... }
 *   onError: function(data) { ... }
 * });
 * uploader.upload();
 *
 * @constructor
 * @param {object} options Hash of options
 * @param {string} options.token Access token
 * @param {blob} options.file Blob-like item to upload
 * @param {string} [options.fileId] ID of file if replacing
 * @param {object} [options.params] Additional query parameters
 * @param {string} [options.contentType] Content-type, if overriding the type of the blob.
 * @param {object} [options.metadata] File metadata
 * @param {function} [options.onComplete] Callback for when upload is complete
 * @param {function} [options.onProgress] Callback for status for the in-progress upload
 * @param {function} [options.onError] Callback if upload fails
 */
// eslint-disable-next-line func-names
const MediaUploader = function (options) {
  // eslint-disable-next-line func-names
  const noop = function () { };
  this.file = options.file;
  this.contentType = options.contentType || 'text/csv' || 'application/octet-stream';
  this.metadata = options.metadata || {
    title: options.filename,
    mimeType: this.contentType,
  };
  this.token = options.token;
  this.onComplete = options.onComplete || noop;
  this.onProgress = options.onProgress || noop;
  this.onError = options.onError || noop;
  this.offset = options.offset || 0;
  this.chunkSize = options.chunkSize || 0;
  this.retryHandler = new RetryHandler();

  this.url = options.url;
  if (!this.url) {
    const params = options.params || {};
    params.uploadType = 'resumable';
    this.url = this.buildUrl(options.fileId, params, options.baseUrl);
  }
  this.httpMethod = options.fileId ? 'PATCH' : 'POST';
};

/**
 * Initiate the upload.
 */
// eslint-disable-next-line func-names
MediaUploader.prototype.upload = function () {
  // const self = this;
  const xhr = new XMLHttpRequest();

  xhr.open(this.httpMethod, this.url, true);
  xhr.setRequestHeader('Authorization', `Bearer ${this.token}`);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('X-Upload-Content-Length', this.file.size);
  xhr.setRequestHeader('X-Upload-Content-Type', this.contentType);
  // eslint-disable-next-line func-names
  xhr.onload = function (e) {
    if (e.target.status < 400) {
      const location = e.target.getResponseHeader('Location');
      this.url = location;
      this.sendFile();
    } else {
      this.onUploadError(e);
    }
  }.bind(this);
  xhr.onerror = this.onUploadError.bind(this);
  xhr.send(JSON.stringify(this.metadata));
};

/**
 * Send the actual file content.
 *
 * @private
 */
// eslint-disable-next-line func-names
MediaUploader.prototype.sendFile = function () {
  let content = this.file;
  let end = this.file.size;

  if (this.offset || this.chunkSize) {
    // Only bother to slice the file if we're either resuming or uploading in chunks
    if (this.chunkSize) {
      end = Math.min(this.offset + this.chunkSize, this.file.size);
    }
    content = content.slice(this.offset, end);
  }

  const xhr = new XMLHttpRequest();
  xhr.open('PUT', this.url, true);
  xhr.setRequestHeader('Content-Type', 'text/csv');
  xhr.setRequestHeader('Content-Range', 'bytes 0-*/*');
  xhr.setRequestHeader('X-Upload-Content-Type', 'csv');
  if (xhr.upload) {
    xhr.upload.addEventListener('progress', this.onProgress);
  }
  xhr.onload = this.onContentUploadSuccess.bind(this);
  xhr.onerror = this.onContentUploadError.bind(this);
  xhr.send(content);
};

/**
 * Query for the state of the file for resumption.
 *
 * @private
 */
// eslint-disable-next-line func-names
MediaUploader.prototype.resume = function () {
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', this.url, true);
  xhr.setRequestHeader('Content-Range', `bytes */ ${this.file.size}`);
  xhr.setRequestHeader('X-Upload-Content-Type', this.file.type);
  if (xhr.upload) {
    xhr.upload.addEventListener('progress', this.onProgress);
  }
  xhr.onload = this.onContentUploadSuccess.bind(this);
  xhr.onerror = this.onContentUploadError.bind(this);
  xhr.send();
};

/**
 * Extract the last saved range if available in the request.
 *
 * @param {XMLHttpRequest} xhr Request object
 */
// eslint-disable-next-line func-names
MediaUploader.prototype.extractRange = function (xhr) {
  const range = xhr.getResponseHeader('Range');
  if (range) {
    this.offset = parseInt(range.match(/\d+/g).pop(), 10) + 1;
  }
};

/**
 * Handle successful responses for uploads. Depending on the context,
 * may continue with uploading the next chunk of the file or, if complete,
 * invokes the caller's callback.
 *
 * @private
 * @param {object} e XHR event
 */
// eslint-disable-next-line func-names
MediaUploader.prototype.onContentUploadSuccess = function (e) {
  if (e.target.status === 200 || e.target.status === 201) {
    this.onComplete(e.target.response);
  } else if (e.target.status === 308) {
    this.extractRange(e.target);
    this.retryHandler.reset();
    this.sendFile();
  } else {
    this.onContentUploadError(e);
  }
};

/**
 * Handles errors for uploads. Either retries or aborts depending
 * on the error.
 *
 * @private
 * @param {object} e XHR event
 */
// eslint-disable-next-line func-names
MediaUploader.prototype.onContentUploadError = function (e) {
  if (e.target.status && e.target.status < 500) {
    this.onError(e.target.response);
  } else {
    this.retryHandler.retry(this.resume.bind(this));
  }
};

/**
 * Handles errors for the initial request.
 *
 * @private
 * @param {object} e XHR event
 */
// eslint-disable-next-line func-names
MediaUploader.prototype.onUploadError = function (e) {
  this.onError(e.target.response); // TODO - Retries for initial upload
};

/**
 * Construct a query string from a hash/object
 *
 * @private
 * @param {object} [params] Key/value pairs for query string
 * @return {string} query string
 */
// eslint-disable-next-line func-names
MediaUploader.prototype.buildQuery = function (params) {
  const newParams = params || {};
  const tt = Object.keys(newParams).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(newParams[key])}`).join('&');
  return tt;
};

/**
 * Build the drive upload URL
 *
 * @private
 * @param {string} [id] File ID if replacing
 * @param {object} [params] Query parameters
 * @return {string} URL
 */
// eslint-disable-next-line func-names
MediaUploader.prototype.buildUrl = function (id, params, baseUrl) {
  let url = baseUrl || 'https://www.googleapis.com/upload/drive/v2/files/';
  if (id) {
    url += id;
  }
  const query = this.buildQuery(params);
  if (query) {
    url += `?${query}`;
  }
  return url;
};

export default MediaUploader;
