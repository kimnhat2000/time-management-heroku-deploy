import React from 'react';
import { editWork, editWorkWithFirebase, finishedWorkWithFirebase } from '../actions/timeManagementActions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import '../styles/working.css';

class Working extends React.Component{
    constructor(props){
        super(props);
        const {tasks}=this.props
        const task=tasks?tasks.find(t=>t.id===this.props.match.params.id):''
        const totalTime=task ? task.hour*60*60*1000+task.minute*60*1000:''
        this.state={
            task,
            totalTime,
            hour:task?task.hour:'',
            minute:task?task.minute:'',
            second:'',
            millisecond:'',
            timer:null,
            startButton:'start',
            warning:false,
            text:'',
        }
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.totalTime !== this.state.totalTime){
            if(this.state.totalTime === 0){
                const {task, hour, minute}=this.state
                clearInterval(this.state.timer)
                const workDone = {id:task.id, name:task.name, hour, minute, completed:true}
                this.props.dispatch(editWorkWithFirebase(workDone))
                this.props.dispatch(finishedWorkWithFirebase(workDone))
                this.setState({text:'time for the next task'})
                return;
            }
        }else{

        }
    }

    componentWillUnmount(){
        if(this.state.timer !== null){
            const {task, hour, minute}=this.state
            const newTask={id:task.id, name:task.name, hour:hour, minute:minute+1}
            this.props.dispatch(editWork(newTask))
            clearInterval(this.state.timer)
        }
    }

    onPlay=()=>{
        clearInterval(this.state.timer);
        this.setState({startButton:'running'})
        this.state.timer=setInterval(()=>{    
            let {totalTime, hour, minute, second, millisecond}=this.state
            hour = Math.floor(totalTime /( 60*60*1000))
            minute = Math.floor(totalTime % (60*60*1000) / (60*1000))
            second = Math.floor((totalTime % (60*1000)) / 1000)
            millisecond = Math.floor((totalTime % 1000))     
            this.setState({totalTime:this.state.totalTime-10, hour, minute, second, millisecond})    
        },10)
    }

    onPause=()=>{
        clearInterval(this.state.timer)
        this.setState({startButton:'resume'})
    }

    onRestart=()=>{
        const {hour, minute} = this.state.task
        clearInterval(this.state.timer)
        this.setState({hour, minute, totalTime:hour*60*60*1000+minute*60*1000, second:'', millisecond:'', timer:null, startButton:'start'})
    }

    test=()=>{  
        const percentage = (this.state.totalTime / (this.state.task.hour *60*60 + this.state.task.minute*60)).toFixed(2)
        console.log(this.state.totalTime)
    }
    render(){
        const {task, totalTime, hour, minute, second, millisecond}=this.state
        const hourCheck=task && task.hour !== 1 ? 'hours' : 'hour'
        const minuteCheck=task && task.minute !== 1 ? 'minutes' : 'minutes'
        const percentage =task && ((1-(totalTime / (this.state.task.hour *60*60 + this.state.task.minute*60) /1000))*100).toFixed(2)
        const percentageFix = percentage >= 100 ? 100 : percentage
        const style={
            backgroundColor: 'red',
            width:`${percentage}%`
        }
        return(
            <div>
                <button onClick={this.test}>test</button>
                {task &&
                <div className='working-container'>
                    <div className='working-task-info'>
                        <h3>{task.name}</h3>
                        <h4 className='time-remain'><span>{hour}</span>: {hourCheck} <span> {minute}</span>: {minuteCheck} {second ? <span> {second}</span> : <span> 0</span>}: seconds {millisecond ? <span> {millisecond}</span> : <span> 0</span>}: millisecond</h4>
                        <div className='progress-bar'>
                            <div 
                                className='done-percentage'
                                style={style}
                            >
                            </div>
                            <div className='middle'>
                                <h3>{percentageFix} %</h3>
                            </div>
                        </div>
                        <h4 className='finish-task'>{this.state.text}</h4>
                    </div>
                    <div className='working-task-button'>
                        <button className='play-task' onClick={this.onPlay}>{this.state.startButton}</button>
                        <button className='pause-task' onClick={this.onPause}>pause</button>
                        <button className='restart-task' onClick={this.onRestart}>restart</button>                   
                    </div>  
                </div>
                }
                <Link to='/main'>main page</Link>
            </div>
        )
    }
}
    
const mapStateToProps=(state)=>({
    tasks: state.works.works,
})

export default connect(mapStateToProps)(Working)