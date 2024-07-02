import axios from 'axios';

export const userService = {
  authenticate,
};

async function authenticate(username: string, password: string) {
  if (!username && !password) {
    throw new Error('Username and password are required');
  }

  const response = await axios.post('http://localhost:7654/api/auth/sign-in', {
    username,
    password
  });

  const user = response.data;

  return {
    id: user.id,
    name: user.name,
  };
}