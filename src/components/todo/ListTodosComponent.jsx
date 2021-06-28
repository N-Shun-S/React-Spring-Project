import React, {Component} from 'react';
import TodoDataService from '../../api/todo/TodoDataService';
import AuthenticationService from './AuthenticationService';
import moment from 'moment'

class ListTodosComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
           todos:
           [
            //    {id:1, description: 'Learn React', done:false, targetDate:new Date()},
            //    {id:2, description: 'Become an Expert at React' , done:false, targetDate:new Date()},
            //    {id:3, description: 'Visit India' , done:false, targetDate:new Date()}
           ],
        //    ''ではなくnull???
           message : null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
    }

    //???
    componentDidMount(){
        this.refreshTodos();
        // let username = AuthenticationService.getLoggedInUserName
        // TodoDataService.retrieveAllTodos(username)
        // .then(
        //     response => {
        //         //console.log(response)
        //         this.setState({todos:response.data})
        //     }
        // )
    }

    //リフレッシュするため　
    refreshTodos(){
        //()なかったらエラーに急になった???
        let username = AuthenticationService.getLoggedInUserName(); 
        TodoDataService.retrieveAllTodos(username)
        .then(
            response => {
                //console.log(response)
                this.setState({todos:response.data})
            }
        )
    }

    deleteTodoClicked(id){
        //loginユーザー
        let username = AuthenticationService.getLoggedInUserName();
        //console.log("deltetest");
        TodoDataService.deleteTodo(username,id)
        .then(
            response => {
                this.setState({message : `Delete of todo ${id} Successful`});
                this.refreshTodos();
            }
        )
    }

    addTodoClicked(){
        console.log("test")
        this.props.history.push('/todos/-1')
    }

    updateTodoClicked(id){
        console.log('update' + id)
        this.props.history.push(`/todos/${id}`)
        // //loginユーザー
        // let username = AuthenticationService.getLoggedInUserName
        // //console.log("deltetest");
        // TodoDataService.deleteTodo(username,id)
        // .then(
        //     response => {
        //         this.setState({message : `Delete of todo ${id} Successful`});
        //         this.refreshTodos();
        //     }
        // )
    }

    render(){
        return (
            <div>
                <h1>List Todos</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>description</th>
                                <th>Is Completed?</th>
                                <th>Target Date</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo =>
                                    // ↓ないとエラー
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                        <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                        {/* ()=>なぜ？？？ */}
                                        <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default ListTodosComponent