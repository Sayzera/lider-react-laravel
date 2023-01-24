<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class CariExtreController extends Controller
{
    /**
     * baslangic_tarihi
     * bitis_tarihi
     * cari_code
     * stok_detay
     */
    public function cariEkstreGetir(Request $request)
    {
        $result = [
            'cari' => $this->get_cari_data($request),
            'type' => false
        ];

        if ($request->stok_detay == true) {
            $result['cari'] =  $this->get_cari_data($request);
            $result['type'] = true;
        }



        return response()->json($result);
    }


    public function post_request($name, $data = [])
    {
        $apiData = DB::table('tbl_api')->where('name', $name)->first();

        $response = Http::retry(3, 1000)->post($apiData->value, $data);
        return $result = json_decode($response->body());
    }

    public function get_cari_data(Request $request)
    {
        $baslangic_tarihi = $request->ilkTarih;
        $bitis_tarihi = $request->sonTarih;

        $data =  $this->post_request($request->stok_detay == true ? 'cari_ekstresi_detayli' : 'cari_ekstresi', [
            "cariKodu" => $request->cari_kodu,
            "ilkTarih" =>  $baslangic_tarihi,
            "sonTarih" =>  $bitis_tarihi
        ]);

        return $data;
    }
}
