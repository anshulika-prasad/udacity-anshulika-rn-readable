export const BASE_URL = 'http://localhost:3001'

let token = localStorage.token

if (!token) {
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8)
  console.log('ANSHULIKA : token : ' + token)
}

export const headers = {
  Accept: 'application/json',
  Authorization: token
}

export const fetchCategories = () =>
  fetch(`${BASE_URL}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const fetchComments = id =>
  fetch(`${BASE_URL}/posts/${id}/comments`, { headers })
    .then(data => data.json())
    .then(data => data)

// Add new post
export const addComment = data =>
  fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(data => data.json())

// Change voteScore for a comment
export const voteComment = (id, vote) =>
  fetch(`${BASE_URL}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: vote })
  }).then(data => data.json())

// Delete post
export const deleteComment = id =>
  fetch(`${BASE_URL}/comments/${id}`, {
    method: 'DELETE',
    headers
  }).then(data => data.json())

// Post related APIs

//  Get all posts
export const fetchPosts = () =>
  fetch(`${BASE_URL}/posts`, { headers }).then(data => data.json())

// Get all posts in a category
export const fetchPostsByCategory = category =>
  fetch(`${BASE_URL}/${category}/posts`, { headers }).then(data => data.json())

// Get a single post based on id
export const fetchPost = id =>
  fetch(`${BASE_URL}/posts/${id}`, { headers }).then(data => data.json())

// Delete post
export const deletePost = id =>
  fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
    headers
  }).then(data => data.json())

// Change voteScore for a post
export const vote = (id, vote) =>
  fetch(`${BASE_URL}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: vote })
  }).then(data => data.json())

// Add new post
export const addPost = data =>
  fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(data => data.json())

// Edit post
export const editPost = (data, id) =>
  fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(data => data.json())
