import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { feed } from './UserFunctions'
import axios from 'axios'

class Feeds extends Component {
  constructor() {
    super()
    this.state = {
      message: '',
      messages:[],
      created:'',
      isLoading: true,
      errors: null
    }
    

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

/////////////////////
var today = new Date();
var year = today.getFullYear();
var mes = today.getMonth()+1;
var dia = today.getDate();
var fecha =year+"-"+mes+"-"+dia;

///////////////////////

    const newMessage = {
      message: this.state.message,
      email: this.state.email,
      created: fecha
    }

    feed(newMessage).then(res => {
      console.log(res.data)
      const msgs = this.state.messages.push(newMessage) 
      this.setState({message: msgs})
    })

  
    
}
  

  componentDidMount() {
    
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    console.log(decoded)
    this.setState({
      email: decoded.email
    })

    axios.get('http://localhost:5000/users/feeds', { headers: { Authorization: token } })
 .then(response => {
     // If request is good...
     console.log('response')
     console.log(response.data);
     this.setState({
      messages: response.data,
      isLoading: false
    });
  })
  
  // We can still use the `.catch()` method since axios is promise-based
  .catch(error => this.setState({ error, isLoading: false }));
}
  

  render() {
    const { isLoading, messages } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Feeds</h1>
              <div className="form-group">
                <label htmlFor="name">message</label>
                <textarea
                type="text"
                 className="form-control"
                  rows="3"
                  name="message"
                  placeholder="type here..."
                  value={this.state.message}
                  onChange={this.onChange} />
              </div>
              
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                post
              </button>
            </form>

            <div>
        {!isLoading ? (
          messages.map(msg => {
            const { created, message} = msg;
            return (
              <div key={created + message}>
                <p>{message}</p>
                <p>{created}</p>
                <hr />
              </div>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Feeds


