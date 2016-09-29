var ShiftRowList = React.createClass({

  getInitialState: function() {
    return {
      rows: []
    };
  },

  addRow: function(task, name) {
    this.setState({
      rows: this.state.rows.concat([<ShiftRow task={task} name={name}/>])
    });
  },

  rotate: function() {
    var last = this.state.rows.length - 1;
    this.setState({
      rows: [this.state.rows[last]].concat(this.state.rows.slice(0, last))
    });
  },

  render: function() {
    return (
      <div className='list'>
        <ShiftHeader/>
        <AddRow addRow={this.addRow}/>
        {this.state.rows}
        <Rotate rotate={this.rotate}/>
      </div>
    )
  }

});


var ShiftHeader = React.createClass({

  render: function() {
    return (
      <div className='header'>
        <div className="task-wrapper">
          <div className='task'>Task</div>
        </div>
        <div className='name-wrapper'>
          <div className='name'>Name</div>
        </div>
      </div>
    )
  }

});



var ShiftRow = React.createClass({

  render: function() {
    return (
      <div className='row'>
        <div className="task-wrapper">
          <div className='task'>{this.props.task}</div>
        </div>
        <div className='name-wrapper'>
          <div className='name'>{this.props.name}</div>
        </div>
      </div>
    )
  }

});


var AddRow = React.createClass({

  getInitialState: function() {
    return {
      task: '',
      name: '',
    };
  },

  handleTaskChange: function(event) {
    this.setState({
      task: event.target.value
    });
  },

  handleTaskKeyPress: function() {
    if (event.key === 'Enter') {
      this.setState({
        taskFocus: false,
        nameFocus: true
      });
    }
  },

  handleNameChange: function(event) {
    this.setState({
      name: event.target.value
    });
  },

  handleNameKeyPress: function() {
    if (event.key === 'Enter') {
      this.props.addRow(this.state.task, this.state.name);
      this.setState({
        name: '',
        task: ''
      });
    }
  },

  render: function() {
    return (
      <div className='add'>
        <div className="task-wrapper">
          <input 
            placeholder='e.g. Wax poetic'
            type='text' 
            name='task' 
            value={this.state.task}
            onChange={this.handleTaskChange} 
            onKeyPress={this.handleTaskKeyPress} 
            autoFocus
          />
        </div>
        <div className="name-wrapper">
          <input 
            type='text' 
            name='name'
            placeholder='e.g. Emily Dickinson'
            value={this.state.name}
            onChange={this.handleNameChange}
            onKeyPress={this.handleNameKeyPress}
          />
        </div>
      </div>
    )
  },

});


var Rotate = React.createClass({
  render: function() {
    return (
      <button onClick={this.props.rotate}>Rotate</button>
    )
  }
});


React.render(<ShiftRowList/>, document.getElementById('list-container'));