<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SehirlerController extends Controller
{
    public function sehirler()
    {
        $sehirler = DB::table('tbl_sehir')->get();

        return response()->json($sehirler);
    }

    public function ilceler(Request $request)
    {
        $ilceler = DB::table('tbl_ilce')->where('il_no', $request->sehir_id)->get();

        return response()->json($ilceler);
    }
}
