<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TirciController extends Controller
{
    // Sevkiyatlar

    public function sevkiyat_sayilari(Request $request)
    {

        $devam_eden_sevkiyatlar = DB::table('tbl_tirci_atamalari')
            ->leftJoin('tbl_payments', 'tbl_payments.id', '=', 'tbl_tirci_atamalari.kargo_id')
            ->select('tbl_payments.*', 'tbl_tirci_atamalari.user_id as atanan_kullanici')
            ->where('tbl_payments.admin_onay', 1)
            ->where('tbl_payments.admin_iptal', 0)
            ->where('tbl_payments.musteri_onay', 1)
            ->where('tbl_payments.musteri_iptal', 0)
            ->where('tbl_payments.siparis_durumu', 3)
            ->where('tbl_tirci_atamalari.user_id', $request->user_id)
            ->count();

        $tamamlanan_sevkiyatlar = DB::table('tbl_tirci_atamalari')
            ->leftJoin('tbl_payments', 'tbl_payments.id', '=', 'tbl_tirci_atamalari.kargo_id')
            ->select('tbl_payments.*', 'tbl_tirci_atamalari.user_id as atanan_kullanici')
            ->where('tbl_payments.admin_onay', 1)
            ->where('tbl_payments.admin_iptal', 0)
            ->where('tbl_payments.musteri_onay', 1)
            ->where('tbl_payments.musteri_iptal', 0)
            ->where('tbl_payments.siparis_durumu', 4)
            ->where('tbl_tirci_atamalari.user_id', $request->user_id)
            ->count();

        return response()->json([
            'devam_eden_sevkiyatlar' => $devam_eden_sevkiyatlar,
            'tamamlanan_sevkiyatlar' => $tamamlanan_sevkiyatlar
        ]);
    }

    public function get_sevkiyatlar(Request $request)
    {
        /**
         * 0 = atanmamış
         * 1 = Ara nakliyeciye ürünü almış
         * 2 = depoda 
         * 3 = tırcıya almış
         * 4 = teslim edilmiş
         */


        if ($request->sevkiyatStatus == 1) {
            $data =  DB::table('tbl_payments')
                ->rightJoin('tbl_tirci_atamalari', 'tbl_payments.id', '=', 'tbl_tirci_atamalari.kargo_id')
                ->leftJoin('users', 'tbl_payments.kullanici_id', '=', 'users.id')
                ->select('tbl_payments.*', 'tbl_tirci_atamalari.user_id as atanan_kullanici', 'users.name as kullanici_adi')
                ->where('tbl_payments.admin_onay', 1)
                ->where('tbl_payments.admin_iptal', 0)
                ->where('tbl_payments.musteri_onay', 1)
                ->where('tbl_payments.musteri_iptal', 0)
                ->where('tbl_payments.siparis_durumu', 3)
                ->where('tbl_tirci_atamalari.user_id', $request->user_id)
                ->orderBy('tbl_payments.id', 'desc')
                ->get();
            return response()->json([
                'data' => $data,
                'success' => 1,
                'message' => 'Bekleyen Kargolar',
            ]);
        } else if ($request->sevkiyatStatus == 2) {
            $data =   DB::table('tbl_payments')
                ->rightJoin('tbl_tirci_atamalari', 'tbl_payments.id', '=', 'tbl_tirci_atamalari.kargo_id')
                ->leftJoin('users', 'tbl_payments.kullanici_id', '=', 'users.id')
                ->select('tbl_payments.*', 'tbl_tirci_atamalari.user_id as atanan_kullanici', 'users.name as kullanici_adi')
                ->where('tbl_payments.admin_onay', 1)
                ->where('tbl_payments.admin_iptal', 0)
                ->where('tbl_payments.musteri_onay', 1)
                ->where('tbl_payments.musteri_iptal', 0)
                ->where('tbl_payments.siparis_durumu', 4)
                ->where('tbl_tirci_atamalari.user_id', $request->user_id)
                ->orderBy('tbl_payments.id', 'desc')
                ->get();
            return response()->json([
                'data' => $data,
                'success' => 1,
                'message' => 'Onaylanan Kargolar',
            ]);
        }
    }


    public function siparisi_tamamla(Request $request)
    {
        DB::table('tbl_payments')
            ->where('payment_number', $request->payment_number)
            ->update([
                'siparis_durumu' => 4,
                'tahsil_edilen_ucret' => $request->tahsilat,
                'teslim_edilen_tarih' => date('Y-m-d H:i:s')
            ]);
        return response()->json([
            'success' => 1,
            'message' => 'Ürünler Başarıyla Teslim Edildi',
        ]);
    }
}
