<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AraNakliyeciController extends Controller
{
    public function generateEAN()
    {
        $code = '868' . rand(1000, 9999) . rand(10000, 99999) . rand(1, 9);
        return $code;
    }
    // Sevkiyatlar

    public function sevkiyat_sayilari(Request $request)
    {

        $devam_eden_sevkiyatlar = DB::table('tbl_ara_nakliyeci_atamalari')
            ->leftJoin('tbl_payments', 'tbl_payments.id', '=', 'tbl_ara_nakliyeci_atamalari.kargo_id')
            ->select('tbl_payments.*', 'tbl_ara_nakliyeci_atamalari.user_id as atanan_kullanici')
            ->where('tbl_payments.admin_onay', 1)
            ->where('tbl_payments.admin_iptal', 0)
            ->where('tbl_payments.musteri_onay', 1)
            ->where('tbl_payments.musteri_iptal', 0)
            ->where(function ($sorgu) {
                $sorgu->where('tbl_payments.siparis_durumu', 0)
                    ->orWhere('tbl_payments.siparis_durumu', 1);
            })
            ->where('tbl_ara_nakliyeci_atamalari.user_id', $request->user_id)
            ->count();

        $tamamlanan_sevkiyatlar = DB::table('tbl_ara_nakliyeci_atamalari')
            ->leftJoin('tbl_payments', 'tbl_payments.id', '=', 'tbl_ara_nakliyeci_atamalari.kargo_id')
            ->select('tbl_payments.*', 'tbl_ara_nakliyeci_atamalari.user_id as atanan_kullanici')
            ->where('tbl_payments.admin_onay', 1)
            ->where('tbl_payments.admin_iptal', 0)
            ->where('tbl_payments.musteri_onay', 1)
            ->where('tbl_payments.musteri_iptal', 0)
            ->where('tbl_payments.siparis_durumu', '!=', 0)
            ->where('tbl_payments.siparis_durumu', '!=', 1)
            ->where('tbl_ara_nakliyeci_atamalari.user_id', $request->user_id)
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
                ->rightJoin('tbl_ara_nakliyeci_atamalari', 'tbl_payments.id', '=', 'tbl_ara_nakliyeci_atamalari.kargo_id')
                ->leftJoin('users', 'tbl_payments.kullanici_id', '=', 'users.id')
                ->select('tbl_payments.*', 'tbl_ara_nakliyeci_atamalari.user_id as atanan_kullanici', 'users.name as kullanici_adi')
                ->where('tbl_payments.admin_onay', 1)
                ->where('tbl_payments.admin_iptal', 0)
                ->where('tbl_payments.musteri_onay', 1)
                ->where('tbl_payments.musteri_iptal', 0)
                ->where(function ($sorgu) {
                    $sorgu->where('tbl_payments.siparis_durumu', 0)
                        ->orWhere('tbl_payments.siparis_durumu', 1);
                })
                ->where('tbl_ara_nakliyeci_atamalari.user_id', $request->user_id)
                ->orderBy('tbl_payments.id', 'desc')
                ->get();
            return response()->json([
                'data' => $data,
                'success' => 1,
                'message' => 'Bekleyen Kargolar',
            ]);
        } else if ($request->sevkiyatStatus == 2) {
            $data =   DB::table('tbl_payments')
                ->rightJoin('tbl_ara_nakliyeci_atamalari', 'tbl_payments.id', '=', 'tbl_ara_nakliyeci_atamalari.kargo_id')
                ->leftJoin('users', 'tbl_payments.kullanici_id', '=', 'users.id')
                ->select('tbl_payments.*', 'tbl_ara_nakliyeci_atamalari.user_id as atanan_kullanici', 'users.name as kullanici_adi')
                ->where('tbl_payments.admin_onay', 1)
                ->where('tbl_payments.admin_iptal', 0)
                ->where('tbl_payments.musteri_onay', 1)
                ->where('tbl_payments.musteri_iptal', 0)
                ->where('tbl_payments.siparis_durumu', '!=', 0)
                ->where('tbl_payments.siparis_durumu', '!=', 1)
                ->where('tbl_ara_nakliyeci_atamalari.user_id', $request->user_id)
                ->orderBy('tbl_payments.id', 'desc')
                ->get();
            return response()->json([
                'data' => $data,
                'success' => 1,
                'message' => 'Onaylanan Kargolar',
            ]);
        }
    }

    public function urunleri_al(Request $request)
    {
        $parca_sayisi = DB::table('tbl_payments')
            ->where('payment_number', $request->payment_number)
            ->first()->kargo_parca_sayisi;


        $alinan_parca_sayisi = $request->parca_sayisi;
        if ($parca_sayisi == $alinan_parca_sayisi) {
            DB::table('tbl_payments')
                ->where('payment_number', $request->payment_number)
                ->update([
                    'siparis_durumu' => 1
                ]);
            return response()->json([
                'success' => 1,
                'message' => 'Ürünler Başarıyla Alındı',
            ]);
        } else {
            if ($alinan_parca_sayisi > $parca_sayisi) {
                $fark = $alinan_parca_sayisi - $parca_sayisi;
                return response()->json([
                    'success' => 0,
                    'message' => 'Alınan parça sayısı, sipariş edilen parça sayısından ' . $fark . ' fazladır. Onaylıyormusunuz ?',
                    'durum' => 'fazla',
                    'parca_sayisi' => $parca_sayisi,
                    'alinan_parca_sayisi' => $alinan_parca_sayisi,
                    'payment_number' => $request->payment_number
                ]);
            } else if ($parca_sayisi > $alinan_parca_sayisi) {
                $fark = $parca_sayisi - $alinan_parca_sayisi;
                return response()->json([
                    'success' => 0,
                    'message' => 'Alınan parça sayısı, sipariş edilen parça sayısından ' . $fark . ' azdır. Onaylıyormusunuz ?',
                    'durum' => 'az',
                    'parca_sayisi' => $parca_sayisi,
                    'alinan_parca_sayisi' => $alinan_parca_sayisi,
                    'payment_number' => $request->payment_number
                ]);
            }
        }
    }

    public function farklari_kabul_et(Request $request)
    {
        $parca_sayisi = DB::table('tbl_orders')
            ->where('payment_number', $request->payment_number)
            ->count();

        $alinan_parca_sayisi = $request->parca_sayisi;
        if ($alinan_parca_sayisi > $parca_sayisi) {
            $fark = $alinan_parca_sayisi - $parca_sayisi;
            DB::table('tbl_payments')
                ->where('payment_number', $request->payment_number)
                ->update([
                    'siparis_durumu' => 1,
                    'kargo_parca_sayisi' => $alinan_parca_sayisi
                ]);
            for ($i = 0; $i < $fark; $i++) {
                DB::table('tbl_orders')->insert([
                    "barcode" => $this->generateEAN(),
                    "payment_number" => $request->payment_number,
                    "status" => 0
                ]);
            }
            return response()->json([
                'success' => 1,
                'message' => 'Ürünler Başarıyla Alındı Fazla Olarak',
                'durum' => 'fazla',
                'parca_sayisi' => $parca_sayisi,
                'alinan_parca_sayisi' => $alinan_parca_sayisi,
                'payment_number' => $request->payment_number
            ]);
        } else if ($parca_sayisi > $alinan_parca_sayisi) {
            $fark = $parca_sayisi - $alinan_parca_sayisi;
            DB::table('tbl_payments')
                ->where('payment_number', $request->payment_number)
                ->update([
                    'siparis_durumu' => 1,
                    'kargo_parca_sayisi' => $request->parca_sayisi
                ]);
            DB::table('tbl_orders')
                ->where('payment_number', $request->payment_number)
                ->limit($fark)
                ->delete();
            return response()->json([
                'success' => 1,
                'message' => 'Ürünler Başarıyla Alındı Az Olarak',
                'durum' => 'az',
                'parca_sayisi' => $parca_sayisi,
                'alinan_parca_sayisi' => $alinan_parca_sayisi,
                'payment_number' => $request->payment_number
            ]);
        }



        return response()->json([
            'success' => 1,
            'message' => 'Ürünler Başarıyla Alındı',
        ]);
    }

    public function depoya_aktar(Request $request)
    {
        DB::table('tbl_payments')
            ->where('payment_number', $request->payment_number)
            ->update([
                'siparis_durumu' => 2
            ]);
        return response()->json([
            'success' => 1,
            'message' => 'Ürünler Başarıyla Depoya Aktarıldı',
        ]);
    }


    public function paketlerdeki_barkodlar_okundumu(Request $request)
    {
        $payment_number = $request->payment_number;

        $alinanlar = 0;
        $teslim_edilenler = 0;

        $paketler =  DB::table('tbl_orders')
            ->where('payment_number', $payment_number)
            ->get();

        $paket_sayisi = count($paketler);
        $okunan_paket_sayisi = 0;

        foreach ($paketler as $key => $item) {
            $item = (array) $item;
            if ($item['aranakliyeci_alindi'] == 1) {
                $alinanlar++;
            }

            if ($item['aranakliyeci_teslim_edildi'] == 1) {
                $teslim_edilenler++;
            }
        }

        // Alındı
        if ($alinanlar == $paket_sayisi) {
            DB::table('tbl_payments')
                ->where('payment_number', $payment_number)
                ->update([
                    'siparis_durumu' => 1
                ]);
        }

        // Teslim edildi
        if ($teslim_edilenler == $paket_sayisi) {
            DB::table('tbl_payments')
                ->where('payment_number', $payment_number)
                ->update([
                    'siparis_durumu' => 2
                ]);
        }

        return response()->json(
            [
                'toplam' => $paket_sayisi,
                'alinanlar' => $alinanlar,
                'teslim_edilenler' => $teslim_edilenler,
            ]
        );
    }
}
