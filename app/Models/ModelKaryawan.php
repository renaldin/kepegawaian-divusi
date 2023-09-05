<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ModelKaryawan extends Model
{
    use HasFactory;

    protected $table = 'karyawan';
    protected $fillable = ['nip, nama_karyawan, id_fungsional, id_struktural'];
    protected $primaryKey = 'id_karyawan';

    public function allData()
    {
        return DB::table($this->table)->get();
    }

    public function allDataJoin()
    {
        return DB::table($this->table)
            ->join('fungsional', 'fungsional.id_fungsional', '=', 'karyawan.id_fungsional')
            ->join('struktural', 'struktural.id_struktural', '=', 'karyawan.id_struktural')
            ->get();
    }

    public function detail($where)
    {
        return DB::table($this->table)
            ->join('fungsional', 'fungsional.id_fungsional', '=', 'karyawan.id_fungsional')
            ->join('struktural', 'struktural.id_struktural', '=', 'karyawan.id_struktural')
            ->where($where)
            ->first();
    }

    public function detailAll($where)
    {
        return DB::table($this->table)
            ->join('fungsional', 'fungsional.id_fungsional', '=', 'karyawan.id_fungsional')
            ->join('struktural', 'struktural.id_struktural', '=', 'karyawan.id_struktural')
            ->where($where)
            ->get();
    }

    public function lastDataByNip($where)
    {
        return DB::table($this->table)
            ->where($where)
            ->orderByDesc('nip')
            ->first();
    }
}
