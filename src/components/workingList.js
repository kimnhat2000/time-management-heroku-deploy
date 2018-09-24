import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import '../styles/taskList.css';

const WorkingList =({works, finishedWorks, workClick, dispatch, onDeleteTask, onDeleteFinishedWork, onEditTask})=>{
    const taskCheck = finishedWorks.length !== 1 ? 'tasks' : 'task'
    const workList=works.map(w=>(
        <div 
            key={w.id}
            className='working-list'
        >
            <Link to={`/${w.id}`}><button className='start-task'>{w.name}</button></Link>
            <h4>working hour is <span>{w.hour}</span> {w.hour > 1 ? 'hours' : 'hour'} <span>{w.minute}</span> {w.minute !== 1 ? 'minutes' : 'minute'}</h4>
            <div className='task-button'>
                <button className='delete' onClick={()=>onDeleteTask(w)}>delete task</button>
                <button className='edit' onClick={()=>onEditTask(w)}>edit task</button>
            </div>

        </div>
    ))
    const finishedtasks=finishedWorks.length !== 0 && finishedWorks.map(w=>(
        <div 
            key={w.id}
            className='finished-work-container'
        >
            <button onClick={()=>onDeleteFinishedWork(w)}></button>
            <h4 className='finished-work'>{w.name}</h4>            
        </div>
    ))

    return(
        <div className='list-container'>
        
            <div>
                {workList}
            </div>

            {finishedWorks.length !== 0 &&
            <div className='finished-tasks'>
                <h4>{taskCheck} you have finised</h4>
                <div>{finishedtasks}</div>
            </div>
            }
        </div>
    )
}

const mapStateToProps=(state)=>({
    finishedWorks:state.works.finishedWorks
})

export default connect(mapStateToProps)(WorkingList)