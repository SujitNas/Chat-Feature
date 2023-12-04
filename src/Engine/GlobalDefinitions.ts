
export const ErrorMessages = {
  partial: "#ERR",
  divideByZero: "#DIV/0!",
  invalidCell: "#REF!",
  invalidFormula: "#ERR",
  invalidNumber: "#ERR",
  invalidOperator: "#ERR",
  missingParentheses: "#ERR",
  emptyFormula: "#EMPTY!", // this is not an error message but we use it to indicate that the cell is empty
  outofRange: "asin/acos must be between -1 and 1",
  wrongAnswer: "#Not 24 yet",
  repeatNumber: "Number Issue",
  repeatFormula: "Formula Issue"
}

export const ButtonNames = {
  edit_toggle: "edit-toggle",
  edit: "edit",
  done: "=",
  allClear: "AC",
  clear: "C",
  activateGameMode: "Activate Game Mode",
  deactivateGameMode: "Deactivate Game Mode",
}


export interface CellTransport {
  formula: string[];
  value: number;
  error: string;
  editing: string;
}

export interface UserEditing {
  user: string;
  cell: string;
}

export interface CellTransportMap {
  [key: string]: CellTransport;
}



export interface DocumentTransport {
  columns: number;
  rows: number;
  cells: Map<string, CellTransport>;
  formula: string;
  result: string;
  currentCell: string;
  isEditing: boolean;
  contributingUsers: UserEditing[];
  errorOccurred: string;
  gameMode: boolean;
  gameNumbers: string;
}



