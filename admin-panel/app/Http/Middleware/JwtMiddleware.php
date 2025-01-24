namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Firebase\JWT\JWT;

class JwtMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->header('Authorization');
        if (!$token) {
            return response()->json(['message' => 'Authorization token not found'], 401);
        }

        try {
            // Decode the token
            $decoded = JWT::decode($token, env('JWT_SECRET'), ['HS256']);
            $request->user = $decoded;
        } catch (\Exception $e) {
            return response()->json(['message' => 'Invalid token'], 401);
        }

        return $next($request);
    }
}
