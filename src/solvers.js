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
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n){
  var result = [];
  var fun = function(n, col, badColumn){
    for (var i = 0; i < col; i++){
      if (!_.contains(badColumn,i)){
        var copy = badColumn.slice(0);
        copy.push(i);
        if (n !== 1) {
          fun(n-1, col, copy);
        } else {
          result.push(copy);
        }
      }
    }
  };
  fun(n, n, []);
  // var solution = new Array(n);
  // fun(n, n, []);
  // for (var r = 0; r < solution.length; r++){
  //   solution[r] = new Array (n);
  //   for (var k = 0; k < solution[r].length; k++){
  //     solution[r][k] = 0;
  //   }
  // }
  // var usedColumn = []; // 0
  // for (var i = 0; i < solution.length; i++){
  //   var tempUsedColumn = new Array(n);
  //   for (var q = 0; q < solution.length; q++){
  //     if(!_.contains(usedColumn, q)){
  //       solution[i][q] = 1;
  //       usedColumn.push(q);
  //     }
  //   }
  // }


  return result.length;

};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
