import React, { useState } from 'react'

function Auth() {
    // State to track whether we’re showing the login form or the register form
    const [isLoginView, setIsLoginView] = useState(true)

    // Handle the form submit. This is just an example stub.
    const handleSubmit = (event) => {
        event.preventDefault()

        if (isLoginView) {
            // Handle login logic here TODO
            console.log('Logging in...')
        } else {
            // Handle registration logic here TODO
            console.log('Registering...')
        }
    }

    // Toggle between login and register
    const toggleView = () => {
        setIsLoginView((prev) => !prev)
    }

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem' }}>
            <h1>{isLoginView ? 'Login' : 'Register'}</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Shared fields, e.g. username */}
                <label htmlFor="username">Username</label>
                <input id="username" type="text" name="username" required />

                {/* Show an Email field only if we’re in Register mode */}
                {!isLoginView && (
                    <>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" name="email" required />
                    </>
                )}

                {/* Password field */}
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" required />

                <button type="submit" style={{ marginTop: '1rem' }}>
                    {isLoginView ? 'Login' : 'Register'}
                </button>
            </form>

            {/* Toggle Link */}
            <p style={{ marginTop: '1rem' }}>
                {isLoginView
                    ? "Don't have an account?"
                    : 'Already have an account?'}
                &nbsp;
                <button type="button" onClick={toggleView}>
                    {isLoginView ? 'Register Here' : 'Login Here'}
                </button>
            </p>
        </div>
    )
}

export default Auth;
