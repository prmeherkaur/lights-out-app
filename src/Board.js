import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps={
    nrows:5,ncols:5,chanceLightStartsOn:0.35
  }

  constructor(props) {
    super(props);
    this.createBoard=this.createBoard.bind(this);
    this.flipCellsAround=this.flipCellsAround.bind(this);
    this.state={hasWon:false,board:this.createBoard()};
    // TODO: set initial state
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    for(var i=0;i<this.props.nrows;i++){
      board[i]=new Array(this.props.ncols);
      for(var j=0;j<this.props.ncols;j++){
        board[i][j]=Math.random()<this.props.chanceLightStartsOn;
      }
    }
    // TODO: create array-of-arrays of true/false values
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    flipCell(y, x); //Flip initial cell
    flipCell(y, x - 1); //flip left
    flipCell(y, x + 1); //flip right
    flipCell(y - 1, x); //flip below
    flipCell(y + 1, x); //flip above

    let result;
    // TODO: flip this cell and the cells around it
    for(var i=0;i<this.props.nrows;i++){
      for(var j=0;j<this.props.ncols;j++){
        if(board[i][j]) result=false;
      }
    }
    // win when every cell is turned off
    // TODO: determine is the game has been won

    this.setState({board : board, hasWon: result});
  }


  /** Render game board or winning message. */

  render() {
    return(
      <div>
        {this.state.hasWon?
        (
          <div className="Winner">
            <h1 className="neon-orange">YOU</h1>
            <h1 className="neon-blue">WIN!</h1>
          </div>
        ):
        (
          <section>
          <div className="Board-title">
            <h1 className="neon-orange">LIGHTS</h1>
            <h1 className="neon-blue">OUT</h1>
          </div>
          <table className="Board">
          <tbody>
          {
          this.state.board.map((t,idx) => 
          <tr key={idx}>
            {t.map((s,idy)=><Cell isLit={s} key={`${idx}-${idy}`} flipCellsAroundMe={()=>this.flipCellsAround(`${idx}-${idy}`)}/>)}
          </tr>)
          }
          </tbody>
        </table>
        </section>
        )
        }
      </div>
    );
    
  }
}

export default Board;
