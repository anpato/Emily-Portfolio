import React, { Component } from 'react'

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      isSubmit: true,
      loading:false
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({[name]:value})
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      this.setState({isSubmit:true})
    } catch (error) {
      throw error
    }
  }
  
  render() {
    return (
      <div className='contact'>
        <div className='form-container'>
        <form>
          <input placeholder='Name' name='name'/>
          <input placeholder='Email' name='email'/>
          <textarea placeholder='Message...' name='message'/>
            <button type='submit' disabled={this.state.isSubmit}><div>Send</div></button>
          </form>
          <aside>
            <div>
              <h3>Contact</h3>
            </div>
            <div>
              <p>Contact Message</p>
            </div>
          </aside>
          </div>
      </div>
    )
  }
}

export { Contact}