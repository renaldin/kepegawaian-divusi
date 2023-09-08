<?php

use App\Http\Controllers\FungsionalController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KaryawanController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\PresensiController;
use App\Http\Controllers\StrukturalController;

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

// fungsional
Route::get('/fungsional', [FungsionalController::class, 'index']);
Route::post('/fungsional/store', [FungsionalController::class, 'store']);
Route::get('/fungsional/edit/{id}', [FungsionalController::class, 'detail']);
Route::get('/fungsional/{id}', [FungsionalController::class, 'detail']);
Route::put('/fungsional/{id}', [FungsionalController::class, 'update']);
Route::delete('/fungsional/delete/{id}', [FungsionalController::class, 'delete']);

// struktural
Route::get('/struktural', [StrukturalController::class, 'index']);
Route::post('/struktural/store', [StrukturalController::class, 'store']);
Route::get('/struktural/edit/{id}', [StrukturalController::class, 'detail']);
Route::get('/struktural/{id}', [StrukturalController::class, 'detail']);
Route::put('/struktural/{id}', [StrukturalController::class, 'update']);
Route::delete('/struktural/delete/{id}', [StrukturalController::class, 'delete']);

// presensi
Route::get('/presensi', [PresensiController::class, 'index']);
Route::post('/presensi/store', [PresensiController::class, 'store']);
Route::get('/presensi/edit/{id}', [PresensiController::class, 'detail']);
Route::get('/presensi/{id}', [PresensiController::class, 'detail']);
Route::put('/presensi/{id}', [PresensiController::class, 'update']);
Route::delete('/presensi/delete/{id}', [PresensiController::class, 'delete']);

// Laporan
Route::get('/laporan/{year}/{month}', [LaporanController::class, 'showLaporan']);
