const UNSEARCHED = 'lightgray';
const SEARCHED = 'darkred';
const OPEN = 'lightgreen';
const CLOSED = 'red';
const WALL = 'black';
const ENDPOINT = 'lightblue';

class Node {
  constructor(x, y, endPoint) {
    this.x = x;
    this.y = y;
    this.color = UNSEARCHED;
    this.isLocked = false;
    this.isClosed = false;
    this.isWall = false;
    this.g = Infinity;
    this.h = this.calculateHValue(endPoint);
    this.f = this.g + this.h;
    this.content = '';
    this.parent = undefined;
  }

  calculateFValue() {
    this.f = this.g + this.h;
  }

  calculateHValue(endPoint) {
    return Math.sqrt(
      (Math.max(endPoint.x, this.x) - Math.min(endPoint.x, this.x)) ** 2 +
        (Math.max(endPoint.y, this.y) - Math.min(endPoint.y, this.y)) ** 2
    );
  }

  toggleWall() {
    if (this.isLocked) {
      return;
    }

    if (this.color == WALL) {
      this.color = UNSEARCHED;
      this.isWall = false;
    } else {
      this.color = WALL;
      this.isWall = true;
    }
  }

  open(current, endPoint, showFValue) {
    // let distanceFromCurrent = sqrt(differenceinx + differenceiny);
    let distanceFromCurrent = Math.sqrt(
      (Math.max(current.x, this.x) - Math.min(current.x, this.x)) ** 2 +
        (Math.max(current.y, this.y) - Math.min(current.y, this.y)) ** 2
    );

    if (current.g + distanceFromCurrent <= this.g) {
      this.parent = current;
      this.g = current.g + distanceFromCurrent;
    } // else this.g and parent stays same

    this.h = this.calculateHValue(endPoint);
    this.calculateFValue();

    this.color = OPEN;
    // this.content = Math.round(this.f);
    if (showFValue) {
      this.content = this.f.toFixed('2');
    }
    this.isLocked = true;
  }

  close() {
    this.color = CLOSED;
    this.isClosed = true;
  }

  reset() {
    this.color = UNSEARCHED;
    this.isLocked = false;
    this.isClosed = false;
    this.isWall = false;
    this.g = Infinity;
    this.h = 0;
    this.f = this.g + this.h;
    this.content = '';
  }
}

class Grid {
  constructor(cols, rows, startpoint, endpoint) {
    this.cols = cols;
    this.rows = rows;

    this.isNew = true;

    this.startpoint = startpoint;
    this.endpoint = endpoint;

    this.grid = [];
    for (let i = 0; i < rows; i++) {
      let tempRow = [];
      for (let j = 0; j < cols; j++) {
        tempRow.push(new Node(j + 1, i + 1, this.endpoint));
      }
      this.grid.push(tempRow);
    }

    this.setEndPoint(this.startpoint.x, this.startpoint.y, true);
    this.setEndPoint(this.endpoint.x, this.endpoint.y);

    this.renderGrid();
  }

  setEndPoint(x, y, isStartPoint) {
    const node = this.grid[y - 1][x - 1];
    node.color = ENDPOINT;
    node.isLocked = true;
    if (isStartPoint) {
      node.content = 'start';
      node.g = 0;
      node.h = 0;
      node.calculateFValue();
    } else {
      node.content = 'end';
    }
  }

  renderGrid() {
    let container = document.querySelector('.container');
    container.innerHTML = '';

    for (const row of this.grid) {
      let tempRow = document.createElement('div');
      tempRow.classList.add('row');
      tempRow.setAttribute('tr-coord', `${COLS},${ROWS}`);
      for (const node of row) {
        let tempNode = document.createElement('div');
        tempNode.classList.add('node');
        tempNode.style.backgroundColor = node.color;
        tempNode.addEventListener('mousedown', () => {
          node.toggleWall();
          this.renderGrid();
        });
        // tempNode.innerText = node.content;
        tempNode.setAttribute('content', node.content);

        tempRow.appendChild(tempNode);
      }
      container.appendChild(tempRow);
    }
  }

  getNodeFromGrid(x, y) {
    return this.grid[y - 1][x - 1];
  }

  aStarPathfind(speed, showFValue) {
    this.isNew = false;

    let open = [this.getNodeFromGrid(this.startpoint.x, this.startpoint.y)];
    let closed = [];

    let loop = setInterval(() => {
      let current = open[0];

      if (!current) {
        alert('not found');
        clearInterval(loop);
        return;
      }
      current.close();
      closed.push(open.shift());

      // open all neibours of current that are traversable and calculate g,h and f values
      let currentNeibours = [];
      {
        // left
        if (current.x > 1) {
          currentNeibours.push(this.getNodeFromGrid(current.x - 1, current.y));
        }
        // right
        if (current.x < this.cols) {
          currentNeibours.push(this.getNodeFromGrid(current.x + 1, current.y));
        }
        // down
        if (current.y < this.rows) {
          currentNeibours.push(this.getNodeFromGrid(current.x, current.y + 1));
        }
        // up
        if (current.y > 1) {
          currentNeibours.push(this.getNodeFromGrid(current.x, current.y - 1));
        }
        // down-left
        if (current.y < this.rows && current.x > 1) {
          currentNeibours.push(
            this.getNodeFromGrid(current.x - 1, current.y + 1)
          );
        }
        // up-left
        if (current.y > 1 && current.x > 1) {
          currentNeibours.push(
            this.getNodeFromGrid(current.x - 1, current.y - 1)
          );
        }
        // down-right
        if (current.y < this.rows && current.x < this.cols) {
          currentNeibours.push(
            this.getNodeFromGrid(current.x + 1, current.y + 1)
          );
        }
        // up-right
        if (current.y > 1 && current.x < this.cols) {
          currentNeibours.push(
            this.getNodeFromGrid(current.x + 1, current.y - 1)
          );
        }
      }

      currentNeibours = currentNeibours.filter(
        node => !node.isClosed && !node.isWall
      );

      for (const neighbor of currentNeibours) {
        neighbor.open(current, this.endpoint, showFValue);
      }

      open = [...open, ...currentNeibours];
      open = open.filter((node, pos) => open.indexOf(node) === pos);
      sortOpen();

      if (current == this.getNodeFromGrid(this.endpoint.x, this.endpoint.y)) {
        let finalPath = [];
        let tempCurrent = this.getNodeFromGrid(
          this.endpoint.x,
          this.endpoint.y
        );
        while (true) {
          finalPath.push(tempCurrent);
          tempCurrent.color = ENDPOINT;
          if (tempCurrent.parent) {
            tempCurrent = tempCurrent.parent;
          } else {
            break;
          }
        }
        console.log(finalPath);
        clearInterval(loop);
      }
      this.renderGrid();
    }, Math.round(parseInt(speed)));

    function sortOpen() {
      open.sort(function (a, b) {
        var aF = a.f;
        var bF = b.f;
        var aH = a.h;
        var bH = b.h;
        if (aF == bF) {
          return aF < bF ? -1 : aF > bF ? 1 : 0;
        } else {
          return aH < bH ? -1 : 1;
        }
      });
    }
  }
}

const COLS = 10;
const ROWS = 10;

let mainGrid = new Grid(
  COLS,
  ROWS,
  { x: 2, y: 2 },
  { x: COLS - 1, y: ROWS - 1 }
);

const speedInput = document.querySelector('.inputSpeed');
const startInput = document.querySelector('.startInput');
const endInput = document.querySelector('.endInput');
const showFValueInput = document.querySelector('.showFValueInput');

const startButton = document.querySelector('.startButton');
const clearButton = document.querySelector('.clearButton');

function getEndPoint(input, isEnd) {
  let p = input.value.split(',');

  if (p.length < 2) {
    if (isEnd) {
      p = [`${COLS - 1}`, `${ROWS - 1}`];
    } else {
      p = ['2', '2'];
    }
  } else {
    if (isEnd) {
      if (p[0] < 1 || p[0] > COLS || p[1] < 1 || p[1] > ROWS) {
        p = [`${COLS - 1}`, '9'];
      }
    } else {
      if (p[0] < 1 || p[0] > COLS || p[1] < 1 || p[1] > ROWS) {
        p = ['2', '2'];
      }
    }
  }

  return p;
}

clearButton.addEventListener('click', () => {
  let startPoint = getEndPoint(startInput);
  let endPoint = getEndPoint(endInput, true);

  mainGrid = new Grid(
    COLS,
    ROWS,
    { x: parseInt(startPoint[0]), y: parseInt(startPoint[1]) },
    { x: parseInt(endPoint[0]), y: parseInt(endPoint[1]) }
  );
});

startButton.addEventListener('click', () => {
  // mainGrid = new Grid(10, 10, { x: 2, y: 9 }, { x: 9, y: 2 });

  if (!mainGrid.isNew) {
    let startPoint = getEndPoint(startInput);
    let endPoint = getEndPoint(endInput, true);

    mainGrid = new Grid(
      COLS,
      ROWS,
      { x: parseInt(startPoint[0]), y: parseInt(startPoint[1]) },
      { x: parseInt(endPoint[0]), y: parseInt(endPoint[1]) }
    );
  }

  showFValueInput.checked
    ? mainGrid.aStarPathfind(speedInput.value, true)
    : mainGrid.aStarPathfind(speedInput.value);
});
