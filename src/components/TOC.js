import React, { Component } from 'react';

class TOC extends Component {
    shouldComponentUpdate(newProps, newState){
      let new_props = newProps.data
        , old_props = this.props.data
        ;

      if (new_props === old_props) {
        return false;
      } else {
        return true;
      };
    }

    render() {
      let lists = [];
      let data = this.props.data;

      for (let i = 0; i < data.length; i++) {
        lists.push(
          <li key={data[i].id}>
            <a href={"/content/" + data[i].id}
               data-id={data[i].id}
               onClick={function(id, e) {
                 e.preventDefault();
                 //this.props.onChangePage(data[i].id);
                 //this.props.onChangePage(e.target.dataset.id);
                 this.props.onChangePage(id);
               }.bind(this, data[i].id)}
            >
              {data[i].title}
            </a>
          </li>
        );
      }

      return(
        <nav>
          <ul>
            {lists}
          </ul>
        </nav>
      );
    }
}

  export default TOC;