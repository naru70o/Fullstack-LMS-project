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
    updateProfile: `${API_BASE_URL}/user/updateprofile`,
    changepassword: `${API_BASE_URL}/user/changepassword`,
    updateProfileImage: `${API_BASE_URL}/user/updateprofilepicture`,
  },
  courses: {
    getAllCourses: `${API_BASE_URL}/course`,
    getCourseById: (id: string) => `${API_BASE_URL}/course/${id}`,
    createCourse: `${API_BASE_URL}/course/newcourse`,
    getYourCourses: `${API_BASE_URL}/course/yourcourses`,
  },
  instructor: {
    registerInstructor: `${API_BASE_URL}//instructor/registe`,
  },
};
