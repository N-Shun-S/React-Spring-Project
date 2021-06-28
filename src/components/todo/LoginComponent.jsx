import React, {Component} from 'react';
import AuthenticationService from './AuthenticationService.js';


class LoginComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            username:'',
            password:'',
            hasLoginFailed:false,
            showSuccessMessage:false
        }
        // this.handleUsernameChange = this.handleUsernameChange.bind(this);
        // this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

     
    //テキストボックスが書き換えられた時、stateが更新される
    //username / password
    handleChange(event){
        console.log(this.state);
        this.setState(
            {
                // []で囲わないといけない
                [event.target.name]:event.target.value
            }
        )
    }

    // //username
    // handleUsernameChange(event){
    //     console.log(event.target.value);
    //     this.setState({username:event.target.value})
    // }

    //  //password
    //  handlePasswordChange(event){
    //     console.log(event.target.value);
    //     this.setState({password:event.target.value})
    // }

    loginClicked(){
        // if(this.state.username === 'testuser' && this.state.password === 'dummy'){
        //     //session storageに登録
        //     AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
        //     //this.props???
        //     this.props.history.push(`/welcome/${this.state.username}`)
        //     //this.setState({showSuccessMessage:true})
        //     //this.setState({hasLoginFailed:false})
        // }else{
        //     this.setState({showSuccessMessage:false})
        //     this.setState({hasLoginFailed:true})
        //     console.log('Failed')
        // }

        // AuthenticationService
        // .executeBasicAuthenticationService(this.state.username,this.state.password)
        // .then(()=>{
        //     AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
        //     //this.props???
        //     this.props.history.push(`/welcome/${this.state.username}`)
        // }

        // ).catch(()=>{
        //     this.setState({showSuccessMessage:false})
        //     this.setState({hasLoginFailed:true})
        // })

        AuthenticationService
        .executeJwtAuthenticationService(this.state.username,this.state.password)
        .then((response)=>{
            //
            AuthenticationService.registerSuccessfulLoginForJwt(this.state.username,response.data.token)
            //this.props???
            this.props.history.push(`/welcome/${this.state.username}`)
        }

        ).catch(()=>{
            this.setState({showSuccessMessage:false})
            this.setState({hasLoginFailed:true})
        })
            
        //console.log(this.state)
    }


    render(){
        return(
            <div>
                <h1>Login</h1>
                <div className="container">
                    {/* <div>Invalid Credentials</div> */}
                    {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}></ShowInvalidCredentials> */}
                    {/* <ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}></ShowLoginSuccessMessage> */}
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Successful</div>}
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/><span>　</span>
                    Password: <input type="password" name="password"value={this.state.password} onChange={this.handleChange}/><span>　</span>
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }
}

export default LoginComponent