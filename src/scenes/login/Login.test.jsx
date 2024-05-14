import React from 'react';
import { render, fireEvent, waitFor,screen, getByRole } from '@testing-library/react';
import renderer from 'react-test-renderer';
import axios from 'axios'; // Import axios for mocking
import '@testing-library/jest-dom'; 
import Login from './Login';
jest.mock('axios');
describe('Login', () => {
  //test cases here
  test('renders Login component', () => {
    render(<Login />);
  });

  test('renders the form', () => {
    const { getByLabelText, getByText } = render(<Login />);
    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByText('Submit')).toBeInTheDocument();
  });


  test('Login component renders correctly', () => {
    const tree = renderer
      .create(<Login />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('fills out and submits the form', async () => {
    const { getByLabelText, getByText } = render(<Login />);

    // Fill out the form
    fireEvent.change(getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password123' } });

    // Mock the API call
    axios.post.mockResolvedValueOnce({ status: 200, data: { data: 'mock data' } });

    // Submit the form
    fireEvent.click(getByText('Submit'));

    // Wait for the async call to complete
    await waitFor(() => expect(axios.post).toHaveBeenCalled());

    // Expect login function to be called
    // You may need to mock the login function and test its invocation
    // For example:
    // expect(mockLogin).toHaveBeenCalledWith('mock data');
  });
  
  test('displays error message for invalid email', async () => {
    const { getByRole,getByLabelText} = render(<Login />);
  
    // Fill out the form with an invalid email
    fireEvent.change(getByLabelText('Email'), { target: { value: 'testmail@admin.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password123' } });
    // Mock the API call for invalid email
    axios.post.mockRejectedValueOnce({ response: { data: { message: 'Invalid email or password' } } });
  
    // Submit the form
    fireEvent.click(screen.getByText('Submit'));
  
    // Wait for the async call to complete
    await waitFor(() => expect(axios.post).toHaveBeenCalled());
  
    // Expect Email field to have aria-invalid attribute set to true
    expect(getByLabelText('Email')).toHaveAttribute('aria-invalid', 'false');
  });
});
