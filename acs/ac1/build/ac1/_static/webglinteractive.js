// webglinteractive.js - By: Dr. Wayne Brown, Fall 2017
// Description: functions and event handlers for the webglinteractive directive

"use strict";

//=========================================================================
/**
 * An object to handle webglinteractive directive functionality.
 * An instance of this object is created for each unique webglinteractive directive.
 * @param id - the runestone ID of the webglinteractive directive
 * @constructor
 */
window.WebglInteractive_directive = function (id) {

  let self = this;

  // textarea DOM objects that are the placeholders for the CodeMirror editor panes
  self.textareas = [];

  // CodeMirror objects for code editing
  self.file_names = [];
  self.code_mirrors = [];

  let download_scene_name = id + '_program';
  let link_counter = 0;

  //-----------------------------------------------------------------------
  // Set the height of the webgl_editors div so that it is the same height
  // as the HTML panel to its right.
  self.set_height_of_webgl_editors = function(id) {
    let tabs_height = $('#' + id + '_tab').height();

    // Make the editor windows the same height as the canvas area
    let right_pane = '#' + id + '_webgl_canvas';
    let right_pane_height = $(right_pane).height();

    $('#' + id + "_webgl_row2").height(right_pane_height + 10);

    let left_pane = '#' + id + '_webgl_editors';
    $(left_pane).height(right_pane_height);

    // The height of the editor window must subtract the height of the tabs
    let editor_height = right_pane_height - tabs_height;
    for (let j = 0; j< self.code_mirrors.length; j++) {
      self.code_mirrors[j].setSize("100%", editor_height);
      $(left_pane).find('.CodeMirror-scroll').css('max-height', "100em")
    }

    $(".CodeMirror").css("margin-bottom","0");
  };

  //-----------------------------------------------------------------------
  self.bring_first_editor_to_front = function (id) {
    let list_id, tab_list_children, links;
    list_id = '#' + id + '_tab';
    tab_list_children = $(list_id).children();
    if (tab_list_children.length > 0) {
      links = $(tab_list_children[0]).children();
      if (links.length > 0) {
        $(links[0]).trigger("click");
      }
    }
  };

  //-----------------------------------------------------------------------
  // Load a data file. After it is loaded, the data is passed to the
  // appropriate codemirror HTML element.
  self.createCodeMirrorEditor = function (id, file_name, file_extension, read_only) {
    let search_id = "#" + id + "_textarea";
    let my_text_area = $(search_id);
    if (my_text_area) {
      let data = $(search_id).val();

      let editor_options = {
        lineNumbers: true,
        lineWrapping: false
      };

      if (file_extension === 'js') {
        editor_options['mode'] = "javascript";
      } else if (file_extension === 'html' || file_extension === 'htm') {
        editor_options['mode'] = 'htmlmixed';
      } else if (file_extension === 'css') {
        editor_options['mode'] = 'css';
      } else if (file_extension === 'obj' || file_extension === 'mtl') {
        editor_options['mode'] = '';
      } else {
        editor_options['mode'] = "javascript";
      }

      if (arguments.length >= 3 && read_only) {
        editor_options['readOnly'] = true;
      }

      let myCodeMirror = CodeMirror.fromTextArea(my_text_area[0], editor_options);
      myCodeMirror.setValue(data);

      self.file_names.push(file_name);
      self.code_mirrors.push(myCodeMirror);

      let line_options = { readOnly: true, className: "webgl_editor_highlight" };

      // Limit the lines in a HTML file that can be edited
      if (read_only) {
        let doc = myCodeMirror.getDoc();
        let arrayOfLines = data.split("\n");
        let last_line = arrayOfLines.length-1;
        doc.markText({line: 0, ch: 0}, {line: last_line, ch: arrayOfLines[last_line].length}, line_options);

      } else if (file_extension === 'html' || file_extension === 'htm') {
        // Only allow editing of the HTML body code that contains page layout
        // Separate the html code into lines.
        data = data.replace(/\r\n/g, "\n");
        let arrayOfLines = data.split("\n");
        let bodyStartLine, lastOfBodyLine;
        for (let j = 0; j < arrayOfLines.length; j++) {
          if (arrayOfLines[j].indexOf("<body") >= 0) {
            bodyStartLine = j;
          }
          if (arrayOfLines[j].indexOf("<!-- Load the JavaScript libraries") >= 0) {
            lastOfBodyLine = j;
          }
        }
        // Get the document of the CodeMirror object
        let doc = myCodeMirror.getDoc();

        let data_beginning = {line: 0, ch: 0};
        let data_body_start = {line: bodyStartLine, ch: arrayOfLines[bodyStartLine].length};

        let data_body_end = {line: lastOfBodyLine, ch: 0};
        let data_end = {line: arrayOfLines.length-1, ch: arrayOfLines[arrayOfLines.length-1].length};

        // Mark the lines that are readonly
        let m = doc.markText(data_beginning, data_body_start, line_options);
        let m2 = doc.markText(data_body_end, data_end, line_options);

      } else if (file_extension === 'obj') {
        // Don't allow editing of references to MTL files
        data = data.replace(/\r\n/g, "\n");
        let arrayOfLines = data.split("\n");
        let doc = myCodeMirror.getDoc();
        for (let j = 0; j < arrayOfLines.length; j++) {
          if (arrayOfLines[j].indexOf("mtllib") >= 0) {
            doc.markText({line: j, ch: 0}, {line: j, ch: arrayOfLines[j].length}, line_options);
          }
        }
      } else if (file_extension === 'mtl') {
        // Don't allow editing of texture map image references
        data = data.replace(/\r\n/g, "\n");
        let arrayOfLines = data.split("\n");
        let doc = myCodeMirror.getDoc();
        for (let j = 0; j < arrayOfLines.length; j++) {
          if (arrayOfLines[j].indexOf("map_Kd") >= 0) {
            doc.markText({line: j, ch: 0}, {line: j, ch: arrayOfLines[j].length}, line_options);
          }
        }
      }

    }
  };

  //-----------------------------------------------------------------------
  self.show_webgl = function (id, whichSection) {
    let myCheckboxId = '#' + id;
    let words = id.split('_');
    let myCodeId = '#' + words[0] + '_webgl_editors';
    let myCanvasId = '#' + words[0] + '_webgl_canvas';
    let myOutputId = '#' + words[0] + '_webgl_output';
    let myCodeCheckBox = '#' + words[0] + '_show_code';
    let myCanvasCheckBox = '#' + words[0] + '_show_canvas';

    if ($(myCheckboxId).prop('checked')) {
      // Checkbox was just checked - so show
      switch (whichSection) {
        case 1: // show code
          $(myCodeId).show();
          if ($(myCanvasId).is(':visible')) {
            $(myCodeId).css('width','50%');
            $(myCanvasId).css("width","50%");
          } else {
            $(myCodeId).css("width","100%");
          }
          break;
        case 2: // show canvas
          $(myCanvasId).show();
          if ($(myCodeId).is(':visible')) {
            $(myCodeId).css("width","50%");
            $(myCanvasId).css("width","50%");
          } else {
            $(myCanvasId).css("width","100%");
          }
          break;
        case 3: // show text output
          $(myOutputId).show();
          break;
      }
    } else {
      // Checkbox was unchecked - so hide
      switch (whichSection) {
        case 1: // hide code
          $(myCodeId).hide();
          $(myCanvasId).css("width","100%");
          $(myCanvasCheckBox).prop('checked', 'checked');
          $(myCanvasId).show();
          break;
        case 2: // hide canvas
          $(myCanvasId).hide();
          $(myCodeId).css("width","100%");
          $(myCodeCheckBox).prop('checked','checked');
          $(myCodeId).show();
          break;
        case 3:
          $(myOutputId).hide();
          break;
      }
    }
  };

  //-----------------------------------------------------------------------
  function _updateHTML(file_name, code_mirror) {
    let text, start_pos, end_pos, str_length;

    // Get the text from the codemirror editor
    text = code_mirror.getValue();

    //   # Extract only the body of the HTML code
    start_pos = text.indexOf('<body');
    start_pos = text.indexOf('>', start_pos) + 1;
    end_pos = text.indexOf("</body>", start_pos);
    str_length = end_pos - start_pos;
    if (start_pos >= 6 && str_length > 0) {
      text = text.substr(start_pos,str_length);

      // Don't reload any scripts, so remove them from the text
      // Remove single line <scripts> first
      let regexp = /<script.*script>\n/gi;
      let matches_array = text.match(regexp);
      for (let j = 0; j< matches_array.length; j += 1) {
        text = text.replace(matches_array[j], "");
      }

      // Remove multiple line <scripts> now
      regexp = /<script(.|\n)*script>\n/gi;
      matches_array = text.match(regexp);
      for (let j = 0; j< matches_array.length; j += 1) {
        text = text.replace(matches_array[j], "");
      }

      // Put the text into the web page
      $("#" + id + "_webgl_canvas").html(text);
    }
  }

  //-----------------------------------------------------------------------
  function _updateOBJ(download, file_name, code_mirror) {
    let text;

    // Get the text from the codemirror editor
    text = code_mirror.getValue();

    // Update the model data definitions
    let name = download.parseFilename(file_name).filename;
    download.model_data_dictionary[name] = text;
  }

  //-----------------------------------------------------------------------
  function _updatePLY(download, file_name, code_mirror) {
    let text;

    // Get the text from the codemirror editor
    text = code_mirror.getValue();

    // Update the model data definitions
    let name = download.parseFilename(file_name).filename;
    download.model_data_dictionary[name] = text;
  }

  //-----------------------------------------------------------------------
  function _updateMTL(download, file_name, code_mirror) {
    let text;

    // Get the text from the codemirror editor
    text = code_mirror.getValue();

    // Update the material data definition
    let name = download.parseFilename(file_name).filename;
    download.materials_data_dictionary[name] = text;

    // Update the material objects based on the changed MTL file data.
    CreateObjModelMaterials(text, download.materials_dictionary[name]);
  }

  //-----------------------------------------------------------------------
  function _updateShader(download, file_name, file_extension, code_mirror) {
    let text;

    // Get the text from the codemirror editor
    text = code_mirror.getValue();

    // Update the shader data definitions
    switch (file_extension) {
      case 'vert':
        download.vshaders[file_name] = text;
        break;
      case 'frag':
        download.fshaders[file_name] = text;
        break;
    }
  }

  //-----------------------------------------------------------------------
  function _updateJavaScript(download, filename, code_mirror) {
    let text;

    // Get the text from the codemirror editor
    text = code_mirror.getValue();

    // Evaluate the text in the global context. This will replace any
    // existing code with matching names.
    try {
      return eval("try { " + text + "} catch(e) { console.log('test', e) }");
    } catch (error) {
      download.out.displayError('Error reloading ' + filename + '.js');
      download.out.displayError('Error: "' + error.name + '" ' + error.message);
      return false;
    }
  }

  //-----------------------------------------------------------------------
  function _display_error(download, error) {
    download.out.displayError("Error: " + error.name + " " + error.message);
  }

  //-----------------------------------------------------------------------
  self.restart = function () {
    // Get the SceneDownload object for this scene
    let download, filename_parts;

    download = window[download_scene_name];

    if (download) {
      // Clear all of the messages in the output window
      download.out.clearMessages();

      // Delete all shaders and vob's for all models for the scene
      try {
        download.scene.delete();
      } catch(error) { _display_error(download, error); }

      // Get data from the editor buffers and put the new definitions
      // in appropriate places.
      let file_extension, file_name;
      for (let j=0; j < self.code_mirrors.length; j += 1) {
        filename_parts = download.parseFilename(self.file_names[j]);
        file_name = filename_parts.filename;
        file_extension = filename_parts.extension;

        switch (file_extension) {
          case "html":
            _updateHTML(file_name, self.code_mirrors[j]);
            download.out.displayInfo("Updated definition of html code '" + file_name + "'");
            break;
          case "js":
            if (_updateJavaScript(download, file_name, self.code_mirrors[j])) {
              download.out.displayInfo("Updated definition of javascript code '" + file_name + "'");
            }
            break;
          case "obj":
            _updateOBJ(download, file_name, self.code_mirrors[j]);
            download.out.displayInfo("Updated definition of model '" + file_name + "." + file_extension + "'");
            break;
          case "ply":
            _updatePLY(download, file_name, self.code_mirrors[j]);
            download.out.displayInfo("Updated definition of model '" + file_name + "." + file_extension + "'");
            break;
          case "mtl":
            _updateMTL(download, file_name, self.code_mirrors[j]);
            download.out.displayInfo("Updated definition of model material '" + file_name + "." + file_extension + "'");
            break;
          case "vert":
          case "frag":
            _updateShader(download, file_name, file_extension, self.code_mirrors[j]);
            download.out.displayInfo("Updated definition of shader '" + file_name + "." + file_extension + "'");
            break;
          default:
            download.out.displayError("Unrecognized file type for '" + file_name + "." + file_extension + "'" );
        }
      }
    }

    try {
      // Restart the WebGL program with its new data.
      download.initializeRendering();
    } catch(error) { _display_error(download, error); }
  };

  //-----------------------------------------------------------------------
  /* function _escapeData(str) {
    return str
      .replace(/\n/g, '%0A')
      .replace(/ /g, '%20')
      .replace(/,/g, '%2C')
      .replace(/'/g, '%27')
      .replace(/"/g, '%22');
  } */

  //-----------------------------------------------------------------------
  /**
   * Download one file to the clients download folder.
   * @param url The URL to the file to download
   */
  self.downloadOneFile = function ( url ) {

    // Create a unique id for the link that will hold the data
    link_counter += 1;
    let link_id = 'id_' + link_counter.toString();

    // Create a link to the file. The download will make it save the
    // file to the client's disk.
    let link = '<a id="' + link_id + '" href="' + url + '" download><span>temp</span></a>';

    // Add the link element to the DOM body
    $(link).appendTo('body');

    // Make the link execute
    $("#" + link_id + " span").trigger('click');

    // Remove the link. It's only purpose was to set up the download
    $("#" + link_id).delay(5000).remove();
  };

  //-----------------------------------------------------------------------
  self.saveEditorData = function (data, fileName) {
    let my_blob = new Blob([data], {type: "text/plain" } );
    saveAs( my_blob, fileName );
  };

  //-----------------------------------------------------------------------
  /**
   * Given a URL that is a relative reference, convert it to an absolute reference.
   * @param url
   * @returns String that contains an absolute URL to the resource.
   * @private
   */
  function _qualifyURL(url) {
    let el= document.createElement('div');
    el.innerHTML= '<a href="' + url + '">x</a>';
    return el.firstChild.href;
  }

  //-----------------------------------------------------------------------
  function _get_download_file_names() {
    let all_filenames = [], file_url;

    // Get the name of the HTML file that is stored in a hidden <span>
    // under the id + "_webgl_canvas" <div>
    let canvas_div = $("#" + id + "_webgl_canvas");
    let html_filename = canvas_div.children()[0].textContent;
    all_filenames.push(html_filename);

    // Get the src file names of all the <script> tags
    let all_scripts = $("#" + id + "_webgl_canvas > script");
    for (let j = 0; j< all_scripts.length; j += 1) {
      file_url = all_scripts[j].src;
      if (file_url.length > 0) {
        all_filenames.push(file_url);
      }
    }

    return all_filenames;
  }

  //-----------------------------------------------------------------------
  self.downloadAllFiles = function () {
    let all_filenames = _get_download_file_names();

    for (let j=0; j<all_filenames.length; j++) {
      self.downloadOneFile(all_filenames[j]);
    }
  };

  //-----------------------------------------------------------------------
  self.downloadEditedFiles = function () {
    for (let j=0; j < self.file_names.length; j += 1) {
      self.saveEditorData( self.code_mirrors[j].getValue(), self.file_names[j]);
    }
  };

}; // end WebglInteractive_directive
