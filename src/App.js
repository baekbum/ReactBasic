import React, { Component } from 'react';
import Subject from './components/Subject';
import TOC from './components/TOC';
import ReadContents from './components/ReadContents';
import CreateContents from './components/CreateContents';
import UpdateContents from './components/UpdateContents';
import Control from './components/Control';
//import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode:'create',
      max_contents_id : 0,
      welcome:{
        title:'Welcome',
        desc:'Hello, React!'
      },
      selected_contents_id : 1,
      subject:{
        title:'WEB',
        sub:'world wide web!'
      },
      contents: [
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for desigh'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }

  init() {

  }

  getContentsIndex(i_id) {
    let key = parseInt(i_id)
      , contents = this.state.contents
      , obj = contents.find(o => o.id === key)
      ;

    return contents.indexOf(obj);
  }

  getChangeContents(i_id, i_title, i_desc) {  
    let index = this.getContentsIndex(i_id),
        contents = Array.from(this.state.contents)
        ;
    
    contents[index].title = i_title;
    contents[index].desc = i_desc;   

    return contents;
  }

  getReadContents() {
    let key = this.state.selected_contents_id
      , contents = this.state.contents
      , obj = contents.find(o => o.id === key);

      return obj;
  }

  deleteContents() {
    let selected_contents_id = this.state.selected_contents_id
      , new_contents = Array.from(this.state.contents)
      , index = this.getContentsIndex(selected_contents_id)
      ;

      new_contents.splice(index, 1);

      this.setState({
        mode : 'welcome',
        contents : new_contents
      });
  }

  getContents() {
    let _title
      , _desc
      , _article
      ;

    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContents title={_title} desc={_desc} />;

    } else if (this.state.mode === 'read') {
      let obj = this.getReadContents();

      _title = obj.title;
      _desc = obj.desc;
      _article = <ReadContents title={_title} desc={_desc} />;
            
    } else if (this.state.mode === 'create') {
      _article = <CreateContents onSubmit={function(i_title, i_desc){
        let tmp_max_contents_id = null
          , origin_contents_arr = this.state.contents
          , result_contents_arr = null
          ;

        if (0 === this.state.max_contents_id){
          tmp_max_contents_id = (this.state.contents.length + 1);
        } else {
          tmp_max_contents_id = (this.state.max_contents_id + 1);
        };

        result_contents_arr = origin_contents_arr.concat({id: tmp_max_contents_id, title: i_title, desc: i_desc});
  
        //this.state.contents.push({id: tmp_max_contents_id, title: i_title, desc: i_desc});
        
        this.setState({
          selected_contents_id : tmp_max_contents_id,
          max_contents_id : tmp_max_contents_id,
          contents : result_contents_arr,
          mode : 'read'
        });
      }.bind(this)} />
    } else if (this.state.mode === 'update') {
      let content = this.getReadContents();

      _article = <UpdateContents data={content} onSubmit={function(i_id,i_title, i_desc){
        let new_contents = this.getChangeContents(i_id,i_title, i_desc);

        this.setState({
          contents : new_contents,
          mode : 'read'
        });
      }.bind(this)} />
    } else {};

    return _article;
  }
  
  render() {
    return (
      <div className="App">
        <Subject title={this.state.subject.title} 
                 sub={this.state.subject.sub}
                 onChangePage={function() {
                  this.setState({
                    mode : 'welcome'
                  })
                 }.bind(this)}
        />
        <TOC data={this.state.contents} 
             onChangePage={function(i_content_id) {
               this.setState({
                 mode : 'read',
                 selected_contents_id : parseInt(i_content_id)
               })
             }.bind(this)}
        />
        <Control onChangeMode={function(i_mode) {
          if ('delete' === i_mode) {
            if (window.confirm('정말 삭제하시겠습니까?')) {
              this.deleteContents();
            } else {};
          } else {
            this.setState({
              mode : i_mode
            })
          }
        }.bind(this)}/>
        {this.getContents()}
      </div>
    )
  }
}

export default App;