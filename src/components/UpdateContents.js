import React, { Component } from 'react';

class UpdateContents extends Component {
    constructor(props){
      super(props);
      this.state = {
        id : this.props.data.id,
        title : this.props.data.title,
        desc : this.props.data.desc
      }

      this.inputFormHandler = this.inputFormHandler.bind(this);
    }

    inputFormHandler(e) {
      let target = e.target;
      this.setState({
        [target.name] : target.value
      })
    }
  
    render() {
      return(
        <article>
          <h2>Update</h2>
          <form action="/update_process" method="post"
                onSubmit={function(e){
                  e.preventDefault();
                  this.props.onSubmit(this.state.id, this.state.title, this.state.desc); 
                }.bind(this)}
          >
            <input type="hidden" id="id" name="id" value={this.state.id}></input>
            <p>
              <input type="text" 
                     id="title" 
                     name="title" 
                     placeholder="title"
                     value={this.state.title}
                     onChange={this.inputFormHandler}
              ></input>
            </p>
            <p>
              <textarea id="desc" 
                        name="desc" 
                        placeholder="description"
                        value={this.state.desc}
                        onChange={this.inputFormHandler}
              ></textarea>
            </p>
            <p>
              <input type="submit" id="submit" name="submit"></input>
            </p>
          </form>
        </article>
      );
    }
}

export default UpdateContents;