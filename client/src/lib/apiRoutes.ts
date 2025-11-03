const API_BASE_URL = process.env.SERVER_URL;

if (!API_BASE_URL) {
  // This will cause a build-time error if the env var is not set.
  throw new Error("Missing required environment variable: SERVER_URL");
}

export const apiRoutes = {
  auth: {
    signUpEmail: `${API_BASE_URL}/auth/sign-up/email`,
    signInEmail: `${API_BASE_URL}/auth/sign-in/email`,
  },
  user: {
    getUserSession: `${API_BASE_URL}/user`,
  },
  courses: {
    getAllCourses: `${API_BASE_URL}/course`,
    getCourseById: (id: string) => `${API_BASE_URL}/course/${id}`,
  },
  instructor: {
    registerInstructor: `${API_BASE_URL}//instructor/registe`,
  },
};
