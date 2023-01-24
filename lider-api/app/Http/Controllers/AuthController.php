<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use PHPMailer\PHPMailer;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            if ($user->engel == 1) {
                $user->tokens()->delete();
                $cookie = cookie('jwt', null, -1);

                $request->session()->invalidate();
                $request->session()->regenerateToken();
                return response()->json(['message' => 'Hesabınız henüz onaylı değil veya engellenmiştir.'], 401);
            }

            $token = $user->createToken('authToken')->plainTextToken;
            $cookie = cookie('jwt', $token, 60 * 24); // 1 day

            return response()->json(['token' => $token, 'user' => $user], 200)->withCookie($cookie);
        }

        return response()->json(['message' => 'E Postanız veya şifreniz hatalıdır.'], 401);
    }

    public function user()
    {
        return Auth::user();
    }

    public function logout(Request $request)
    {
        $user = Auth::user();
        $user->tokens()->delete();
        $cookie = cookie('jwt', null, -1);

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out'], 401)->withCookie($cookie);
    }

    public function register(Request $request)
    {
        // isim_soyisim: '',
        // posta: '',
        // firma_unvani: '',
        // telefon: '',
        // adres: '',
        // vergi_no: '',
        // vergi_dairesi: '',
        // sifre: '',
        // sifre_tekrar: '',

        if ($request->params['sifre'] != $request->params['sifre_tekrar']) {
            return response()->json([
                'message' => 'Girdiğiniz şifreler uyuşmuyor. Lütfen tekrar deneyiniz.',
                'success' => 0,
                'data' => []
            ]);
        }

        $kontrol = DB::table('users')->where('email', $request->params['posta'])->orWhere('phone', $request->params['telefon'])->orWhere('vergi_no', $request->params['vergi_no'])->count();

        if ($kontrol > 0) {
            return response()->json([
                'message' => 'Bu e-posta, telefon veya vergi numarası sistemde kayıtlıdır.',
                'success' => 0,
                'data' => [],
            ]);
        }

        $user = DB::table('users')->insert([
            'name' => $request->params['isim_soyisim'],
            'email' => $request->params['posta'],
            'firma_unvani' => $request->params['firma_unvani'],
            'phone' => $request->params['telefon'],
            'adres' => $request->params['adres'],
            'vergi_no' => $request->params['vergi_no'],
            'vergi_dairesi' => $request->params['vergi_dairesi'],
            'password' => Hash::make($request->params['sifre']),
            'engel' => 1,
            'bayilik_basvurusu' => 1,
            'sehir_id' => $request->params['sehir_id'],
            'ilce_id' => $request->params['ilce_id'],
            'sehir_adi' => $request->params['sehirAdi'],
            'ilce_adi' => $request->params['ilceAdi'],
        ]);

        if ($user) {
            $last_insert_id = DB::getPDO()->lastInsertId();
            self::mail_gonder($request, $last_insert_id);
            return response()->json([
                'message' => 'Bayilik başvurunuz alınmıştır. En kısa sürede size dönüş yapılacaktır.',
                'success' => 1,
                'data' => []
            ]);
        } else {
            return response()->json([
                'message' => 'Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.',
                'success' => 0,
                'data' => []
            ]);
        }
    }

    public static function mail_gonder($request, $user_id)
    {
        $mail_ayarlari = DB::table('tbl_mail_settings')->first();

        $mail = new PHPMailer\PHPMailer();

        $mail->IsSMTP();
        $mail->SMTPAuth = true;
        $mail->Host = $mail_ayarlari->mail_host;
        $mail->Port = $mail_ayarlari->smtp_port;
        $mail->SMTPSecure = $mail_ayarlari->smtp_secure;
        $mail->Username = $mail_ayarlari->gonderen_mail;
        $mail->Password = $mail_ayarlari->gonderen_mail_sifre;
        $mail->SetFrom($mail->Username, 'Bayilik Başvurusu');
        $mail->AddAddress($mail_ayarlari->gidecek_mail, 'Bayilik Başvurusu');
        $mail->CharSet = 'UTF-8';
        $mail->Subject = 'Bayilik Başvurusu';
        $content = '
        <div>
            <div style="text-align:center;"><h1>Bayilik Başvurusu</h1></div>
            <table style="width:100%;">
                <tr style="border:1px solid black;">
                    <td style="border:1px solid black; width:25%;">Firma Ünvanı</td>
                    <td style="border:1px solid black; width:75%;">' . $request->params['firma_unvani'] . '</td>
                </tr>
                <tr style="border:1px solid black;">
                    <td style="border:1px solid black; width:25%;">İsim Soyisim</td>
                    <td style="border:1px solid black; width:75%;">' . $request->params['isim_soyisim'] . '</td>
                </tr>
                <tr style="border:1px solid black;">
                    <td style="border:1px solid black; width:25%;">E-Posta</td>
                    <td style="border:1px solid black; width:75%;">' . $request->params['posta'] . '</td>
                </tr>
                <tr style="border:1px solid black;">
                    <td style="border:1px solid black; width:25%;">Telefon</td>
                    <td style="border:1px solid black; width:75%;">' . $request->params['telefon'] . '</td>
                </tr>
                <tr style="border:1px solid black;">
                    <td style="border:1px solid black; width:25%;">Adres</td>
                    <td style="border:1px solid black; width:75%;">' . $request->params['adres'] . '</td>
                </tr>
                <tr style="border:1px solid black;">
                    <td style="border:1px solid black; width:25%;">Vergi No</td>
                    <td style="border:1px solid black; width:75%;">' . $request->params['vergi_no'] . '</td>
                </tr>
                <tr style="border:1px solid black;">
                    <td style="border:1px solid black; width:25%;">Vergi Dairesi</td>
                    <td style="border:1px solid black; width:75%;">' . $request->params['vergi_dairesi'] . '</td>
                </tr>
                <tr style="border:1px solid black;">
                    <td style="border:1px solid black; width:25%;">Şehir</td>
                    <td style="border:1px solid black; width:75%;">' . $request->params['sehirAdi'] . '</td>
                </tr>
                <tr style="border:1px solid black;">
                    <td style="border:1px solid black; width:25%;">İlçe</td>
                    <td style="border:1px solid black; width:75%;">' . $request->params['ilceAdi'] . '</td>
                </tr>
            </table>
            <div style="margin-top:30px;">
                <a href="' . route('bayilik_onayla', ['user_id' => $user_id]) . '">Bayilik Başvurusunu Onayla</a>
            </div>
        </div>
        ';

        $mail->MsgHTML($content);
        $mail->Send();
    }

    public static function bayilik_basvurusu_onayla(Request $request)
    {
        DB::table('users')
            ->where('id', $request->user_id)
            ->update([
                'engel' => 0,
            ]);

        echo 'Bayilik başvurusu başarıyla onaylanmıştır.';
    }
}
