

$(() => {

  // ================ VARIABLES =============
  let player1Score = 0;
  let player2Score = 0;
  let round = 0;
  let clickCount = 0;
  let player1 = '';
  let player2 = '';
  let xPlayer = '';
  let oPlayer = '';
  let currentPlayer = '';
  const $modalEndGame = $('#modal-endGame');

  // =============== FUNCTIONS =================

  // set initial info to start game
  const startGame = () => {
    // assign current player
    currentPlayer = xPlayer;
    // send score info to info board
    $('#player1Score').text(`${player1} : ${player1Score}`)
    $('#player2Score').text(`${player2} : ${player2Score}`)
    // send current player text to info board
    $('#playerTurn').text(currentPlayer);
    // enable click function on board
    $('.box').unbind().on('click', boxClicks);
  }

  const switchPlayerTurn = () => {
    if(currentPlayer === xPlayer) {
      currentPlayer = oPlayer;
      $('#playerTurn').text(currentPlayer);
    } else {
      currentPlayer = xPlayer;
      $('#playerTurn').text(currentPlayer);
    }
  }

  // change player symbols for new game
  const switchPlayerSymbols = () => {
    // variable to hold previous player assigned to X symbol
    let prevXPlayer = xPlayer;
    // re-assign xPlayer to prev o player
    xPlayer = oPlayer;
    // send info to symbol assignment h2s
    $('#xPlayerH2').text(`X : ${xPlayer}`);
    // re-assign oPlayer to prev x player
    oPlayer = prevXPlayer;
    // send info to symbol assignment h2s
    $('#oPlayerH2').text(`O : ${oPlayer}`);
    return;
  }

  // function of clicking on a box
  const boxClicks = (player) => {
      // variable for sender element
      let clicked = $(event.target)
      // variable for sender row
      let row = '#'+clicked.parent().attr('id')
      // variable for sender col
      let col = clicked.index()
      // variable for sender symbol
      let symbol = clicked.text()
      // check if sender symbol is X or O
      if(symbol !== 'X' && symbol !== 'O') {
        if(currentPlayer === xPlayer) {
          // assign symbol x value
          symbol = 'X'
          // assign symbol to sender text
          clicked.text(symbol)
          clicked.addClass('animation');
        } else if(currentPlayer === oPlayer) {
          // assign symbol o value
          symbol = 'O'
          // assign symbol to sender text
          clicked.text(symbol)
          clicked.addClass('animation');
        }

        switchPlayerTurn();
        if(checkRow(row, col, symbol) === true) {
          setTimeout(openWinModal(),5000); // setTimeouts aren't working :(
          return;
        }
        if(checkCol(row, col, symbol) === true) {
          setTimeout(openWinModal(),5000);
          return;
        };
        if(checkDiagonals(row, col, symbol) === true) {
          setTimeout(openWinModal(),5000);
          return;
        };
        if(checkDrawConditions() === true) {
          setTimeout(openDrawModal(),2000);
          return;
        }

      } else {
        $(clicked).addClass('animation')
        alert('Sorry, that space is already in play. Please choose another')
      }
  }

  const removeAnimateClass = (clicked) => {
    $(clicked).removeClass('animation');
  }

  // check row of clicked box for win conditions
  const checkRow = (row, col, symbol) => {
    // find row to the right
    let rightAdj = col + 1
    // check if sender index + 1 is 3 to prevent out of range value.
        // I found I did not need to do this going to the left, as a -1 index goes to the last col of the array being searched!!!
    if(rightAdj === 3) {
      // if so check index 0 of row
      rightAdj = 0
    }
    // check if both symbols in the columns to the left and right match the sender symbol.
    if($(row).children().eq(col - 1).text() === symbol && $(row).children().eq(rightAdj).text() === symbol) {
      let linePosition = '';
      if(getRowIndex(row) === 1) {
        linePosition = '100px'
      }
      if(getRowIndex(row) === 2) {
        linePosition = '250px'
      }
      if(getRowIndex(row) === 3) {
        linePosition = '400px'
      }
      $('#row').css('display', 'block');
      $('#row').css('top', linePosition);
      // if so, you win!
      return true;
      // openWinModal();
      // trigger modal
    }
  }

  // check column of clicked box for win conditions
  const checkCol = (row, col, symbol) => {
    // get row index from rowID
    let rowIndex = getRowIndex(row);
    // find row bellow sender row
    let underRow = rowIndex + 1;
    // find row above sender row
    let overRow = rowIndex - 1;
    // check if under row is outside grid range, if so set it to 1
    if(underRow === 4) {
      underRow = 1;
      // check if over row is out of range, if so set it o 3
    } else if (overRow === 0) {
      overRow = 3;
    }

    // check if sender symbols match those of rows 'above' and 'below'
    if($('#row'+underRow.toString()).children().eq(col).text() === symbol && $('#row'+overRow.toString()).children().eq(col).text() === symbol) {
      const colWinLineDiv = $('<div>').attr('id','col');
      if(col === 0) {
        //assign column win line css
        $('.box.top.left').append(colWinLineDiv)
      }
      if(col === 1) {
        //assign column win line css
        $('.box.top.center').append(colWinLineDiv)
      }
      if(col === 2) {
        //assign column win line css
        $('.box.top.right').append(colWinLineDiv)
      }
      // if so, you win!
      return true;
      // trigger modal
    }
  }

  // check diagonals associated with the clicked box for win conditions
  const checkDiagonals = (row, col, symbol) => {
    // get row index from rowID
    let rowIndex = getRowIndex(row);
    // find row bellow sender row
    let underRow = rowIndex + 1;
    // find row to the right
    let rightAdj = col + 1
    // find row above sender row
    let overRow = rowIndex - 1;
    // check for unwinable diagonals
    if(eliminateUnwinableDiagonals(rowIndex, col) === true) {
      return;
    };
    // check if underRow row is outside grid range
    if(underRow === 4) {
      // if so set it to 1
      underRow = 1;
      // if col is 2 we need to go to the far right
      if(col === 2) {
        rightAdj = 0;
      }
      // check if over row is out of range
    } else if (overRow === 0) {
      // if so set it o 3
      overRow = 3;
      // if col is 0 we need to go to the far rigth
      if(col === 2) {
        rightAdj = 0;
      }
    }
    //check bottom left to top right diagonal win conditions
    if($('#row'+underRow.toString()).children().eq(rightAdj).text() === symbol && $('#row'+overRow.toString()).children().eq(col - 1).text() === symbol) {
      // eliminate win on top left to bottom right if sending box is row 1 col 2
      if((rowIndex === 1 && col === 2)|| (rowIndex === 3 && col === 0)) {
        return false;
      }
      // change css display
      $('#diagonal').css('display','inherit');
      // apply appropriate line rotation
      $('#diagonal').css({'transform':'translateY(245px) translateX(-50px) rotate(45deg)'})
      //trigger modal
      return true;
    }
    // check top left to bottom right diagonal win conditions
    if($('#row'+overRow.toString()).children().eq(rightAdj).text() === symbol && $('#row'+underRow.toString()).children().eq(col - 1).text() === symbol) {
      // eliminate win on bottom left to top right if sending box is row 1 col 0
      if((rowIndex === 1 && col === 0 || (rowIndex === 3 && col === 2))) {
        return false;
      }
      // change css display
      $('#diagonal').css('display','inherit');
      // apply appropriate line rotation
      $('#diagonal').css({'transform':'translateY(245px) translateX(-60px) rotate(-45deg)'});
      //trigger modal
      return true;
    }
  }

  // function to check if clicked box has unwinable diagonal
  const eliminateUnwinableDiagonals = (row, col) => {
    // eliminate boxes that can't win on diagonals
    if(row === 1 && col === 1) {
      return true; //exits if box is row 1 center
    }
    if(row === 2 && (col === 0 || col === 2)) {
      return true; // exits if box is left or right of row 2
    }
    if(row === 3 && col === 1) {
      return true; // exits if box is row 3 center
    }
  }

  // splice div row id to get id #
  const getRowIndex = (row) => {
    // split row id string
    let rowSplit = row.split('#row');
    // get the row number from the array
    let rowIndex = rowSplit[1]
    // return the row number as a number
    return +rowIndex;
  }

  // check board for draw
  const checkDrawConditions = () => {
    let draw = true;
    let boardArr = $('.board').children();
    for (let i = 0; i < boardArr.length; i++) {
      if($(boardArr[i]).hasClass('row')) {
        let rowArr = $(boardArr[i]).children()
        for(let x = 0; x < rowArr.length; x++) {
          if ($(rowArr[x]).text() === '') {
            draw = false;
          }
        }
      }
    }
    return draw;
  }

  // open modal for Win alert >>>> from Bobadilla's morning example on Modal Practice w03d04
  const openWinModal = () => {
    removeAnimateClass();
    // apply css to display modal
    $modalEndGame.css('display', 'block');
    // assign text to modal
    $('#you-win').text(`${currentPlayer} Wins!`);
    if(currentPlayer === player1) {
      // increase player 1 score
      player1Score++
      // update player 1 score on info board
      $('#player1Score').text(`${player1}: ${player1Score}`)
    } else if (currentPlayer === player2) {
      // increase player 1 score
      player2Score++
      // update player 1 score on info board
      $('#player2Score').text(`${player2}: ${player2Score}`)
    }
    round++
    $('#round').text(round)
    // prompt players if they want to play again
    // unbind support from this site: https://stackoverflow.com/questions/14969960/jquery-click-events-firing-multiple-times
    $('#btnPlayAgain').unbind().on('click', playAgain);
    $('#btnNewPlayers').unbind().on('click', openStartGameModal);
  }

  // re-open start game modal for new players
  const openStartGameModal = () => {
    // reset scores
    player1Score = 0;
    player2Score = 0;
    // clear win line
    $('.line').css('display','none');
    // clear grid
    $('.box').empty();
    //hide endGame modal
    $('#modal-endGame').css('display','none');
    // show start game modal
    $('#modal-startGame').css('display','block');
  }

  // open modal for draw conditions.
  const openDrawModal = () => {
    $modalEndGame.css('display', 'block');
    round++
    $('#round').text(round)
    // assign text to modal
    $('#you-win').text('Draw!');
    // prompt players if they want to play again
    $('#btnPlayAgain').unbind().on('click', playAgain);
    $('#btnNewPlayers').unbind().on('click', openStartGameModal);

  }

  // close modal for Win alert >>>> from Bobadilla's morning example on Modal Practice w03d04
  const closeModal = () => {
    // hide modal css
    $modalEndGame.css('display', 'none');
    //clear grid
    $('.box').empty();
    // clear win lines from grid
    $('.line').css('display', 'none')

  }

  // restart the game with the same players.
  const playAgain = () => {
    //players switch x and o assignments
    switchPlayerSymbols();
    closeModal();
  }


  // ================== EVENT HANDLERS =================

  // input submission supported with Huntington's w03d04 jquery_input examples
  $('form').on('submit', () => {
    event.preventDefault();
    player1 = $('#player1').val();
    // assign player 1 to x symbol
    xPlayer = player1;
    // assign player 1 to x assignment
    $('#xPlayerH2').text(`X : ${xPlayer}`);
    // assign second player name to player2
    player2 = $('#player2').val()
    // assign player 2 to o symbol
    oPlayer = player2;
    // add player name to o assignment
    $('#oPlayerH2').text(`O : ${oPlayer}`);
    // clear input text boxes for later use
    $('.userInput').val('');
    // hide modal startGame div
    $('#modal-startGame').css('display','none');
    // hide start game modal form
    $('#startGameForm').hide();
    startGame();
  })


}) // this closes document ready




const oldCode = () => {
  // console.log(clicked.parent().attr('id'));
  // console.log(clicked.index());
  // console.log($('.board').children().length);

  // console.log($(e.target).val());


  // let x = $('.board').children().eq(1).children().eq(1).text();
  // console.log(x);

  // const rowsArr = [
  //   [],[],[]
  // ];
  //
  //
  // // console.log(boardLength);
  // const checkRows = () => {
  //   const boardLength = $('.board').children().length;
  //     // loop through columns
  //     for(let i = 0; i < 3; i++) {
  //       // loop through rows
  //       const trueArr = [];
  //       for(let x = 0; x < boardLength; x++) {
  //
  //         if($('.board').children().eq(i).children().eq(x).text() === 'X') {
  //           trueArr.push(true);
  //         }
  //         if (trueArr.length === 3) {
  //           console.log('you win');
  //         }
  //         // console.log($('.board').children().eq(i).children().eq(x).text());
  //       }
  //     }
  // }


  // const boardArr = ;
  // console.log(boardArr);


  // let right = index + 1
  // let left = index - 1
  // let rightAdj = ;
  // let leftAdj = $(row).children().eq(left).text();

  // console.log(rightAdj);
  // console.log(leftAdj);

  // const makeLine = (underRow, overRow, rightAdj, col) => {
  //   if((underRow === 3 && (col - 1) === 0) || (underRow === 1 && (col - 1) === -1) || (overRow === 1 && rightAdj === 2) || (overRow === 3 && rightAdj === 0)) {
  //     let lineID = '#topRightDiagonal'
  //     $(lineID).css('display', 'block')
  //   }
  //   if((underRow === 3 && (rightAdj) === 2) || (underRow === 1 && (rightAdj) === 0) || (overRow === 1 && (col - 1) === 0) || (overRow === 3 && (col - 1) === -1)) {
  //     let lineID = '#topLeftDiagonal'
  //     $(lineID).css('display', 'block')
  //   }
  //   // if((underRow === 3 && ((col - 1) === 0 || (col - 1) === -1)) || (overRow === 1 && ((rightAdj === )) )
  // }

  // $('#submit1').on('click', () => {
  //   event.preventDefault();
  //   // assign first player name to player1
  //   player1 = $('#player1').val();
  //   // assign player 1 to x symbol
  //   xPlayer = player1;
  //   // assign player 1 to x assignment
  //   $('.playerAssignments').children().eq(0).append(' ' + player1);
  //   // clear player 1 input box
  //   $('#player1').val('');
  // });
  //
  // $('#submit2').on('click', () => {
  //   event.preventDefault();
  //   // assign second player name to player2
  //   player2 = $('#player2').val()
  //   // assign player 2 to o symbol
  //   oPlayer = player2;
  //   // add player name to o assignment
  //   $('.playerAssignments').children().eq(1).append(' ' + player2);
  //   // clear player 2 input box
  //   $('#player2').val('');
  // });



}
