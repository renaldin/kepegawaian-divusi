<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KaryawanController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\PresensiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// karyawan
Route::get('/karyawan', [KaryawanController::class, 'index']);
Route::post('/karyawan/store', [KaryawanController::class, 'store']);
Route::get('/karyawan/edit/{id}', [KaryawanController::class, 'detail']);
Route::get('/karyawan/{id}', [KaryawanController::class, 'detail']);
Route::put('/karyawan/{id}', [KaryawanController::class, 'update']);
Route::delete('/karyawan/delete/{id}', [KaryawanController::class, 'delete']);

// presensi
Route::get('/presensi', [PresensiController::class, 'index']);
Route::post('/presensi/store', [PresensiController::class, 'store']);
Route::get('/presensi/edit/{id}', [PresensiController::class, 'detail']);
Route::get('/presensi/{id}', [PresensiController::class, 'detail']);
Route::put('/presensi/{id}', [PresensiController::class, 'update']);
Route::delete('/presensi/delete/{id}', [PresensiController::class, 'delete']);

// Laporan
Route::get('/laporan/{year}/{month}', [LaporanController::class, 'showLaporan']);
