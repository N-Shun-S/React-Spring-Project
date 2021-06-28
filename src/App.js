//現在はfunction component,ここではclass componentで行う
import React, { Component } from 'react';
//import FirstComponent from './components/learning-examples/FirstComponent';
//import SecondComponent from './components/learning-examples/SecondComponent';
//import ThirdComponent from './components/learning-examples/ThirdComponent';
//import Counter from './components/counter/Counter';
import TodoApp from './components/todo/TodoApp';
//import logo from './logo.svg';
import './App.css';
//bootstrap netから読み込み
import './bootstrap.css';
 
class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Counter/> */}
        <TodoApp/>
      </div>
    );
  }
}



// class LearningComponents extends Component{
//   render(){
//     return(
//       <div className="LearningComponent">
//         My Hello World
//         <FirstComponent></FirstComponent>
//         <SecondComponent></SecondComponent>
//         <ThirdComponent></ThirdComponent>
//       </div>
//     )
//   }

// }




export default App;
