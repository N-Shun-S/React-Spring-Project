import axios from "axios";
import { API_URL,JPA_API_URL } from "../../Constants";
//他のモジュールでも使えるようにする
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'


class AuthenticationService{

    ////////////////////////////////////////////////////////////
    //ユーザー新規登録
    registerNewLogin(username,password){
        return axios.post(`${API_URL}/register`,{
            username,
            password
        })
    }


    //////////////////////////////////////////////////////////


    //Basic認証
    executeBasicAuthenticationService(username,password){
        return axios.get(`${JPA_API_URL}/basicauth`,
            {headers:{authorization:this.createBasicAuthToken(username,password)}})

    }

    //認証 JWT Tokenが返る
    executeJwtAuthenticationService(username,password){
        return axios.post(`${API_URL}/authenticate`,{
            username,
            password
        })
    }

    //ログインに成功したユーザーをsession storageに保存
    //Besic認証
    registerSuccessfulLogin(username,password){
        // let username = 'testuser'
        // let password = 'dummy'
        localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME,username)
        //???
        this.setupAxiosInterceptors(this.createBasicAuthToken(username,password))
    }

    //Basic認証
    createBasicAuthToken(username,password){
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    //ログインに成功したユーザーをsession storageに保存
    //また、headers.authorizationにTokenを付与
    registerSuccessfulLoginForJwt(username,token){
        localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME,username)

        //★TEST:tokenをlocal storageに保存
        localStorage.setItem('token',token);
        //ログイン成功したタイミングでは作製しない　リロードした際に消えるから
        //this.setupAxiosInterceptors(this.createJWTToken(token))
    }

    //JWT Token　ヘッダーに付与 Bearer認証
    createJWTToken(token){
        return 'Bearer ' + token
    }

    //session storageに保存されているusernameを削除
    logout(){
        localStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        
        //★TEST:tokenをlocal storageから削除
        localStorage.removeItem('token');
    }

    //ログイン済みのユーザーか判定
    isUserLoggedIn(){
        let user = localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if(user ===null) return false
        return true;
    }

    //session storageに保存されているusernameを取得
    getLoggedInUserName(){
        let user = localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if(user ===null) return ''
        return user;
    }

    //認証ヘッダー作製
    setupAxiosInterceptors(token){

        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()){         
                    //毎回のリクエストヘッダーにtokenをつける
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()