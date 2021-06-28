import axios from "axios"

import { API_URL,JPA_API_URL } from "../../Constants";

//★TEST:各サーバーアクセス処理の前にヘッダーを新たに作成する
import AuthenticationService from "../../components/todo/AuthenticationService";

class TodoDataService {

    retrieveAllTodos(name){
        //関数化する
        let token = AuthenticationService.createJWTToken(localStorage.getItem('token'))
        AuthenticationService.setupAxiosInterceptors(token)

        //console.log('executed service') promise back
        return axios.get(`${JPA_API_URL}/users/${name}/todos`);
    }

    retrieveTodo(name,id){
        AuthenticationService.setupAxiosInterceptors
        (AuthenticationService.createJWTToken(localStorage.getItem('token')))
        //console.log('executed service') promise back
        return axios.get(`${JPA_API_URL}/users/${name}/todos/${id}`);
    }

    deleteTodo(name, id){
        AuthenticationService.setupAxiosInterceptors
        (AuthenticationService.createJWTToken(localStorage.getItem('token')))
        //console.log('executed service') promise back
        return axios.delete(`${JPA_API_URL}/users/${name}/todos/${id}`);
    }

    updateTodo(name, id,todo){
        AuthenticationService.setupAxiosInterceptors
        (AuthenticationService.createJWTToken(localStorage.getItem('token')))
        //console.log('executed service') promise back
        return axios.put(`${JPA_API_URL}/users/${name}/todos/${id}`,todo);
    }

    createTodo(name,todo){
        AuthenticationService.setupAxiosInterceptors
        (AuthenticationService.createJWTToken(localStorage.getItem('token')))
        //console.log('executed service') promise back
        return axios.post(`${JPA_API_URL}/users/${name}/todos/`,todo);
    }
}

export default new TodoDataService()