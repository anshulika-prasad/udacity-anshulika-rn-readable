import * as ReadableAPI from '../utils/ReadableAPI'
export const ADD_POST = 'ADD_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const GET_POST = 'GET_POST'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY'
export const SET_SORTING = 'SET_SORTING'
export const VOTE = 'VOTE'
export const COMMENT_VOTE = 'COMMENT_VOTE'
export const DELETE_POST = 'DELETE_POST'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const SET_COMMENT_SORTING = 'SET_COMMENT_SORTING'
export const EDIT_POST = 'EDIT_POST'

export const Sorting = {
  BY_DATE_NEWEST: 'BY_DATE_NEWEST',
  BY_DATE_OLDEST: 'BY_DATE_OLDEST',
  BY_SCORE_HIGHEST: 'BY_SCORE_HIGHEST',
  BY_SCORE_LOWEST: 'BY_SCORE_LOWEST'
}

export const setSorting = sortBy => ({
  type: SET_SORTING,
  sortBy
})

export const setCommentSorting = sortCommentsBy => ({
  type: SET_COMMENT_SORTING,
  sortCommentsBy
})

export const postsById = (posts, actionType) => ({
  type: actionType,
  posts
})

// Got the idea for this from the udacity-react Slack. Specifically from user azreed.
export const fetchPosts = () => dispatch =>
  ReadableAPI.fetchPosts()
    .then(posts =>
      Promise.all(
        posts.map(post =>
          ReadableAPI.fetchComments(post.id)
            .then(comments => (post.comments = comments))
            .then(() => post)
        )
      )
    )
    .then(posts => dispatch(postsById(posts, RECEIVE_POSTS)))

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
})

export const fetchCategories = () => dispatch =>
  ReadableAPI.fetchCategories().then(categories =>
    dispatch(receiveCategories(categories))
  )

export const getPostsByCategory = posts => ({
  type: GET_POSTS_BY_CATEGORY,
  posts
})

export const fetchPostsByCategory = category => dispatch =>
  ReadableAPI.fetchPostsByCategory(category)
    .then(posts =>
      Promise.all(
        posts.map(post =>
          ReadableAPI.fetchComments(post.id)
            .then(comments => (post.comments = comments))
            .then(() => post)
        )
      )
    )
    .then(posts => dispatch(postsById(posts, GET_POSTS_BY_CATEGORY)))

export const receiveComments = (comments, actionType) => ({
  type: actionType,
  comments
})

export const fetchComments = id => dispatch =>
  ReadableAPI.fetchComments(id).then(comments =>
    dispatch(receiveComments(comments, RECEIVE_COMMENTS))
  )

export const voteComment = (id, vote) => dispatch =>
  ReadableAPI.voteComment(id, vote).then(comment =>
    dispatch(receiveComments(comment, COMMENT_VOTE))
  )

export const fetchPost = id => dispatch =>
  ReadableAPI.fetchPost(id)
    .then(post =>
      ReadableAPI.fetchComments(post.id)
        .then(comments => (post.comments = comments))
        .then(() => post)
    )
    .then(post => dispatch(postsById(post, GET_POST)))

export const deletePost = id => dispatch =>
  ReadableAPI.deletePost(id)
    .then(post =>
      ReadableAPI.fetchComments(post.id)
        .then(comments => (post.comments = comments))
        .then(() => post)
    )
    .then(post => dispatch(postsById(post, DELETE_POST)))

export const vote = (id, vote) => dispatch =>
  ReadableAPI.vote(id, vote)
    .then(post =>
      ReadableAPI.fetchComments(post.id)
        .then(comments => (post.comments = comments))
        .then(() => post)
    )
    .then(post => dispatch(postsById(post, VOTE)))

export const addPost = data => dispatch =>
  ReadableAPI.addPost(data)
    .then(post =>
      ReadableAPI.fetchComments(post.id)
        .then(comments => (post.comments = comments))
        .then(() => post)
    )
    .then(post => dispatch(postsById(post, ADD_POST)))

export const editPost = (data, id) => dispatch =>
  ReadableAPI.editPost(data, id)
    .then(post =>
      ReadableAPI.fetchComments(post.id)
        .then(comments => (post.comments = comments))
        .then(() => post)
    )
    .then(post => dispatch(postsById(post, EDIT_POST)))

export const addComment = data => dispatch =>
  ReadableAPI.addComment(data).then(comment =>
    dispatch(receiveComments(comment, ADD_COMMENT))
  )

export const deleteComment = id => dispatch =>
  ReadableAPI.deleteComment(id).then(comment =>
    dispatch(receiveComments(comment, DELETE_COMMENT))
  )
