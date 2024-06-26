let apiUrl = "http://localhost:5000";
if (import.meta.env.MODE == "production") {
  apiUrl = "http://13.201.75.224:5000";
}

export { apiUrl };
