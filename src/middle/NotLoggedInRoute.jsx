import React from 'react';
import { connect, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

const NotLoggedInRoute = (props) => {
    const currentUser = useSelector((state) => state.currentUser);

    if (Object.keys(currentUser).length !== 0) {
        return <Redirect to="/" />
    }

    return <props.component { ...props} />
}

export default connect()(NotLoggedInRoute)
