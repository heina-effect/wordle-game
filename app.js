const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const massageDisplay = document.querySelector('.massage-container')

const wordle = 'SUPER'
const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '«', //backspace
]

const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
]

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div');
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex); //guessRow-0~5

    guessRow.forEach((guess, guessIndex) => {
        const tileElement = document.createElement('div');
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex);
        tileElement.classList.add('tile');
        rowElement.append(tileElement);
    })

    tileDisplay.append(rowElement);
})

keys.forEach(key => {
    const buttonElement = document.createElement('button');
    buttonElement.textContent = key;
    buttonElement.setAttribute('id', key); //속성 값 정하기
    buttonElement.addEventListener('click', () => handleClick(key));
    keyboard.append(buttonElement);
})

const handleClick = (letter) => {
    console.log('clicked', letter);

    if (letter === '«') {
        deleteLetter();
        console.log('guessRows', guessRows);
        return
    }
    if (letter === 'ENTER') {
        checkRow();
        return
    }

    addLetter(letter)
}

const addLetter = (letter) => {
    if (currentTile < 5 && currentTile < 6) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
        tile.textContent = letter;
        guessRows[currentRow][currentTile] = letter;
        currentTile++;
        tile.setAttribute('data', letter) //data -> color바꾸기위해서
        console.log('gessRows', guessRows);
    }
}

const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--;
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
        tile.textContent = '';
        guessRows[currentRow][currentTile] = '';
        tile.setAttribute('data', '');
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('');

    if (currentTile > 4) {
        console.log('guess is ' + guess , 'wordle is ' + wordle);
        if (wordle == guess) {
            showMessage('Magnificent!');
            isGameOver = true;
            return
        } 
        else {
            if (currentRow >= 5) {
                isGameOver = false;
                showMessage('Game Over!');
                return
            }if(currentRow < 5){
                currentRow ++;
                currentTile = 0;
                return
            }
        }
    }


}

const showMessage = (massage) => {
    const messageElement = document.createElement('p');
    messageElement.textContent = massage;
    massageDisplay.append(messageElement);
    setTimeout(() => massageDisplay.removeChild(messageElement), 2000);
}