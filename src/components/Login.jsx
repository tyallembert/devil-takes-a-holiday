import "../styles/Login.scss";

const Login = ({ checkLogin }) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/.netlify/functions/check-login',
        {
            method: 'POST',
            body: JSON.stringify({
                username: e.target[0].value,
                password: e.target[1].value
            })
        });
        if (!response.ok) {
        throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        checkLogin(jsonData.isAdmin);
    };
    return (
        <div className="loginContainer">
            <form className="loginForm" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="inputContainer">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" />
                </div>
                <div className="inputContainer">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" />
                </div>
                <button>Login</button>
            </form>
        </div>
    );
}

export default Login;