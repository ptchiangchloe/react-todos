import React from 'react';

export default class TodosListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false
        };
    }

    renderRow() {
      if(this.props.isCompleted && this.props.onAction){

        return (
          <ul className="checkedmark list-row">
            <li onClick={this.props.toggleTask.bind(this, this.props.task)}>
              {this.renderTaskSection()}
              {this.renderActionsSection()}
            </li>
          </ul>
        )
      }else if (this.props.isCompleted && !this.props.onAction) {
        return (
          <ul className="checkedmark list-row">
            <li onClick={this.props.toggleTask.bind(this, this.props.task)}>
              {this.renderTaskSection()}
            </li>
          </ul>
        )
      }else if (!this.props.isCompleted && this.props.onAction) {
        return (
          <ul className="circle list-row">
            <li onClick={this.props.toggleTask.bind(this, this.props.task)}>
              {this.renderTaskSection()}
              {this.renderActionsSection()}
            </li>
          </ul>
        )
      }

        return (
          <ul className="circle list-row">
            <li onClick={this.props.toggleTask.bind(this, this.props.task)}>
              {this.renderTaskSection()}
            </li>
          </ul>
        )

    }

    renderTaskSection() {
      const { task, isCompleted } = this.props;
      const taskStyle = {
        color: isCompleted? '#29295e' : 'red',
        cursor: 'pointer'
      };

      if (this.state.isEditing) {
        return (
          <div>
            <form onSubmit={this.onSaveClick.bind(this)}>
            <input type="text" defaultValue={task} ref="editInput" />
            </form>
          </div>
        )
      }

      return (
        <div style={taskStyle}

        >

            {task}
        </div>
      );
    }

    renderActionsSection() {
        if (this.state.isEditing) {
            return (
                <div>
                    <button onClick={this.onSaveClick.bind(this)}> Save </button>
                    <button onClick={this.onCancelClick.bind(this)}>Cancel</button>
                </div>
            );
        }

        return (
          <div>
              <button onClick={this.onEditClick.bind(this)}>Edit</button>
              <button onClick={this.props.deleteTask.bind(this, this.props.task)}>Delete</button>
          </div>
        )
    }

    render() {
        return (
            <div className='list-item'>
                {this.renderRow()}
            </div>
        );
    }

    onEditClick() {
        this.setState({ isEditing: true })
    }

    onCancelClick() {
        this.setState({ isEditing: false })
    }

    onSaveClick(event) {
      event.preventDefault();
      const oldTask = this.props.task;
      const newTask = this.refs.editInput.value;
      this.props.saveTask(oldTask, newTask);
      this.setState({
        isEditing: false
      })
    }


}
