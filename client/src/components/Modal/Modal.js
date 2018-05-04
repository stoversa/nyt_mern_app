import React from 'react'

class Modal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render(){
    return (<div className="modal fade" id="errorModal" tabIndex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalTitle">No Results</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-12">
                <div className="text-center">No results found. Please try to refine your search!</div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-outline-success btn-block" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
  
export default Modal;