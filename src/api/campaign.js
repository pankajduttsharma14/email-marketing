import axios from 'axios';
const BaseURL='http://dev.syscraft-sqemailmarketingtool.tk/';
export const http = axios.create({
  baseURL: BaseURL,
  headers:{'auth-key': 'SQE-EM@2018','end-client': 'SQE-EM','Content-Type': 'application/json'}

})
export function GetCampaignList()
{
 return http.post('all-campaign',{user_id:localStorage.getItem('user_id')});
}
export function DeleteCampaign(body)
{
  return http.post('delete-campaign',body);
}
export function GetGalleryImages()
{
  return http.post('get-all-image',{"image_type":"gallery"});
}
export function SaveAsDraft(data)
{
  return http.post('edit-campaign',data);
}
export function SendEmail(data)
{
  return http.post('send-campaign',data);
}
export function ViewCampaign(data)
{
  return http.post('view-campaign',data);
}
