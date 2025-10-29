import React from "react";

function Login() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Log in</h1>
      <form style={{ maxWidth: 360 }}>
        <label>Email<br/><input type="email" style={{ width:"100%", padding:8, margin:"6px 0" }}/></label>
        <label>Wachtwoord<br/><input type="password" style={{ width:"100%", padding:8, margin:"6px 0" }}/></label>
        <button style={{ marginTop:12, padding:"10px 18px" }}>Inloggen</button>
      </form>
    </div>
  );
}

export default Login;
