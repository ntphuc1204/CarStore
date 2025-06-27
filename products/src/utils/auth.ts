export function getUser() {
  const user = localStorage.getItem("User");
  return user ? JSON.parse(user) : null;
}

export function isAdmin() {
  const user = getUser();
  return user?.role === "Admin";
}
