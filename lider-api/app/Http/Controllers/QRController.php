<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class QRController extends Controller
{
    public function qrKodOku(Request $request)
    {
        /**
         * eğer user type 3 ise 
         * giren kullanıcı depocudur ve ürünü tıra yüklemek istiyordur
         */

        if ($request->user_type == 3) {
            DB::table('tbl_orders')
                ->where('barcode', $request->barcode)
                ->update([
                    'depocu_onay' => 1
                ]);
        }
        /**
         * eğer user type 2 ise
         * giren kullanıcı tır şoförüdür ve ürünü müşteriye teslim etmek istiyordur
         */
        else if ($request->user_type == 2) {

            // Depocu onay 1 mi 
            $depocu_onay = DB::table('tbl_orders')
                ->where('barcode', $request->barcode)
                ->where('depocu_onay', 1)
                ->first();

            if ($depocu_onay) {
                DB::table('tbl_orders')
                    ->where('barcode', $request->barcode)
                    ->update([
                        'tirci_onay' => 1
                    ]);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Depocu onayı bekleniyor'
                ]);
            }
        }

        return response()->json([
            'status' => 200,
            'message' => 'Barkod başarıyla okundu'
        ]);
    }


    public function araNakliyeciQrKodOku(Request $request)
    {
        /** 
         * type 1 ise ürünü almak istiyordur
         * type 2 ise ürünü teslim etmek istiyordur
         */
        $type = $request->type;

        if ($type == 1) {
            $column_name = 'aranakliyeci_alindi';
        } else if ($type == 2) {
            $column_name = 'aranakliyeci_teslim_edildi';
        }

        DB::table('tbl_orders')
            ->where('barcode', $request->barcode)
            ->update([
                $column_name => 1
            ]);


        return response()->json([
            'status' => 200,
            'message' => 'Barkod başarıyla okundu'
        ]);
    }
}
