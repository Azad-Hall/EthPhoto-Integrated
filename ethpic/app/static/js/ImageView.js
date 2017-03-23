import React from 'react';

var ImageView = React.createClass({
  render(){
    return(
      <div>
        {this.props.maximize ?
          <div className="overlay" onClick={this.props.closeImageView}>
            <div className="container center-position">
              <div className="row">
                <div className="col m12 l6 offset-l3">
                  <div className="card">
                   <div className="card-image">
                     <img src={this.props.data.url} />
                     <span className="card-title">{this.props.data.title}</span>
                     <a className="btn-floating halfway-fab waves-effect waves-light red" href={this.props.data.url} download><i className="material-icons">play_for_work</i></a>
                   </div>
                   <div className="card-content">
                     {this.props.data.tags.map(tag => {
                      return(
                        <div className="chip" key={tag}>
                          #{tag}
                        </div>
                      )
                    })}
                   </div>
                 </div>
               </div>
             </div>
           </div>
          </div>
          :<div></div>
         }
       </div>
    )
  }
})

export default ImageView;
