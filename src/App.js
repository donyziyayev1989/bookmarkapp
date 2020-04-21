import React from 'react';
import AddBookmark from './components/AddBookmark/addBookmark';
import BookMarkApp from './components/BookmarkApp/bookmarkApp'

class App extends React.Component {
  state = {
    bookmarks: [],
    showAddForm: false,
    error: null
  }
  componentDidMount() {
    this.getBookmarks();

    
  }
  getBookmarks() {
    const url = 'https://tf-ed-bookmarks-api.herokuapp.com/v3/bookmarks';
    const options = {
      method: 'GET',
      headers: {
        // Add your key after Bearer
        "Authorization": "Bearer $2a$10$gCThNFzzeL5LvmDnOMqAYO8V7M/qfmH6RytYP1qhpW.R5ggiZoE16",
        "Content-Type": "application/json"
      }
    };
    fetch(url, options)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong, please try again later.')
        }
        return res
      })
      .then(res => res.json())
      .then(res => {
        this.setState({
          bookmarks: res,
          error: null
        })
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }
  setShowAddForm(show) {
    this.setState({
      showAddForm: show
    })
  }

  addBookmark(bookmark) {
    this.setState({
      bookmarks: [...this.state.bookmarks, bookmark],
      showAddForm: false
    })
  }
  deleteBookmark = (bookmark) => {
    const url = `https://tf-ed-bookmarks-api.herokuapp.com/v3/bookmarks/${bookmark}`;
    const options = {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer $2a$10$gCThNFzzeL5LvmDnOMqAYO8V7M/qfmH6RytYP1qhpW.R5ggiZoE16"
      }
    };
    fetch(url, options)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong, please try again later.')
        }
        return res
      })
      .then(res => res.json())
      .then(res => {
        this.setState({
          bookmarks: res,
          error: null
        })
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
      console.log("url", url);
  }
  render() {
    console.log(this.state);
    const error = this.state.error && <div className="error">{this.state.error}</div>
    const page = this.state.showAddForm
          ? <AddBookmark 
              showForm={show => this.setShowAddForm(show)}
              handleAddBookmark={bookmark => this.addBookmark(bookmark)}/>
          : <BookMarkApp 
              bookmarks={this.state.bookmarks} 
              showForm={show => this.setShowAddForm(show)}
              handleDeleteBookmark={this.deleteBookmark} />
    return (
      <div className="App">
        {page}
        {error}
      </div>
    )
  }
}

export default App;
