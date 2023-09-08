<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\ModelStruktural;

class StrukturalController extends Controller
{

    private $ModelStruktural;

    public function __construct()
    {
        $this->ModelStruktural = new ModelStruktural();
    }

    public function index()
    {
        $struktural = $this->ModelStruktural->allData();

        return $struktural->toJson();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nama_struktural'     => 'required',
        ]);

        $addStruktural = \App\Models\ModelStruktural::create();

        $addStruktural->nama_struktural     = $validatedData['nama_struktural'];
        $addStruktural->save();

        $msg = [
            'success' => true,
            'message' => 'Struktural Berhasil Ditambahkan!'
        ];

        return response()->json($msg);
    }

    public function detail($id_struktural)
    {

        $struktural = $this->ModelStruktural->detail([['id_struktural', '=', $id_struktural]]);

        return $struktural->toJson();
    }

    public function update(Request $request, $id_struktural)
    {
        $validatedData = $request->validate([
            'nama_struktural' => 'required',
        ]);

        $struktural = \App\Models\ModelStruktural::find($id_struktural);
        $struktural->nama_struktural = $validatedData['nama_struktural'];
        $struktural->save();

        $msg = [
            'success' => true,
            'message' => 'Struktural Berhasil Diedit!'
        ];

        return response()->json($msg);
    }

    public function delete($id_struktural)
    {
        $struktural = \App\Models\ModelStruktural::find($id_struktural);

        if (!empty($struktural)) {
            $struktural->delete();

            $success = true;
            $message = "Struktural Berhasil Dihapus!";
        } else {
            $success = false;
            $message = "Struktural Gagal Dihapus!";
        }

        $msg = [
            'success' => $success,
            'message' => $message
        ];
        return response()->json($msg);
    }
}
