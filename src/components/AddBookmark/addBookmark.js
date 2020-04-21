import React, { Component } from  'react';
import './addBookmark.css';

class AddBookmark extends Component {

    state ={
        title:'',
        url: '',
        description: '',
        rating: 1,
        error: []
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(name);
        this.setState({
            [name]: value
        })
        
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            error: []
        });

        const {title, url, description, rating} = this.state;
        const bookmark = {title,  url, description, rating};
        const urlS ='https://tf-ed-bookmarks-api.herokuapp.com/v3/bookmarks';
        
        const options = {
            method: 'POST',
            body: JSON.stringify(bookmark),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer $2a$10$gCThNFzzeL5LvmDnOMqAYO8V7M/qfmH6RytYP1qhpW.R5ggiZoE16"
              }
       
        }

        // Validations
        let errorMessage = []
        
        if(!title) {
            errorMessage.push("Title is required")
        }
        if(title && title.length < 3) {
            errorMessage.push("Title is should be at least 3 characters")
        }
        if(!url) {
            errorMessage.push("URL is required")
        }
        function validURL(str) {
            var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
              '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
              '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
              '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
              '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
              '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
            return !!pattern.test(str);
          }
        if(url && !validURL(url)) {
            errorMessage.push("Please enter valid URL")
        }


        if(errorMessage.length > 0) {
            this.setState({
                error: [...this.state.error, ...errorMessage]
            })
        }

        fetch(urlS, options)
        .then(res => {
            if(!res.ok) {
            throw new Error('Something went wrong, please try again later');
            }
            return res.json();
        })
        .then(data => {
            this.setState({
            title: "",
            url: "",
            description: "",
            rating: 1,
            error: []
            });
            this.props.handleAddBookmark(bookmark);
        })
        .catch(err => {
            this.setState({
                error: [...this.state.error, err.message]
            });
        });


    }

  render() {
    const error = this.state.error.length > 0 
        ?  ( <ul className="error">{this.state.error.map((err, i) => {
                return <li key={i}>{err}</li>
            })}</ul>)
        : null;
    return (
      <>
      <div className="addbookmark">
        <h2>Add Bookmark</h2>
        <form className="addbookmark__form" onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="title">Title:</label>
            <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.handleInputChange}/>
            <label htmlFor="url">Url:</label>
            <input
            type="text"
            name="url"
            id="url"
            placeholder="url"
            value={this.state.url}
            onChange={this.handleInputChange}/>
            <label htmlFor="description">Description:</label>
            <textarea
            name="description"
            id="description"
            placeholder="description"
            value={this.state.description}
            onChange={this.handleInputChange}/>
            <label htmlFor="rating">Rating: </label>
            <input
            type="number"
            name="rating"
            id="rating"
            min="1"
            max="5"
            value={this.state.rating}
            onChange={this.handleInputChange}/>

          <div className="addbookmark__buttons">
            <button onClick={e => this.props.showForm(false)}>Cancel</button>
            <button type="submit" >Save</button>
          </div>  
        </form>
        {error}
      </div>
      </>
    );
  }
}

export default AddBookmark;
