import axios from 'axios';
const BaseURL='http://dev.syscraft-sqemailmarketingtool.tk/';
export const http = axios.create({
  baseURL: BaseURL,
  headers:{'auth-key': 'SQE-EM@2018','end-client': 'SQE-EM','enctype': 'multipart/form-data'}
  
})

export function UploadImage(data)
{
    return http.post('upload-gallery-image',data);
}