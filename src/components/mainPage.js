import React from 'react';
import WorkingList from './workingList';
import Form from './form';
import taskFilter from '../tools/filter';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {textFilter, timeFilter, nameFilter, noFilter} from '../actions/filterAction';
import { deleteWorkWithFirebase, deleteFinishedWorkWithFirebase } from '../actions/timeManagementActions';
import '../styles/mainPage.css';


class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            warning:false,
            work:'',
            text:'',
            showForm:true,
            showEditForm:false,
            returnDefault:false
        }
    }

    deleteATask=(work)=>{
        this.setState({work, warning:!this.state.warning, text:'delete this task?'})
    }

    editTask=(work)=>{
        this.setState({work, showForm:false, showEditForm:true})
    }
    
    onConfirm=(pass)=>{
        if(pass){
            this.props.dispatch(deleteWorkWithFirebase(this.state.work))
            this.setState({text:'', warning:false})
            return;
        }else{
            this.setState({text:'', warning:false})
            return;
        }
    }

    render(){
        const {id, name, hour, minute}=this.state.work
        const taskCheck = this.props.jobs !== 1 ? 'tasks' : 'task'
        const totalTime = this.props.time.length !== 0 ? this.props.time.reduce((accumulator, currentValue) => accumulator + currentValue) : 0
        const hourCheck = totalTime !== 1 ? 'hours' : 'hour'
        return(
            <div className='main-page-container'>

                <div className='all-inputs'>                    
                    <button onClick={()=>this.setState({showForm:!this.state.showForm, showEditForm:false})}>add task</button>
                    <input 
                        className='find-task'
                        type='text'
                        placeholder='find tasks by name'
                        value={this.props.filter}
                        onChange={(e) => this.props.dispatch(textFilter(e.target.value))}
                    />
                    <select
                        value={this.props.filter.sortBy}
                        onChange={(e) => {
                            if (e.target.value === 'time') {
                                this.setState({returnDefault:false})
                                this.props.dispatch(timeFilter())
                            }else if (e.target.value === 'name') {
                                this.setState({returnDefault:false})
                                this.props.dispatch(nameFilter())
                            }else if (e.target.value === 'default') {
                                this.setState({returnDefault:true})
                            }
                        }}
                    >
                        <option value = 'default'>sort by</option>
                        <option value = 'time'>time</option>
                        <option value = 'name'>name</option>
                    </select>               
                </div>

                {this.state.warning &&
                <div className='warning'>
                    <h4>are you sure you want to {this.state.text}</h4>
                    <button onClick={()=>this.onConfirm(true)}>yes</button>
                    <button onClick={()=>this.onConfirm(false)}>no</button>
                </div>
                }

                {this.props.jobs &&
                <div className='tasks-info'>
                    <h3>you are having <span>{this.props.jobs.length}</span> {taskCheck}</h3>
                    <h3>the total time for all tasks is <span>{totalTime}</span> {hourCheck}</h3>
                </div>
                }

                <div className='task-list'>
                    {this.state.showForm &&
                        <Form
                            showForm={(pass)=>this.setState({showForm:pass})}
                        />
                    }

                    {this.state.showEditForm &&
                        <Form
                            name={name}
                            hour={hour}
                            minute={minute}
                            id={id}
                            showForm={(pass)=>this.setState({showEditForm:pass})}
                        />
                    }

                    <WorkingList
                        works={this.state.returnDefault ? this.props.jobs : this.props.filteredJobs}
                        onDeleteTask={(work)=>this.deleteATask(work)}
                        onEditTask={(work)=>this.editTask(work)}
                        onDeleteFinishedWork={(work)=>this.props.dispatch(deleteFinishedWorkWithFirebase(work.finishedWorkId))}
                    />                
                </div>


            </div>
        )
    }
}

const mapStateToProps=(state)=>({
    jobs:state.works.works,
    filter:state.filter.text,
    filteredJobs:taskFilter(state.works.works, state.filter),
    time:state.works.works.map(j=>j=parseFloat(((j.hour*60 + j.minute)/60).toFixed(1))),
})

export default connect(mapStateToProps)(MainPage)