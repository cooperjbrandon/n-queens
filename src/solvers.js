/*           _                    
   ___  ___ | |_   _____ _ __ ___ 
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n){
  var solution = new Array(n);
  for (var r = 0; r < solution.length; r++){
    solution[r] = new Array (n);
    for (var k = 0; k < solution[r].length; k++){
      solution[r][k] = 0;
    }
  }
  var usedColumn = [];
  for (var i = 0; i < solution.length; i++){
    var c = Math.floor(Math.random()*n);
    while (_.contains(usedColumn, c)) {
      c = Math.floor(Math.random()*n);
    }
    solution[i][c] = 1;
    usedColumn.push(c);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n){
  var result = [];
  var notFun = function(n, col, badColumn){
    for (var i = 0; i < col; i++){
      if (!_.contains(badColumn,i)){
        var copy = badColumn.slice(0);
        copy.push(i);
        if (n !== 1) {
          notFun(n-1, col, copy);
        } else {
          result.push(copy);
        }
      }
    }
  };
  notFun(n, n, []);

  return result.length;

};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
  var result = [];
  var notFun = function(n, col, badColumn, badMaj, badMin, rowCounter){
    for (var i = 0; i < col; i++){
      if (!_.contains(badColumn,i) && !_.contains(badMaj,i-rowCounter[0]) && !_.contains(badMin, i+rowCounter[0])){
        var copy = badColumn.slice(0);
        var copyMaj = badMaj.slice(0);
        var copyMin = badMin.slice(0);
        var copyCounter = rowCounter.slice(0);
        copy.push(i);
        copyMaj.push(i-copyCounter[0]);
        copyMin.push(i+copyCounter[0]);
        if (n !== 1) {
          ++copyCounter[0];
          notFun(n-1, col, copy, copyMaj, copyMin, copyCounter);
        } else {
          // debugger;
          result.push(copy);
        }
      }
    }
  };
  notFun(n, n, [], [], [], [0]);
  // console.log('Number of solutions for ' + n + ' queens:',);

  var solution = new Array(n);
  for (var r = 0; r < solution.length; r++){
    solution[r] = new Array (n);
    for (var k = 0; k < solution[r].length; k++){
      solution[r][k] = 0;
    }
    solution[r][result[r]] = 1;
  }
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  var makeCopies = function (badColumn, badMaj, badMin, rowCounter) {
    var copyObj = {};

    copyObj.usedColumn = badColumn.slice(0);
    copyObj.majorD = badMaj.slice(0);
    copyObj.minorD = badMin.slice(0);
    copyObj.rowCounter = rowCounter.slice(0);

    return copyObj;
  };

  var pushData = function(copyObj, i) {
    copyObj.usedColumn.push(i);
    copyObj.majorD.push(i-copyObj.rowCounter[0]);
    copyObj.minorD.push(i+copyObj.rowCounter[0]);
  };

  var result = [];
  var notFun = function(n, col, badColumn, badMaj, badMin, rowCounter){
    for (var i = 0; i < col; i++){
      if (!_.contains(badColumn,i) && !_.contains(badMaj,i-rowCounter[0]) && !_.contains(badMin, i+rowCounter[0])){
        var copyObj = makeCopies(badColumn, badMaj, badMin, rowCounter);
        pushData(copyObj, i);
        if (n !== 1) {
          ++copyObj.rowCounter[0];
          notFun(n-1, col, copyObj.usedColumn, copyObj.majorD, copyObj.minorD, copyObj.rowCounter);
        } else {
          result.push(copyObj.usedColumn);
        }
      }
    }
  };

  notFun(n, n, [], [], [], [0]);

  // console.log('Number of solutions for ' + n + ' queens:',);
  return result.length;
};


