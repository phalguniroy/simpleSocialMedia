import axios from 'axios'

axios.get('http://localhost:5000/')
  .then((response) => {
    console.log(response);
  });


export const register = async newUser => {
  console.log(newUser)
  const result = await axios
    .post('http://localhost:5000/users/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password
    })
    
    return result
}

export const login = user => {
  console.log(user)
  return axios
    .post('http://localhost:5000/users/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const feed = async newMessage=>{
  
  const token = localStorage.usertoken
  console.log(newMessage)
  const result = await axios
  .post('http://localhost:5000/users/feeds',{
    email: newMessage.email,
    message: newMessage.message
  },
  { headers: { Authorization: token } }
  )

  return result
}

