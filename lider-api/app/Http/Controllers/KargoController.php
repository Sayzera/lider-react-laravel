<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class KargoController extends Controller
{


   public function kargoCounts(Request $request)
   {
      if (true) {

         $bekleyenKargolar =  DB::table('tbl_payments')
            ->join('users', 'tbl_payments.kullanici_id', '=', 'users.id')
            ->where(function ($queris) {
               $queris->where('tbl_payments.admin_onay', 0)->orWhere('tbl_payments.musteri_onay', 0);
            })
            ->where('tbl_payments.admin_iptal', 0)->where('tbl_payments.musteri_iptal', 0)
            ->select('tbl_payments.*', 'users.name as kullanici_adi')
            ->orderBy('tbl_payments.id', 'desc')
            ->count();


         $onayBekleyenKargolar =   DB::table('tbl_payments')
            ->join('users', 'tbl_payments.kullanici_id', '=', 'users.id')
            ->where('tbl_payments.admin_onay', 1)->where('tbl_payments.musteri_onay', 1)
            ->select('tbl_payments.*', 'users.name as kullanici_adi')
            ->orderBy('tbl_payments.id', 'desc')
            ->count();


         $iptalEdilenKargolar = DB::table('tbl_payments')
            ->join('users', 'tbl_payments.kullanici_id', '=', 'users.id')
            ->where('tbl_payments.admin_iptal', 1)->orWhere('tbl_payments.musteri_iptal', 1)
            ->select('tbl_payments.*', 'users.name as kullanici_adi')
            ->orderBy('tbl_payments.id', 'desc')
            ->count();

         return response()->json([
            'bekleyenKargolar' => $bekleyenKargolar,
            'onayBekleyenKargolar' => $onayBekleyenKargolar,
            'iptalEdilenKargolar' => $iptalEdilenKargolar
         ]);
      } else {
         return response()->json([
            'success' => 0,
            'message' => 'Lütfen api keyi giriniz.',
            'data' => []
         ]);
      }
   }


   public function kargolar(Request $request)
   {

      /**
       * Kargo durumları 
       * 1- Bekleyen Kargolar
       * 2- Onaylanan Kargolar
       * 3- İptal Edilen Kargolar
       */
      if (true) {
         if ($request->kargoStatus == 1) {
            $data =  DB::table('tbl_payments')
               ->join('users', 'tbl_payments.kullanici_id', '=', 'users.id')
               ->where(function ($queris) {
                  $queris->where('tbl_payments.admin_onay', 0)->orWhere('tbl_payments.musteri_onay', 0);
               })
               ->where('tbl_payments.admin_iptal', 0)->where('tbl_payments.musteri_iptal', 0)
               ->select('tbl_payments.*', 'users.name as kullanici_adi')
               ->orderBy('tbl_payments.id', 'desc')
               ->get();
            return response()->json([
               'data' => $data,
               'success' => 1,
               'message' => 'Bekleyen Kargolar',
            ]);
         } else if ($request->kargoStatus == 2) {
            $data =   DB::table('tbl_payments')
               ->join('users', 'tbl_payments.kullanici_id', '=', 'users.id')
               ->where('tbl_payments.admin_onay', 1)->where('tbl_payments.musteri_onay', 1)
               ->select('tbl_payments.*', 'users.name as kullanici_adi')
               ->orderBy('tbl_payments.id', 'desc')
               ->get();
            return response()->json([
               'data' => $data,
               'success' => 1,
               'message' => 'Onaylanan Kargolar',
            ]);
         } else if ($request->kargoStatus == 3) {
            $data =   DB::table('tbl_payments')
               ->join('users', 'tbl_payments.kullanici_id', '=', 'users.id')
               ->where('tbl_payments.admin_iptal', 1)->orWhere('tbl_payments.musteri_iptal', 1)
               ->select('tbl_payments.*', 'users.name as kullanici_adi')
               ->orderBy('tbl_payments.id', 'desc')
               ->get();
            return response()->json([
               'data' => $data,
               'success' => 1,
               'message' => 'İptal Edilen Kargolar',
            ]);
         }
      } else {
         return response()->json([
            'success' => 0,
            'message' => 'Lütfen api keyi giriniz.',
            'data' => []
         ]);
      }
   }
   // Kargo İşlemleri Onay
   public function kargoIslemleri(Request $request)
   {
      if (true) {
         $guncelle = DB::table('tbl_payments')
            ->whereId($request->id)
            ->update([
               'sevk_tarihi' => $request->sevk_tarihi,
               'teslimat_ucreti' => $request->teslimat_ucreti,
               'teslimat_para_birimi' => $request->teslimat_para_birimi,
               'admin_onay' => 1,
               'tahmini_teslim_tarihi' => $request->tahmini_teslim_tarihi,

            ]);

         if ($guncelle) {
            return response()->json([
               'success' => 1,
               'message' => 'Kargo  onaylandı.',
               'data' => []
            ]);
         } else {
            return response()->json([
               'success' => 0,
               'message' => 'Kargo onaylanamadı.',
               'data' => []
            ]);
         }
      } else {
         return response()->json([
            'success' => 0,
            'message' => 'Lütfen api keyi giriniz.',
            'data' => []
         ]);
      }
   }

   public function kargoIslemleriUpdate(Request $request)
   {
      if (true) {
         $guncelle = DB::table('tbl_payments')
            ->whereId($request->id)
            ->update([
               'sevk_tarihi' => $request->sevk_tarihi,
               'teslimat_ucreti' => $request->teslimat_ucreti,
               'teslimat_para_birimi' => $request->teslimat_para_birimi,
               'tahmini_teslim_tarihi' => $request->tahmini_teslim_tarihi,
            ]);

         if ($guncelle) {
            return response()->json([
               'success' => 1,
               'message' => 'Kargo bilgileri başarıyla güncellendi.',
               'data' => []
            ]);
         } else {
            return response()->json([
               'success' => 0,
               'message' => 'Kargo bilgileri güncellenemedi.',
               'data' => []
            ]);
         }
      } else {
         return response()->json([
            'success' => 0,
            'message' => 'Lütfen api keyi giriniz.',
            'data' => []
         ]);
      }
   }



   public function kargoIptal(Request $request)
   {
      if (true) {
         $guncelle = DB::table('tbl_payments')
            ->whereId($request->id)
            ->where('musteri_onay', 0)
            ->update([
               'admin_iptal' => 1
            ]);

         if ($guncelle) {
            return response()->json([
               'success' => 1,
               'message' => 'Kargo başarıyla iptal edildi.',
               'data' => []
            ]);
         } else {
            return response()->json([
               'success' => 0,
               'message' => 'Kargo iptal edilemedi.',
               'data' => []
            ]);
         }
      } else {
         return response()->json([
            'success' => 0,
            'message' => 'Lütfen api keyi giriniz.',
            'data' => []
         ]);
      }
   }


   // Başka bir kullanımı yok sadece örnek
   public function Blank(Request $request)
   {
      if (true) {
      } else {
         return response()->json([
            'success' => 0,
            'message' => 'Lütfen api keyi giriniz.',
            'data' => []
         ]);
      }
   }
}
