/* =====================================================================
==== Parsons Runestone Directive Javascript ============================
======== Renders a Parsons problem based on the HTML created by the
======== parsons.py script and the RST file.
==== CONTRIBUTORS ======================================================
======== Isaiah Mayerchak
======== Jeff Rick
======== Barbara Ericson
======== Cole Bowers
==== Adapted form the original JS Parsons by ===========================
======== Ville Karavirta
======== Petri Ihantola
======== Juha Helminen
======== Mike Hewner
===================================================================== */

/* =====================================================================
==== LineBasedGrader Object ============================================
======== Used for grading a Parsons problem.
==== PROPERTIES ========================================================
======== problem: the Parsons problem
===================================================================== */

// Initialize
var LineBasedGrader = function(problem) {
	this.problem = problem;
};

// Use a LIS (Longest Increasing Subsequence) algorithm to return the indexes
// that are not part of that subsequence.
LineBasedGrader.prototype.inverseLISIndices = function(arr) {
	// Get all subsequences
	var allSubsequences = [];
	for (var i = 0; i < arr.length; i++){
		var subsequenceForCurrent = [arr[i]],
			current = arr[i],
			lastElementAdded = -1;
		for (var j = i; j < arr.length; j++) {
			var subsequent = arr[j];
			if ((subsequent > current) && (lastElementAdded < subsequent)) {
				subsequenceForCurrent.push(subsequent);
				lastElementAdded = subsequent;
			}
		}
		allSubsequences.push(subsequenceForCurrent);
	}
	// Figure out the longest one
	var longestSubsequenceLength = -1;
	var longestSubsequence;
	for (var i in allSubsequences) {
		var subs = allSubsequences[i];
		if (subs.length > longestSubsequenceLength) {
			longestSubsequenceLength = subs.length;
	        longestSubsequence = subs;
	    }
	}
	// Create the inverse indexes
	var indexes = [];
	var lIndex = 0;
	for (var i = 0; i < arr.length; i++) {
		if (lIndex > longestSubsequence.length) {
			indexes.push(i);
		} else {
			if (arr[i] == longestSubsequence[lIndex]) {
				lIndex += 1;
			} else {
				indexes.push(i);
			}
		}
	}
	return indexes;
};

// grade that element, returning the state
LineBasedGrader.prototype.grade = function() {
	var problem = this.problem;
	problem.clearFeedback();
	var correct = false;
	var answerArea = $(problem.answerArea);
	var feedbackArea = $(problem.messageDiv);
	var solutionLines = problem.solution;
	var answerLines = problem.answerLines();
	var i;
	var state;

	if (answerLines.length < solutionLines.length) {
		state = "incorrectTooShort";
		// too little code
		answerArea.addClass("incorrect");
		feedbackArea.fadeIn(500);
		feedbackArea.attr("class", "alert alert-danger");
		feedbackArea.html("Your program is too short.  Add more blocks.");
	} else {
		// Determine whether the code is in the correct order
		var isCorrectOrder = false;
		if (answerLines.length == solutionLines.length) {
			isCorrectOrder = true;
			for (i = 0; i < solutionLines.length; i++) {
				if (answerLines[i].text !== solutionLines[i].text) {
					isCorrectOrder = false;
				}
			}
		}
		if (isCorrectOrder) {
			// Determine whether it is the correct indention
			var indentLeft = [];
			var indentRight = [];
			for (i = 0; i < solutionLines.length; i++) {
				if (answerLines[i].viewIndent() < solutionLines[i].indent) {
					indentRight.push(answerLines[i]);
				} else if (answerLines[i].viewIndent() > solutionLines[i].indent) {
					indentLeft.push(answerLines[i]);
				}
			}
			if (indentLeft.length + indentRight.length == 0) {
				// Perfect
				state = "correct";
				answerArea.addClass("correct");
				feedbackArea.fadeIn(100);
				feedbackArea.attr("class", "alert alert-info");
				if (problem.checkCount > 1)
				{
				   feedbackArea.html("Perfect!  It took you " + problem.checkCount + " tries to solve this.  Click Reset to try to solve it in one attempt.");
			    }
			    else
			    {
			       feedbackArea.html("Perfect!  It took you only one try to solve this.  Great job!");
			    }
				correct = true;
			} else {
				// Incorrect Indention
				state = "incorrectIndent";
				var incorrectBlocks = [];
				for (i = 0; i < indentLeft.length; i++) {
					block = indentLeft[i].block();
					if (incorrectBlocks.indexOf(block) == -1) {
						incorrectBlocks.push(block);
						$(block.view).addClass("indentLeft");
					}
				}
				for (i = 0; i < indentRight.length; i++) {
					block = indentRight[i].block();
					if (incorrectBlocks.indexOf(block) == -1) {
						incorrectBlocks.push(block);
						$(block.view).addClass("indentRight");
					}
				}
				feedbackArea.fadeIn(500);
				feedbackArea.attr("class", "alert alert-danger");
				if (incorrectBlocks.length == 1) {
					feedbackArea.html("This block is not indented correctly. Either indent it more by dragging it right or reduce the indention by dragging it left.");
				} else {
					feedbackArea.html("These blocks are not indented correctly. To indent a block more, drag it to the right. To reduce the indention, drag it to the left.");
				}
			}
		} else {
			// Incorrect: indicate which blocks to move
			state = "incorrectMoveBlocks";
			var answerBlocks = problem.answerBlocks();
			var inSolution = [];
			var inSolutionIndexes = [];
			var notInSolution = [];
			for (i = 0; i < answerBlocks.length; i++) {
				var block = answerBlocks[i];
				var index = solutionLines.indexOf(block.lines[0]);
				if (index == -1) {
					notInSolution.push(block);
				} else {
					inSolution.push(block);
					inSolutionIndexes.push(index);
				}
			}
			var lisIndexes = this.inverseLISIndices(inSolutionIndexes);
			for (i = 0; i < lisIndexes.length; i++) {
				notInSolution.push(inSolution[lisIndexes[i]]);
			}
			answerArea.addClass("incorrect");
			feedbackArea.fadeIn(500);
			feedbackArea.attr("class", "alert alert-danger");
			for (i = 0; i < notInSolution.length; i++) {
				$(notInSolution[i].view).addClass("incorrectPosition");
			}
			feedbackArea.html("Highlighted blocks in your program are wrong or are in the wrong order. This can be fixed by moving, removing, or replacing highlighted blocks.");
		}
	}
	return state;
};

/* =====================================================================
==== ParsonsLine Object ================================================
======== The model and view of a line of code.
======== Based on what is specified in the problem.
======== ParsonBlock objects have one or more of these.
==== PROPERTIES ========================================================
======== problem: the Parsons problem
======== index: the index of the line in the problem
======== text: the text of the code line
======== indent: the indent level
======== view: an element for viewing this object
======== distractor: whether it is a distractor
======== paired: whether it is a paired distractor
======== groupWithNext: whether it is grouped with the following line
======== width: the pixel width when rendered
============ in the initial grouping
===================================================================== */

// Initialize from codestring
var ParsonsLine = function(problem, codestring) {
	this.problem = problem;
	this.index = problem.lines.length;
	var trimmed = codestring.replace(/\s*$/, "");
	this.text = trimmed.replace(/^\s*/, "");
	this.indent = trimmed.length - this.text.length;
	// Create the View
	var view;
	if (problem.options.language == "natural") {
		view = document.createElement("p");
	} else {
		view = document.createElement("code");
		$(view).addClass(problem.options.prettifyLanguage);
	}
	view.id = problem.counterId + "-line-" + this.index;
	view.innerHTML += this.text;
	this.view = view;
	problem.lines.push(this);
};

// Initialize what width the line would naturally have (without indent)
ParsonsLine.prototype.initializeWidth = function() {
	this.width = $(this.view).outerWidth(true) - this.problem.options.pixelsPerIndent * this.indent;
};

// Answer the block that this line is currently in
ParsonsLine.prototype.block = function() {
	for (var i = 0; i < this.problem.blocks.length; i++) {
		var block = this.problem.blocks[i];
		for (var j = 0; j < block.lines.length; j++) {
			if (block.lines[j] === this) {
				return block;
			}
		}
	}
	return undefined;
};

// Answer the indent based on the view
ParsonsLine.prototype.viewIndent = function() {
	if (this.problem.noindent) {
		return this.indent;
	} else {
		var block = this.block();
		return this.indent - block.solutionIndent() + block.indent;
	}
};

/* =====================================================================
==== ParsonsBlock Object ===============================================
======== The model and view of a code block.
==== PROPERTIES ========================================================
======== problem: the Parsons problem
======== lines: an array of ParsonsLine in this block
======== indent: indent based on movement
======== view: an element for viewing this object
======== labels: [label, line] the labels numbering the block and the lines they go on
======== hammer: the controller based on hammer.js
===================================================================== */

// Initialize based on the problem and the lines
var ParsonsBlock = function(problem, lines) {
	this.problem = problem;
	this.lines = lines;
	this.indent = 0;
	this.labels = [];
	// Create view, adding view of lines and updating indent
	var view = document.createElement("div");
	view.id = problem.counterId + "-block-" + problem.blockIndex;
	problem.blockIndex += 1;
	$(view).addClass("block");
	var sharedIndent = lines[0].indent;
	for (var i = 1; i < lines.length; i++) {
		sharedIndent = Math.min(sharedIndent, lines[i].indent);
	}
	var lineDiv = document.createElement("div");
	$(lineDiv).addClass("lines");
	$(view).append(lineDiv);

	for (i = 0; i < lines.length; i++) {
		var line = lines[i];
		var lineIndent;
		if (problem.noindent) {
			lineIndent = line.indent;
		} else {
			lineIndent = line.indent - sharedIndent;
		}
		$(line.view).removeClass("indent1 indent2 indent3 indent4");
		if (lineIndent > 0) {
			$(line.view).addClass("indent" + lineIndent);
		}
		lineDiv.appendChild(line.view);
	}
	var labelDiv = document.createElement("div");
	$(labelDiv).addClass("labels");
	if(this.problem.options.numbered == "left") {
		$(lineDiv).addClass("border_left");
		$(view).prepend(labelDiv);
		$(view).css({
			"justify-content": "flex-start"
		});
	} else if(this.problem.options.numbered == "right") {
		$(labelDiv).addClass("border_left");
		$(labelDiv).css({
			"float" : "right"
		});
		$(view).css({
			"justify-content": "space-between"
		});
		$(view).append(labelDiv);
	}
	this.view = view;
};

// Add a line (from another block) to this block
ParsonsBlock.prototype.addLine = function(line) {
	$(line.view).removeClass("indent1 indent2 indent3 indent4");
	if (this.problem.noindent) {
		if (line.indent > 0) {
			$(line.view).addClass("indent" + line.indent);
		}
	} else {
		var lines = this.lines;
		var sharedIndent = lines[0].indent;
		for (var i = 1; i < lines.length; i++) {
			sharedIndent = Math.min(sharedIndent, lines[i].indent);
		}
		if (sharedIndent < line.indent) {
			$(line.view).addClass("indent" + (line.indent - sharedIndent));
		} else if (sharedIndent > line.indent) {
			for (var i = 0; i < lines.length; i++) {
				$(lines[i].view).removeClass("indent1 indent2 indent3 indent4");
				$(lines[i].view).addClass("indent" + (lines[i].indent - line.indent));
			}
		}
	}
	this.lines.push(line);
	$(this.view).children(".lines")[0].appendChild(line.view);
};

// Add the contents of that block to myself and then delete that block
ParsonsBlock.prototype.consumeBlock = function(block) {
	for (var i = 0; i < block.lines.length; i++) {
		this.addLine(block.lines[i]);
	}
	if ($(block.view).attr("tabindex") == "0") {
		this.makeTabIndex();
	}
	$(block.view).detach();
	var newBlocks = [];
	for (var i = 0; i < this.problem.blocks.length; i++) {
		if (this.problem.blocks[i] !== block) {
			newBlocks.push(this.problem.blocks[i]);
		}
	}
	for (var i = 0; i < block.labels.length; i++) {
		this.addLabel(block.labels[i][0], this.lines.length - block.lines.length + block.labels[i][1]);
	}

	this.problem.blocks = newBlocks;
	this.problem.state = undefined;
	this.problem.updateView();
};

// Update the model and view when block is converted to contain indent
ParsonsBlock.prototype.addIndent = function() {
	// Update the lines model / view
	for (var i = 0; i < this.lines.length; i++) {
		var line = this.lines[i];
		if (line.indent > 0) {
			$(line.view).removeClass("indent1 indent2 indent3 indent4");
			$(line.view).addClass("indent" + line.indent);
		}
	}
	// Update the block model / view
	this.indent = 0;
	$(this.view).css({
		'padding-left' : '',
		'width' : this.problem.areaWidth - 22
	});
};

// Add a label to block and update its view
ParsonsBlock.prototype.addLabel = function(label, line) {
	var div = document.createElement("div");
	$(div).addClass("block-label");

	if(this.problem.options.numbered == "right") {
		$(div).addClass("right-label");
	}
	if(this.problem.options.numbered == "left") {
		$(div).addClass("left-label");
	}

	$(div).append(document.createTextNode(label));
	$(this.view).children(".labels")[0].append(div);
	if(this.labels.length != 0) {
		$(div).css("margin-top", (line - this.labels[this.labels.length - 1][1] - 1) * this.lines[line].view.offsetHeight);
	}

	this.labels.push([label, line]);
}

// Initialize Interactivity
ParsonsBlock.prototype.initializeInteractivity = function() {
	if ($(this.view).hasClass("disabled")) {
		return this;
	}
	$(this.view).attr("tabindex", "-1");
	this.hammer = new Hammer.Manager(this.view, {
		"recognizers" : [
			[Hammer.Pan, {
				"direction" : Hammer.DIRECTION_ALL,
				"threshold" : 0,
				"pointers" : 1
			}]
		]
	});
	var that = this;
	this.hammer.on("panstart", function (event) {that.panStart(event)});
	this.hammer.on("panend", function (event) {that.panEnd(event)});
	this.hammer.on("panmove", function (event) {that.panMove(event)});
};

// Return a boolean as to whether this block is able to be selected
ParsonsBlock.prototype.enabled = function() {
	return $(this.view).attr("tabindex") !== undefined;
};

// Return a boolean as to whether this block is a distractor
ParsonsBlock.prototype.isDistractor = function() {
	return this.lines[0].distractor;
};

// Return a boolean as to whether this block is in the source area
ParsonsBlock.prototype.inSourceArea = function() {
	var children = this.problem.sourceArea.childNodes;
	for (i = 0; i < children.length; i++) {
		var item = children[i];
		if (item.id == this.view.id) {
			return true;
		}
	}
	return false;
};

// Return the page X position of the center of the view
ParsonsBlock.prototype.pageXCenter = function() {
	var boundingRect = this.view.getBoundingClientRect();
	var pageXCenter = window.pageXOffset + boundingRect.left + boundingRect.width / 2;
	return pageXCenter;
};

// Return the page Y position of the center of the view
ParsonsBlock.prototype.pageYCenter = function() {
	var boundingRect = this.view.getBoundingClientRect();
	var pageYCenter = window.pageYOffset + boundingRect.top + boundingRect.height / 2;
	return pageYCenter;
};

// Of all the line indents, return the minimum value
ParsonsBlock.prototype.minimumLineIndent = function() {
	var minimumLineIndent = this.lines[0].indent;
	for (var i = 1; i < this.lines.length; i++) {
		minimumLineIndent = Math.min(this.lines[i].indent, minimumLineIndent);
	}
	return minimumLineIndent;
};

// Return the last block in the source area that matches the paired bin it is in
ParsonsBlock.prototype.slideUnderBlock = function() {
	var sourceBlocks = this.problem.sourceBlocks();
	if (sourceBlocks.length == 0) {
		return undefined;
	}
	var pairedBin = this.pairedBin();
	if (pairedBin == -1) {
		return sourceBlocks[sourceBlocks.length - 1];
	}
	for (var i = sourceBlocks.length - 1; i >= 0; i--) {
		var block = sourceBlocks[i];
		if (block.pairedBin() == pairedBin) {
			return block;
		}
	}
	return sourceBlocks[sourceBlocks.length - 1];
};

// Return which paired bin it is in (-1) if not
ParsonsBlock.prototype.pairedBin = function() {
	var pairedBins = this.problem.pairedBins;
	for (var i = 0; i < pairedBins.length; i++) {
		if (this.matchesBin(pairedBins[i])) {
			return i;
		}
	}
	return -1;
};

// Return true if all lines are in that bin
ParsonsBlock.prototype.matchesBin = function(bin) {
	for (var i = 0; i < this.lines.length; i++) {
		var test = this.lines[i].index;
		if (bin.indexOf(test) == -1) {
			return false;
		}
	}
	return true;
};

// Return a list of indexes where this block could be inserted before
ParsonsBlock.prototype.validSourceIndexes = function() {
	var blocks = this.problem.sourceBlocks();
	var indexes = [];
	var pairedBin = this.pairedBin();
	var i;
	if (pairedBin >= 0) {
		var lastBin = undefined;
		for (i = 0; i < blocks.length; i++) {
			var block = blocks[i];
			if (block.view.id !== this.view.id) {
				var blockBin = block.pairedBin();
				if (blockBin == pairedBin) {
					indexes.push(i);
				} else if (lastBin == pairedBin) {
					indexes.push(i);
				}
				lastBin = blockBin;
			}
		}
		if (lastBin == pairedBin) {
			indexes.push(blocks.length);
		}
		if (indexes.length > 0) {
			return indexes;
		}
	}
	lastBin = undefined;
	for (i = 0; i < blocks.length; i++) {
		block = blocks[i];
		if (block.view.id !== this.view.id) {
			blockBin = block.pairedBin();
			if (blockBin !== lastBin) {
				indexes.push(i);
			} else if (blockBin == -1) {
				indexes.push(i);
			}
			lastBin = blockBin;
		}
	}
	indexes.push(blocks.length);
	return indexes;
};

// A measure of how far the middle of this block is vertically positioned
ParsonsBlock.prototype.verticalOffset = function() {
	var verticalOffset;
	if (this.inSourceArea()) {
		verticalOffset = this.problem.sourceArea.getBoundingClientRect().top;
	} else {
		verticalOffset = this.problem.answerArea.getBoundingClientRect().top;
	}
	verticalOffset = this.view.getBoundingClientRect().top + this.view.getBoundingClientRect().bottom - verticalOffset * 2;
	return verticalOffset;
};

// This block just gained textual focus
ParsonsBlock.prototype.newFocus = function() {
	if (this.problem.textFocus == undefined) {
		this.problem.enterKeyboardMode();
		this.problem.textFocus = this;
		this.problem.textMove = false;
		$(this.view).addClass("down");
	} else if (this.problem.textFocus == this) {
		if (this.problem.textMove) {
			$(this.view).addClass("up");
		} else {
			$(this.view).addClass("down");
		}
	} else {
		// already in keyboard mode
		this.problem.textFocus = this;
		this.problem.textMove = false;
		$(this.view).addClass("down");
	}
	this.problem.textMoving = false;
};

// This block just lost textual focus
ParsonsBlock.prototype.releaseFocus = function() {
	$(this.view).removeClass("down up");
	if (this.problem.textFocus == this) {
		if (!this.problem.textMoving) {
			// exit out of problem but stay way into problem
			this.problem.textFocus = undefined;
			if (this.problem.textMove) {
				this.problem.logMove("kmove");
				this.problem.textMove = false;
			}
			this.problem.exitKeyboardMode();
		}
	} else {
		// become selectable, but not active
		$(this.view).attr("tabindex", "-1");
		$(this.view).unbind("focus");
		$(this.view).unbind("blur");
		$(this.view).unbind("keydown");
	}
};

// Make this block into the keyboard entry point
ParsonsBlock.prototype.makeTabIndex = function() {
	$(this.view).attr("tabindex", "0");
	var that = this;
	$(this.view).focus(function() {
		that.newFocus();
	});
	$(this.view).blur(function() {
		that.releaseFocus();
	});
	$(this.view).keydown(function(event) {
		that.keyDown(event);
	});
};

// Called to disable interaction for the future
ParsonsBlock.prototype.disable = function() {
	if (this.hammer !== undefined) {
		this.hammer.set({ enable: false });
	}
	if ($(this.view).attr("tabindex") == "0") {
		this.releaseFocus();
		$(this.view).removeAttr("tabindex");
		this.problem.initializeTabIndex();
	} else {
		$(this.view).removeAttr("tabindex");
	}
};

// Enable functionality after reset button has been pressed
ParsonsBlock.prototype.resetView = function() {
	if (this.hammer !== undefined) {
		this.hammer.set({ enable: true });
	}
	if (!$(this.view)[0].hasAttribute("tabindex")) {
		$(this.view).attr("tabindex", "-1");
	}
	$(this.view).css({ opacity : "" });
};

// Called to destroy interaction for the future
ParsonsBlock.prototype.destroy = function() {
	if (this.hammer !== undefined) {
		this.hammer.destroy();
		delete this.hammer;
	}
	if ($(this.view).attr("tabindex") == "0") {
		this.releaseFocus();
	}
	$(this.view).removeAttr("tabindex");
};

// Called when a block is picked up
ParsonsBlock.prototype.panStart = function(event) {
	this.problem.clearFeedback();
	if (this.problem.started == undefined) {
		// log the first time that something gets moved
		this.problem.started = true;
		this.problem.logMove("start");
	}
	if (this.problem.textFocus !== undefined) {
		// stop text focus when dragging
		this.problem.textFocus.releaseFocus();
	}
	this.problem.moving = this;
	// Update the view
	this.problem.movingX = event.srcEvent.pageX;
	this.problem.movingY = event.srcEvent.pageY;
	this.problem.updateView();
};

// Called when a block is dropped
ParsonsBlock.prototype.panEnd = function(event) {
	delete this.problem.moving;
	delete this.problem.movingX;
	delete this.problem.movingY;
	this.problem.updateView();
	this.problem.logMove("move");
};

// Called when a block is moved
ParsonsBlock.prototype.panMove = function(event) {
	// Update the view
	this.problem.movingX = event.srcEvent.pageX;
	this.problem.movingY = event.srcEvent.pageY;
	this.problem.updateView();
};

// Handle a keypress event when in focus
ParsonsBlock.prototype.keyDown = function(event) {
	if (this.problem.started == undefined) {
		// log the first time that something gets moved
		this.problem.started = true;
		this.problem.logMove("kstart");
	}
	switch(event.keyCode) {
		case 37: // left
			if (this.problem.textMove) {
				this.moveLeft();
			} else {
				this.selectLeft();
			}

			break;
		case 38: // up
			if (this.problem.textMove) {
				this.moveUp();
			} else {
				this.selectUp();
			}
			event.preventDefault();
			break;
		case 39: // right
			if (this.problem.textMove) {
				this.moveRight();
			} else {
				this.selectRight();
			}
			event.preventDefault();
			break;
		case 40: // down
			if (this.problem.textMove) {
				this.moveDown();
			} else {
				this.selectDown();
			}
			event.preventDefault();
			break;
		case 32: // space
			this.toggleMove();
			event.preventDefault();
			break;
		case 13: // enter
			this.toggleMove();
			event.preventDefault();
			break;
	}
};

// Move block left
ParsonsBlock.prototype.moveLeft = function() {
	if (!this.inSourceArea()) {
		if (this.indent == 0) {
			// move to source area
			var blocks = this.problem.sourceBlocks();
			var offset = this.verticalOffset();
			var validSourceIndexes = this.validSourceIndexes();
			for (var i = 0; i < validSourceIndexes.length; i++) {
				index = validSourceIndexes[i];
				if (index == blocks.length) {
					this.problem.textMoving = true;
					this.problem.sourceArea.appendChild(this.view);
					$(this.view).focus();
					this.problem.state = undefined;
					this.problem.updateView();
					return this;
				} else {
					var block = blocks[index];
					if (block.verticalOffset() >= offset) {
						break;
					}
				}
			}
			this.problem.textMoving = true;
			this.problem.sourceArea.insertBefore(this.view, block.view);
			$(this.view).focus();
		} else {
			// reduce indent
			this.indent = this.indent - 1;
		}
		this.problem.state = undefined;
		this.problem.updateView();
	}
};

// Move block up
ParsonsBlock.prototype.moveUp = function() {
	if (this.inSourceArea()) {
		var blocks = this.problem.sourceBlocks();
		var offset = this.verticalOffset();
		var validSourceIndexes = this.validSourceIndexes();
		for (var i = 0; i < validSourceIndexes.length; i++) {
			var index = validSourceIndexes[validSourceIndexes.length - 1 - i];
			if (index < blocks.length) {
				var block = blocks[index];
				if (block.verticalOffset() < offset) {
					this.problem.textMoving = true;
					this.problem.sourceArea.insertBefore(this.view, block.view);
					$(this.view).focus();
					this.problem.state = undefined;
					this.problem.updateView();
					return this;
				}
			}
		}
	} else {
		var insert = false;
		var blocks = this.problem.answerBlocks();
		for (var i = 0; i < blocks.length; i++) {
			if (blocks[i].view.id == this.view.id) {
				if (i == 0) {
					return this;
				}
				this.problem.textMoving = true;
				this.problem.answerArea.insertBefore(this.view, blocks[i - 1].view);
				$(this.view).focus();
				this.problem.state = undefined;
				this.problem.updateView();
			}
		}
	}
};

// Move block right
ParsonsBlock.prototype.moveRight = function() {
	if (this.inSourceArea()) {
		// move to answer area
		this.indent = 0;
		var offset = this.verticalOffset();
		var answerBlocks = this.problem.answerBlocks();
		for (var i = 0; i < answerBlocks.length; i++) {
			var item = answerBlocks[i];
			var itemOffset = item.verticalOffset();
			if (itemOffset >= offset) {
				this.problem.textMoving = true;
				this.problem.answerArea.insertBefore(this.view, item.view);
				$(this.view).focus();
				this.problem.state = undefined;
				this.problem.updateView();
				return this;
			}
		}
		this.problem.textMoving = true;
		this.problem.answerArea.appendChild(this.view);
		$(this.view).focus();
		this.problem.state = undefined;
		this.problem.updateView();
	} else {
		// in answer area: increase the indent
		if (this.indent !== this.problem.indent) {
			this.indent = this.indent + 1;
			this.problem.state = undefined;
			this.problem.updateView();
		}
	}
};

// Move block down
ParsonsBlock.prototype.moveDown = function() {
	if (this.inSourceArea()) {
		var blocks = this.problem.sourceBlocks();
		var offset = this.verticalOffset();
		var validSourceIndexes = this.validSourceIndexes();
		for (var i = 0; i < blocks.length; i++) {
			if (blocks[i].view.id == this.view.id) {
				var myIndex = i;
			}
		}
		for (var i = 0; i < validSourceIndexes.length; i++) {
			var index = validSourceIndexes[i];
			if (index == blocks.length) {
				this.problem.textMoving = true;
				this.problem.sourceArea.appendChild(this.view);
				$(this.view).focus();
				this.problem.state = undefined;
				this.problem.updateView();
				return this;
			} else if (index - myIndex > 1) {
				this.problem.textMoving = true;
				this.problem.sourceArea.insertBefore(this.view, blocks[index].view);
				$(this.view).focus();
				this.problem.state = undefined;
				this.problem.updateView();
				return this;
			}
		}
	} else {
		var insert = false;
		var blocks = this.problem.answerBlocks();
		for (var i = 0; i < blocks.length; i++) {
			if (blocks[i].view.id == this.view.id) {
				if (i == blocks.length - 1) {
					return this;
				} else if (i == blocks.length - 2) {
					this.problem.textMoving = true;
					this.problem.answerArea.appendChild(this.view);
				} else {
					this.problem.textMoving = true;
					this.problem.answerArea.insertBefore(this.view, blocks[i + 2].view);
				}
				$(this.view).focus();
				this.problem.state = undefined;
				this.problem.updateView();
			}
		}
	}
};

// Move selection left
ParsonsBlock.prototype.selectLeft = function() {
	if (!this.inSourceArea()) {
		var offset = this.verticalOffset();
		var sourceBlocks = this.problem.enabledSourceBlocks();
		if (sourceBlocks.length == 0) {
			return this;
		}
		var chooseNext = sourceBlocks[0];
		var chooseOffset = chooseNext.verticalOffset() - offset;
		for (var i = 1; i < sourceBlocks.length; i++) {
			var item = sourceBlocks[i];
			var itemOffset = item.verticalOffset() - offset;
			if (Math.abs(itemOffset) < Math.abs(chooseOffset)) {
				chooseNext = item;
				chooseOffset = itemOffset;
			}
		}
		this.problem.textFocus = chooseNext;
		chooseNext.makeTabIndex();
		$(chooseNext.view).focus();
	}
};

// Move selection up
ParsonsBlock.prototype.selectUp = function() {
	var chooseNext = false;
	var blocks;
	if (this.inSourceArea()) {
		blocks = this.problem.enabledSourceBlocks();
	} else {
		blocks = this.problem.enabledAnswerBlocks();
	}
	for (var i = blocks.length - 1; i >= 0; i--) {
		var item = blocks[i];
		if (chooseNext) {
			this.problem.textFocus = item;
			item.makeTabIndex();
			$(item.view).focus();
			return this;
		} else {
			if (item.view.id == this.view.id) {
				chooseNext = true;
			}
		}
	}
};

// Move selection right
ParsonsBlock.prototype.selectRight = function() {
	if (this.inSourceArea()) {
		var offset = this.verticalOffset();
		var blocks = this.problem.enabledAnswerBlocks();
		if (blocks.length == 0) {
			return this;
		}
		var chooseNext = blocks[0];
		var chooseOffset = chooseNext.verticalOffset() - offset;
		for (var i = 1; i < blocks.length; i++) {
			var item = blocks[i];
			var itemOffset = item.verticalOffset() - offset;
			if (Math.abs(itemOffset) < Math.abs(chooseOffset)) {
				chooseNext = item;
				chooseOffset = itemOffset;
			}
		}
		this.problem.textFocus = chooseNext;
		chooseNext.makeTabIndex();
		$(chooseNext.view).focus();
	}
};

// Move selection down
ParsonsBlock.prototype.selectDown = function() {
	var chooseNext = false;
	var blocks;
	if (this.inSourceArea()) {
		blocks = this.problem.enabledSourceBlocks();
	} else {
		blocks = this.problem.enabledAnswerBlocks();
	}
	for (var i = 0; i < blocks.length; i++) {
		var item = blocks[i];
		if (chooseNext) {
			this.problem.textFocus = item;
			item.makeTabIndex();
			$(item.view).focus();
			return this;
		} else {
			if (item.view.id == this.view.id) {
				chooseNext = true;
			}
		}
	}
};

// Toggle whether to move this block
ParsonsBlock.prototype.toggleMove = function() {
	if (this.problem.textMove) {
		$(this.view).removeClass("up");
		$(this.view).addClass("down");
		this.problem.textMove = false;
		this.problem.logMove("kmove");
	} else {
		$(this.view).removeClass("down");
		$(this.view).addClass("up");
		this.problem.textMove = true;
	}
};

// Answer a string that represents this codeblock for saving
ParsonsBlock.prototype.hash = function() {
	var hash = "";
	for (var i = 0; i < this.lines.length; i++) {
		hash += this.lines[i].index + "_"
	}
	hash += this.indent;
	return hash;
};

// Answer what the indent should be for the solution
ParsonsBlock.prototype.solutionIndent = function() {
	var sharedIndent = this.lines[0].indent;
	for (var i = 1; i < this.lines.length; i++) {
		sharedIndent = Math.min(sharedIndent, this.lines[i].indent);
	}
	return sharedIndent;
};

/* =====================================================================
==== Parsons Object ====================================================
======== The model and view of a Parsons problem based on what is
======== specified in the HTML, which is based on what is specified
======== in the RST file
==== PROPERTIES ========================================================
======== options: options largely specified from the HTML
======== grader: a LineGrader for grading the problem
======== lines: an array of all ParsonsLine as specified in the problem
======== solution: an array of ParsonsLine in the solution
======== blocks: the current blocks
======== sourceArea: the element that contains the source blocks
======== answerArea: the element that contains the answer blocks
===================================================================== */

/* =====================================================================
==== INITIALIZATION ====================================================
===================================================================== */

var prsList = {};    // Parsons dictionary
function Parsons (opts) {
	if (opts) {
	    this.init(opts);
	}
}
Parsons.prototype = new RunestoneBase();
Parsons.counter = 0;

// Initialize based on what is specified in the HTML file
Parsons.prototype.init = function (opts) {
	RunestoneBase.apply(this, arguments);
    RunestoneBase.prototype.init.apply(this, arguments);
	var orig = opts.orig;     // entire <pre> element that will be replaced by new HTML
	this.origElem = orig;
	this.useRunestoneServices = opts.useRunestoneServices;
	this.divid = orig.id;
	// Set the storageId (key for storing data)
	var storageId = eBookConfig.email;
	if (storageId == undefined) {
		storageId = this.divid;
	} else {
		storageId += this.divid;
	}
	this.storageId = storageId;

	this.children = this.origElem.childNodes;     // this contains all of the child elements of the entire tag...
	this.contentArray = [];
	Parsons.counter++;     //    Unique identifier
	this.counterId = "parsons-" + Parsons.counter;
	// Find the question text and store it in .question
	this.question = null;
	for (var i = 0; i < this.children.length; i++) {
		if ($(this.children[i]).is("[data-question]")) {
			this.question = this.children[i];
			break;
		}
	}

	this.initializeOptions();
	this.grader = new LineBasedGrader(this);
	var fulltext = $(this.origElem).html();
	var delimiter = this.question.outerHTML;
	var temp = fulltext.split(delimiter);
	var content = temp[1];
	this.blockIndex = 0;
	this.checkCount = 0;
	this.numDistinct = 0;
	this.hasSolved = false;
	this.initializeLines(content);
	this.initializeView();
	// Check the server for an answer to complete things
	if (this.useRunestoneServices) {
		this.checkServer("parsons");
	} else {
		this.checkLocalStorage();
	}

	this.caption="Parsons"
	this.addCaption('runestone')
};

// Based on the data-fields in the original HTML, initialize options
Parsons.prototype.initializeOptions = function() {
	var options = {
		"pixelsPerIndent" : 30
	};
	// add maxdist and order if present
	var maxdist = $(this.origElem).data('maxdist');
	var order = $(this.origElem).data('order');
	var noindent = $(this.origElem).data('noindent');
	var adaptive = $(this.origElem).data('adaptive');

	var numbered = $(this.origElem).data('numbered');
	options["numbered"] = numbered;

	if (maxdist !== undefined) {
	    options["maxdist"] = maxdist;
	}
	if (order !== undefined) {
		// convert order string to array of numbers
		order = order.match(/\d+/g);
		for (var i = 0; i < order.length; i++) {
			order[i] = parseInt(order[i]);
		}
		options["order"] = order;
	}
	if (noindent == undefined) {
		noindent = false;
	}
	options["noindent"] = noindent;
	this.noindent = noindent;
	if (adaptive == undefined) {
		adaptive = false;
	} else if (adaptive) {
		this.initializeAdaptive();
	}
	options["adaptive"] = adaptive;
	// add locale and language
	var locale = eBookConfig.locale;
	if (locale == undefined) {
		locale = "en";
	}
	options["locale"] = locale;
	var language = $(this.origElem).data('language');
	if (language == undefined) {
		language = eBookConfig.language;
		if (language == undefined) {
			language = "python";
		}
	}
	options["language"] = language;
	var prettifyLanguage = {
		"python" : "prettyprint lang-py",
		"java" : "prettyprint lang-java",
		"javascript" : "prettyprint lang-js",
		"html" : "prettyprint lang-html",
		"c" : "prettyprint lang-c",
		"c++" : "prettyprint lang-cpp",
		"ruby" : "prettyprint lang-rb"
	}[language];
	if (prettifyLanguage == undefined) {
		prettifyLanguage = "";
	}
	options["prettifyLanguage"] = prettifyLanguage;
	this.options = options;
};

// Based on what is specified in the original HTML, create the HTML view
Parsons.prototype.initializeView = function () {
	this.containerDiv = document.createElement("div");
	$(this.containerDiv).addClass("parsons alert alert-warning");
	this.containerDiv.id = this.counterId;

	this.parsTextDiv = document.createElement("div");
	$(this.parsTextDiv).addClass("parsons-text");
	this.parsTextDiv.innerHTML = this.question.innerHTML;
	this.containerDiv.appendChild(this.parsTextDiv);

	this.keyboardTip = document.createElement("div");
	$(this.keyboardTip).attr("role", "tooltip");
	this.keyboardTip.id = this.counterId + "-tip";
	this.keyboardTip.innerHTML = "Arrow keys to navigate. Space to select / deselect block to move.";
	this.containerDiv.appendChild(this.keyboardTip);
	$(this.keyboardTip).hide();

	this.sortContainerDiv = document.createElement("div");
	$(this.sortContainerDiv).addClass("sortable-code-container");
	$(this.sortContainerDiv).attr("aria-describedby", this.counterId + "-tip");
	this.containerDiv.appendChild(this.sortContainerDiv);

	this.sourceRegionDiv = document.createElement("div");
	this.sourceRegionDiv.id = this.counterId + "-sourceRegion";
	$(this.sourceRegionDiv).addClass("sortable-code");
	this.sourceLabel = document.createElement("div");
	$(this.sourceLabel).attr("role", "tooltip");
	this.sourceLabel.id = this.counterId + "-sourceTip";
	this.sourceLabel.innerHTML = "Drag from here";
	this.sourceRegionDiv.appendChild(this.sourceLabel);
	this.sortContainerDiv.appendChild(this.sourceRegionDiv);

	this.sourceArea = document.createElement("div");
	this.sourceArea.id = this.counterId + "-source";
	$(this.sourceArea).addClass("source");
	$(this.sourceArea).attr("aria-describedby", this.counterId + "-sourceTip");
	this.sourceRegionDiv.appendChild(this.sourceArea);

	this.answerRegionDiv = document.createElement("div");
	this.answerRegionDiv.id = this.counterId + "-answerRegion";
	$(this.answerRegionDiv).addClass("sortable-code");
	this.answerLabel = document.createElement("div");
	$(this.answerLabel).attr("role", "tooltip");
	this.answerLabel.id = this.counterId + "-answerTip";
	this.answerLabel.innerHTML = "Drop blocks here";
	this.answerRegionDiv.appendChild(this.answerLabel);
	this.sortContainerDiv.appendChild(this.answerRegionDiv);

	this.answerArea = document.createElement("div");
	this.answerArea.id = this.counterId + "-answer";
	$(this.answerArea).attr("aria-describedby", this.counterId + "-answerTip");
	this.answerRegionDiv.appendChild(this.answerArea);

	this.parsonsControlDiv = document.createElement("div");
	$(this.parsonsControlDiv).addClass("parsons-controls");
	this.containerDiv.appendChild(this.parsonsControlDiv);

	var that = this;
	this.checkButton = document.createElement("button");
	$(this.checkButton).attr("class", "btn btn-success");
	this.checkButton.textContent = "Check Me";
	this.checkButton.id = this.counterId + "-check";
	this.parsonsControlDiv.appendChild(this.checkButton);
	this.checkButton.type = "button";
	this.checkButton.addEventListener('click', function(event) {
		event.preventDefault();
		that.checkMe();
	});
	this.resetButton = document.createElement("button");
	$(this.resetButton).attr("class", "btn btn-default");
	this.resetButton.textContent = "Reset";
	this.resetButton.id = this.counterId + "-reset";
	this.resetButton.type = "button";
	this.parsonsControlDiv.appendChild(this.resetButton);
	this.resetButton.addEventListener('click', function(event) {
		event.preventDefault();
		that.clearFeedback();
		that.resetView();
		that.logMove("reset");
		that.setLocalStorage();
	});
	if (this.options.adaptive) {
		this.helpButton = document.createElement("button");
		$(this.helpButton).attr("class", "btn btn-primary");
		this.helpButton.textContent = "Help Me";
		this.helpButton.id = this.counterId + "-help";
		this.helpButton.disabled = false; // bje
		this.parsonsControlDiv.appendChild(this.helpButton);
		this.helpButton.addEventListener('click', function(event) {
			event.preventDefault();
			that.helpMe();
		});
	}
	this.messageDiv = document.createElement("div");
	this.messageDiv.id = this.counterId + "-message";
	this.parsonsControlDiv.appendChild(this.messageDiv);
	$(this.messageDiv).hide();

	$(this.origElem).replaceWith(this.containerDiv);
};

// Initialize lines and solution properties
Parsons.prototype.initializeLines = function(text) {
	this.lines = [];
	// Create the initial blocks
	var textBlocks = text.split("---");
	if (textBlocks.length === 1) {
		// If there are no ---, then every line is its own block
	    textBlocks = text.split("\n");
	}
	var solution = [];
	var indents = [];
	for (var i = 0; i < textBlocks.length; i++) {
		var textBlock = textBlocks[i];

		// Figure out options based on the #option
		// Remove the options from the code
		// only options are #paired or #distractor
		var options = {};
		textBlock = textBlock.replace(/#(paired|distractor)/, function(mystring, arg1) {
			options[arg1] = true;
			return ""
		});
		// Create lines
		var lines = [];
		var split = textBlock.split("\n");
		for (var j = 0; j < split.length; j++) {
			var code = split[j];
			// discard blank rows
			if (!/^\s*$/.test(code)) {
				line = new ParsonsLine(this, code);
				lines.push(line);
				if (options["paired"]) {
					line.distractor = true;
					line.paired = true;
				} else if (options["distractor"]) {
					line.distractor = true;
					line.paired = false;
				} else {
					line.distractor = false;
					line.paired = false;
					solution.push(line);
				}
				if ($.inArray(line.indent, indents) == -1) {
					indents.push(line.indent);
				}
			}
		}
		if (lines.length > 0)
		{
			// Add groupWithNext
			for (j = 0; j < lines.length - 1; j++) {
				lines[j].groupWithNext = true;
			}
			lines[lines.length - 1].groupWithNext = false;
		}
	}

	// Normalize the indents
	indents = indents.sort(function(a, b){return a-b});
	for (i = 0; i < this.lines.length; i++) {
		line = this.lines[i];
		line.indent = indents.indexOf(line.indent);
	}
	this.solution = solution;
};

// Based on the blocks, create the source and answer areas
Parsons.prototype.initializeAreas = function(sourceBlocks, answerBlocks, options) {
	// Create blocks property as the sum of the two
	var blocks = [];
	var i, block;
	for (i = 0; i < sourceBlocks.length; i++) {
		block = sourceBlocks[i];
		blocks.push(block);
		this.sourceArea.appendChild(block.view);
	}
	for (i = 0; i < answerBlocks.length; i++) {
		block = answerBlocks[i];
		blocks.push(block);
		this.answerArea.appendChild(block.view);
	}
	this.blocks = blocks;

	// If present, disable some blocks
	var disabled = options.disabled;
	if (disabled !== undefined) {
		for (i = 0; i < blocks.length; i++) {
			block = blocks[i];
			if (disabled.includes(block.lines[0].index)) {
				$(block.view).addClass("disabled");
			}
		}
	}
	// Determine how much indent should be possible in the answer area
	var indent = 0;
	if (!this.noindent) {
		if (this.options.language == "natural") {
			indent = this.solutionIndent();
		} else {
			indent = Math.max(0, this.solutionIndent());
		}
	}
	this.indent = indent;

	// For rendering, place in an onscreen position
	var isHidden = this.containerDiv.offsetParent == null;
	var replaceElement;
	if (isHidden) {
		replaceElement = document.createElement("div");
		$(this.containerDiv).replaceWith(replaceElement);
		document.body.appendChild(this.containerDiv);
	}

	if (this.options.prettifyLanguage !== "") {
		prettyPrint();
	}
	for (var i = 0; i < this.lines.length; i++) {
		this.lines[i].initializeWidth();
	}

	// Layout the areas
	var areaWidth, areaHeight;
	// Establish the width and height of the droppable areas
	var item, maxFunction;
	areaHeight = 6;
	var height_add = 0;
	if(this.options.numbered != undefined) {
		height_add = 1;
	}
	if (this.options.language == "natural") {
		areaWidth = 300;
		maxFunction = function(item) {
			item.width(areaWidth - 22);
			var addition = 3.8;
			if (item.outerHeight(true) != 38)
				addition = 2.1*(item.outerHeight(true)-38)/21;
			areaHeight += (item.outerHeight(true)+height_add*addition);

		};
	} else {
		areaWidth = 0;
		maxFunction = function(item) {
			var addition = 3.8;
			if (item.outerHeight(true) != 38)
				addition = 2.1;
			areaHeight += (item.outerHeight(true)+height_add*addition);
			areaWidth = Math.max(areaWidth, item.outerWidth(true));

		};
	}
	for (i = 0; i < blocks.length; i++) {
		maxFunction($(blocks[i].view));
	}
	this.areaWidth = areaWidth;
	if(this.options.numbered != undefined) {
		this.areaWidth += 25;
		//areaHeight += (blocks.length);
	}
	this.areaHeight = areaHeight;
	$(this.sourceArea).css({
		'width' : this.areaWidth + 2,
		'height' : areaHeight
	});
	$(this.answerArea).css({
		'width' : this.options.pixelsPerIndent * indent + this.areaWidth + 2,
		'height' : areaHeight
	});
	if (indent > 0 && indent <= 4) {
		$(this.answerArea).addClass("answer" + indent);
	} else {
		$(this.answerArea).addClass("answer");
	}

	// Initialize paired distractor decoration
	var bins = [];
	var bin = [];
	for (i = 0; i < this.lines.length; i++) {
		var line = this.lines[i];
		if (line.block() == undefined) {
			if (bin.length > 0) {
				bins.push(bin);
				bin = [];
			}
		} else {
			bin.push(line);
			if (!line.groupWithNext) {
				bins.push(bin);
				bin = [];
			}
		}
	}
	var pairedBins = [];
	var lineNumbers = [];
	var pairedDivs = [];
	if(this.pairDistractors || !this.options.adaptive) {
		for (i = bins.length - 1; i > -1; i--) {
			bin = bins[i];
			if (bin[0].paired) {
				// Add all in bin to line numbers
				for (j = bin.length - 1; j > -1; j--) {
					lineNumbers.unshift(bin[j].index);
				}
			} else {
				if (lineNumbers.length > 0) {
					// Add all in bin to line numbers
					for (j = bin.length - 1; j > -1; j--) {
						lineNumbers.unshift(bin[j].index);
					}
					pairedBins.unshift(lineNumbers);
					lineNumbers = [];
				}
			}
		}
		for (i = 0; i < pairedBins.length; i++) {
			var pairedDiv = document.createElement("div");
			$(pairedDiv).addClass("paired");
			$(pairedDiv).html("<span id= 'st' style = 'vertical-align: middle; font-weight: bold'>or{</span>");

			pairedDivs.push(pairedDiv);
			this.sourceArea.appendChild(pairedDiv);
		}
	} else {
		pairedBins = [];
	}
	this.pairedBins = pairedBins;
	this.pairedDivs = pairedDivs;

	if(this.options.numbered != undefined) {
		this.addBlockLabels(sourceBlocks.concat(answerBlocks));
	}

	// Update the view
	this.state = undefined; // needs to be here for loading from storage
	this.updateView();

	// Put back into the offscreen position
	if (isHidden) {
		$(replaceElement).replaceWith(this.containerDiv);
	}
};

// Make blocks interactive (both drag-and-drop and keyboard)
Parsons.prototype.initializeInteractivity = function() {
	for (var i = 0; i < this.blocks.length; i++) {
		this.blocks[i].initializeInteractivity();
	}
	this.initializeTabIndex();
};

// Make one block be keyboard accessible
Parsons.prototype.initializeTabIndex = function() {
	for (var i = 0; i < this.blocks.length; i++) {
		var block = this.blocks[i];
		if (block.enabled()) {
			block.makeTabIndex();
			return this;
		}
	}
}

/* =====================================================================
==== SERVER COMMUNICATION ==============================================
===================================================================== */

// Return the argument that is newer based on the timestamp
Parsons.prototype.newerData = function(dataA, dataB) {
	var dateA = dataA.timestamp;
	var dateB = dataB.timestamp;
	if (dateA == undefined) {
		return dataB;
	}
	if (dateB == undefined) {
		return dataA;
	}
	dateA = this.dateFromTimestamp(dateA);
	dateB = this.dateFromTimestamp(dateB);
	if (dateA > dateB) {
		return dataA;
	} else {
		return dataB;
	}
};

// Based on the data, load
Parsons.prototype.loadData = function(data) {
	var sourceHash = data.source;
	if (sourceHash == undefined) {
		// maintain backwards compatibility
		sourceHash = data.trash;
	}
	var answerHash = data.answer;
	var adaptiveHash = data.adaptive;
	var options;
	if (adaptiveHash == undefined) {
		options = {};
	} else {
		options = this.optionsFromHash(adaptiveHash);
	}
	if (options.noindent !== undefined) {
		this.noindent = true;
	}
	if (options.checkCount !== undefined) {
		this.checkCount = options.checkCount;
	}
	if (options.hasSolved !== undefined) {
		this.hasSolved = options.hasSolved;
	}
	if ((sourceHash == undefined) || (answerHash == undefined) || (answerHash.length == 1)) {
		this.initializeAreas(this.blocksFromSource(), [], options);
	} else {
		this.initializeAreas(this.blocksFromHash(sourceHash), this.blocksFromHash(answerHash), options);
		this.grader.grade();
	}
	// Start the interface
	if (this.needsReinitialization !== true) {
		this.initializeInteractivity();
	}
};

// Return what is stored in local storage
Parsons.prototype.localData = function() {
	var data = localStorage.getItem(this.storageId);
	if (data !== null) {
		if (data.charAt(0) == "{") {
			data = JSON.parse(data);
		} else {
			data = {};
		}
	} else {
		data = {};
	}
	return data;
};

// RunestoneBase: Sent when the server has data
Parsons.prototype.restoreAnswers = function(serverData) {
	this.loadData(this.newerData(this.localData(), serverData));
};

// RunestoneBase: Load what is in local storage
Parsons.prototype.checkLocalStorage = function () {

	if (this.graderactive) {
        return;
    }

	this.loadData(this.localData());
};

// RunestoneBase: Set the state of the problem in local storage
Parsons.prototype.setLocalStorage = function(data) {
	var toStore;
	if (data == undefined) {
		toStore = {
			"source" : this.sourceHash(),
			"answer" : this.answerHash(),
			"timestamp" : new Date()
		};
		var adaptiveHash = this.adaptiveHash();
		if (adaptiveHash.length > 0) {
			toStore.adaptive = adaptiveHash;
		}
	} else {
		toStore = data;
	}
	localStorage.setItem(this.storageId, JSON.stringify(toStore));
};

/* =====================================================================
==== LOGGING ===========================================================
===================================================================== */

// Log the interaction with the problem to the server:
//   start: the user started interacting with this problem
//   move: the user moved a block to a new position
//   reset: the reset button was pressed
//   removeDistractor: "Help Me" removed a distractor
//   removeIndentation: "Help Me" removed indentation
//   combineBlocks: "Help Me" combined blocks
Parsons.prototype.logMove = function(activity) {
	if (!this.useRunestoneServices) {
		return this;
	}
	var event = {
		"event" : "parsonsMove",
		"div_id" : this.divid
	};
	var act = activity + "|" + this.sourceHash() + "|" + this.answerHash();
	var adaptiveHash = this.adaptiveHash();
	if (adaptiveHash !== "") {
		act = act + "|" + adaptiveHash;
	}
	event.act = act;
	this.logBookEvent(event);
};

// Log the answer to the problem
//   correct: The answer given matches the solution
//   incorrect*: The answer is wrong for various reasons
Parsons.prototype.logAnswer = function(answer) {
	if (!this.useRunestoneServices) {
		return this;
	}
	var event = {
		"event" : "parsons",
		"div_id" : this.divid
	};
	var answerHash = this.answerHash();
	event.answer = answerHash;
	var sourceHash = this.sourceHash();
	event.source = sourceHash;
	var act = sourceHash + "|" + answerHash;
	var adaptiveHash = this.adaptiveHash();
	if (adaptiveHash !== "") {
		event.adaptive = adaptiveHash;
		act = act + "|" + adaptiveHash;
	}
	if (answer == "correct") {
		act = "correct|" + act;
		event.correct = "T";
	} else {
		act ="incorrect|" + act;
		event.correct = "F";
	}
	event.act = act;
	this.logBookEvent(event);
};

/* =====================================================================
==== ACCESSING =========================================================
===================================================================== */

// Answer the hash of the adaptive state
Parsons.prototype.adaptiveHash = function() {
	if (!this.options.adaptive) {
		return "";
	}
	var hash = [];
	for (var i = 0; i < this.blocks.length; i++) {
		var block = this.blocks[i];
		if (!block.enabled()) {
			hash.push("d" + block.lines[0].index);
		}
	}
	if (this.noindent !== this.options.noindent) {
		hash.push("i");
	}
	hash.push("c" + this.checkCount);
	if (this.hasSolved) {
		hash.push("s");
	}
	return hash.join("-");
};

// Create options for creating blocks based on a hash
Parsons.prototype.optionsFromHash = function(hash) {
	var split;
	if (hash === "-" || hash === "" || hash === null) {
		split = [];
	} else {
		split = hash.split("-");
	}
	var options = {};
	var disabled = [];
	for (var i = 0; i < split.length; i++) {
		var key = split[i];
		if (key[0] == "i") {
			options.noindent = true;
		} else if (key[0] == "d") {
			disabled.push(parseInt(key.slice(1)));
		} else if (key[0] == "s") {
			options.hasSolved = true;
		} else if (key[0] == "c") {
			options.checkCount = parseInt(key.slice(1));
		}
	}
	if (disabled.length > 0) {
		options.disabled = disabled;
	}
	return options;
};

// Answer the hash of the answer area
Parsons.prototype.answerHash = function() {
	var hash = [];
	var blocks = this.answerBlocks();
	for (var i = 0; i < blocks.length; i++) {
		hash.push(blocks[i].hash());
	}
	if (hash.length === 0) {
		return "-";
	} else {
		return hash.join("-");
	}
};

// Answer the hash of the source area
Parsons.prototype.sourceHash = function() {
	var hash = [];
	var blocks = this.sourceBlocks();
	for (var i = 0; i < blocks.length; i++) {
		hash.push(blocks[i].hash());
	}
	if (hash.length === 0) {
		return "-";
	} else {
		return hash.join("-");
	}
};

// Inter-problem adaptive changes
// Based on the recentAttempts, remove distractors, add indent, combine blocks
Parsons.prototype.adaptBlocks = function(input) {
	var blocks = [];
	var distractors = [];
	for (var i = 0; i < input.length; i++) {
		var block = input[i];
		if (block.isDistractor()) {
			distractors.push(block)
		} else {
			blocks.push(block);
		}
	}

	this.recentAttempts = localStorage.getItem(this.adaptiveId + "recentAttempts");
	if(this.recentAttempts == undefined || this.recentAttempts == "NaN") {
		this.recentAttempts = 3;
	}

	var lastestAttemptCount = this.recentAttempts;
	var nBlocks = blocks.length;
	var nBlocksToCombine = 0;
	var nDistractors = distractors.length;
	var nToRemove = 0;
	this.pairDistractors = true;

	var giveIndentation = false;
	if(lastestAttemptCount < 2) { // 1 Try
		this.pairDistractors = false;
		this.limitDistractors = false;
	} else if(lastestAttemptCount < 4) { // 2-3 Tries
		// Do nothing they are doing normal
		this.pairDistractors = true;
	} else if(lastestAttemptCount < 6) { // 4-5 Tries
		// pair distractors
		this.pairDistractors = true;
	} else if(lastestAttemptCount < 8) { // 6-7 Tries
		// Remove 50% of distractors
		nToRemove = .5 * nDistractors;
		this.pairDistractors = true;
	} else { // 8+ Tries
		// Remove all of distractors
		nToRemove = nDistractors;
		this.pairDistractors = true;
	}
	/*
	else if(lastestAttemptCount < 12) { //10-11
		// Remove all distractors and give indentation
		nToRemove = nDistractors;
		giveIndentation = true;
		this.pairDistractors = true;
	} else if(lastestAttemptCount < 14) { // 12-13 Tries
		// Remove all of distractors
		// give indentation
		// reduce problem to 3/4 size
		giveIndentation = true;
		nToRemove = nDistractors;
		nBlocksToCombine = .25 * nBlocks;
		this.pairDistractors = true;
	} else { // >= 14 Tries
		// Remove all of distractors
		// give indentation
		// reduce problem to 1/2 size
		giveIndentation = true;
		nToRemove = nDistractors;
		nBlocksToCombine = .5 * nBlocks;
		this.pairDistractors = true;
	}
	*/
	nBlocksToCombine = Math.min(nBlocksToCombine, nBlocks - 3);
	// Never combine so where there are less than three blocks left

	// Remove distractors
	distractors = this.shuffled(distractors);
	distractors = distractors.slice(0, nToRemove);
	var output = [];
	for (i = 0; i < input.length; i++) {
		block = input[i];
		if (!block.isDistractor()) {
			output.push(block);
		} else if ($.inArray(block, distractors) == -1) {
			output.push(block);
		}
	}
	//var output = input;
	if (giveIndentation) {
		for(var i = 0; i < output.length; i++) {
			output[i].addIndent();
		}
		this.indent = 0;
		this.noindent = true;
	}

	// combine blocks
	var solution = [];
	for (i = 0; i < this.lines.length; i++) {
		for (var j = 0; j < output.length; j++) {
			if (output[j].lines[0].index == i) {
				solution.push(output[j]);
			}
		}
	}
	for (i = 0; i < nBlocksToCombine; i++) {
		// combine one set of blocks
		var best = -10;
		var combineIndex = -10;
		for (j = 0; j < solution.length - 1; j++) {
			var block = solution[j];
			var next = solution[j+1];
			var rating = 10 - block.lines.length - next.lines.length;
			var blockIndent = block.minimumLineIndent();
			var nextIndent = next.minimumLineIndent();
			if (blockIndent == nextIndent) {
				rating += 2;
			} else if (blockIndent > nextIndent) {
				rating -= 1;
			}
			if (block.lines[block.lines.length-1].indent == next.lines[0].indent) {
				rating += 1;
			}
			if (rating >= best) {
				best = rating;
				combineIndex = j;
			}
		}
		block = solution[combineIndex];
		next = solution[combineIndex+1];
		for (j = 0; j < next.lines.length; j++) {
			block.addLine(next.lines[j]);
		}
		var newSolution = [];
		for (j = 0; j < solution.length; j++) {
			if (j !== combineIndex + 1) {
				newSolution.push(solution[j]);
			}
		}
		var solution = newSolution;
	}
	// reorder
	var combinedOutput = [];
	for (i = 0; i < output.length; i++) {
		for (j = 0; j < solution.length; j++) {
			if (output[i].lines[0].index == solution[j].lines[0].index) {
				combinedOutput.push(solution[j]);
			}
		}
	}
	return combinedOutput;
}

// Return an array of code blocks based on what is specified in the problem
Parsons.prototype.blocksFromSource = function() {
	var unorderedBlocks = [];
	var originalBlocks = [];
	var blocks = [];
	var lines = [];
	var block, line, i;
	for (i = 0; i < this.lines.length; i++) {
		line = this.lines[i];
		lines.push(line);
		if (!line.groupWithNext) {
			unorderedBlocks.push(new ParsonsBlock(this, lines));
			lines = [];
		}
	}
	originalBlocks = unorderedBlocks;
	// Trim the distractors
	var removedBlocks = [];
	if (this.options.maxdist !== undefined) {
		var maxdist = this.options.maxdist;
		var distractors = [];
		for (i = 0; i < unorderedBlocks.length; i++) {
			block = unorderedBlocks[i];
			if (block.lines[0].distractor) {
				distractors.push(block);
			}
		}
		if (maxdist < distractors.length) {
			distractors = this.shuffled(distractors);
			distractors = distractors.slice(0, maxdist);
			for (i = 0; i < unorderedBlocks.length; i++) {
				block = unorderedBlocks[i];
				if (block.lines[0].distractor) {
					if ($.inArray(block, distractors) > -1) {
						blocks.push(block);
					}
					else {
						removedBlocks.push(i);
					}
				} else {
					blocks.push(block);
				}
			}
			unorderedBlocks = blocks;
			blocks = [];
		}
	}
	if (this.options.order === undefined) {
		// Shuffle, respecting paired distractors
		var chunks = [], chunk = [];
		for (i = 0; i < unorderedBlocks.length; i++) {
			block = unorderedBlocks[i];
			if (block.lines[0].paired) {
				chunk.push(block);
			} else {
				chunk = [];
				chunk.push(block);
				chunks.push(chunk);
			}
		}
		chunks = this.shuffled(chunks);
		for (i = 0; i < chunks.length; i++) {
			chunk = chunks[i];
			if (chunk.length > 1) {
				// shuffle paired distractors
				chunk = this.shuffled(chunk);
				for (j = 0; j < chunk.length; j++) {
					blocks.push(chunk[j]);
				}
			} else {
				blocks.push(chunk[0]);
			}
		}
	} else {
		// Order according to order specified
		for (i = 0; i < this.options.order.length; i++) {
			block = originalBlocks[this.options.order[i]];
			if (block !== undefined && $.inArray(this.options.order[i], removedBlocks) < 0) {
				blocks.push(block);
			}
		}
	}
	this.pairDistractors = true;
	if (this.options.adaptive) {
		this.limitDistractors = true;
		blocks = this.adaptBlocks(blocks);
		if(!this.limitDistractors) {
			for(i = 0; i < removedBlocks.length; i++) {
				var index = this.options.order == undefined ? Math.random(0, blocks.length): $.inArray(removedBlocks[i], this.options.order);
				blocks.splice(index, 0, originalBlocks[removedBlocks[i]]);
			}
		}
	}
	if(this.pairDistractors && this.options.order != undefined) {
		//move pairs together
		//Go through array looking for ditractor and its pair
		for(i = 1; i < originalBlocks.length; i++) {
			if(originalBlocks[i].lines[0].paired && $.inArray(originalBlocks[i], blocks) >= 0) {
				var j = i;
				while($.inArray(originalBlocks[j - 1], blocks) < 0) { // find the paired distractor or solution block it will be next to
					j--;
				}
				var indexTo = $.inArray(originalBlocks[j - 1], blocks);
				var indexFrom = $.inArray(originalBlocks[i], blocks);
				blocks.splice(indexFrom, 1);
				blocks.splice(indexTo, 0, originalBlocks[i]);
			}
		}
	}
	return blocks;
};

// Return a codeblock that corresponds to the hash
Parsons.prototype.blockFromHash = function(hash) {
	var split = hash.split("_");
	var lines = [];
	for (var i = 0; i < split.length - 1; i++) {
		lines.push(this.lines[split[i]]);
	}
	var block = new ParsonsBlock(this, lines);
	if (this.noindent) {
		block.indent = 0;
	} else {
		block.indent = Number(split[split.length - 1]);
	}
	return block;
};

// Return an array of codeblocks that corresponds to the hash
Parsons.prototype.blocksFromHash = function(hash) {
	var split;
	if (hash === "-" || hash === "" || hash === null) {
		split = [];
	} else {
		split = hash.split("-");
	}
	var blocks = [];
	for (var i = 0; i < split.length; i++) {
		blocks.push(this.blockFromHash(split[i]));
	}
	if (this.options.adaptive) {
		return this.adaptBlocks(blocks);
	} else {
		return blocks;
	}
};

// Return a block object by the full id including id prefix
Parsons.prototype.getBlockById = function(id) {
	for (var i = 0; i < this.blocks.length; i++) {
		var block = this.blocks[i];
		if (block.view.id == id) {
			return block;
		}
	}
	return undefined;
};

// Return array of codeblocks that are the solution
Parsons.prototype.solutionBlocks = function() {
	var solutionBlocks = [];
	var solutionLines = [];
	for (var i = 0; i < this.lines.length; i++) {
		if (!this.lines[i].distractor) {
			solutionLines.push(this.lines[i]);
		}
	}
	var block = solutionLines[0].block();
	solutionBlocks.push(block);
	for (var i = 1; i < solutionLines.length; i++) {
		var nextBlock = solutionLines[i].block();
		if (block !== nextBlock) {
			block = nextBlock;
			solutionBlocks.push(block);
		}
	}
	return solutionBlocks;
};

// Return array of codeblocks based on what is in the source field
Parsons.prototype.sourceBlocks = function() {
	var sourceBlocks = [];
	var children = this.sourceArea.childNodes;
	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		if ($(child).hasClass("block")) {
			sourceBlocks.push(this.getBlockById(child.id));
		}
	}
	return sourceBlocks;
};

// Return array of enabled codeblocks based on what is in the source field
Parsons.prototype.enabledSourceBlocks = function() {
	var all = this.sourceBlocks();
	var enabled = [];
	for (var i = 0; i < all.length; i++) {
		var block = all[i];
		if (block.enabled()) {
			enabled.push(block);
		}
	}
	return enabled;
};

// Return array of codeblocks based on what is in the answer field
Parsons.prototype.answerBlocks = function() {
	var answerBlocks = [];
	var children = this.answerArea.childNodes;
	for (var i = 0; i < children.length; i++) {
		var block = this.getBlockById(children[i].id);
		if (block !== undefined) {
			answerBlocks.push(block)
		}
	}
	return answerBlocks;
};

// Return array of enabled codeblocks based on what is in the answer field
Parsons.prototype.enabledAnswerBlocks = function() {
	var all = this.answerBlocks();
	var enabled = [];
	for (var i = 0; i < all.length; i++) {
		var block = all[i];
		if (block.enabled()) {
			enabled.push(block);
		}
	}
	return enabled;
};

// Return array of codelines based on what is in the answer field
Parsons.prototype.answerLines = function() {
	var answerLines = [];
	var blocks = this.answerBlocks();
	for (var i = 0; i < blocks.length; i++) {
		var block = blocks[i];
		for (var j = 0; j < block.lines.length; j++) {
			answerLines.push(block.lines[j]);
		}
	}
	return answerLines;
};

// Go up the hierarchy until you get to a block; return that block element
Parsons.prototype.getBlockFor = function(element) {
	var check = element;
	while (!check.classList.contains("block")) {
		check = check.parentElement;
	}
	return check;
};

// Return the maximum indent for the solution
Parsons.prototype.solutionIndent = function() {
	var indent = 0;
	for (var i = 0; i < this.blocks.length; i++) {
		var block = this.blocks[i];
		indent = Math.max(indent, block.solutionIndent());
	}
	return indent;
};

/* =====================================================================
==== ACTION ============================================================
===================================================================== */

// The "Check Me" button was pressed.
Parsons.prototype.checkMe = function() {
	if (!this.hasSolved)
	{
		this.checkCount++;
	    this.clearFeedback();
	    if (this.adaptiveId == undefined) {
	    	this.adaptiveId = this.storageId;
	    }
		var grade = this.grader.grade();
		if (grade == "correct") {
			this.hasSolved = true;
			localStorage.setItem(this.adaptiveId + "Solved", true);
			this.recentAttempts = this.checkCount;
			this.checkCount = 0;
			localStorage.setItem(this.adaptiveId + "recentAttempts", this.recentAttempts);
		}
		localStorage.setItem(this.adaptiveId + this.divid + "Count", this.checkCount);

		this.logAnswer(grade);
		this.setLocalStorage();

		// if not solved and not too short then check if should provide help
		if (!this.hasSolved  && grade !== "incorrectTooShort")
		{
			if (this.canHelp) {
				// only count the attempt if the answer is different (to prevent gaming)
				var answerHash = this.answerHash();
				if (this.lastAnswerHash !== answerHash) {
					this.numDistinct++;
					this.lastAnswerHash = answerHash;
				}

		        // if time to offer help
				if (this.numDistinct == 3 && !this.gotHelp) {
					// activate the help button and wiggle it
					//this.helpButton.disabled = false;
					//$(this.helpButton).css("position","relative");
        			//for (var x = 1; x <= 3; x++) {
        			//	$(this.helpButton)
        			//		.animate({ left : -5 }, 60)
        			//		.animate({ left : 5 }, 120)
        			//		.animate({ left : 0 }, 60);
        			alert("Click on the Help Me button if you want to make the problem easier");
        			//} // end for
    			} // end if
			} // end if can help
		} // end if not solved
	} // end outer if not solved
};

/* =====================================================================
==== ADAPTIVE ==========================================================
===================================================================== */

// Initialize this problem as adaptive
//    helpCount = number of checks before help is given (negative)
//    canHelp = boolean as to whether help can be provided
//    checkCount = how many times it has been checked before correct
//    userRating = 0..100 how good the person is at solving problems
Parsons.prototype.initializeAdaptive = function() {
	this.adaptiveId = eBookConfig.email;
	if (this.adaptiveId == undefined) {
		this.adaptiveId = "parsons";
	} else {
		this.adaptiveId = this.adaptiveId + "-parsons";
	}
	this.canHelp = true;
	//this.helpCount = -3; // Number of checks before help is offered
	this.checkCount = 0;
	this.numDistinct = 0; // number of distinct solution attempts (different from previous)
	this.gotHelp = false;
	// Initialize the userRating
	var storageProblem = localStorage.getItem(this.adaptiveId + "Problem");
	if (storageProblem == this.divid) {
		// Already in this problem
		this.checkCount = localStorage.getItem(this.adaptiveId  + this.divid + "Count");
		if (this.checkCount == undefined) {
			this.checkCount = 0;
		}
		return this;
	}
	var count = localStorage.getItem(this.adaptiveId  + this.divid + "Count");
	if (count == undefined || count == "NaN") {
		count = 0;
	}
	this.checkCount = count;


	this.recentAttempts = localStorage.getItem(this.adaptiveId + "recentAttempts");

	if(this.recentAttempts == undefined || this.recentAttempts == "NaN") {
		this.recentAttempts = 3;
	}
	localStorage.setItem(this.adaptiveId + "recentAttempts", this.recentAttempts);
	localStorage.setItem(this.adaptiveId + "Problem", this.divid);
	localStorage.setItem(this.adaptiveId + this.divid + "Count", this.checkCount);
	localStorage.setItem(this.adaptiveId + "Solved", false);
};

// Return a boolean of whether the user must deal with indentation
Parsons.prototype.usesIndentation = function() {
	if ( this.noindent || this.solutionIndent() == 0) {
	// was $(this.answerArea).hasClass("answer") - bje changed
		return false;
	} else {
		return true;
	}
};

// Find a distractor to remove to make the problem easier
//  * try first in the answer area
//  * if not, try the source area
//  * if not, return undefined
Parsons.prototype.distractorToRemove = function() {
	var blocks = this.enabledAnswerBlocks();
	var block;
	for (var i = 0; i < blocks.length; i++) {
		block = blocks[i];
		if (block.isDistractor()) {
			return block;
		}
	}
	blocks = this.enabledSourceBlocks();
	for (var i = 0; i < blocks.length; i++) {
		block = blocks[i];
		if (block.isDistractor()) {
			return block;
		}
	}
	return undefined;
};

// Return the number of blocks that exist
Parsons.prototype.numberOfBlocks = function(fIncludeDistractors = true) {
	var numberOfBlocks = 0;
	for (var i = 0; i < this.blocks.length; i++) {
		if (this.blocks[i].enabled() && (fIncludeDistractors || !this.blocks[i].isDistractor())) {
			numberOfBlocks += 1;
		}
	}
	return numberOfBlocks;
};

// Remove this distractors to make the problem easier
Parsons.prototype.removeDistractor = function(block) {
	// Alert the user to what is happening
	var feedbackArea = $(this.messageDiv);
	feedbackArea.fadeIn(500);
	feedbackArea.attr("class", "alert alert-info");
	feedbackArea.html("Disabled an unneeded code block (one that is not part of the solution).");
	// Stop ability to select
	block.disable();
	// If in answer area, move to source area
	if (!block.inSourceArea()) {
		var sourceRect = this.sourceArea.getBoundingClientRect();
		var startX = block.pageXCenter() - 1;
		var startY = block.pageYCenter();
		var endX = sourceRect.left + window.pageXOffset + sourceRect.width / 2;
		var endY = sourceRect.top + window.pageYOffset + block.view.getBoundingClientRect().height / 2;

		var slideUnderBlock = block.slideUnderBlock();
		if (slideUnderBlock !== undefined) {
			endY += slideUnderBlock.view.getBoundingClientRect().height + 20;
			endY += parseInt($(slideUnderBlock.view).css("top"));
		}
		var that = this;
		$(block.view).css({
			"border-color" : "#000",
			"background-color" : "#fff"
		});
		$(block.view).animate({
			"opacity" : 1.0
		}, {
			"duration" : Math.sqrt(Math.pow(endY - startY, 2) + Math.pow(endX - startX, 2)) * 4 + 500,
			"start" : function() {
				that.moving = block;
				that.movingX = startX;
				that.movingY = startY;
				that.updateView();
			},
			"progress" : function(a, p, c) {
				that.movingX = startX * (1 - p) + endX * p;
				that.movingY = startY * (1 - p) + endY * p;
				that.updateView();
			},
			"complete" : function() {
				delete that.moving;
				delete that.movingX;
				delete that.movingY;
				that.updateView();
				$(block.view).animate({
					"opacity" : 0.3,
					"border-color" : "#d3d3d3",
					"background-color" : "#efefef"
				}, {
					"duration" : 1000,
					"complete" : function() {
						$(block.view).css({
							"opacity" : "",
							"border-color" : "",
							"background-color" : ""
						});
						$(block.view).addClass("disabled");
					}
				});
			}
		});
	} else {
		$(block.view).css({
			"border-color" : "#000",
			"background-color" : "#fff"
		});
		$(block.view).animate({
			"opacity" : 0.3,
			"border-color" : "#d3d3d3",
			"background-color" : "#efefef"
		}, {
			"duration" : 2000,
			"complete" : function() {
				$(block.view).css({
					"border-color" : "",
					"background-color" : ""
				});
			}
		});
	}
};

// Give the user the indentation
Parsons.prototype.removeIndentation = function() {
	// Alert the user to what is happening
	var feedbackArea = $(this.messageDiv);
	feedbackArea.fadeIn(500);
	feedbackArea.attr("class", "alert alert-info");
	feedbackArea.html("Provided the indentation.");
	// Move and resize blocks
	var blockWidth = 200;
	for (var i = 0; i < this.lines.length; i++) {
		var line = this.lines[i];
		var expandedWidth = line.width + (line.indent * this.options.pixelsPerIndent) + 30;
		blockWidth = Math.max(blockWidth, expandedWidth);
	}
	if (this.options.numbered != undefined) {
		blockWidth += 25;
	}
	this.areaWidth = blockWidth + 22;
	var block, indent;
	var sourceBlocks = this.sourceBlocks();
	for (var i = 0; i < sourceBlocks.length; i++) {
		block = sourceBlocks[i];
		indent = block.solutionIndent();
		if (indent == 0) {
			$(block.view).animate({
				"width" : blockWidth
			}, {
				"duration" : 1000
			});
		} else {
			$(block.view).animate({
				"width" : blockWidth - indent * this.options.pixelsPerIndent,
				"padding-left" : indent * this.options.pixelsPerIndent + 10
			}, {
				"duration" : 1000
			});
		}
	}
	for (var i = 0; i < this.pairedDivs.length; i++) {
		$(this.pairedDivs[i]).animate({
			"width" : blockWidth + 34
		}, {
			"duration" : 1000
		});
	}
	var answerBlocks = this.answerBlocks();
	for (var i = 0; i < answerBlocks.length; i++) {
		block = answerBlocks[i];
		indent = block.solutionIndent();
		if (indent == 0) {
			$(block.view).animate({
				"left" : 0,
				"width" : blockWidth
			}, {
				"duration" : 1000
			});
		} else {
			$(block.view).animate({
				"left" : 0,
				"width" : blockWidth - indent * this.options.pixelsPerIndent,
				"padding-left" : indent * this.options.pixelsPerIndent + 10
			}, {
				"duration" : 1000
			});
		}
	}
	// Resize answer and source area
	$(this.answerArea).removeClass("answer1 answer2 answer3 answer4");
	$(this.answerArea).addClass("answer");
	this.indent = 0;
	this.noindent = true;
	$(this.sourceArea).animate({
		"width" : this.areaWidth + 2
	}, {
		"duration" : 1000
	});
	$(this.answerArea).animate({
		"width" : this.areaWidth + 2
	}, {
		"duration" : 1000
	});
	// Change the model (with view)
	$(this.answerArea).animate({
		"opacity" : 1.0
	}, {
		"duration" : 1100,
		"complete" : function() {
			$(this.answerArea).css({
				"opacity" : ""
			});
			// Update the model
			for (var i = 0; i < sourceBlocks.length; i++) {
				sourceBlocks[i].addIndent();
			}
			for (var i = 0; i < answerBlocks.length; i++) {
				answerBlocks[i].addIndent();
			}
		}
	});
};

// Combine blocks together
Parsons.prototype.combineBlocks = function() {
	// Alert the user to what is happening
	var feedbackArea = $(this.messageDiv);
	feedbackArea.fadeIn(500);
	feedbackArea.attr("class", "alert alert-info");
	feedbackArea.html("Combined two code blocks into one.");
	// Use heuristics to figure out which block to combine
	var solutionBlocks = this.solutionBlocks();
	var answerBlocks = this.answerBlocks();
	var sourceBlocks = this.sourceBlocks();
	var potentials = solutionBlocks.slice(0, solutionBlocks.length - 1);
	ratings = [];
	for (var i = 0; i < potentials.length; i++) {
		var block = potentials[i];
		var next = solutionBlocks[i+1];
		var rating = (block.lines.length + next.lines.length) * -1;
		if (answerBlocks.indexOf(next) > -1) {
			rating += 1;
		}
		var indexOf = answerBlocks.indexOf(block);
		if (indexOf == -1) {
		} else if (indexOf == answerBlocks.length - 1) {
			rating += 2;
		} else {
			if (block.lines[block.lines.length - 1].index + 1 == answerBlocks[indexOf + 1].lines[0].index) {
				rating += 2;
			} else {
				rating += 3;
			}
		}
		if (block.minimumLineIndent() == next.minimumLineIndent()) {
			rating += 1;
		}
		ratings.push(rating);
	}
	var block1 = potentials[0];
	rating = ratings[0];
	for (var i = 1; i < potentials.length; i++) {
		if (ratings[i] > rating) {
			block1 = potentials[i];
			rating = ratings[i];
		}
	}
	var block2 = solutionBlocks[solutionBlocks.indexOf(block1) + 1];
	// Combine blocks (after move)
	var index1 = answerBlocks.indexOf(block1);
	var index2, move, subtract;
	if (index1 > -1) {
		index2 = answerBlocks.indexOf(block2);
	} else {
		index1 = sourceBlocks.indexOf(block1);
		index2 = sourceBlocks.indexOf(block2);
	}
	move = index1 + 1 !== index2;
	subtract = (index2 > -1) && (index2 < index1);
	if (move) {
		// Move the block
		var startX = block2.pageXCenter() - 1;
		var startY = block2.pageYCenter();
		var endX = block1.pageXCenter() - 1;
		var endY = block1.pageYCenter() + block1.view.getBoundingClientRect().height / 2 + 5;
		if (subtract) {
			endY -= block2.view.getBoundingClientRect().height / 2;
		} else {
			endY += block2.view.getBoundingClientRect().height / 2;
		}
		var duration = Math.sqrt(Math.pow(endY - startY, 2) + Math.pow(endX - startX, 2)) * 4 + 500;
		var that = this;
		$(block2.view).animate({
			"opacity" : 1
		}, {
			"duration" : duration,
			"start" : function() {
				$(block1.view).css({
					"border-color" : "#000",
					"background-color" : "#fff"
				});
				$(block2.view).css({
					"border-color" : "#000",
					"background-color" : "#fff"
				});
				block2.lines[0].index += 1000;
				that.moving = block2;
				that.movingX = startX;
				that.movingY = startY;
				that.updateView();
			},
			"progress" : function(a, p, c) {
				that.movingX = startX * (1 - p) + endX * p;
				that.movingY = startY * (1 - p) + endY * p;
				that.updateView();
			},
			"complete" : function() {
				delete that.moving;
				delete that.movingX;
				delete that.movingY;
				that.updateView();
				block2.lines[0].index -= 1000;
				block1.consumeBlock(block2);
				$(block1.view).animate({
					"border-color" : "#d3d3d3",
					"background-color" : "#efefef"
				}, {
					"duration" : 1000,
					"complete" : function() {
						$(block1.view).css({
							"border-color" : "",
							"background-color" : ""
						});
					}
				});
			}
		});
	} else {
		$(block2.view).animate({
			"opacity" : 1
		}, {
			"duration" : 1000,
			"start" : function() {
				$(block1.view).css({
					"border-color" : "#000",
					"background-color" : "#fff"
				});
				$(block2.view).css({
					"border-color" : "#000",
					"background-color" : "#fff"
				});
			},
			"complete" : function() {
				block1.consumeBlock(block2);
				$(block1.view).animate({
					"border-color" : "#d3d3d3",
					"background-color" : "#efefef"
				}, {
					"duration" : 1000,
					"complete" : function() {
						$(block1.view).css({
							"border-color" : "",
							"background-color" : ""
						});
					}
				});
			}
		});
	}
};

// Adapt the problem to be easier
//  * remove a distractor until none are present
//  * provide indentation
//  * combine blocks until 3 are left
Parsons.prototype.makeEasier = function() {
	var distractorToRemove = this.distractorToRemove();
	if (distractorToRemove !== undefined && !distractorToRemove.inSourceArea()) {
	    alert("Will remove an incorrect code block from answer area");
		this.removeDistractor(distractorToRemove);
		this.logMove("removedDistractor-" + distractorToRemove.hash());
	} else if (this.usesIndentation()) {
	    alert("Will provide indentation");
		this.removeIndentation();
		this.logMove("removedIndentation");
	} else {
		var numberOfBlocks = this.numberOfBlocks(false);
		if (numberOfBlocks > 3) {
		    alert("Will combine two blocks");
			this.combineBlocks();
			this.logMove("combinedBlocks");
		} /*else if(this.numberOfBlocks(true) > 3 && distractorToRemove !==  undefined) {
			alert("Will remove an incorrect code block from source area");
			this.removeDistractor(distractorToRemove);
			this.logMove("removedDistractor-" + distractorToRemove.hash());
		} */else {
			alert("There are only 3 correct blocks left.  You should be able to put them in order");
			this.canHelp = false;
		}
		//if (numberOfBlocks < 5) {
		//	this.canHelp = false;
		//	this.helpButton.disabled = true;
		//}
	}
};

// The "Help Me" button was pressed and the problem should be simplified
Parsons.prototype.helpMe = function() {
	this.clearFeedback();

	//this.helpCount = -1; // amount to allow for multiple helps in a row
	//if (this.helpCount < 0) {
	//	this.helpCount = Math.max(this.helpCount, -1); // min 1 attempt before more help
		//this.helpButton.disabled = true;
	//}

	// if less than 3 attempts
	if (this.numDistinct < 3)
	{
	   alert("You must make at least three distinct full attempts at a solution before you can get help");
	}
	// otherwise give help
    else
    {
     this.gotHelp = true;
	 this.makeEasier();
	}
};

/* =====================================================================
==== UTILITY ===========================================================
===================================================================== */

// Return a date from a timestamp (either mySQL or JS format)
Parsons.prototype.dateFromTimestamp = function(timestamp) {
	var date = new Date(timestamp);
	if (isNaN(date.getTime())) {
		var t = timestamp.split(/[- :]/);
		date = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
	}
	return date;
};

// A function for returning a shuffled version of an array
Parsons.prototype.shuffled = function(array) {
	var currentIndex = array.length;
	var returnArray = array.slice();
	var temporaryValue, randomIndex;
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		// And swap it with the current element.
		temporaryValue = returnArray[currentIndex];
		returnArray[currentIndex] = returnArray[randomIndex];
		returnArray[randomIndex] = temporaryValue;
	}
	return returnArray;
};

/* =====================================================================
==== KEYBOARD INTERACTION ==============================================
===================================================================== */

// When the user has entered the Parsons problem via keyboard mode
Parsons.prototype.enterKeyboardMode = function() {
	$(this.keyboardTip).show();
	$(this.sourceLabel).hide();
	$(this.answerLabel).hide();
	this.clearFeedback();
};

// When the user leaves the Parsons problem via keyboard mode
Parsons.prototype.exitKeyboardMode = function() {
	$(this.keyboardTip).hide();
	$(this.sourceLabel).show();
	$(this.answerLabel).show();
};

/* =====================================================================
==== VIEW ==============================================================
===================================================================== */

// Clear any feedback from the answer area
Parsons.prototype.clearFeedback = function() {
	$(this.answerArea).removeClass("incorrect correct");
	var children = this.answerArea.childNodes;
	for (var i = 0; i < children.length; i++) {
		$(children[i]).removeClass("correctPosition incorrectPosition indentLeft indentRight");
	}
	$(this.messageDiv).hide();
};

// Disable the interface
Parsons.prototype.disable = function () {
	// Disable blocks
	if (this.blocks !== undefined) {
		for (var i = 0; i < this.blocks.length; i++) {
			var block = this.blocks[i];
			block.disable();
		}
	}
	// Hide buttons
	$(this.checkButton).hide();
	$(this.resetButton).hide();
};

// Based on the moving element, etc., establish the moving state
//   rest: not moving
//   source: moving inside source area
//   answer: moving inside answer area
//   moving: moving outside areas
Parsons.prototype.movingState = function() {
	if (this.moving == undefined) {
		return "rest";
	}
	var x = this.movingX - window.pageXOffset;
	var y = this.movingY - window.pageYOffset;
	// Check if in answer area
	var bounds = this.answerArea.getBoundingClientRect();
	if (x >= bounds.left && (x <= bounds.right) && (y >= bounds.top) && (y <= bounds.bottom)) {
		return "answer";
	}
	// Check if in source area
	bounds = this.sourceArea.getBoundingClientRect();
	if (x >= bounds.left && (x <= bounds.right) && (y >= bounds.top) && (y <= bounds.bottom)) {
		return "source";
	}
	return "moving";
}

// Update the Parsons view
// This gets called when dragging a block
Parsons.prototype.updateView = function() {
	// Based on the new and the old state, figure out what to update
	var state = this.state;
	var newState = this.movingState();
	var updateSource = true;
	var updateAnswer = true;
	var updateMoving = newState == "moving";
	if (state == newState) {
		if (newState == "rest") {
			updateSource = false;
			updateAnswer = false;
		} else if (newState == "source") {
			updateAnswer = false;
		} else if (newState == "answer") {
			updateSource = false;
		} else if (newState == "moving") {
			updateAnswer = false;
			updateSource = false;
		}
	}
	var movingHeight;
	if (this.moving !== undefined) {
		// Must get height here as detached items don't have height
		movingHeight = $(this.moving.view).outerHeight(true);
		$(this.moving.view).detach();
	}

	var positionTop, width;
	var baseWidth = this.areaWidth - 22;

	// Update the Source Area
	if (updateSource) {
		positionTop = 0;
		var blocks = this.sourceBlocks();
		if (newState == "source") {
			var hasInserted = false;
			var movingBin = this.moving.pairedBin();
			var binForBlock = [];
			for (i = 0; i < blocks.length; i++) {
				binForBlock.push(blocks[i].pairedBin());
			}
			if (!binForBlock.includes(movingBin)) {
				movingBin = -1;
			}
			var insertPositions = [];
			if (binForBlock.length == 0) {
				insertPositions.push(0);
			} else {
				if (movingBin == -1) {
					insertPositions.push(0);
				} else if (binForBlock[0] == movingBin) {
					insertPositions.push(0);
				}
				for (i = 1; i < blocks.length; i++) {
					if (binForBlock[i - 1] == movingBin) {
						insertPositions.push(i);
					} else if (binForBlock[i] == movingBin) {
						insertPositions.push(i);
					} else if (movingBin == -1 && (binForBlock[i - 1] != binForBlock[i])) {
						insertPositions.push(i);
					}
				}
				if (movingBin == -1) {
					insertPositions.push(binForBlock.length);
				} else if (binForBlock[binForBlock.length - 1] == movingBin) {
					insertPositions.push(binForBlock.length);
				}
			}
			var x = this.movingX - this.sourceArea.getBoundingClientRect().left - window.pageXOffset - baseWidth / 2 - 11;
			var y = this.movingY - this.sourceArea.getBoundingClientRect().top - window.pageYOffset;
			for (i = 0; i < blocks.length; i++) {
				item = blocks[i];
				if (!hasInserted && insertPositions.includes(i)) {
					var testHeight = $(item.view).outerHeight(true);
					for (j = i + 1; j < blocks.length; j++) {
						if (insertPositions.includes(j)) {
							break;
						}
						testHeight += $(blocks[j].view).outerHeight(true);
					}
					if ((y - positionTop < (movingHeight + testHeight / 2)) || (i == insertPositions[insertPositions.length - 1])) {
						hasInserted = true;
						this.sourceArea.insertBefore(this.moving.view, item.view);
						$(this.moving.view).css({
							"left" : x,
							"top" : y - movingHeight / 2,
							"width" : baseWidth,
							"z-index" : 3
						});
						positionTop = positionTop + movingHeight;
					}
				}
				$(item.view).css({
					"left" : 0,
					"top" : positionTop,
					"width" : baseWidth,
					"z-index" : 2
				});
				positionTop = positionTop + $(item.view).outerHeight(true);
			}
			if (!hasInserted) {
				$(this.moving.view).appendTo("#" + this.counterId + "-source");
				$(this.moving.view).css({
					"left" : x,
					"top" : y - $(this.moving.view).outerHeight(true) / 2,
					"width" : baseWidth,
					"z-index" : 3
				});
			}
		} else {
			for (var i = 0; i < blocks.length; i++) {
				item =  blocks[i];
				$(item.view).css({
					"left" : 0,
					"top" : positionTop,
					"width" : baseWidth,
					"z-index" : 2
				});
				positionTop = positionTop + $(item.view).outerHeight(true);
			}
		}
		// Update the Paired Distractor Indicators
		for (i = 0; i < this.pairedBins.length; i++) {
			var bin = this.pairedBins[i];
			var matching = [];
			for (j = 0; j < blocks.length; j++) {
				block = blocks[j];
				if (block.matchesBin(bin)) {
					matching.push(block);
				}
			}
			var div = this.pairedDivs[i];
			if (matching.length == 0) {
				$(div).hide();
			} else {
				$(div).show();



				var height = -5;
				height += parseInt($(matching[matching.length - 1].view).css("top"));
				height -= parseInt($(matching[0].view).css("top"));
				height += $(matching[matching.length - 1].view).outerHeight(true);
				$(div).css({
					"left" : -6,
					"top" : $(matching[0].view).css("top"),
					"width" : baseWidth + 34,
					"height" : height,
					"z-index" : 1,
					"text-indent" : -30,
					"padding-top": (height-70)/2,
					"overflow": "visible",
					"font-size": 43,
					"vertical-align": "middle",
					"color": "#7e7ee7"
				});
				$(div).html("<span id= 'st' style = 'vertical-align: middle; font-weight: bold; font-size: 15px'>or</span>{");
			}
			if (matching.length == 1) {
				$(div).html("");
			}
		}
	}

	// Update the Answer Area
	if (updateAnswer) {
		var block, indent;
		positionTop = 0;
		width = this.areaWidth + this.indent * this.options.pixelsPerIndent - 22;
		var blocks = this.answerBlocks();
		if (newState == "answer") {
			var hasInserted = false;
			var x = this.movingX - this.answerArea.getBoundingClientRect().left - window.pageXOffset - baseWidth / 2 - 11;
			movingIndent = Math.round(x / this.options.pixelsPerIndent);
			if (movingIndent < 0) {
				movingIndent = 0;
			} else if (movingIndent > this.indent) {
				movingIndent = this.indent;
			} else {
				x = movingIndent * this.options.pixelsPerIndent;
			}
			var y = this.movingY - this.answerArea.getBoundingClientRect().top - window.pageYOffset;
			this.moving.indent = movingIndent;
			for (i = 0; i < blocks.length; i++) {
				block = blocks[i];
				if (!hasInserted) {
					if (y - positionTop < (movingHeight + $(block.view).outerHeight(true)) / 2) {
						hasInserted = true;
						this.answerArea.insertBefore(this.moving.view, block.view);
						$(this.moving.view).css({
							"left" : x,
							"top" : y - movingHeight / 2,
							"width" : baseWidth,
							"z-index" : 3
						});
						positionTop = positionTop + movingHeight;
					}
				}
				indent = block.indent * this.options.pixelsPerIndent;
				$(block.view).css({
					"left" : indent,
					"top" : positionTop,
					"width" : width - indent,
					"z-index" : 2
				});
				positionTop = positionTop + $(block.view).outerHeight(true);
			}
			if (!hasInserted) {
				$(this.moving.view).appendTo("#" + this.counterId + "-answer");
				$(this.moving.view).css({
					"left" : x,
					"top" : y - $(this.moving.view).outerHeight(true) / 2,
					"width" : baseWidth,
					"z-index" : 3
				});
			}
		} else {
			for (var i = 0; i < blocks.length; i++) {
				block = blocks[i];
				indent = block.indent * this.options.pixelsPerIndent;
				$(block.view).css({
					"left" : indent,
					"top" : positionTop,
					"width" : width - indent,
					"z-index" : 2
				});
				positionTop = positionTop + $(block.view).outerHeight(true);
			}
		}
	}

	// Update the Moving Area
	if (updateMoving) {
		// Add it to the lowest place in the source area
		movingBin = this.moving.pairedBin();
		if (movingBin == -1) {
			$(this.moving.view).appendTo("#" + this.counterId + "-source");
		} else {
			var before;
			blocks = this.sourceBlocks;
			for (i = 0; i < blocks.length; i++) {
				block = blocks[i];
				if (block.pairedBin() == movingBin) {
					before = i + 1;
				}
			}
			if (before == undefined || before == blocks.length) {
				$(this.moving.view).appendTo("#" + this.counterId + "-source");
			} else {
				this.sourceArea.insertBefore(this.moving.view, blocks[before].view);
			}
		}
		// Place in the middle of the mouse cursor
		$(this.moving.view).css({
			"left" : this.movingX - this.sourceArea.getBoundingClientRect().left - window.pageXOffset - ($(this.moving.view).outerWidth(true) / 2),
			"top" : this.movingY - this.sourceArea.getBoundingClientRect().top - window.pageYOffset - (movingHeight / 2),
			"width" : baseWidth,
			"z-index" : 3
		});
	}

	state = newState;
	this.state = state;
};

Parsons.prototype.addBlockLabels = function(blocks) {
	var bin = -1;
	var binCount = 0;
	var binChildren = 0;
	var blocksNotInBins = 0;
	for(var i = 0; i < blocks.length; i++) {
		if(blocks[i].pairedBin() == -1) {
			blocksNotInBins++;
		}
	}
	for (var i = 0; i < blocks.length; i++) {

		var currentBin = blocks[i].pairedBin();
		if(currentBin == -1 || currentBin != bin) {
			bin = currentBin;
			binChildren = 0;
			binCount++;
		}
		var label = "" + binCount + ((currentBin != -1) ? String.fromCharCode(97 + binChildren) : " ");
		if (binCount < 10 && blocksNotInBins + this.pairedBins.length >= 10) {
			label += " ";
		}
		blocks[i].addLabel(label, 0);
		binChildren++;
	}

	if(blocksNotInBins + this.pairedBins.length >= 10) {
		this.areaWidth += 5;
		$(this.sourceArea).css({
			'width' : $(this.sourceArea).width() + 5,
		});
		$(this.answerArea).css({
			'width' : $(this.answerArea).width() + 5,
		});
	}
}

// Put all the blocks back into the source area, reshuffling as necessary
Parsons.prototype.resetView = function() {
	// Clear everything
	this.clearFeedback();
	var scrollTop = document.body.scrollTop;
	var block;
	for (var i = 0; i < this.blocks.length; i++) {
		block = this.blocks[i];
		for(var j = 0; j < block.lines.length; j++) {
			var children = $(block.lines[j].view).find(".block-label");
			for(var c = 0; c < children.length; c++) {
				children[c].remove();
			}
		}
		block.destroy();
		$(this.blocks[i].view).detach();
	}
	delete this.blocks;
	this.blockIndex = 0;
	for (var i = 0; i < this.pairedDivs.length; i++) {
		$(this.pairedDivs[i]).detach();
	}
	$(this.sourceArea).attr("style", "");
	$(this.answerArea).removeClass();
	$(this.answerArea).attr("style", "");
	this.noindent = this.options.noindent;
	// Reinitialize
	if(this.hasSolved) {

		this.checkCount = 0;
		this.numDistinct = 0;
		this.hasSolved = false;
		if (this.options.adaptive) {
			this.canHelp = true;
		}
		//this.helpCount = -3; // enable after 3 failed attempts
		//this.helpButton.disabled = true;
		localStorage.setItem(this.adaptiveId + "Problem", this.divid);
		localStorage.setItem(this.adaptiveId + this.divid + "Count", this.checkCount);
		localStorage.setItem(this.adaptiveId + "Solved", false);
	}

	this.initializeAreas(this.blocksFromSource(), [], {});
	this.initializeInteractivity();
	document.body.scrollTop = scrollTop;
};

$(document).bind("runestone:login-complete", function () {
	$("[data-component=parsons]").each(function (index) {
		if ($(this).closest('[data-component=timedAssessment]').length == 0) {
			prsList[this.id] = new Parsons({"orig": this, "useRunestoneServices": eBookConfig.useRunestoneServices});
		}
	});
});

if (typeof component_factory === 'undefined') {
    component_factory = {}
}
component_factory['parsons'] = function(opts) { return new Parsons(opts)}
