let presetOptions = {
  x: 200,
  y: -50,
  step: 50,
};

function GenNonDuplicateID(randomLength: number) {
  return Number(
    Math.random().toString().substr(3, randomLength) + Date.now()
  ).toString(36);
}
function createColor() {
  return (
    "#" +
    (function (color) {
      return new Array(7 - color.length).join("0") + color;
    })(((Math.random() * 0x1000000) << 0).toString(16))
  );
}

export type BlockType = {
  x: number;
  y: number;
  timer: NodeJS.Timer | null;
  typeOfBlock: number;
  blocksId: string;
  canLeft: boolean;
  canRight: boolean;
  boxColor: string;
  status: number;
  moveLeft: () => void;
  moveRight: () => void;
  quickDown: () => void;
  moveDown: () => void;
};

export class Block implements BlockType {
  x: number;
  y: number;
  typeOfBlock: number;
  timer: NodeJS.Timer | null;
  blocksId: string;
  canLeft: boolean;
  canRight: boolean;
  boxColor: string;
  status: number;
  constructor(options?: object) {
    const { x, y } = presetOptions;
    this.x = x;
    this.y = y;
    this.timer = null;
    this.typeOfBlock = Math.floor(Math.random() * 2);
    this.blocksId = GenNonDuplicateID(4);
    this.canLeft = true;
    this.canRight = true;
    this.boxColor = createColor();
    this.status = 0;
  }
  moveLeft() {
    if (this.canLeft) {
      this.x -= presetOptions.step;
    }
  }
  moveRight() {
    if (this.canRight) {
      this.x += presetOptions.step;
    }
  }
  quickDown() {}
  moveDown() {
    this.y += presetOptions.step;
  }
  transStatus() {
    this.status = this.status >= 3 ? (this.status = 0) : this.status++;
  }
}
