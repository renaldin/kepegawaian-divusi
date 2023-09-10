<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\ModelPresensi;

class PresensiController extends Controller
{
    private $ModelPresensi;

    public function __construct()
    {
        $this->ModelPresensi = new ModelPresensi();
    }

    public function index()
    {
        $presensi = $this->ModelPresensi->allDataJoin();

        return $presensi->toJson();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'id_karyawan'       => 'required',
            'keterangan'        => 'required',
            'catatan'           => 'required',
            'tanggal'           => 'required',
        ]);

        $tanggal = $validatedData['tanggal'];
        $id_karyawan = $validatedData['id_karyawan'];

        $presensiCheck = $this->ModelPresensi->check($id_karyawan, $tanggal);
        if ($presensiCheck != null) {
            $msg = [
                'success' => false,
                'message' => 'Presensi gagal ditambahkan! Pada tanggal tersebut karyawan sudah
                melakukan presensi.'
            ];
        } else {

            $presensi = \App\Models\ModelPresensi::create();

            $presensi->id_karyawan      = $validatedData['id_karyawan'];
            $presensi->keterangan       = $validatedData['keterangan'];
            $presensi->catatan          = $request->input('catatan');
            $presensi->tanggal          = $validatedData['tanggal'];
            $presensi->save();

            $msg = [
                'success' => true,
                'message' => 'Presensi Berhasil Ditambahkan!'
            ];
        }

        return response()->json($msg);
    }

    public function detail($id_presensi)
    {
        $presensi = $this->ModelPresensi->detailAll([['id_presensi', '=', $id_presensi]]);

        return $presensi->toJson();
    }

    public function update(Request $request, $id_presensi)
    {
        $validatedData = $request->validate([
            'keterangan'    => 'required',
            'catatan'       => 'required',
            'tanggal'       => 'required'
        ]);

        $presensi = \App\Models\ModelPresensi::find($id_presensi);

        $presensi->keterangan   = $validatedData['keterangan'];
        $presensi->catatan      = $request->input('catatan');
        $presensi->tanggal      = $validatedData['tanggal'];
        $presensi->save();

        $msg = [
            'success' => true,
            'message' => 'Presensi Berhasil Diedit!'
        ];

        return response()->json($msg);
    }

    public function delete($id_presensi)
    {
        $presensi = \App\Models\ModelPresensi::find($id_presensi);

        if (!empty($presensi)) {
            $presensi->delete();

            $success = true;
            $message = "Presensi Berhasil Dihapus!";
        } else {
            $success = false;
            $message = "Presensi Gagal Dihapus!";
        }

        $msg = [
            'success' => $success,
            'message' => $message
        ];
        return response()->json($msg);
    }
}
