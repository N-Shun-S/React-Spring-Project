import axios from "axios"
import AuthenticationService from "../../components/todo/AuthenticationService";
import { API_URL,JPA_API_URL } from "../../Constants";
class HelloWorldService {

    executeHelloWorldService(){
        //console.log('executed service') promise back
        return axios.get(`${API_URL}/hello-world`);
    }

    executeHelloWorldBeanService(){
        //console.log('executed service') promise back
        return axios.get(`${API_URL}/hello-world-bean`);
    }

    executeHelloWorldPathVariableService(name){
        AuthenticationService.setupAxiosInterceptors
        (AuthenticationService.createJWTToken(localStorage.getItem('token')))
        let username = 'testuser'
        let password = 'dummy'

        //???　ここでauthorizationがbearerに書き変わっているのはなぜ？？？？
        let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)

        //console.log('executed service') promise back
        return axios.get(`${API_URL}/hello-world/path-variable/${name}`,
            {
                headers:{
                    authorization:basicAuthHeader
                }
            }
        );
    }
}

export default new HelloWorldService()