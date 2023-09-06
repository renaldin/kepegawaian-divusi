<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ModelPresensi extends Model
{
    use HasFactory;

    protected $table = 'presensi';
    protected $fillable = ['id_karyawan', 'keterangan', 'catatan', 'tanggal'];
    protected $primaryKey = 'id_presensi';

    public function allDataJoin()
    {
        return DB::table($this->table)
            ->join('karyawan', 'karyawan.id_karyawan', '=', 'presensi.id_karyawan')
            ->join('fungsional', 'fungsional.id_fungsional', '=', 'karyawan.id_fungsional')
            ->join('struktural', 'struktural.id_struktural', '=', 'karyawan.id_struktural')
            ->get();
    }

    public function detailAll($where)
    {
        return DB::table($this->table)
            ->join('karyawan', 'karyawan.id_karyawan', '=', 'presensi.id_karyawan')
            ->join('fungsional', 'fungsional.id_fungsional', '=', 'karyawan.id_fungsional')
            ->join('struktural', 'struktural.id_struktural', '=', 'karyawan.id_struktural')
            ->where($where)
            ->get();
    }

    public function hadir($year, $month, $id_karyawan)
    {
        return DB::table($this->table)
            ->where('keterangan', '=', 'Hadir')
            ->where('tanggal', 'like', "$year-$month%")
            ->where('id_karyawan', '=', $id_karyawan)
            ->count();
    }

    public function sakit($year, $month, $id_karyawan)
    {
        return DB::table($this->table)
            ->where('keterangan', '=', 'sakit')
            ->where('tanggal', 'like', $year . '-' . $month . '%')
            ->where('id_karyawan', '=', $id_karyawan)
            ->count();
    }

    public function izin($year, $month, $id_karyawan)
    {
        return DB::table($this->table)
            ->where('keterangan', '=', 'Izin')
            ->where('tanggal', 'like', $year . '-' . $month . '%')
            ->where('id_karyawan', '=', $id_karyawan)
            ->count();
    }

    public function alpa($year, $month, $id_karyawan)
    {
        return DB::table($this->table)
            ->where('keterangan', '=', 'Alpa')
            ->where('tanggal', 'like', $year . '-' . $month . '%')
            ->where('id_karyawan', '=', $id_karyawan)
            ->count();
    }
}
