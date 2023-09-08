<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ModelFungsional extends Model
{
    use HasFactory;

    protected $table = 'fungsional';
    protected $fillable = ['nama_fungsional'];
    protected $primaryKey = 'id_fungsional';

    public function allData()
    {
        return DB::table($this->table)->get();
    }

    public function detail($where)
    {
        return DB::table($this->table)
            ->where($where)
            ->get();
    }
}
