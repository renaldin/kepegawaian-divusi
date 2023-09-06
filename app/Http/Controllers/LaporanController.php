<?php

namespace App\Http\Controllers;

use App\Models\ModelKaryawan;
use \App\Models\ModelPresensi;

class LaporanController extends Controller
{

    private $ModelPresensi, $ModelKaryawan;

    public function __construct()
    {
        $this->ModelPresensi = new ModelPresensi();
        $this->ModelKaryawan = new ModelKaryawan();
    }

    public function index()
    {
        $presensi = new ModelPresensi();
        $hasil = $presensi->read_full();
        return $hasil->toJson();
    }

    public function buatLaporan($year, $month)
    {
        if (strlen($month) == 1) {
            $month = '0' . $month;
        }

        $karyawan = $this->ModelKaryawan->allDataJoin();
        $karyawan = json_decode(json_encode($karyawan), true);

        $result = [];
        foreach ($karyawan as $data) {
            $hadir  = $this->ModelPresensi->hadir($year, $month, $data['id_karyawan']);
            $izin   = $this->ModelPresensi->izin($year, $month, $data['id_karyawan']);
            $sakit  = $this->ModelPresensi->sakit($year, $month, $data['id_karyawan']);
            $alpa   = $this->ModelPresensi->alpa($year, $month, $data['id_karyawan']);

            array_push($result, array(
                'nip'               => $data['nip'],
                'nama_karyawan'     => $data['nama_karyawan'],
                'nama_fungsional'   => $data['nama_fungsional'],
                'nama_struktural'   => $data['nama_struktural'],
                'hadir'             => $hadir,
                'izin'              => $izin,
                'sakit'             => $sakit,
                'alpa'              => $alpa,
                'total'             => $hadir + $izin + $alpa + $sakit,
                'year'              => $year,
                'month'             => $month
            ));
        }

        if (!empty($result)) {
            $msg = [
                'success'   => true,
                'message'   => 'Data ditemukan',
                'hasil'     => $result
            ];
            return response()->json($msg);
        } else {
            $msg = [
                'success'   => false,
                'message'   => 'Tidak ada data'
            ];
            return response()->json($msg);
        }
    }
}
