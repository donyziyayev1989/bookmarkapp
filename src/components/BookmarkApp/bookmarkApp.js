import React, { Component } from 'react';
import Fab from '../Fab/fab';
import BookMarkList from '../BookMarkList/bookMarkList';
import './bookmarkApp.css'

export class BookmarkApp extends Component {
    render() {
        return (
            <>
            <div className="bookmarkApp">
                <BookMarkList 
                    bookmarks={this.props.bookmarks}
                    deleteBookmark={this.props.handleDeleteBookmark}/>
            </div>
            <Fab showForm={this.props.showForm}/>
            </>
        )
    }
}

export default BookmarkApp
