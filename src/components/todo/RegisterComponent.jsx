import React, {Component} from 'react';
import AuthenticationService from './AuthenticationService.js';


class RegisterComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            username:'',
            password:'',
            hasRegisterFailed:false,
            showSuccessMessage:false
        }
        // this.handleUsernameChange = this.handleUsernameChange.bind(this);
        // this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.RegisterClicked = this.RegisterClicked.bind(this);
    }

     
    //テキストボックスが書き換えられた時、stateが更新される
    //username / password
    handleChange(event){
        this.setState(
            {
                // []で囲わないといけない
                [event.target.name]:event.target.value
            }
        )
    }

    RegisterClicked(){
    
        AuthenticationService
        .registerNewLogin(this.state.username,this.state.password)
        .then(()=>{
            this.setState({showSuccessMessage:true})
            this.setState({hasRegisterFailed:false,})
            this.setState({username:''})
            this.setState({password:'',})
        }

        ).catch(()=>{
            this.setState({showSuccessMessage:false})
            this.setState({hasRegisterFailed:true})
        })
            
        console.log(this.state)
    }


    render(){
        return(
            <div>
                <h1>Register</h1>
                <div className="container">
                    {/* <div>Invalid Credentials</div> */}
                    {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}></ShowInvalidCredentials> */}
                    {/* <ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}></ShowLoginSuccessMessage> */}
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Register Successful</div>}
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/><span>　</span>
                    Password: <input type="password" name="password"value={this.state.password} onChange={this.handleChange}/><span>　</span>
                    <button className="btn btn-success" onClick={this.RegisterClicked}>Register</button>
                </div>
            </div>
        )
    }
}

export default RegisterComponent