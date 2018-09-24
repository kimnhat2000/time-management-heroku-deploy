import React from 'react';
import {addWorkWithFireBase, editWorkWithFirebase} from '../actions/timeManagementActions';
import {connect} from 'react-redux';
import '../styles/form.css';

class Form extends React.Component{
    constructor(props){
        super(props);
        const {id, name, hour, minute}=this.props
        this.state={
            name:name?name:'',
            hour:hour?hour:0,
            minute:minute?minute:0,
            id:id?id:'',
            text:'',
            error:false,
            editIndication:id?`you wat to edit ${name} task?`:'',

        }
    }

    componentWillReceiveProps(prevProps, prevState){
        if(prevProps.id !== this.props.id){
            const {id, name, hour, minute} = prevProps
            this.setState({id, name, hour, minute, editIndication: `you wat to edit ${name} task?`})
        }
    }

    onSave=(e)=>{
        e.preventDefault()
        const {id, name, hour, minute}=this.state
        const newTask={name, hour, minute}
        const editedWork={id, name, hour, minute}
        const matchCheckArray=this.props.tasks && this.props.tasks.map(t=>t.name)
        if(!this.state.name){
            this.setState({error:true, text:'you need to enter a task name'})
            return;
        }else if(matchCheckArray.includes(name) && !id) {
            this.setState({error:true, text:'this task is already existed'})
            return;
        }else if(!hour && !minute){
            this.setState({error:true, text:'you need to enter time'})
            return;
        }else if(this.state.id){
            this.props.dispatch(editWorkWithFirebase(editedWork))
            this.props.showForm(true)
            this.setState({ name:'', hour:0, minute:0, editIndication:'' })
            return;
        }else
            this.setState({error:false, text:'', name:'', hour:0, minute:0})
            this.props.dispatch(addWorkWithFireBase(newTask))
            console.log(this.props.tasks)
    }

    render(){
        const {showForm}=this.props
        const hourCheck=this.state.hour !== 1 ? 'hours':'hour'
        const minuteCheck=this.state.minute !== 1 ? 'minutes':'minute'
        return(
            <form 
                className='form-container'
                onSubmit={this.onSave}
            >
                <h4 className='close-button' onClick={()=>showForm(false)}>X</h4>
                {this.props.id && 
                    <h3>{this.state.editIndication}</h3>
                }
                {this.state.error &&
                    <h3>{this.state.text}</h3>
                }
                <input
                    className='name-input'
                    placeholder='task name'
                    type='text'
                    value={this.state.name}
                    onChange={(e)=>this.setState({name:e.target.value})}
                />
                <label>{hourCheck}</label>
                <input
                    placeholder='hour'
                    type='number'
                    value={this.state.hour}
                    onChange={(e)=>this.setState({hour:e.target.value})}
                />
                <label>{minuteCheck}</label>
                <input
                    placeholder='minute'
                    type='number'
                    value={this.state.minute}
                    onChange={(e)=>this.setState({minute:e.target.value})}
                />
                <button className='save'>save</button>
            </form>
        )
    }
}

const mapStateToProps = (state) => ({
    tasks:state.works.works
})

export default connect(mapStateToProps)(Form)