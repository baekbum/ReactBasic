import React, { Component } from 'react';

class CreateContents extends Component {
    render() {
      return(
        <article>
          <h2>Create</h2>
          <form action="/create_process" method="post"
                onSubmit={function(e){
                  let target = e.target;
                  e.preventDefault();
                  this.props.onSubmit(target.title.value, target.desc.value); 
                }.bind(this)}
          >
            <p>
              <input type="text" id="title" name="title" placeholder="title"></input>
            </p>
            <p>
              <textarea id="desc" name="desc" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit" id="submit" name="submit"></input>
            </p>
          </form>
        </article>
      );
    }
}

export default CreateContents;