import React from 'react'
import Bookmark from '../Bookmark/bookmark'

export default function bookMarkList(props) {
    return (
        <>
            <h2>Bookmarks</h2>
            {props.bookmarks.map((item, i) => {
                return <Bookmark 
                        title={item.title} 
                        rating={item.rating}
                        description={item.description}
                        url={item.url} 
                        key={i}
                        id={item.id}
                        deleteBookmark={props.deleteBookmark}/>
            })}
        </>
    )
}
