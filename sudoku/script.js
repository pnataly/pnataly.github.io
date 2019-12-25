
function createSoduko(num) {
    let grid = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9], 
        [4, 5, 6, 7, 8, 9, 1, 2, 3], 
        [7, 8, 9, 1, 2, 3, 4, 5, 6], 
        [2, 3, 4, 5, 6, 7, 8, 9, 1], 
        [5, 6, 7, 8, 9, 1, 2, 3, 4], 
        [8, 9, 1, 2, 3, 4, 5, 6, 7], 
        [3, 4, 5, 6, 7, 8, 9, 1, 2], 
        [6, 7, 8, 9, 1, 2, 3, 4, 5], 
        [9, 1, 2, 3, 4, 5, 6, 7, 8]
        ];

    let hideGrid = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        
    shuffle(grid);
    hide(grid, hideGrid, num);

    this.getSolution = function(row, column) {
        return grid[row][column];
    };

    this.setSquareNumber = function(row, column, value) {
        hideGrid[row][column] = value;
    }

    this.getSquareNumber = function(row, column) {
		return hideGrid[row][column];
	};

    this.isValid = function(row, column) {
        if(hideGrid[row][column] == grid[row][column]){
            return true;
        }
        return false;
    }
}

function shuffle(grid) {
    let i, j, temp;
    let col1, col2;
    let row1, row2;
    let sub1, sub2;
    let num1, num2;

	//swap the same columns of each subsquare
	for(i = 0; i < 10; i++) {
		col1 = Math.floor(Math.random()*3);
		sub1 = Math.floor(Math.random()*3);
		sub2 = Math.floor(Math.random()*3);
		for(j = 0; j < grid.length; j++) {
			temp = grid[j][col1 + sub1*3];
			grid[j][col1 + sub1*3] = grid[j][col1 + sub2*3];
			grid[j][col1 + sub2*3] = temp;
		}
	}

	//swap all columns within each subsquare
	for(i = 0; i < 10; i++) {
		sub = Math.floor(Math.random()*3);
		col1 = Math.floor(Math.random()*3);
		col2 = Math.floor(Math.random()*3);
		while(col1 == col2){
            col2 = Math.floor(Math.random()*3);
        } 
		for(j = 0; j < grid.length; j++) {
			temp = grid[j][sub*3 + col1];
			grid[j][sub*3 + col1] = grid[j][sub*3 + col2];
			grid[j][sub*3 + col2] = temp;
		}
	}

	//swap all rows within each subsquare
	for(i = 0; i < 10; i++) {
		sub1 = Math.floor(Math.random()*3);
		row1 = Math.floor(Math.random()*3);
		row2 = Math.floor(Math.random()*3);
		while(row1 == row2){
            row2 = Math.floor(Math.random()*3);  
        } 
		for(j = 0; j < grid.length; j++) {
			temp = grid[j][sub1*3 + row1];
			grid[j][sub1*3 + row1] = grid[j][sub1*3 + row2];
			grid[j][sub1*3 + row2] = temp;
		}
	}

	//swap one number with another
	for(i = 0; i < 10; i++) {
		num1 = Math.floor(Math.random()*9 + 1);
		num2 = Math.floor(Math.random()*9 + 1);
		while(num1 == num2){
            num2 = Math.floor(Math.random()*9 + 1);
        } 
		for(j = 0; j < grid.length; j++) {
			for(let k = 0; k < grid[j].length; k++) {
				if(grid[j][k] == num1)
					grid[j][k] = num2;
				else if(grid[j][k] == num2)
					grid[j][k] = num1;
			}
		}
    }
}

//Randomly hide squares.
function hide(grid, hideGrid, num) {
    let row, col;
	for(let i = 0; i < 9; i++) {
		for(let j = 0; j < 9; j++) {
			hideGrid[i][j] = grid[i][j];
		}
	}
    while(num > 0) {
        row = Math.floor(Math.random()*9);
        col = Math.floor(Math.random()*9);
        if(hideGrid[row][col] == 0){
            num++;
        }
        else{
            hideGrid[row][col] = 0;
            hideGrid[8-row][8-col] = 0;
        }
        num--;
    }
    return hideGrid;
}




