const mainContent = document.querySelector('.board');
const btn = document.querySelector('#submit');
btn.addEventListener("click", solve);
for(let i=1; i<=81; ++i){
    const input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.setAttribute('min', 1);
    input.setAttribute('max', 9);
    mainContent.appendChild(input);
}

function solveSudoku(board, row, col)
{
	if (row == 8 && col == 9)
		return true;

    // After reaching the end of the row
	if (col == 9)
	{
		row++;
		col = 0;
	}

    // If the cel is not empty, move to the next cell
	if (board[row][col] != 0)
		return solveSudoku(board, row, col + 1);

	for(let n = 1; n < 10; n++)
	{
		if (isValid(board, row, col, n))
		{
			board[row][col] = n;
			if (solveSudoku(board, row, col + 1))
				return true;
		}
		board[row][col] = 0; // Backtrack
	}
	return false;
}

function isValid(board, row, col, n)
{
    // Check the row
	for(let x = 0; x <= 8; x++){
		if (board[row][x] == n){
			return false;
        }
    }

    // Check the column
	for(let x = 0; x <= 8; x++){
		if (board[x][col] == n){
			return false;
        }
    }

    // Check the 3 x 3 square
	const row_i = row - row % 3;
	const col_i = col - col % 3;
		
	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 3; j++){
			if (board[i + row_i][j + col_i] == n){
				return false;
            }
        }
    }

	return true;
}

function solve(){
    const inputs = document.querySelectorAll('input');
    var board = [];
    var currRow = [];
    var i = 1;
    for(let input of inputs){
        if (input.value >= 1 && input.value <= 9){
            currRow.push(input.value);
        } else {
            currRow.push('0');
        }
        if(i % 9 == 0){
            board.push(currRow);
            currRow = [];
        }
        i++;
    }
    solveSudoku(board, 0, 0);
    var k = 0;
    for(let i = 0; i <= 8; i++){
        for(let j = 0; j <= 8; j++){
            inputs[k].value = board[i][j];
            k++;
        }
    }
}
