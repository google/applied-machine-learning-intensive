// matrixeq.js - By: Dr. Wayne Brown, Fall 2015, revised Fall 2017
// Description: functions to manipulate matrices on a web page

/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 C. Wayne Brown
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// Require all variables to be defined before they are used.
"use strict";

//=========================================================================
// Manipulate the matrixeq_container elements from a matrixeq directive:
//  - performs matrix operations: multiply and assignment
//  - removes generated matrixeq_container elements when the "X" button is selected
//  - simplifies matrix_table elements when the "-" button is selected
//=========================================================================

function Matrixeq_directive(element, action) {

  //-----------------------------------------------------------------------
  function _getMatrix(theSpan) {
    let columns, r, c, text, rows, row, number_rows;
    let element, matrix, value, value_text, input_box;

    // The matrix is organized by columns
    columns = theSpan.children;

    number_rows = columns[0].children.length;

    // Create an empty matrix that has the correct number of rows
    matrix = [];
    for (r = 0; r < number_rows; r += 1) {
      row = [];
      matrix.push(row);
    }

    for (c = 0; c < columns.length; c += 1) {
      rows = columns[c].children;

      for (r = 0; r < rows.length; r += 1) {
        element = rows[r];
        text = element.innerHTML;

        if (text.substring(0, 6) === '<input') {
          input_box = element.children;
          value_text = input_box[0].value;
        } else {
          text = text.replace('<br>', '');
          value_text = text;
        }

        // Reduce numbers to their least digit format
        value = Number(value_text);
        if (isNaN(value)) {
          value = value_text;
        } else {
          value_text = value.toString();
        }

        // If there is a HTML <sup>, replace with a unique marker (qqqq)
        value_text = value_text.replace(/<sup>(.*?)<\/sup>/g, "qqqq");

        matrix[r].push(value_text);
      }
    }

    return matrix;
  }

  /** ---------------------------------------------------------------------
   * If an expression starts and ends with ()'s, remove the parentheses.
   * @param ex {string} the expression to evaluate
   * @returns {string} the original string with unnneeded ()'s removed.
   * @private
   */
  function _removeParentheses(ex) {
    if (ex.charAt(0) === '(') {
      let index = _findMatching(ex, 1, '(', ')');
      if (index === ex.length-1) {
        ex = ex.substr(1,ex.length-2);
      }
    }
    return ex;
  }

  //-----------------------------------------------------------------------
  function _findMatching(t, index, start_ch, end_ch) {
    let end, nested, j;

    end = -1;
    j = index + 1;
    nested = 0;
    while (j < t.length) {
      if (t.charAt(j) === start_ch) {
        nested += 1;
      } else if (t.charAt(j) === end_ch) {
        if (nested === 0) {
          end = j;
          break;
        }
        nested -= 1;
      }
      j += 1;
    }
    return end;
  }

  //-----------------------------------------------------------------------
  function _createTerm(v) {

    v = _removeParentheses(v.trim());

    if (v.indexOf('+') >= 1 || v.indexOf('-') >= 1 || v.indexOf('/') >= 1) {
      v = '(' + v + ')';
    }
    return v;
  }

  //-----------------------------------------------------------------------
  function _matrixMultiply(m1, m2) {
    let r1, c1, c2, r, c, value_text, j, v1, v2, row;

    r1 = m1.length;
    c1 = m1[0].length;
    c2 = m2[0].length;

    let result = [];
    for (r = 0; r < r1; r += 1) {
      row = [];
      for (c = 0; c < c2; c += 1) {
        value_text = "";
        for (j = 0; j < c1; j += 1) {
          v1 = m1[r][j];
          v2 = m2[j][c];
          value_text += _createTerm(v1) + '*' + _createTerm(v2);
          if (j < c1 - 1) {
            value_text += " + ";
          }
        }
        row.push(value_text);
      }
      result.push(row);
    }

    return result;
  }

  //-----------------------------------------------------------------------
  function _buildHTMLmatrix(m, id1, id2) {
    let str, nRows, nCols, r, c, id, randomInt;

    // Build the HTML for the matrix
    randomInt = parseInt(Math.random() * 10000);
    id = "M" + randomInt.toString();

    str = '<span id="' + id + '" class="matrix_table"> <!-- ' + id1 + '*' + id2 + ' -->';

    nRows = m.length;
    nCols = m[0].length;

    // Create the HTML code for the matrix
    for (c = 0; c < nCols; c += 1) {
      str += '<span class="matrix_column">'; // start column

      for (r = 0; r < nRows; r += 1) {
        str += '<span onmouseover="Matrixeq_show(this, true);" onmouseleave="Matrixeq_show(this, false);">' + m[r][c] + '<br /></span>';
      }

      str += '</span>'; // ends "matrix_column"
    }
    str += '</span>'; // ends "matrix_table"

    // Replace all 'qqqq' text values with a superscript HTML tag
    str = str.replaceAll('qqqq', '<sup>-1</sup>');

    return str;
  }

  //-----------------------------------------------------------------------
  function _multiplyMatrix() {
    let equation, m1, m2, M1, M2, result, result_element;
    let j, children, num_children, new_equation, next_element;
    let matches, background_color, text_color;

    equation = element.parentNode;
    m1 = element.previousSibling;
    m2 = element.nextSibling;

    M1 = _getMatrix(m1);
    M2 = _getMatrix(m2);

    result = _matrixMultiply(M1, M2);

    background_color = $(m1).css('background-color');
    text_color = $(m1).css('color');

    result_element = _buildHTMLmatrix(result, $(m1).attr('id'), $(m2).attr('id'));

    // Combine the original equation, replacing the two matrices with the result
    new_equation = "<!-- matrixeq start -->\n";
    new_equation += "<div class='matrixeq_container' style='background-color: "
                 + background_color + "; color: " + text_color + ";'>\n";

    children = $(equation).children();
    num_children = children.size();
    j = 0;
    while (j < num_children) {
      if (j < num_children - 2
        && children[j] == m1 && children[j + 2] == m2) {
          new_equation += result_element;
          j += 2;
      } else {
        next_element = children[j].outerHTML;
        matches = next_element.match(/id="(.*?)"/);
        if (matches) {
          next_element = next_element.replace(matches[1], matches[1] + j.toString());
        }
        new_equation += next_element;
        if ($(next_element).attr("class") === 'matrix_label') {
          // Don't copy the buttons into this matrix equation
          break;
        }
      }
      j += 1;
    }

    // Add 2 buttons to the end
    new_equation += "<span class='matrix_column'>";
    new_equation += "<button onclick='Matrixeq_directive(this, \"reduce\");'>-</button>&nbsp";
    new_equation += "<button onclick='Matrixeq_directive(this, \"delete\");'>X</button>";
    new_equation += "</span>";

    new_equation += "</div>\n";
    new_equation += "<!-- matrixeq end -->\n";

    $(new_equation).insertAfter(equation);
  }

  //-----------------------------------------------------------------------
  function _reduce() {
    let buttons_parent, equation, new_equation, button_children;
    let j, children, num_children, next_element;

    // element is the "reduce button" which was clicked on.

    // Get the node that contains the entire equation.
    buttons_parent = element.parentNode;
    equation = buttons_parent.parentNode;

    new_equation = $(equation).clone();

    children = $(new_equation).children();
    num_children = children.size();
    j = 0;
    while (j < num_children) {
      next_element = children[j];
      if ($(next_element).attr("class") === 'matrix_table') {
        _reduceMatrixTerms(next_element);
      }
      j += 1;

    }

    // Remove the "reduce button" from the new equation
    button_children = $(children[num_children-1]).children();
    $(button_children[0]).remove();

    $(new_equation).insertAfter(equation);
  }

  //-----------------------------------------------------------------------
  // Calculate the entire left and right side of the equation.
  function _assignment() {
    let equation, new_equation, children, num_children;
    let j, op, op_type, m1, m2, result, result_element, matrix_element;
    let last_child, delete_button;

    equation = element.parentNode;

    // Create a new equation to perform the calculations on.
    new_equation = $(equation).clone();
    children = $(new_equation).children();
    num_children = children.size();

    // Make sure we have at least two matrices and one operator
    if (num_children < 3) {
      return;
    }

    j = 1;
    while (j < num_children - 2) {
      op = children[j];
      if ($(op).attr('class') === 'matrix_operator') {

        op_type = op.innerText.trim();
        if (op_type === '*') {
          if ($(children[j + 1]).attr('class') === 'matrix_table' &&
              $(children[j - 1]).attr('class') === 'matrix_table') {
            m1 = _getMatrix(children[j - 1]);
            m2 = _getMatrix(children[j + 1]);
            result = _matrixMultiply(m1, m2);
            result_element = _buildHTMLmatrix(result, '-', '-');
            matrix_element = $.parseHTML(result_element);
            _reduceMatrixTerms(matrix_element[0]);

            $(matrix_element[0]).insertAfter(children[j + 1]);

            $(children[j + 1]).remove();
            $(children[j]).remove();
            $(children[j - 1]).remove();

            j = j-1;
            children = $(new_equation).children();
            num_children = children.size();
          }
        }
      }
      j = j + 1;
    }


    last_child = children[num_children-1];
    if ($(last_child).attr("class") !== 'matrix_column') {
      // Add delete button to the end
      delete_button = $.parseHTML("<span class='matrix_column'>" +
                                  "<button onclick='Matrixeq_directive(this, \"delete\");'>X</button>" +
                                  "</span>");
      $(delete_button).insertAfter(last_child)
    }

    $(new_equation).insertAfter(equation);
  }

  let operators  = ['+','-','*','/','^'];
  let precedence = [ 1,  1,  2,  2,  3 ];

  /** ---------------------------------------------------------------------
   * Given an array of tokens from an expression, find the minus signs that
   * were parsed as operators and reattach them to the number or symbol they
   * should be related to.
   * @param tokens {Array} an array of tokens parsed from an arithmetic expression
   * @return new_tokens {Array} an array of tokens parsed from an arithmetic expression
   * @private
   */
  function _fixMinusSigns(tokens) {
    let new_tokens = [];
    let j = 0;
    while (j < tokens.length) {
      if (tokens[j] === '-') {
        if (j === 0 ||
            tokens[j-1] === '(' ||
            operators.indexOf(tokens[j-1]) > -1) {
          // Treat this minus sign as a unary operator
          if (tokens[j+1] === '(') {
            new_tokens.push("-1");
            new_tokens.push("*");
            j += 1;
          } else {
            new_tokens.push(_negative(tokens[j + 1]));
            j += 2;
          }
        } else {
          // The negative sign is an operator
          new_tokens.push(tokens[j]);
          j++;
        }
      } else {
        // Not a minus sign
        new_tokens.push(tokens[j]);
        j++;
      }
    }
    return new_tokens;
  }

  /** ---------------------------------------------------------------------
   * Convert an arithmetic expression in infix format to a postfix format.
   * Modified from: https://github.com/miguelmota/infix-to-postfix/blob/master/infix-to-postfix.js
   * @param ex {string} a string that contains the expression.
   * @returns {Array} the arithmetic expression as an array of operands and operators
   * @private
   */
  function _infixToPostfix(ex) {
    let result = [];
    let stack = [];
    let operator, op_index, op_precedence, stack_op, stack_precedence, index;
    // parsing tokens         operator--     function(call)----   number-----------------   variable--------------------
    let tokens = ex.match(/(?:[()+\-*/^])|(?:[A-Za-z]+\(-?\w*\))|(-?(?:\d+\.?\d*|-?\.\d*))|(-?([A-Za-z][A-Za-z0-9_\/\']*))/gi);
    let containsInvalidChars = /[^()+\-*/^0-9.A-Za-z_\'\s]/gi.test(ex);

    if (containsInvalidChars) {
      console.log("Expression contains invalid characters: ", ex);
      return ex;
    }

    if (Array.isArray(tokens)) {
      // Fix the unary minus signs; all negative signs were initially parsed as operators
      tokens = _fixMinusSigns(tokens);

      for (let j = 0; j < tokens.length; j++) {
        let token = tokens[j].trim();

        op_index = operators.indexOf(token);
        if (op_index > -1) {
          op_precedence = precedence[op_index];
          while (stack.length > 0) {
            stack_op = stack[stack.length-1];
            index = operators.indexOf(stack_op);
            if (index === -1) break; // found a ( or )

            stack_precedence = precedence[index];
            if (op_precedence > stack_precedence) break;

            result.push(stack.pop());
          }
          stack.push(token);

        } else if (token === '(') {
          stack.push(token);

        } else if (token === ')') {
          operator = stack.pop();
          while (operator !== '(') {
            result.push(operator);
            operator = stack.pop();
          }

        } else if (token) {
          result.push(token);
        }
      }
    }

    while (stack.length > 0) {
      result.push(stack.pop());
    }

    return result;
  }

  /** ---------------------------------------------------------------------
   * @param str {string} the string to test
   * @returns {boolean} TRUE if the string can be converted to a number
   * @private
   */
  function _isNumber(str) {
    return ! isNaN(Number(str));
  }

  /** ---------------------------------------------------------------------
   * @param str {string} the string to convert
   * @returns {string} a string where the value is made negative
   * @private
   */
  function _negative(str) {
    let result;
    if (_isNumber(str)) {
      result = Number(str) * -1;
      result = result.toString();
    } else {
      str = _createTerm(str.trim());
      if (str.charAt(0) === '-') {
        result = str.substr(1);
      } else {
        result = "-" + str;
      }
    }
    return result;
  }

  /** ---------------------------------------------------------------------
   * Given a number, convert it to a string.
   * @param num {number}
   * @returns {string}
   * @private
   */
  function _toNumberString(num) {
    let result = num.toFixed(2);
    let n = result.length-1;
    if (n >= 1 && result.charAt(n) === "0" && result.charAt(n-1) === "0") {
      result = num.toFixed(0);
    }
    return result;
  }

  /** ---------------------------------------------------------------------
   * Add two values together, either symbolically or numerically.
   * @param a {string} first operand
   * @param b {string} second operand
   * @private
   */
  function _add(a,b) {
    let result = _createTerm(a) + " + " + _createTerm(b);  // default answer
    let a_is_numeric = _isNumber(a);
    let b_is_numeric = _isNumber(b);

    if (a_is_numeric && b_is_numeric) {
      result = Number(a) + Number(b);
      result = _toNumberString(result);
    } else if (a_is_numeric && a === '0') {
      result = _createTerm(b);
    } else if (b_is_numeric && b === '0') {
      result = _createTerm(a);
    }
    return result;
  }

  /** ---------------------------------------------------------------------
   * Subtract two values together, either symbolically or numerically.
   * @param a {string} first operand
   * @param b {string} second operand
   * @private
   */
  function _subtract(a,b) {
    let result = _createTerm(a) + " - " + _createTerm(b);  // default answer
    let a_is_numeric = _isNumber(a);
    let b_is_numeric = _isNumber(b);

    if (a_is_numeric && b_is_numeric) {
      result = Number(a) - Number(b);
      result = _toNumberString(result);
    } else if (a_is_numeric && a === '0') {
      result = _negative(b);
    } else if (b_is_numeric && b === '0') {
      result = _createTerm(a);
    }
    return result;
  }

  /** ---------------------------------------------------------------------
   * Multiply two values together, either symbolically or numerically.
   * @param a {string} first operand
   * @param b {string} second operand
   * @private
   */
  function _multiply(a,b) {
    let result = _createTerm(a) + "*" + _createTerm(b);  // default answer
    let a_is_numeric = _isNumber(a);
    let b_is_numeric = _isNumber(b);

    if (a_is_numeric && b_is_numeric) {
      result = Number(a) * Number(b);
      result = _toNumberString(result);
    } else if (a_is_numeric){
      if (a === '0') {
        result = "0";
      } else if (a === '1') {
        result = _createTerm(b);
      } else if (a === '-1') {
        result = _negative(b);
      }
    } else if (b_is_numeric) {
      if (b === '0') {
        result = "0";
      } else if (b === '1') {
        result = _createTerm(a);
      } else if (b === '-1') {
        result = _negative(a);
      }
    }
    return result;
  }

  /** ---------------------------------------------------------------------
   * Divide two values, either symbolically or numerically.
   * @param a {string} first operand
   * @param b {string} second operand
   * @private
   */
  function _divide(a,b) {
    let result = _createTerm(a) + "/" + _createTerm(b);  // default answer
    let a_is_numeric = _isNumber(a);
    let b_is_numeric = _isNumber(b);

    if (a_is_numeric && b_is_numeric) {
      result = Number(a) / Number(b);
      result = _toNumberString(result);
    } else if (a_is_numeric && a === '0'){
      result = "0";
    } else if (b_is_numeric) {
      if (b === '0') {
        result = "infinity";
      } else if (b === '1') {
        result = _createTerm(a);
      } else if (b === '-1') {
        result = _negative(a);
      }
    }
    return result;
  }

  /** ---------------------------------------------------------------------
   * Raise a number to a power, either symbolically or numerically.
   * @param a {string} first operand
   * @param b {string} second operand
   * @private
   */
  function _power(a,b) {
    let result = _createTerm(a) + "^" + _createTerm(b);  // default answer
    let a_is_numeric = _isNumber(a);
    let b_is_numeric = _isNumber(b);

    if (a_is_numeric && b_is_numeric) {
      result = Math.pow(Number(a), Number(b));
      result = _toNumberString(result);
    } else if (a_is_numeric){
      if (a === '0') {
        result = "0";
      } else if (a === '1') {
        result = "1";
      }
    } else if (b_is_numeric) {
      if (b === '0') {
        result = "1";
      } else if (b === '1') {
        result = _createTerm(a);
      }
    }
    return result;
  }

  /** ---------------------------------------------------------------------
   * Evaluate an arithmetic expression that is in postfix format.
   * @param postfix {Array} an arithmetic expression in postfix format.
   * @returns {string}
   * @private
   */
  function _evalPostfix(postfix) {
    let result = [];
    let a, b, operator;
    for(let j = 0; j < postfix.length; j++) {
      if (operators.indexOf(postfix[j]) > -1) {
        operator = postfix[j];
        // try to perform the operation
        b = result.pop();
        a = result.pop();
        if (_isNumber(a) || _isNumber(b)) {
          switch (operator) {
            case "+": result.push(     _add(a,b)); break;
            case '-': result.push(_subtract(a,b)); break;
            case '*': result.push(_multiply(a,b)); break;
            case '/': result.push(  _divide(a,b)); break;
            case '^': result.push(   _power(a,b)); break;
            default: result.push( a.toString() + operator + b.toString() );
          }
        } else {
          // One or both of the operands are symbolic
          if (operator === '+' || operator === '-') {
            operator = " " + operator + " ";
          }
          result.push( _createTerm(a) + operator + _createTerm(b) );
        }
      } else {
        // the value is an operand, so push it on the stack
        result.push(postfix[j]);
      }
    }

    if(result.length > 1) {
      return "error in '" + postfix + "'";
    } else {
      return _removeParentheses(result[0]);
    }
  }

  //-----------------------------------------------------------------------
  function _reduceTerm(t) {

    // The "t" might contain HTML code like <sup>. Replace with a unique place holder.
    let t_new = t.replace(/<sup>(.*?)<\/sup>/g, "qqqq");

    // Remove any "new line", <br> tags.
    t_new = t_new.replace(/<br>/g, "");

    //console.log("t = ", t);
    //console.log("t_new = ", t_new);

    // Convert the string expression to a array of tokens in postfix order.
    let postfix = _infixToPostfix(t_new);
    //console.log("postfix = ", postfix);

    // Evaluate the expression and return a simplified string expression.
    let result = _evalPostfix(postfix);
    //console.log("result  = ", result);

    // Replace the "qqqq" place holder with a superscript.
    result = result.replace(/qqqq/g, "<sup>-1</sup>");
    //console.log("result = ", result);

    if (result.length < t.length) {
      return result;
    } else {
      return t;
    }
  }

  //-----------------------------------------------------------------------
  // m is an HTML element that contains a matrix
  function _reduceMatrixTerms(m) {
    let columns, c, row, r, new_text;

    columns = $(m).children();
    for (c = 0; c < columns.size(); c += 1) {
      row = $(columns[c]).children();
      for (r = 0; r < row.size(); r += 1) {
        new_text = _reduceTerm($(row[r]).html());
        //console.log('reduce: ', $(row[r]).text(), ' to ', new_text);
        if (r < row.size() - 1) {
          new_text += "<br>";
        }
        $(row[r]).html(new_text);
      }
    }
  }

  //-----------------------------------------------------------------------
  function _reduceTerms() {
    let span, equation, children, num_children, j;

    span = element.parentNode;
    equation = span.parentNode;

    children = $(equation).children();
    num_children = children.size();
    for (j = 0; j < num_children; j += 1) {
      if ($(children[j]).attr("class") === "matrix_table") {
        _reduceMatrixTerms(children[j]);
      }
    }
  }

  //-----------------------------------------------------------------------
  function _deleteEquation() {
    let span, equation;

    span = element.parentNode;
    equation = span.parentNode;
    $(equation).remove();
  }

  //-----------------------------------------------------------------------
  // console.log(element);

  if (action === undefined) {
    let operator = element.innerText.trim();

    if (operator === '*') {
      _multiplyMatrix();
    } else if (operator === '=' || operator === '!=') {
      _assignment();
    }
  } else {
    if (action === "reduce") {
      _reduce();
      $(element).remove(); // the reduce button
    } else if (action === "delete") {
      _deleteEquation();
    }
  }
} // end Matrixeq_directive

//=========================================================================
function Matrixeq_show(element, highlight) {

  let j, r, c, column, column_children, all_columns, equation, content, matches;
  let id1, id2, all_columns1, all_columns2, rows;
  let left, right;
  let background_color_left, background_color_right;

  // Determine which row the element is on
  r = -1;
  column = element.parentNode;
  column_children = column.children;
  for (j = 0; j < column_children.length; j += 1) {
    if (column_children[j] === element) {
      r = j;
      break;
    }
  }

  // Determine which column the element is on
  c = -1;
  equation = column.parentNode;
  all_columns = equation.children;
  for (j = 0; j < all_columns.length; j += 1) {
    if (all_columns[j] === column) {
      c = j;
      break;
    }
  }

  // Get the two original matrices that were multiplies for this matrix
  content = $(equation).html();
  matches = content.match(/<!-- (.*?)\*(.*?) -->/);
  id1 = matches[1];  // highlight row
  id2 = matches[2];  // highlight column

  left = $('#' + id1);
  right = $('#' + id2);

  background_color_left = left.css('background-color');
  background_color_right = right.css('background-color');

  all_columns1 = left.children();
  all_columns2 = right.children();

  if (highlight) {
    for (j = 0; j < all_columns1.size(); j += 1) {
      rows = $(all_columns1[j]).children();
      $(rows[r]).css("background-color", "LightBlue");
    }
    $(all_columns2[c]).css("background-color", "LightBlue");
  } else {
    for (j = 0; j < all_columns1.size(); j += 1) {
      rows = $(all_columns1[j]).children();
      $(rows[r]).css("background-color", background_color_left);
    }
    $(all_columns2[c]).css("background-color", background_color_right);
  }

}

