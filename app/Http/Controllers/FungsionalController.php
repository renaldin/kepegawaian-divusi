<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\ModelFungsional;

class FungsionalController extends Controller
{

    private $ModelFungsional;

    public function __construct()
    {
        $this->ModelFungsional = new ModelFungsional();
    }

    public function index()
    {
        $fungsional = $this->ModelFungsional->allData();

        return $fungsional->toJson();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nama_fungsional'     => 'required',
        ]);

        $addFungsional = \App\Models\ModelFungsional::create();

        $addFungsional->nama_fungsional     = $validatedData['nama_fungsional'];
        $addFungsional->save();

        $msg = [
            'success' => true,
            'message' => 'Fungsional Berhasil Ditambahkan!'
        ];

        return response()->json($msg);
    }

    public function detail($id_fungsional)
    {

        $fungsional = $this->ModelFungsional->detail([['id_fungsional', '=', $id_fungsional]]);

        return $fungsional->toJson();
    }

    public function update(Request $request, $id_fungsional)
    {
        $validatedData = $request->validate([
            'nama_fungsional' => 'required',
        ]);

        $fungsional = \App\Models\ModelFungsional::find($id_fungsional);
        $fungsional->nama_fungsional = $validatedData['nama_fungsional'];
        $fungsional->save();

        $msg = [
            'success' => true,
            'message' => 'Fungsional Berhasil Diedit!'
        ];

        return response()->json($msg);
    }

    public function delete($id_fungsional)
    {
        $fungsional = \App\Models\ModelFungsional::find($id_fungsional);

        if (!empty($fungsional)) {
            $fungsional->delete();

            $success = true;
            $message = "Fungsional Berhasil Dihapus!";
        } else {
            $success = false;
            $message = "Fungsional Gagal Dihapus!";
        }

        $msg = [
            'success' => $success,
            'message' => $message
        ];
        return response()->json($msg);
    }
}
