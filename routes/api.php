<?php

    use App\Http\Controllers\Api\NotificationController;
    use App\Http\Controllers\Api\PostController;
    use App\Http\Controllers\Api\RequestController;
    use App\Http\Controllers\Api\UserApiController;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Route;

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('/current-user', [UserApiController::class, 'currentUser']);
        Route::get('/users', [UserApiController::class, 'getUsers']); 
        Route::post('/logout', [UserApiController::class, 'logout']);
        Route::post('/updateUsers/{userId}', [UserApiController::class, 'acceptUser']);
        Route::post('/posts', [PostController::class, 'store']);
        Route::get('/allposts', [PostController::class, 'displayPost']);
        Route::get('/posts/{post}', [PostController::class, 'show']);
        Route::put('/posts/{postId}', [PostController::class, 'updatePost']);
        Route::delete('/delete-posts/{post}', [PostController::class, 'destroy']);
        Route::post('/requests', [RequestController::class, 'store']);
        Route::get('/notifications', [NotificationController::class, 'index']);
    });
   
    
    Route::get('/roles', [UserApiController::class, 'roles']);

    Route::post('/login', [UserApiController::class, 'login']);
    Route::post('/register', [UserApiController::class, 'register']);