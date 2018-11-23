import axios from 'axios';
import {EncryptionModule} from './excryptionservice';
import router from '../routes';
const BaseURL='http://dev.syscraft-sqemailmarketingtool.tk/';
export const http = axios.create({
  baseURL: BaseURL,
  headers:{'auth-key': 'SQE-EM@2018','end-client': 'SQE-EM','Content-Type': 'application/json'}

})

function LoginAuth(data)
{
    return http.post('login',data);
}

function CheckLogin()
{
  var loginstatus=localStorage.getItem('loginStatus');
  if(loginstatus)
  {
    var status =EncryptionModule.DycryptionService(loginstatus);
    if(status!=='LoggedIn1') return false;
    else return true;
  }

}
function LogOut()
{
  localStorage.clear();
  router.push('/login');
}

export const LoginService={LoginAuth, CheckLogin, LogOut};
