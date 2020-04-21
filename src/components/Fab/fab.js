import React from 'react';
import './fab.css'
const fab = (props) => {
    return (
        <div className="fab" onClick={e => props.showForm(true)}>Add Bookmark</div>

    );
}

export default fab;
