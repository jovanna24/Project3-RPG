import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import './SignupForm.css';

const SignupForm = ({setShowModal, setModalContent}) => {
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [validated, setValidated] = useState(false);
  // const [showAlert, setShowAlert] = useState(false);

  const [addUserMutation] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const { data } = await addUserMutation({
        variables: { 
          userInput: {
            ...userFormData
          }
        },
      });

      const { token } = data.addUser;
      Auth.login(token);
      setUserFormData({ username: '', email: '', password: '' }); // Clear form only on success
    } catch (err) {
      console.error(err);
      setShowModal(true);
      setModalContent({title: 'Error', body: 'Something went wrong with your signup! Make sure your username, email, and password are valid.'});
      // setShowAlert(true);
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleFormSubmit} className='signup-form'>
      {/* <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
        Something went wrong with your signup!
      </Alert> */}
      <Form.Group className='mb-3'>
        <Form.Label htmlFor='username'>Username</Form.Label>
        <Form.Control
          type='text'
          placeholder='Your username'
          name='username'
          onChange={handleInputChange}
          value={userFormData.username}
          required
        />
        {/* <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback> */}
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label htmlFor='email'>Email</Form.Label>
        <Form.Control
          type='email'
          placeholder='Your email address'
          name='email'
          onChange={handleInputChange}
          value={userFormData.email}
          required
        />
        {/* <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback> */}
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label htmlFor='password'>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Your password'
          name='password'
          onChange={handleInputChange}
          value={userFormData.password}
          required
        />
        {/* <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback> */}
      </Form.Group>
      <Button
        className='btn-success'
        disabled={!(userFormData.username && userFormData.email && userFormData.password)}
        type='submit'
        variant='success'>
        Submit
      </Button>
    </Form>
  );
};

export default SignupForm;
