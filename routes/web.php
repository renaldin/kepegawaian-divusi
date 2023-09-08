<?php

use App\Http\Controllers\LaporanController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/printPDF/{year}/{month}', [LaporanController::class, 'printPDF']);

Route::view('/', 'app');
Route::view('/{path}', 'app');

// karyawan
Route::view('/karyawan', 'app');
Route::view('/karyawan/edit/{id}', 'app');
Route::view('/karyawan/{id}', 'app');

// fungsional
Route::view('/fungsional', 'app');
Route::view('/fungsional/edit/{id}', 'app');
Route::view('/fungsional/{id}', 'app');

// struktural
Route::view('/struktural', 'app');
Route::view('/struktural/edit/{id}', 'app');
Route::view('/struktural/{id}', 'app');

// presensi
Route::view('/presensi', 'app');
Route::view('/presensi/edit/{id}', 'app');
Route::view('/presensi/{id}', 'app');

// Laporan
Route::view('/laporan/create', 'app');
Route::view('/laporan/show/{year}/{month}', 'app');
