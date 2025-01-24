<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Register a new user.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        // Validate the request data
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed', // Add password confirmation
        ]);

        // Create the user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Return a success message
        return response()->json(['message' => 'User registered successfully'], 201);
    }

    /**
     * Login an existing user and return a JWT token.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        // Validate the request data
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Attempt to log in the user and generate the token
        $credentials = $request->only('email', 'password');
        if (!$token = auth()->attempt($credentials)) { // Use JWT `auth()` to attempt login
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Return the JWT token
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => auth()->factory()->getTTL() * 60, // Token expiry (optional)
        ], 200);
    }

    public function resetPassword(Request $request)
    {
        // Validate the request data
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required|confirmed|min:8', // 'confirmed' ensures password_confirmation matches
        ]);

        // Find the user by email
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Update the user's password
        $user->password = bcrypt($request->password);
        $user->save();

        return response()->json(['message' => 'Password reset successful'], 200);
    }



    /**
     * Get the authenticated user.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function user(Request $request)
    {
        // Return the authenticated user
        return response()->json(auth()->user());
    }

    /**
     * Logout the user by invalidating the JWT token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        // Invalidate the current JWT token
        auth()->logout();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }
}
