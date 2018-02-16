export interface Job {
  id: string
  name: string
  uri: string
  log: string
  state: string
  workflow: string
  additionalInfo: object
  input: object
  output: object
}

export interface WorkflowInput {
  [x: string]: object
}

export interface JobDescription {
  name: string
  input: WorkflowInput
  workflow: string
}

export default class JobService {
  constructor(private api = 'http://localhost:8080/jobs') {}

  getJobs(): Promise<Job[]> {
    return new Promise<Job[]>((resolve, reject) => {
      fetch(this.api).then(
        (value: Response) => {
          if (value.ok) {
            resolve(value.json())
          } else {
            reject('Received incompatible result: ' + value.status + ': ' + value.statusText)
          }
        },
        reason => {
          reject(reason)
        }
      )
    })
  }

  submitJob(jobDescription: JobDescription): Promise<Object> {
    return new Promise<Object>((resolve, reject) => {
      const params: RequestInit = {
        body: JSON.stringify(jobDescription),
        method: 'POST'
      }
      fetch(this.api, params).then(
        (value: Response) => {
          if (value.ok) {
            resolve(value.json())
          } else {
            reject('Received incompatible result: ' + value.status + ': ' + value.statusText)
          }
        },
        (reason: any) => {
          reject(reason)
        }
      )
    })
  }

  getJob(jobId: string): Promise<Job> {
    return new Promise<Job>((resolve, reject) => {
      fetch(this.api + '/' + jobId).then(
        (value: Response) => {
          if (value.ok) {
            resolve(value.json())
          } else {
            reject('Received incompatible result: ' + value.status + ': ' + value.statusText)
          }
        },
        reason => {
          reject(reason)
        }
      )
    })
  }

  deleteJob(jobId: string): Promise<Object> {
    return new Promise<Object>((resolve, reject) => {
      fetch(this.api + '/' + jobId, { method: 'DELETE' }).then(
        (value: Response) => {
          if (value.ok) {
            resolve(value.json())
          } else {
            reject('Received incompatible result: ' + value.status + ': ' + value.statusText)
          }
        },
        reason => {
          reject(reason)
        }
      )
    })
  }

  cancelJob(jobId: string): Promise<Object> {
    return new Promise<Object>((resolve, reject) => {
      fetch(this.api + '/' + jobId + '/cancel', { method: 'CANCEL' }).then(
        (value: Response) => {
          if (value.ok) {
            resolve(value.json())
          } else {
            reject('Received incompatible result: ' + value.status + ': ' + value.statusText)
          }
        },
        reason => {
          reject(reason)
        }
      )
    })
  }
}
