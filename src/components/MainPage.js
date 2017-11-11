import React, { Component } from 'react'
import { connect } from 'react-redux'
import logo from '../logo.svg'
import { fetchPosts, vote, deletePost, setSorting } from '../actions'
import { Link } from 'react-router-dom'
import SideNav from '../components/SideNav'
import TiVoteOUp from 'react-icons/lib/ti/arrow-sorted-up'
import TiVoteODown from 'react-icons/lib/ti/arrow-sorted-down'
import FaCommentImage from 'react-icons/lib/fa/comment-o'
import '../styles/app.css'
import '../App.css'
import { guid, formatDate } from '../utils/MiscUtils'

class Home extends Component {
  componentWillMount () {
    this.props.fetchData('BY_SCORE_HIGHEST')
  }

  submitVote = (id, voteType) => {
    this.props.dispatch(vote(id, voteType))
  }

  deletePost = id => {
    this.props.dispatch(deletePost(id))
  }

  render () {
    return (
      <div style={{ backgroundColor: '#FFFFFF' }}>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to Udacity Readable</h1>
        </header>
        <SideNav sortBy={this.props.sortBy} />
        <div style={{ width: '70%', float: 'left' }}>
          <h2>
            Posts (<Link to='/create-post'>Add New</Link>)
          </h2>

          {this.props.posts &&
            Object.values(this.props.posts)
              .filter(post => !post.deleted)
              .sort((a, b) => {
                switch (this.props.sortBy) {
                  case 'BY_SCORE_LOWEST':
                    return a.voteScore - b.voteScore
                  case 'BY_DATE_OLDEST':
                    return a.timestamp - b.timestamp
                  case 'BY_DATE_NEWEST':
                    return b.timestamp - a.timestamp
                  default:
                    return b.voteScore - a.voteScore
                }
              })
              .map(post => (
                <div className='post' key={guid()}>
                  <Link to={`/${post.category}/${post.id}`}>
                    <h3 style={{ marginBottom: 0 }}>{post.title}</h3>
                  </Link>
                  <span>
                    by <b>{post.author}</b> at {formatDate(post.timestamp)}
                  </span>
                  <span>
                    Score: {post.voteScore}{' '}
                    <span className='clickable' id='plus-image'>
                      <TiVoteOUp
                        onClick={() => this.submitVote(post.id, 'upVote')}
                      />
                    </span>/
                    <span className='clickable' id='minus-image'>
                      <TiVoteODown
                        onClick={() => this.submitVote(post.id, 'downVote')}
                      />
                    </span>
                  </span>
                  <span>
                    <FaCommentImage /> {post.comments && post.comments.length}{' '}
                    Comments
                  </span>
                  <span>
                    <Link
                      to={{
                        pathname: `/${post.category}/${post.id}`,
                        state: { postEditorVisible: true }
                      }}
                    >
                      Edit
                    </Link>{' '}
                    /{' '}
                    <span
                      className='clickable'
                      onClick={() => this.deletePost(post.id)}
                    >
                      Delete
                    </span>
                  </span>
                </div>
              ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.postsById,
  sortBy: state.setSorting ? state.setSorting.sort : ''
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  fetchData: sortCriteria =>
    dispatch(fetchPosts()).then(() => dispatch(setSorting(sortCriteria)))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
