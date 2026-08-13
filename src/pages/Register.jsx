function Register() {
  return (
    <div>
      <h1>Create Account</h1>

      <form>
        <div>
          <label>Full Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter your full name"
          />
        </div>

        <br />

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            placeholder="Enter your email"
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            placeholder="Create password"
          />
        </div>

        <br />

        <div>
          <label>Confirm Password</label>
          <br />
          <input
            type="password"
            placeholder="Confirm password"
          />
        </div>

        <br />

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;