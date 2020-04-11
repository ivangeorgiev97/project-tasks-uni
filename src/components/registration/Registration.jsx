import React from "react";

const Registration = () => {
    return (
        <section>
            <h3>Registration</h3>
            <form>
                <div className="htmlForm-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="htmlForm-control" id="username" aria-describedby="username" name="username" placeholder="Enter username" />
                </div>
                <div className="htmlForm-group">
                    <label htmlFor="password1">Password</label>
                    <input type="password" className="htmlForm-control" id="password1" name="password1" placeholder="Enter password" />
                </div>
                <div className="htmlForm-group">
                    <label htmlFor="password2">Repeat Password</label>
                    <input type="password" className="htmlForm-control" id="password2" name="password2" placeholder="Repeat password" />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </section>
    );
};

export default Registration;
