<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserApiController extends Controller
{
    protected $roleModel;
    protected $userModel;

    function __construct()
    {
        $this->userModel = new User();
        $this->roleModel = new Role();
    }
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            if (!$user->verified) {
                Auth::logout();
                return response()->json(['error' => 'Your account is not verified.'], 403);
            }

            $token = $user->createToken('auth_token')->plainTextToken;

            // Eager load the role relationship
            $user->load('role');

            // Debugging: Log the user and role data
            Log::info('User logged in:', ['user' => $user, 'role' => $user->role, 'token' => $token]);

            return response()->json(['user' => $user, 'token' => $token, 'message' => 'Login successful'], 200);
        }

        return response()->json(['error' => 'Invalid credentials'], 401);
    }
    public function currentUser(Request $request)
{
    if (Auth::check()) {
        $user = Auth::user();
        $user->load('role'); // Eager load the role relationship
        return response()->json(['user' => $user]);
    }
    return response()->json(['error' => 'Not authenticated'], 401);
}

    public function logout(Request $request)
    {
        Auth::user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }

 
    public function roles() {
         return response()->json(['data' => $this->roleModel->getRoles()], 200); 
        }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role_id' => 'required|exists:roles,roleid',
            'verified' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $this->userModel->createRegister([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $request->role_id,
            'verified' => $request->has('verified') ? $request->verified : false,
        ]);

        return response()->json(['message' => 'User registered successfully'], 201);
    }
    public function getUsers(Request $request)
    {
        $currentUser = Auth::user();
        $users = User::where('id', '!=', $currentUser->id)->with('role')->paginate(5);
        return response()->json(['users' => $users]);
    }

    public function acceptUser(Request $request, $userId)
    {
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $status = $request->input('verified', false);   
        $user->setVerified($status);

        return response()->json(['message' => 'User accepted and verified'], 200);
    }

  
}
