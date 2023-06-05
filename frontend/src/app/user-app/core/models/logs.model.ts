export interface LogsDetails {
    id: string,
    payload: string,
    timestamp: Date,
    action: string,
  }

  export interface LogCreate {
    payload: string,
    timestamp: Date,
    action: string,
  }

  export interface LogsView {
    payload: string,
    action: string,
    data: string,
    hora: string
  }
