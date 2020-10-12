
enum StatusCode {
  Ok = 200,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  InternalServerError = 500
}

export interface ResponseBody {
  message?: string
  status: number
  success: boolean
  data?: any
}

export class HTTPResponse implements ResponseBody {
  public message: string
  public status: number
  public success: boolean
  public data: any

  constructor(options: ResponseBody){
    this.message = options.message || ''
    this.status = options.status
    this.success = options.success
    this.data = options.data || undefined

  }
}

export const Ok = (data: any) => new  HTTPResponse({data, status: StatusCode.Ok, success: true})
export const NoContent = () => new  HTTPResponse({status: StatusCode.NotFound, success: true})
export const BadRequest = (message: string) => new  HTTPResponse({message, status: StatusCode.BadRequest, success: false})
export const Unauthorized = (message: string) => new  HTTPResponse({message, status: StatusCode.Unauthorized, success: false})
export const NotFound = (message: string) => new  HTTPResponse({message, status: StatusCode.NotFound, success: false})
export const InternalServerError = (message: string) => new  HTTPResponse({message, status: StatusCode.InternalServerError, success: false})