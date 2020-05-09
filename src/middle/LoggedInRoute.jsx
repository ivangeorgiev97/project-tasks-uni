import React from 'react';
import { connect, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

const LoggedInRoute = (props) => {
    const currentUser = useSelector((state) => state.currentUser); // or JSON.parse(localstorage.getItem('currentUser')) too

    if (Object.keys(currentUser).length === 0) {
        return <Redirect to="/login" />
    }

    return <props.component { ...props} />
}

export default connect()(LoggedInRoute)
