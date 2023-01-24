<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class KullaniciIslemleriController extends Controller
{
    public function fetchUsers(Request $request)
    {
        $users = DB::table('users')
            ->select('id', 'name', 'email', 'phone', 'type', 'engel')
            ->whereType($request->type)
            ->orderBy('id', 'desc')
            ->get();

        return response()->json($users);
    }
    public function updateUser(Request $request)
    {
        $user = DB::table('users')
            ->where('id', $request->id)
            ->update([
                'name' => $request->ad_soyad,
                'email' => $request->email,
                'phone' => $request->telefon,
                // 'type' => $request->kullanici_tipi,
                'password' => $request->sifre == '' ? DB::raw('password') : Hash::make($request->sifre),
            ]);

        return response()->json([
            'data' => $user,
            'message' => 'Kullanıcı başarıyla güncellendi.',
            'success' => 1
        ]);
    }
    public function createUser(Request $request)
    {

        $user = DB::table('users')->where('email', $request->email)->first();

        if ($user) {
            return response()->json([
                'message' => 'Bu email adresi ile daha önce kayıt yapılmış.',
                'status' => false,
                'data' => null
            ]);
        }

        $user = DB::table('users')
            ->insert([
                'name' => $request->ad_soyad,
                'email' => $request->email,
                'phone' => $request->telefon,
                'password' => bcrypt($request->sifre),
                'type' => $request->kullanici_tipi,
                'engel' => 0,
            ]);

        return response()->json([
            'message' => 'Kullanıcı başarıyla oluşturuldu',
            'user' => $user,
            'status' => 1
        ]);
    }
    public function deleteUser(Request $request)
    {


        $user = DB::table('users')
            ->where('id', $request->id)
            ->update(['engel' => DB::raw('!engel')]);



        return response()->json([
            'data' => $user,
            'message' => 'Ok',
            'success' => 1
        ]);
    }

    public function kullaniciAta(Request $request)
    {
        /**
         *  kargolar = array
         *  userId = number
         */

        $kargolar = $request->kargolar;
        $userId = $request->userId;

        foreach ($kargolar as $key => $item) {
            $item = (object) $item;
            // Daha önce eklenmiş ise ekleme 
            $check = DB::table('' . $request->table_name . '')->where('user_id', $userId)
                ->where('kargo_id', $item->id)->get();

            if (count($check) == 0) {
                DB::table($request->table_name)->insert([
                    'user_id' => $userId,
                    'kargo_id' => $item->id,
                    'created_at' => date('Y-m-d H:i:s')
                ]);
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Kullanıcı başarıyla atandı.'
        ]);
    }

    public function atancakSiparisler(Request $request)
    {
        /**
         * 0 = atanmamış
         * 1 = Ara nakliyeciye ürünü almış
         * 2 = depoda 
         * 3 = tırcıya almış
         * 4 = teslim edilmiş
         */
        $kargolar = DB::table('tbl_payments')
            ->leftJoin('' . $request->table_name . '', 'tbl_payments.id', '=', '' . $request->table_name . '.kargo_id')
            ->leftJoin('users', 'tbl_payments.kullanici_id', '=', 'users.id')
            ->select('tbl_payments.*', '' . $request->table_name . '.user_id as atanan_kullanici', 'users.name as kullanici_adi')
            ->where('tbl_payments.admin_onay', 1)
            ->where('tbl_payments.admin_iptal', 0)
            ->where('tbl_payments.musteri_onay', 1)
            ->where('tbl_payments.musteri_iptal', 0)
            ->where('tbl_payments.siparis_durumu', $request->siparis_durumu)
            ->orderBy('atanan_kullanici')
            ->get();

        return response()->json($kargolar);
    }

    public function atamaKaldir(Request $request)
    {
        DB::table('' . $request->table_name . '')->where('user_id', $request->user_id)
            ->where('kargo_id', $request->kargo_id)->delete();

        return response()->json([
            'status' => true,
            'message' => 'Atama başarıyla kaldırıldı.'
        ]);
    }

    public function genelDatalar(Request $request)
    {

        $tamamlananSiparisler =   DB::table('tbl_payments')
            ->join('users', 'tbl_payments.kullanici_id', '=', 'users.id')
            ->where('tbl_payments.admin_onay', 1)->where('tbl_payments.musteri_onay', 1)
            ->where('tbl_payments.siparis_durumu', 4)
            ->select(
                DB::raw('count(*) as count'),
                DB::raw('sum(ROUND(tbl_payments.tahsil_ucret)) as tahsil_ucret'),
                DB::raw('sum(ROUND(tbl_payments.teslimat_ucreti)) as teslimat_ucreti'),
                DB::raw('sum(ROUND(tbl_payments.tahsil_edilen_ucret)) as tahsil_edilen_ucret'),
            )->first();

        $devamEdenSevkiyatlar =   DB::table('tbl_payments')
            ->join('users', 'tbl_payments.kullanici_id', '=', 'users.id')
            ->where('tbl_payments.admin_onay', 1)->where('tbl_payments.musteri_onay', 1)
            ->select(
                'tbl_payments.*',
            )->get();


        $devamEdenSiparislerHaftalik =   DB::table('tbl_payments')
            ->join('users', 'tbl_payments.kullanici_id', '=', 'users.id')
            ->where('tbl_payments.admin_onay', 1)->where('tbl_payments.musteri_onay', 1)
            ->where('tbl_payments.siparis_durumu', '!=', 4)
            ->where('tbl_payments.siparis_durumu', '!=', 0)
            ->whereBetween('tbl_payments.teslim_tarihi', [date('Y-m-d', strtotime('-12 week')), date('Y-m-d')])
            ->select(
                DB::raw('count(*) as count'),
                DB::raw('sum(ROUND(tbl_payments.tahsil_ucret)) as tahsil_ucret'),
                DB::raw('sum(ROUND(tbl_payments.teslimat_ucreti)) as teslimat_ucreti'),
                'tbl_payments.tahmini_teslim_tarihi as tarih',
            )
            ->groupBy('tbl_payments.tahmini_teslim_tarihi')
            ->orderBy('tbl_payments.tahmini_teslim_tarihi')
            ->get();


        return response()->json([
            'tamamlananSiparisler' => $tamamlananSiparisler,
            'devamEdenSevkiyatlar' => $devamEdenSevkiyatlar,
            'devamEdenSiparislerHaftalik' => $devamEdenSiparislerHaftalik
        ]);
    }


    public function fetchMusteri()
    {
        $musteriler = DB::table('users')
            ->whereEngel(0)
            ->where('type', 0)->get();
        return response()->json($musteriler);
    }
}
