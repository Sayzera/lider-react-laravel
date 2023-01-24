<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DepocuController extends Controller
{
    public function depodaki_paketler(Request $request)
    {
        $kargolar = DB::table('tbl_payments')
            ->leftJoin('users', 'tbl_payments.kullanici_id', '=', 'users.id')
            ->select('tbl_payments.*', 'users.name as kullanici_adi')
            ->where('tbl_payments.admin_onay', 1)
            ->where('tbl_payments.admin_iptal', 0)
            ->where('tbl_payments.musteri_onay', 1)
            ->where('tbl_payments.musteri_iptal', 0)
            ->where('tbl_payments.siparis_durumu', 2)
            ->orderBy('tbl_payments.id', 'desc')
            ->get();

        return response()->json($kargolar);
    }

    public function kargodaki_paketler(Request $request)
    {
        // Kargo paketleri depocu tek tek görecek ve güncelleyebilecek 
        $paketler =  DB::table('tbl_orders')->where('payment_number', $request->payment_number)
            ->orderBy('id', 'desc')
            ->get();

        return response()->json($paketler);
    }

    public function paketlere_not_ekle(Request $request)
    {
        foreach ($request->all() as $key => $item) {
            $item = (object) $item;
            DB::table('tbl_orders')->where('barcode', $item->name)->update([
                'kargom_nerede' => $item->value,
                'updated_date' => date('Y-m-d H:i:s')
            ]);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Paketlere not eklendi'
        ]);
    }

    public function tira_yukle(Request $request)
    {
        DB::table('tbl_payments')->where('payment_number', $request->payment_number)->update([
            'siparis_durumu' => 3,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Tiraya yüklendi'
        ]);
    }

    public function paketlerdeki_barkodlar_okundumu(Request $request)
    {
        $user_type =  $request->user_type;
        $column_name = '';

        if ($user_type == 2) {
            $column_name = 'tirci_onay';
        } else if ($user_type == 3) {
            $column_name = 'depocu_onay';
        }
        $paketler =  DB::table('tbl_orders')
            ->where('payment_number', $request->payment_number)
            ->get();

        $paket_sayisi = count($paketler);
        $okunan_paket_sayisi = 0;

        foreach ($paketler as $key => $item) {
            $item = (array) $item;
            if ($item[$column_name] == 1) {
                $okunan_paket_sayisi++;
            }
        }

        if ($paket_sayisi == $okunan_paket_sayisi) {
            if ($user_type == 3) {
                // tbl_paymentstan durumu güncelle 
                DB::table('tbl_payments')->where('payment_number', $request->payment_number)->update([
                    'tira_yuklenebilirmi' => 1,
                ]);
            } else if ($user_type == 2) {
                // tbl_paymentstan durumu güncelle 
                DB::table('tbl_payments')->where('payment_number', $request->payment_number)->update([
                    'musteriye_teslim_edilebilirmi' => 1,
                ]);
            }

            return response()->json([
                'status' => true,
                'message' => 'Tüm QR kodları okutuldu.',
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'QR okutulmamış ' . ($paket_sayisi - $okunan_paket_sayisi) . ' paket var'
            ]);
        }
    }
}
