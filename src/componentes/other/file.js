import React from 'react'
import ReactDOM from 'react-dom'
import Files from 'react-files'
 
var FilesDemo = React.createClass({
  onFilesChange: function (files) {
    console.log(files)
  },
 
  onFilesError: function (error, file) {
    console.log('error code ' + error.code + ': ' + error.message)
  },
 
  render: function() {
    return (
      <div className="files">
        <Files
          className='files-dropzone'
          onChange={this.onFilesChange}
          onError={this.onFilesError}
          accepts={['image/png', '.pdf', 'audio/*']}
          multiple
          maxFiles={3}
          maxFileSize={10000000}
          minFileSize={0}
          clickable
        >
          Drop files here or click to upload
        </Files>
      </div>
    )
  }
})
 
ReactDOM.render(<FilesDemo />, document.getElementById('container'))