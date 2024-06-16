<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::controller(AuthController::class)->group(function(){
    Route::post('/register','register');
    Route::post('/login','login');
});

Route::group([],function(){

    // 'middleware'=>['auth:sanctum']
    Route::controller(ProjectController::class)->group(function(){
        Route::post('/projects','store');
        // Route::put('/projects','update');
        // Route::get('/projects','index');
        // Route::post('/projects/pinned','pinnedProject');
        // Route::get('/projects/{slug}','getProject');
        // Route::get('/count/projects','countProject');
        // Route::get('/pinned/projects','getPinnedProject');
        // Route::get('/chart-data/projects','getProjectChartData');
    });
});