let gameStarted = false
let matrix

// document.body.style.setProperty('--main-color',"#6c0")

function updateLocalStorage() {
    localStorage.setItem("matrix", JSON.stringify(matrix))
}

function createLayout() {
    const gridRows = 9
    const gridCols = 9

    let cachedMatrix = JSON.parse(localStorage.getItem("matrix")) // load puzzle from cache or generate?
    if (cachedMatrix) {
        matrix = cachedMatrix
    } else {
        let startTime = new Date();
        createMatrix()
        prepareGridData()
        applyMask()
        let endTime = new Date();
        let duration = (endTime.getTime() - startTime.getTime()) / 1000;
        let timeMessage = `completion time: ${duration} ms`
        matrix.timeMessage = timeMessage
        console.log(timeMessage)
    }

    for (let i=0; i<gridRows; i++) {
        let trNode = document.createElement('tr')
        trNode.id = 'tr_' + i
        for (let j=0; j<gridCols; j++) {
            let tdNode = document.createElement('td')
            tdNode.id = 'tr_' + i + '_td_' + j;
            if (matrix[i][j].mask) {
                let guess = matrix[i][j].guess ? matrix[i][j].guess : "" // cache
                tdNode.innerHTML = ""
                tdNode.innerHTML = '<input class="cell" type="number" id="input_' + i + '_' + j + '" maxlength="0" size="1" onClick="gameStarted=true" onKeyDown="matrix[' + i + '][' + j + '].guess = Number(event.key); this.style.color = \'#6096B4\'; updateLocalStorage();" value="' + guess + '" />'
            } else {
                tdNode.innerHTML = matrix[i][j].value
                matrix[i][j].guess = matrix[i][j].value
            }

            // row 1
            if (i==0 && j==0) { tdNode.style.borderLeftWidth = "thick"; tdNode.style.borderTopWidth = "thick"; }
            if (i==0 && j==1) { tdNode.style.borderTopWidth = "thick"; }
            if (i==0 && j==2) { tdNode.style.borderTopWidth = "thick"; tdNode.style.borderRightWidth = "medium"; }
            if (i==0 && j==3) { tdNode.style.borderLeftWidth = "medium"; tdNode.style.borderTopWidth = "thick"; }
            if (i==0 && j==4) { tdNode.style.borderTopWidth = "thick"; }
            if (i==0 && j==5) { tdNode.style.borderTopWidth = "thick"; tdNode.style.borderRightWidth = "medium"; }
            if (i==0 && j==6) { tdNode.style.borderLeftWidth = "medium"; tdNode.style.borderTopWidth = "thick"; }
            if (i==0 && j==7) { tdNode.style.borderTopWidth = "thick"; }
            if (i==0 && j==8) { tdNode.style.borderTopWidth = "thick"; tdNode.style.borderRightWidth = "thick"; }

            // row 2
            if (i==1 && j==0) { tdNode.style.borderLeftWidth = "thick"; }
            if (i==1 && j==2) { tdNode.style.borderRightWidth = "medium"; }
            if (i==1 && j==3) { tdNode.style.borderLeftWidth = "medium"; }
            if (i==1 && j==5) { tdNode.style.borderRightWidth = "medium"; }
            if (i==1 && j==6) { tdNode.style.borderLeftWidth = "medium"; }
            if (i==1 && j==8) { tdNode.style.borderRightWidth = "thick"; }

            // row 3
            if (i==2 && j==0) { tdNode.style.borderLeftWidth = "thick"; tdNode.style.borderBottomWidth = "medium"; }
            if (i==2 && j==1) { tdNode.style.borderBottomWidth = "medium"; }
            if (i==2 && j==2) { tdNode.style.borderBottomWidth = "medium"; tdNode.style.borderRightWidth = "medium"; }
            if (i==2 && j==3) { tdNode.style.borderLeftWidth = "medium"; tdNode.style.borderBottomWidth = "medium"; }
            if (i==2 && j==4) { tdNode.style.borderBottomWidth = "medium"; }
            if (i==2 && j==5) { tdNode.style.borderBottomWidth = "medium"; tdNode.style.borderRightWidth = "medium"; }
            if (i==2 && j==6) { tdNode.style.borderLeftWidth = "medium"; tdNode.style.borderBottomWidth = "medium"; }
            if (i==2 && j==7) { tdNode.style.borderBottomWidth = "medium"; }
            if (i==2 && j==8) { tdNode.style.borderBottomWidth = "medium"; tdNode.style.borderRightWidth = "thick"; }

            // row 4
            if (i==3 && j==0) { tdNode.style.borderLeftWidth = "thick"; tdNode.style.borderTopWidth = "medium"; }
            if (i==3 && j==1) { tdNode.style.borderTopWidth = "medium"; }
            if (i==3 && j==2) { tdNode.style.borderTopWidth = "medium"; tdNode.style.borderRightWidth = "medium"; }
            if (i==3 && j==3) { tdNode.style.borderLeftWidth = "medium"; tdNode.style.borderTopWidth = "medium"; }
            if (i==3 && j==4) { tdNode.style.borderTopWidth = "medium"; }
            if (i==3 && j==5) { tdNode.style.borderTopWidth = "medium"; tdNode.style.borderRightWidth = "medium"; }
            if (i==3 && j==6) { tdNode.style.borderLeftWidth = "medium"; tdNode.style.borderTopWidth = "medium"; }
            if (i==3 && j==7) { tdNode.style.borderTopWidth = "medium"; }
            if (i==3 && j==8) { tdNode.style.borderTopWidth = "medium"; tdNode.style.borderRightWidth = "thick"; }

            // row 5
            if (i==4 && j==0) { tdNode.style.borderLeftWidth = "thick"; }
            if (i==4 && j==2) { tdNode.style.borderRightWidth = "medium"; }
            if (i==4 && j==3) { tdNode.style.borderLeftWidth = "medium"; }
            if (i==4 && j==5) { tdNode.style.borderRightWidth = "medium"; }
            if (i==4 && j==6) { tdNode.style.borderLeftWidth = "medium"; }
            if (i==4 && j==8) { tdNode.style.borderRightWidth = "thick"; }

            // row 6
            if (i==5 && j==0) { tdNode.style.borderLeftWidth = "thick"; tdNode.style.borderBottomWidth = "medium"; }
            if (i==5 && j==1) { tdNode.style.borderBottomWidth = "medium"; }
            if (i==5 && j==2) { tdNode.style.borderBottomWidth = "medium"; tdNode.style.borderRightWidth = "medium"; }
            if (i==5 && j==3) { tdNode.style.borderLeftWidth = "medium"; tdNode.style.borderBottomWidth = "medium"; }
            if (i==5 && j==4) { tdNode.style.borderBottomWidth = "medium"; }
            if (i==5 && j==5) { tdNode.style.borderBottomWidth = "medium"; tdNode.style.borderRightWidth = "medium"; }
            if (i==5 && j==6) { tdNode.style.borderLeftWidth = "medium"; tdNode.style.borderBottomWidth = "medium"; }
            if (i==5 && j==7) { tdNode.style.borderBottomWidth = "medium"; }
            if (i==5 && j==8) { tdNode.style.borderBottomWidth = "medium"; tdNode.style.borderRightWidth = "thick"; }

            // row 7
            if (i==6 && j==0) { tdNode.style.borderLeftWidth = "thick"; tdNode.style.borderTopWidth = "medium"; }
            if (i==6 && j==1) { tdNode.style.borderTopWidth = "medium"; }
            if (i==6 && j==2) { tdNode.style.borderTopWidth = "medium"; tdNode.style.borderRightWidth = "medium"; }
            if (i==6 && j==3) { tdNode.style.borderLeftWidth = "medium"; tdNode.style.borderTopWidth = "medium"; }
            if (i==6 && j==4) { tdNode.style.borderTopWidth = "medium"; }
            if (i==6 && j==5) { tdNode.style.borderTopWidth = "medium"; tdNode.style.borderRightWidth = "medium"; }
            if (i==6 && j==6) { tdNode.style.borderLeftWidth = "medium"; tdNode.style.borderTopWidth = "medium"; }
            if (i==6 && j==7) { tdNode.style.borderTopWidth = "medium"; }
            if (i==6 && j==8) { tdNode.style.borderTopWidth = "medium"; tdNode.style.borderRightWidth = "thick"; }

            // row 8
            if (i==7 && j==0) { tdNode.style.borderLeftWidth = "thick"; }
            if (i==7 && j==2) { tdNode.style.borderRightWidth = "medium"; }
            if (i==7 && j==3) { tdNode.style.borderLeftWidth = "medium"; }
            if (i==7 && j==5) { tdNode.style.borderRightWidth = "medium"; }
            if (i==7 && j==6) { tdNode.style.borderLeftWidth = "medium"; }
            if (i==7 && j==8) { tdNode.style.borderRightWidth = "thick"; }

            // row 9
            if (i==8 && j==0) { tdNode.style.borderLeftWidth = "thick"; tdNode.style.borderBottomWidth = "thick"; }
            if (i==8 && j==1) { tdNode.style.borderBottomWidth = "thick"; }
            if (i==8 && j==2) { tdNode.style.borderBottomWidth = "thick"; tdNode.style.borderRightWidth = "medium"; }
            if (i==8 && j==3) { tdNode.style.borderLeftWidth = "medium"; tdNode.style.borderBottomWidth = "thick"; }
            if (i==8 && j==4) { tdNode.style.borderBottomWidth = "thick"; }
            if (i==8 && j==5) { tdNode.style.borderBottomWidth = "thick"; tdNode.style.borderRightWidth = "medium"; }
            if (i==8 && j==6) { tdNode.style.borderLeftWidth = "medium"; tdNode.style.borderBottomWidth = "thick"; }
            if (i==8 && j==7) { tdNode.style.borderBottomWidth = "thick"; }
            if (i==8 && j==8) { tdNode.style.borderBottomWidth = "thick"; tdNode.style.borderRightWidth = "thick"; }

            trNode.appendChild(tdNode)
        }
        primaryGrid.appendChild(trNode)
        time.innerHTML = matrix.timeMessage
    }

    let pge = primaryGrid.getBoundingClientRect()
    buttonReset.style.position = "absolute"
    buttonReset.style.top = pge.y + 'px'
    buttonReset.style.left = pge.x + pge.width + 10 + 'px'

    blurb.style.width = pge.width    

    let br = buttonReset.getBoundingClientRect()
    buttonValidateWithoutHints.style.position = "absolute"
    buttonValidateWithoutHints.style.top = br.y + br.height + 10 + 'px'
    buttonValidateWithoutHints.style.left = pge.x + pge.width + 10 + 'px'

    let bvwoh = buttonValidateWithoutHints.getBoundingClientRect()
    buttonValidateWithHints.style.position = "absolute"
    buttonValidateWithHints.style.top = bvwoh.y + bvwoh.height + 10 + 'px'
    buttonValidateWithHints.style.left = pge.x + pge.width + 10 + 'px'

    let bvwh = buttonValidateWithHints.getBoundingClientRect()
    buttonNewPuzzle.style.position = "absolute"
    buttonNewPuzzle.style.top = bvwh.y + bvwh.height + 10 + 'px'
    buttonNewPuzzle.style.left = pge.x + pge.width + 10 + 'px'
}

function prepareGridData() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            matrix[r][c] = { value: matrix[r][c], mask: false, guess: null }
        }
    }
}

const diffMap = {}

diffMap['easy'] = [4,5]
diffMap['medium'] = [5,6]
diffMap['hard'] = [6,7]
let setDiff = []

function applyMask() {
    // "box" 0 is the seed for upper right box, lower right, and bottom left
    let difficulty = Math.random() >= 0.5 ? 'easy' : 'medium'
    setDiff.push(difficulty)
    let allowableMasks = diffMap[difficulty]
    let box0Cells = allowableMasks[Math.floor(Math.random()*allowableMasks.length)]

    let set = ['0_0', '0_1', '0_2', '1_0', '1_1', '1_2', '2_0', '2_1', '2_2']
    for (let masks = 0; masks < box0Cells; masks++) {
        let cellToMask = set.splice(Math.floor(Math.random() * set.length), 1).toString()
        let coords = cellToMask.split("_")
        matrix[coords[0]][coords[1]].mask = true
    }

    // upper right, lower right, lower left box masking is derived from box0
    let rotate = Math.random() >= 0.5 ? true : false // rotate or mirror mask
    for (let y = 0; y < 3; y++) {
        let yDec = 2
        let xDec = 2
        for (let x = 0; x < 3; x++) {
            if (y === 0) {
                if (rotate) {
                    matrix[yDec][6].mask = matrix[y][x].mask // UR
                    matrix[8][6 + xDec].mask = matrix[y][x].mask // LR
                    matrix[6 + x][2].mask = matrix[y][x].mask // LL
                } else {
                    matrix[y][6 + xDec].mask = matrix[y][x].mask
                    matrix[8][6 + xDec].mask = matrix[y][x].mask
                    matrix[8][x].mask = matrix[y][x].mask
                }
            } else if (y === 1) {
                if (rotate) {
                    matrix[yDec][7].mask = matrix[y][x].mask // UR
                    matrix[7][6 + xDec].mask = matrix[y][x].mask // LR
                    matrix[6 + x][1].mask = matrix[y][x].mask // LL
                } else {
                    matrix[y][6 + xDec].mask = matrix[y][x].mask
                    matrix[7][6 + xDec].mask = matrix[y][x].mask
                    matrix[7][x].mask = matrix[y][x].mask
                }
            } else {
                if (rotate) {
                    matrix[yDec][8].mask = matrix[y][x].mask // UR
                    matrix[6][6 + xDec].mask = matrix[y][x].mask // LR
                    matrix[6 + x][0].mask = matrix[y][x].mask // LL
                } else {
                    matrix[y][6 + xDec].mask = matrix[y][x].mask
                    matrix[6][6 + xDec].mask = matrix[y][x].mask
                    matrix[6][x].mask = matrix[y][x].mask
                }
            }
            yDec--
            xDec--
        }
    }

    // "box" 1 is the seed for right middle box, bottom middle box, and left middle box
    difficulty = difficulty === 'easy' ? difficulty = 'hard' : difficulty = 'medium'
    setDiff.push(difficulty)
    allowableMasks = diffMap[difficulty]
    let box1Cells = allowableMasks[Math.floor(Math.random()*allowableMasks.length)]
      
    set = ['0_3', '0_4', '0_5', '1_3', '1_4', '1_5', '2_3', '2_4', '2_5']
    let box1Masks = box1Cells.length
    if (box1Cells <= box0Cells && box0Cells <=6) box1Cells--

    for (let masks = 0; masks < box1Cells; masks++) {
        let cellToMask = set.splice(Math.floor(Math.random() * set.length), 1).toString()
        let coords = cellToMask.split("_")
        matrix[coords[0]][coords[1]].mask = true
    }
      
    // right middle, bottom middle, and left middle box masking is derived from box1
    // just let the middle edges rotate, they look weird being symmetrical
    rotate = Math.random() >= 0.5 ? true : false // rotate or mirror mask
    for (let y = 0; y < 3; y++) {
        let yDec = 2
        let xDec = 2
        for (let x = 3; x < 6; x++) {
            if (y === 0) {
                matrix[x][8].mask = matrix[y][x].mask // RM
                matrix[8][3 + xDec].mask = matrix[y][x].mask // BM
                matrix[3 + yDec][0].mask = matrix[y][x].mask // LM
            } else if (y === 1) {
                matrix[x][7].mask = matrix[y][x].mask // RM
                matrix[7][3 + xDec].mask = matrix[y][x].mask // BM
                matrix[3 + yDec][1].mask = matrix[y][x].mask // LM
            } else {
                matrix[x][6].mask = matrix[y][x].mask // RM
                matrix[6][3 + xDec].mask = matrix[y][x].mask // BM
                matrix[3 + yDec][2].mask = matrix[y][x].mask // LM
            }
            yDec--
            xDec--
        }
    }

    // center box has no derivitives but we can make it look random or symmetrical
    rotate = Math.random() >= 0.5 ? true : false // rotate or mirror mask
    if (rotate) {
        difficulty = difficulty === 'easy' ? difficulty = 'hard' : difficulty = 'medium'
        allowableMasks = diffMap[difficulty]
        let box4Cells = allowableMasks[Math.floor(Math.random()*allowableMasks.length)]

        set = ['3_3', '3_4', '3_5', '4_3', '4_4', '4_5', '5_3', '5_4', '5_5']
        let box1Masks = box4Cells.length
        for (let masks = 0; masks < box4Cells; masks++) {
            let cellToMask = set.splice(Math.floor(Math.random() * set.length), 1).toString()
            let coords = cellToMask.split("_")
            matrix[coords[0]][coords[1]].mask = true
        }
    } else {
        let offsetY = 5
        for (let y = 3; y < 5; y++) {
            let offsetX = 5
            for (let x = 3; x < 5; x++) {
                const chance = Math.floor(Math.random() * 5) + 1
                if (chance >= 2) {
                    matrix[y][x].mask = true
                    matrix[offsetY][offsetX].mask = true
                    matrix[y][offsetX].mask = true
                    matrix[offsetY][x].mask = true    
                }
                offsetX--
            }
            offsetY--
        }
    }
}

function setupMatrix() {
    let matrix = []
    for (let y = 0; y < 9; y++) {
        matrix[y] = []
    }
    return matrix
}

function setupBoxes() {
    let boxes = []
    for (let i = 0; i < 9; i++) {
        boxes[i] = []
    }
    return boxes
}

function setupCols() {
    let cols = []
    for (let i = 0; i < 9; i++) {
        cols[i] = []
    }
    return cols
}

function setupMap() {
    let cellToBoxMap = {}
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            if (y < 3) {
                if (x < 3) {
                    cellToBoxMap[y+"_"+x] = 0
                } else if (x > 2 && x < 6) {
                    cellToBoxMap[y+"_"+x] = 1
                } else {
                    cellToBoxMap[y+"_"+x] = 2
                }
            } else if (y > 2 && y < 6) {
                if (x < 3) {
                    cellToBoxMap[y+"_"+x] = 3
                } else if (x > 2 && x < 6) {
                    cellToBoxMap[y+"_"+x] = 4
                } else {
                    cellToBoxMap[y+"_"+x] = 5
                }
            } else {
                if (x < 3) {
                    cellToBoxMap[y+"_"+x] = 6
                } else if (x > 2 && x < 6) {
                    cellToBoxMap[y+"_"+x] = 7
                } else {
                    cellToBoxMap[y+"_"+x] = 8
                }
            }
        }
    }
    return cellToBoxMap
}

function createMatrix() {
    console.log('createMatrix called..')
    matrix = setupMatrix()
    let boxes = setupBoxes()
    let cols = setupCols()
    let cellToBoxMap = setupMap()

    let tries = 1
    let bombOut = 1
    let badVPairFound = false
    let badVPair = ""
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
        // console.log('rowIndex: ', rowIndex)
        for (let colIndex = 0; colIndex < 9; colIndex++) {
            // console.log('    colIndex: ', colIndex)
            if (bombOut >= 500) { console.log('bombing out..'); process.exit() }
            let exclusions = boxes[cellToBoxMap[rowIndex+"_"+colIndex]]
            exclusions = exclusions.concat(cols[colIndex])
            exclusions = exclusions.concat(matrix[rowIndex])
            exclusions = [...new Set(exclusions)];

            // no one wants to reach the last 4 cells in a puzzle only to find them completely ambiguous..
            if (rowIndex > 0 && colIndex > 0) {
                for (let y = rowIndex - 1; y >= 0; y--) {
                    for (let x = colIndex - 1; x >= 0; x--) {
                        if (matrix[rowIndex][x] === matrix[y][colIndex]) {
                            if (!exclusions.includes(matrix[y][x])) exclusions.push(matrix[y][x])
                            break
                        }
                    }
                }
            }

            let validPool = []
            let set = [1,2,3,4,5,6,7,8,9]
            set.forEach( p => {
                if (!exclusions.includes(p)) {
                    validPool.push(p)
                }
            })

            const number = validPool[Math.floor(Math.random() * validPool.length)]
            matrix[rowIndex].push(number)
            boxes[cellToBoxMap[rowIndex+"_"+colIndex]].push(number)
            cols[colIndex].push(number)
        }

        const sum = matrix[rowIndex].reduce(function (a, b) { return a + b }, 0)
        if (sum !== 45) {
            // reset our "tracking" arrays
            for (let x = 0; x < 9; x++) {
                const index = boxes[cellToBoxMap[rowIndex+"_"+x]].indexOf(matrix[rowIndex][x]);
                if (index > -1) boxes[cellToBoxMap[rowIndex+"_"+x]].splice(index, 1)
                cols[x].pop()
            }
            
            // toss the row and try again
            matrix[rowIndex] = []
            rowIndex = rowIndex - 1
            tries++
            if (tries >= 20) {
                // a bad combination of legally placed numbers earlier in the grid let to unplaceable numbers
                console.log('standard tries exceded 20, reroll grid')
                matrix = setupMatrix()
                boxes = setupBoxes()
                cols = setupCols()
                cellToBoxMap = setupMap()
                rowIndex = -1
                colIndex = 0
                tries = 1
            }
        } else {
            tries = 1
        }
    }
}

function validateSolution(hints) {
    let valid = true
    if (gameStarted) {
        for (y = 0; y < 9; y++) {
            for (x = 0; x < 9; x++) {
                let inputEl = document.getElementById("input_"+y+"_"+x)
                if (inputEl) {
                    if (matrix[y][x].guess != matrix[y][x].value) {
                        if (hints) {
                            inputEl.style.color = "darkred"                                     
                        }
                        valid = false
                    }
                }
            }
        }
        if (valid) {
            validGame.style.visibility = 'visible'
            localStorage.removeItem("matrix")
        } else {
            invalidGame.style.visibility = 'visible'                    
        }
    } else {
        newGame.style.visibility = 'visible'
    }
    return true
}

function resetPuzzle() {
    localStorage.removeItem("matrix")
    for (y = 0; y < 9; y++) {
        for (x = 0; x < 9; x++) {
            if (matrix[y][x].guess) matrix[y][x].guess = null
            if (document.getElementById("input_"+y+"_"+x)) document.getElementById("input_"+y+"_"+x).value = ""
        }
    }
}
