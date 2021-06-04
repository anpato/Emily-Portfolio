import React from 'react'
import { connect } from 'react-redux'
import { Button, Input, Divider } from 'rsuite'
import { HandleContactForm } from '../../store/actions'

const state = ({ contact }) => ({ contact })
const actions = (dispatch) => ({
  setForm: (name, value) => dispatch(HandleContactForm(name, value))
})
const Contact = React.forwardRef(({ contact, setForm }, ref) => {
  const handleChange = (value, e) => setForm(e.target.name, value)
  return (
    <section className="container-wrapper contact-container" ref={ref}>
      <h3>Get In Touch</h3>
      <Divider />
      <form>
        <Input
          placeholder="Your Name"
          value={contact.name}
          name="name"
          type="text"
          required
          size="lg"
          onChange={(v, e) => handleChange(v, e)}
        />
        <Input
          placeholder="Your Email"
          value={contact.email}
          name="email"
          type="email"
          size="lg"
          onChange={(v, e) => handleChange(v, e)}
        />
        <Input
          componentClass="textarea"
          placeholder="Let's design something together! Feel free to contact me and I will
          reply back as soon as possible!"
          type="text"
          name="message"
          size="lg"
          value={contact.message}
          onChange={(v, e) => handleChange(v, e)}
        />
        <Button
          disabled={!contact.name || !contact.email || !contact.message}
          appearance="primary"
        >
          Send
        </Button>
      </form>
    </section>
  )
})

export default connect(state, actions, null, { forwardRef: true })(Contact)
