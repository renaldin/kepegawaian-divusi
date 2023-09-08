<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\ModelKaryawan;

class KaryawanController extends Controller
{

    private $ModelKaryawan;

    public function __construct()
    {
        $this->ModelKaryawan = new ModelKaryawan();
    }

    public function index()
    {
        $karyawan = $this->ModelKaryawan->allDataJoin();

        return $karyawan->toJson();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nama_karyawan'     => 'required',
            'id_fungsional'     => 'required',
            'id_struktural'     => 'required',
        ]);

        $addKaryawan = \App\Models\ModelKaryawan::create();

        $fungsionalData = strlen((string)$validatedData['id_fungsional']) == 1 ? '0' . $validatedData['id_fungsional'] : $validatedData['id_fungsional'];
        $nipYearFungsional = (int)date('y') . $fungsionalData;

        $karyawanData = $this->ModelKaryawan->allData();

        $serialNumber = [];
        if ($karyawanData == null) {
            $newNip = (int)$nipYearFungsional . '0001';
        } else {
            foreach ($karyawanData as $data) {
                $data = json_decode(json_encode($data), true);
                $entryNip = substr($data['nip'], 4);
                array_push($serialNumber, $entryNip);
            }
            rsort($serialNumber);
            if (strlen((string)$serialNumber[0]) == 1) {
                $lastNip = (int)$nipYearFungsional . '000' . $serialNumber[0];
            } else if (strlen((string)$serialNumber[0]) == 2) {
                $lastNip = (int)$nipYearFungsional . '00' . $serialNumber[0];
            } else if (strlen((string)$serialNumber[0]) == 3) {
                $lastNip = (int)$nipYearFungsional . '0' . $serialNumber[0];
            } else if (strlen((string)$serialNumber[0]) == 4) {
                $lastNip = (int)$nipYearFungsional . $serialNumber[0];
            } else {
                $lastNip = (int)$nipYearFungsional . '0000';
            }
            $newNip = $lastNip + 1;
        }

        $addKaryawan->nip               = $newNip;
        $addKaryawan->nama_karyawan     = $validatedData['nama_karyawan'];
        $addKaryawan->id_fungsional     = $validatedData['id_fungsional'];
        $addKaryawan->id_struktural     = $validatedData['id_struktural'];
        $addKaryawan->save();

        $msg = [
            'success' => true,
            'message' => 'Karyawan Berhasil Ditambahkan!'
        ];

        return response()->json($msg);
    }

    public function detail($id_karyawan)
    {

        $karyawan = $this->ModelKaryawan->detailAll([['id_karyawan', '=', $id_karyawan]]);

        return $karyawan->toJson();
    }

    public function update(Request $request, $id_karyawan)
    {
        $validatedData = $request->validate([
            'nama_karyawan' => 'required',
        ]);

        $karyawan = \App\Models\ModelKaryawan::find($id_karyawan);
        $karyawan->nama_karyawan = $validatedData['nama_karyawan'];
        $karyawan->save();

        $msg = [
            'success' => true,
            'message' => 'Karyawan Berhasil Diedit!'
        ];

        return response()->json($msg);
    }

    public function delete($id_karyawan)
    {
        $karyawan = \App\Models\ModelKaryawan::find($id_karyawan);

        if (!empty($karyawan)) {
            $karyawan->delete();

            $success = true;
            $message = "Karyawan Berhasil Dihapus!";
        } else {
            $success = false;
            $message = "Karyawan Gagal Dihapus!";
        }

        $msg = [
            'success' => $success,
            'message' => $message
        ];
        return response()->json($msg);
    }
}
