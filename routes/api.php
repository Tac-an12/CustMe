<?php

    use App\Http\Controllers\Api\NotificationController;
    use App\Http\Controllers\Api\PostController;
    use App\Http\Controllers\Api\RequestController;
    use App\Http\Controllers\Api\UserApiController;
    use App\Http\Controllers\Api\StoreController;
    use App\Http\Controllers\Api\LocationController;
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
        Route::get('/users/{id}/profile', [UserApiController::class, 'getUserProfile']);


        Route::get('/stores', [StoreController::class, 'getAllStores']);
        Route::post('/stores', [StoreController::class, 'saveStore']);
        Route::put('/stores/{id}', [StoreController::class, 'updateStore']);
        Route::delete('/stores/{id}', [StoreController::class, 'deleteStore']);
        Route::get('/stores/{id}', [StoreController::class, 'getStore']);
    
        // Location routes
        Route::get('/locations', [LocationController::class, 'getAllLocations']);
        Route::post('/locations', [LocationController::class, 'createLocation']);
        Route::put('/locations/{id}', [LocationController::class, 'updateLocation']);
        Route::delete('/locations/{id}', [LocationController::class, 'deleteLocation']);
        Route::get('/locations/{id}', [LocationController::class, 'getLocation']);
    });
    


   
    
    Route::get('/roles', [UserApiController::class, 'roles']);

    Route::post('/login', [UserApiController::class, 'login']);
    Route::post('/register', [UserApiController::class, 'register']);