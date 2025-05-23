const verifysession = async () => {
    let response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/verifysession`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({token: localStorage.getItem("token")})
    });
    let result = await response.json();
    if (result.success) {
      console.log(result.data.isAdmin);
      if (result.data.isAdmin) {
        window.location.href = "/admin-dashboard";
      } else {
        window.location.href = "/student-dashboard";
      }
    }
    else {
      localStorage.removeItem("token");
      localStorage.removeItem("student");
    }
  };
  export default verifysession;