import jsonwebtoken from "jsonwebtoken"; // Import the jsonwebtoken library for creating and verifying JWTs.

// Define a function named 'jwt' that takes response (res), user, and message as arguments.
const jwt = (res, user, message) => {
    // Create a JWT (token) using the user's ID as payload, a secret key from environment variables,
    const token = jsonwebtoken.sign({ userId: user._id }, process.env.SECRET, {
        expiresIn: "15d" // and set the token to expire in 15 days.
    });

    // Start building the HTTP response: set status to 200 (OK), set a cookie named "token",
    return res.status(200).cookie("token", token, {
        httpOnly: true, // Make the cookie inaccessible to client-side JavaScript (security).
        maxAge: 15 * 24 * 60 * 60 * 1000, // Set cookie expiration to 15 days (in milliseconds).
        sameSite: "strict" // Restrict cookie sending to same-site requests only (CSRF protection).
    }).json({ // Send a JSON response body containing:
        success: true, // A success flag.
        message, // The provided message (e.g., "Login successful").
        token, // The generated JWT.
        user // The user object.
    });
}; // End of the jwt function definition.

export default jwt;
