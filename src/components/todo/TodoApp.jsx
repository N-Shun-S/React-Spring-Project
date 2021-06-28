import React, {Component} from 'react';
//Switch 一つのcomponentのみ
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
//import AuthenticationService from './AuthenticationService.js';
import AuthenticatedRoute from './AuthenticatedRoute';
import LoginComponent from './LoginComponent.jsx';
import ListTodosComponent from './ListTodosComponent.jsx';
import HeaderComponent from './HeaderComponent.jsx';
import FooterComponent from './FooterComponent.jsx';
import WelcomeComponent from './WelcomeComponent.jsx';
import LogoutComponent from './LogoutComponent.jsx';
import ErrorComponent from './ErrorComponent.jsx';
import TodoComponent from './TodoComponent';
import RegisterComponent from './RegisterComponent';

class TodoApp extends Component {
    render(){
        return(
            <div className="TodoApp">
                <Router>
                    <>
                        <HeaderComponent/>
                            <Switch>
                                <Route exact path="/" component={LoginComponent}/>
                                <Route path="/login" component={LoginComponent}/>
                                <Route path="/register" component={RegisterComponent}/>
                                {/* path component ...this.props */}
                                <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                                {/* todos/id を先にしないとtodosに反応してしまう */}
                                <AuthenticatedRoute path="/todos/:id" component={TodoComponent}/>
                                <AuthenticatedRoute path="/todos" component={ListTodosComponent}/>
                                <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                                <Route component={ErrorComponent}/>
                            </Switch>
                        <FooterComponent/>
                    </>
                </Router>
                {/* <LoginComponent/>
                <WelcomeComponent/> */}
            </div>
        )
    }
}




// //function component
// function ShowInvalidCredentials(props){
//     //componentの中で宣言
//     if(props.hasLoginFailed){
//         return <div>Invalid Credentials</div>
//     }
//     return null
// }

// //function component
// function ShowLoginSuccessMessage(props){
//     //componentの中で宣言
//     if(props.showSuccessMessage){
//         return <div>Login Successful</div>
//     }
//     return null
// }


export default TodoApp