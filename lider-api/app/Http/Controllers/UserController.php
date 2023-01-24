<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function generateEAN()
    {
        $code = '868' . rand(1000, 9999) . rand(10000, 99999) . rand(1, 9);
        return $code;
    }

    public function kargom_var(Request $request)
    {

        $payment_number = time();
        $insert = DB::table('tbl_payments')->insert([
            "kullanici_id" => $request->user_id,
            "kargo_parca_sayisi" => $request->parms['k_parca_sayisi'],
            "metrekup" => $request->parms['k_metre_kup'],
            "adres" => $request->parms['gidecegi_adres'],
            "teslim_alacak_kisi" => $request->parms['teslim_alacak_kisi'],
            "mail_adresi" => $request->parms['email'],
            "telefon" => $request->parms['telefon'],
            "telefon_2" => $request->parms['telefon2'],
            "tahsil_ucret" => $request->parms['tahsil_edilecek_ucret'],
            "teslim_tarihi" => $request->parms['depo_teslim_tarihi'],
            "aciklama" => $request->parms['aciklama'],
            "para_birimi" => $request->parms['tahsil_edilecek_para_birimi'],
            "payment_number" => $payment_number,
            'tedarikci_tel' => $request->parms['tedarikci_tel'],
            'tedarikci_adres' => $request->parms['tedarikci_adres'],
            'tedarikci_unvan' => $request->parms['tedarikci_unvan'],
            'navlun_bedeli' => $request->parms['navlun_bedeli'],
            'navlun_bedeli_para_birimi' => $request->parms['navlun_bedeli_para_birimi'],
            'sehirAdi' => $request->parms['sehirAdi'],
            'ilceAdi' => $request->parms['ilceAdi'],
            'sehir_id' => $request->parms['sehir_id'],
            'ilce_id' => $request->parms['ilce_id'],
        ]);

        if ($insert) {

            for ($i = 0; $i < $request->parms['k_parca_sayisi']; $i++) {
                DB::table('tbl_orders')->insert([
                    "barcode" => $this->generateEAN(),
                    "payment_number" => $payment_number,
                    "status" => 0
                ]);
            }
            return response()->json([
                "success" => 1,
                "message" => "Kayıt Başarılı."
            ]);
        } else {
            return response()->json([
                "success" => 0,
                "message" => "Kayıt Hatası!"
            ]);
        }
        return response()->json([
            "success"  => 1,
            "message" => "Kargom var",
            'req' => $request->all()
        ]);
    }

    public function kargo_guncelle(Request $request)
    {

        $update = DB::table('tbl_payments')->where('id', $request->data['siparisId'])->update([
            "kargo_parca_sayisi" => $request->data['k_parca_sayisi'],
            "metrekup" => $request->data['k_metre_kup'],
            "adres" => $request->data['gidecegi_adres'],
            "teslim_alacak_kisi" => $request->data['teslim_alacak_kisi'],
            "mail_adresi" => $request->data['email'],
            "telefon" => $request->data['telefon'],
            "telefon_2" => $request->data['telefon2'],
            "tahsil_ucret" => $request->data['tahsil_edilecek_ucret'],
            "teslim_tarihi" => $request->data['depo_teslim_tarihi'],
            "aciklama" => $request->data['aciklama'],
            "para_birimi" => $request->data['tahsil_edilecek_para_birimi'],
            'tedarikci_tel' => $request->data['tedarikci_telefon'],
            'tedarikci_adres' => $request->data['tedarikci_adres'],
            'tedarikci_unvan' => $request->data['tedarikci_unvan'],
            'navlun_bedeli' => $request->data['navlun_bedeli'],
            'navlun_bedeli_para_birimi' => $request->data['navlun_bedeli_para_birimi'],
            'sehirAdi' => $request->data['sehirAdi'],
            'ilceAdi' => $request->data['ilceAdi'],
            'sehir_id' => $request->data['sehir_id'],
            'ilce_id' => $request->data['ilce_id'],
        ]);



        if ($update) {
            $payment_numbeer = DB::table('tbl_payments')->where('id', $request->data['siparisId'])->first();
            DB::table('tbl_orders')->where('payment_number', $payment_numbeer->payment_number)->delete();
            for ($i = 0; $i < $request->data['k_parca_sayisi']; $i++) {
                DB::table('tbl_orders')->insert([
                    "barcode" => $this->generateEAN(),
                    "payment_number" => $payment_numbeer->payment_number,
                    "status" => 0
                ]);
            }
            return response()->json([
                "success" => 1,
                "message" => "Kayıt Başarılı."
            ]);
        } else {
            return response()->json([
                "success" => 2,
                "message" => "Kayıt Hatası!"
            ]);
        }
        return response()->json([
            "success"  => 1,
            "message" => "Kargom var",
            'req' => $request->all()
        ]);
    }

    public function kargo_getir(Request $request)
    {


        /**
         * Kargo durumları 
         * 1- Bekleyen Kargolar
         * 2- Onaylanan Kargolar
         * 3- İptal Edilen Kargolar
         */


        if ($request->kargoStatus == 1) {
            $data =  DB::table('tbl_payments')
                ->where('kullanici_id', $request->user_id)
                ->where(function ($queris) {
                    $queris->where('admin_onay', 0)->orWhere('musteri_onay', 0);
                })
                ->where('admin_iptal', 0)->where('musteri_iptal', 0)
                ->get();
            return response()->json([
                'data' => $data,
                'success' => 1,
                'message' => 'Bekleyen Kargolar',
            ]);
        } else if ($request->kargoStatus == 2) {
            $data =  DB::table('tbl_payments')
                ->where('kullanici_id', $request->user_id)
                ->where('admin_onay', 1)->where('musteri_onay', 1)
                ->get();
            return response()->json([
                'data' => $data,
                'success' => 1,
                'message' => 'Onaylanan Kargolar',
            ]);
        } else if ($request->kargoStatus == 3) {
            $data =  DB::table('tbl_payments')
                ->where('kullanici_id', $request->user_id)
                ->where('admin_iptal', 1)->orWhere('musteri_iptal', 1)
                ->get();
            return response()->json([
                'data' => $data,
                'success' => 1,
                'message' => 'İptal Edilen Kargolar',
            ]);
        }
    }

    public function kargo_onayla(Request $request)
    {
        $update = DB::table('tbl_payments')->where('id', $request->data)->update([
            'musteri_onay' => 1
        ]);

        if ($update) {
            return response()->json([
                "success" => 1,
                "message" => "Güncelleme Başarılı."
            ]);
        } else {
            return response()->json([
                "success" => 2,
                "message" => "Güncelleme Hatası!"
            ]);
        }
        return response()->json([
            "success"  => 1,
            "message" => "Müşteri Onayı",
            'req' => $request->all()
        ]);
    }

    public function iptal_et(Request $request)
    {

        $update = DB::table('tbl_payments')->where('id', $request->data)->update([
            'musteri_iptal' => 1,
            'kargo_iptal_nedeni' => $request->iptal_nedeni
        ]);

        if ($update) {
            return response()->json([
                "success" => 1,
                "message" => "İptal Başarılı."
            ]);
        } else {
            return response()->json([
                "success" => 2,
                "message" => "İptal Hatası!"
            ]);
        }
        return response()->json([
            "success"  => 1,
            "message" => "Müşteri İptali",
            'req' => $request->all()
        ]);
    }

    public function kargo_sayilari(Request $request)
    {

        $onay_bekleyen_kargolar = 0;
        $iptal_olan_kargolar = 0;
        $onaylanan_kargolar = 0;

        $onay_bekleyen_kargolar = DB::table('tbl_payments')
            ->where('kullanici_id', $request->user_id)
            ->where(function ($queris) {
                $queris->where('admin_onay', 0)->orWhere('musteri_onay', 0);
            })
            ->where('admin_iptal', 0)->where('musteri_iptal', 0)
            ->count();

        $onaylanan_kargolar = DB::table('tbl_payments')
            ->where('kullanici_id', $request->user_id)
            ->where('kullanici_id', $request->user_id)
            ->where('admin_onay', 1)->where('musteri_onay', 1)
            ->count();

        $iptal_olan_kargolar = DB::table('tbl_payments')
            ->where('kullanici_id', $request->user_id)
            ->where('admin_iptal', 1)->orWhere('musteri_iptal', 1)
            ->count();

        return response()->json([
            'onaylanan_kargolar' => $onaylanan_kargolar,
            'onay_bekleyen_kargolar' => $onay_bekleyen_kargolar,
            'iptal_olan_kargolar' => $iptal_olan_kargolar
        ]);
    }

    public function kargo_bilgilerini_getir(Request $request)
    {
        $kargoBilgileri = DB::table('tbl_orders')->where('payment_number', $request->data)->get();
        return response()->json([
            'data' => $kargoBilgileri,
            'success' => 1
        ]);
    }

    // Sevkiyatlar

    public function sevkiyat_sayilari(Request $request)
    {
        $sorgu = DB::table('tbl_payments')
            ->where('admin_onay', 1)->where('musteri_onay', 1)
            ->where('admin_iptal', 0)->where('musteri_iptal', 0)
            ->where('siparis_durumu', 0);
        if (!isset($request->allUser) ||  $request->allUser == null) {
            $sorgu = $sorgu->where('kullanici_id', $request->user_id);
        }


        $bekleyen_sevkiyatlar = $sorgu->count();


        $sorgu1 = DB::table('tbl_payments')
            ->where('admin_onay', 1)->where('musteri_onay', 1)
            ->where('admin_iptal', 0)->where('musteri_iptal', 0)
            ->where('siparis_durumu', '!=', 0)
            ->where('siparis_durumu', '!=', 4);
        if (!isset($request->allUser) ||  $request->allUser == null) {
            $sorgu1 = $sorgu1->where('kullanici_id', $request->user_id);
        }


        $devam_eden_sevkiyatlar = $sorgu1->count();


        $sorgu2 = DB::table('tbl_payments')
            ->where('admin_onay', 1)->where('musteri_onay', 1)
            ->where('admin_iptal', 0)->where('musteri_iptal', 0)
            ->where('siparis_durumu', 4);

        if (!isset($request->allUser) ||  $request->allUser == null) {
            $sorgu2 = $sorgu2->where('kullanici_id', $request->user_id);
        }
        $tamamlanan_sevkiyatlar = $sorgu2->count();

        return response()->json([
            'bekleyen_sevkiyatlar' => $bekleyen_sevkiyatlar,
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
                ->where('admin_onay', 1)->where('musteri_onay', 1)
                ->where('admin_iptal', 0)->where('musteri_iptal', 0)
                ->where('siparis_durumu', 0);
            if (!isset($request->allUser) ||  $request->allUser == null) {
                $data = $data->where('kullanici_id', $request->user_id);
            }
            $data = $data->get();
            return response()->json([
                'data' => $data,
                'success' => 1,
                'message' => 'Bekleyen Kargolar',
            ]);
        } else if ($request->sevkiyatStatus == 2) {
            $data =  DB::table('tbl_payments')
                ->where('admin_onay', 1)->where('musteri_onay', 1)
                ->where('admin_iptal', 0)->where('musteri_iptal', 0)
                ->where('siparis_durumu', '!=', 0)
                ->where('siparis_durumu', '!=', 4);
            if (!isset($request->allUser) ||  $request->allUser == null) {
                $data = $data->where('kullanici_id', $request->user_id);
            }
            $data = $data->get();

            return response()->json([
                'data' => $data,
                'success' => 1,
                'message' => 'Onaylanan Kargolar',
            ]);
        } else if ($request->sevkiyatStatus == 3) {
            $data =  DB::table('tbl_payments')
                ->where('admin_onay', 1)->where('musteri_onay', 1)
                ->where('admin_iptal', 0)->where('musteri_iptal', 0)
                ->where('siparis_durumu', 4);
            if (!isset($request->allUser) ||  $request->allUser == null) {
                $data = $data->where('kullanici_id', $request->user_id);
            }
            $data = $data->get();
            return response()->json([
                'data' => $data,
                'success' => 1,
                'message' => 'İptal Edilen Kargolar',
            ]);
        }
    }
}
