import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

export interface IGetTranslateRequest {
  client: 'gtx',
  sl: 'ru' | 'en',
  tl: string,
  dt: 't',
  q:  string
}

const buildParams = (params: IGetTranslateRequest | undefined) => {
  let paramsReq = new HttpParams();
  if (!params) return paramsReq
  Object.entries(params).forEach(([key, value]) => {
    paramsReq = paramsReq.append(key, value)
  })
  return paramsReq
}

@Injectable({providedIn: 'root'})
export class TranslateService {

  constructor(private http: HttpClient) {}

  getTranslate(params?: IGetTranslateRequest): Observable<any> {
    let paramsReq = buildParams(params)
    return this.http.get<any>('https://translate.googleapis.com/translate_a/single', {params: paramsReq})
  }
}
