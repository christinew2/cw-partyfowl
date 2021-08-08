import * as tokenService from './tokenService'

const BASE_URL = '/api/users'

function getAllUsers() {
  return fetch(
    BASE_URL, 
    { headers: {Authorization: `Bearer ${tokenService.getToken()}`}},
    { mode: 'cors'}
  )
  .then(res => res.json())
}

function getUserProfile(){
  console.log("I'M IN THE RIGHT FUNCTION")
}

export {
  getAllUsers,
  getUserProfile
}