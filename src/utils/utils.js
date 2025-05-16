export const saveUserToLocalStorage = (data) => {
  const isLogin = localStorage.getItem("isLoggedin");
  if (data.karyawan && !isLogin) {
    localStorage.setItem("userEmail", data.karyawan.email);
    localStorage.setItem("userRole", data.karyawan.role);
    localStorage.setItem("userId", data.karyawan.id);
    localStorage.setItem("userName", data.karyawan.nama);
    localStorage.setItem("token", data.token);
    localStorage.setItem("isLoggedIn", "true");
  } else if (data && isLogin) {
    localStorage.setItem("userEmail", data.email);
    localStorage.setItem("userRole", data.role);
    localStorage.setItem("userId", data.id);
    localStorage.setItem("userName", data.nama);
  } else {
    localStorage.setItem("userEmail", data.email);
    localStorage.setItem("userRole", data.role);
    localStorage.setItem("userId", data.id);
    localStorage.setItem("userName", data.nama);
  }
};
