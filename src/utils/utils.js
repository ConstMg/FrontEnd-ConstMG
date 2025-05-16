export const saveUserToLocalStorage = (data, email) => {
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userRole", data.karyawan.role);
  localStorage.setItem("userId", data.karyawan.id);
  localStorage.setItem("userName", data.karyawan.nama);
  localStorage.setItem("token", data.token);
  localStorage.setItem("isLoggedIn", "true");
};
