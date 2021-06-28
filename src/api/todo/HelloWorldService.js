import axios from "axios"
import AuthenticationService from "../../components/todo/AuthenticationService";
class HelloWorldService {

    executeHelloWorldService(){
        //console.log('executed service') promise back
        return axios.get('http://localhost:8080/hello-world');
    }

    executeHelloWorldBeanService(){
        //console.log('executed service') promise back
        return axios.get('http://localhost:8080/hello-world-bean');
    }

    executeHelloWorldPathVariableService(name){
        AuthenticationService.setupAxiosInterceptors
        (AuthenticationService.createJWTToken(localStorage.getItem('token')))
        let username = 'testuser'
        let password = 'dummy'

        //???　ここでauthorizationがbearerに書き変わっているのはなぜ？？？？
        let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)

        //console.log('executed service') promise back
        return axios.get(`http://localhost:8080/hello-world/path-variable/${name}`,
            {
                headers:{
                    authorization:basicAuthHeader
                }
            }
        );
    }
}

export default new HelloWorldService()