<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Kullanıcılar
Route::group(['prefix' => 'user', 'middleware' => ['auth:sanctum']], function () {
    // Kargolar
    Route::post('/kargom_var', 'UserController@kargom_var')->name('kargom-var');
    Route::post('/kargolari-getir', 'UserController@kargo_getir')->name('kullanici-kargom-getir');
    Route::post('/kargo_guncelle', 'UserController@kargo_guncelle')->name('kullanici-kargo-guncelle');
    Route::post('/kargo_onayla', 'UserController@kargo_onayla')->name('kullanici-kargo-onayla');
    Route::post('/iptal_et', 'UserController@iptal_et')->name('kullanici-kargo-iptal');
    Route::post('/kargo_sayilari', 'UserController@kargo_sayilari')->name('kullanici-kargo-sayilari');
    Route::post('/kargo_bilgilerini_getir', 'UserController@kargo_bilgilerini_getir')->name('kargo-bilgilerini-getir');

    // Sevkiyatlar
    Route::post('/sevkiyat_sayilari', 'UserController@sevkiyat_sayilari')->name('kullanici-sevkiyat-sayilari');
    Route::post('/get_sevkiyatlar', 'UserController@get_sevkiyatlar')->name('kullanici-sevkiyat-getir');
});

// Ara Nakliyeci
Route::group(['prefix' => 'ara-nakliyeci', 'middleware' => ['auth:sanctum']], function () {
    // Sevkiyatlar
    Route::post('/sevkiyat_sayilari', 'AraNakliyeciController@sevkiyat_sayilari')->name('ara-nakliyeci-sevkiyat-sayilari');
    Route::post('/get_sevkiyatlar', 'AraNakliyeciController@get_sevkiyatlar')->name('ara-nakliyeci-sevkiyat-getir');
    Route::post('/ara-nakliye/urunleri-al', 'AraNakliyeciController@urunleri_al')->name('ara-nakliyeci-urunleri-al');
    Route::post('/ara-nakliye/farklari-kabul-et', 'AraNakliyeciController@farklari_kabul_et')->name('ara-nakliyeci-farklari-kabul-et');
    Route::post('/ara-nakliye/depoya-aktar', 'AraNakliyeciController@depoya_aktar')->name('ara-nakliyeci-depoya-aktar');
});

// Ara Nakliyeci Mobil
Route::post('/get_sevkiyatlar_mobil', 'AraNakliyeciController@get_sevkiyatlar')->name('ara-nakliyeci-sevkiyat-getir-mobil');
// Kargo Bilgileri 
Route::post('/kargo_bilgilerini_getir_mobil', 'UserController@kargo_bilgilerini_getir')->name('kargo-bilgilerini-getir_mobil');
// Ara Nakliyeci kaçta kaçını okutmuş
Route::post('/paketlerdeki_barkodlar_okundumu_mobil', 'AraNakliyeciController@paketlerdeki_barkodlar_okundumu')->name('paketlerdeki_barkodlar_okundumu_mobil');
// Ara nakliyeci qr oku 
Route::post('qr-kod-oku-mobil', 'QRController@araNakliyeciQrKodOku')->name('qr-kod-oku-mobil');



// Depocu 
Route::group(['prefix' => 'depocu', 'middleware' => ['auth:sanctum']], function () {
    Route::post('depodaki-paketler', 'DepocuController@depodaki_paketler')->name('depocu-depodaki-paketler');
    Route::post('kargodaki-paketler', 'DepocuController@kargodaki_paketler')->name('depocu-kargodaki-paketler');
    Route::post('paketlere-not-ekle', 'DepocuController@paketlere_not_ekle')->name('depocu-paketlere-not-ekle');
    Route::post('tira-yukle', 'DepocuController@tira_yukle')->name('depocu-tira-yukle');
    Route::post('paketlerdeki-barkodlar-okundumu', 'DepocuController@paketlerdeki_barkodlar_okundumu')->name('depocu-paketlerdeki-barkodlar-okundumu');
});

// Nakliyeci
Route::group(['prefix' => 'nakliyeci', 'middleware' => ['auth:sanctum']], function () {
    Route::post('/sevkiyat_sayilari', 'TirciController@sevkiyat_sayilari')->name('nakliyeci-sevkiyat-sayilari');
    Route::post('/get_sevkiyatlar', 'TirciController@get_sevkiyatlar')->name('nakliyeci-sevkiyat-getir');
    Route::post('/siparisi-tamamla', 'TirciController@siparisi_tamamla')->name('nakliyeci-siparisi-tamamla');
});

// Admin İşlemleri
Route::group(['prefix' => 'admin', 'middleware' => ['auth:sanctum']], function () {
    Route::post('/kargolar', 'KargoController@kargolar')->name('kargolar');
    Route::post('/kargo-counts', 'KargoController@kargoCounts')->name('kargo-counts');
    Route::post('kargo-islemleri-update', 'KargoController@kargoIslemleri')->name('kargo-islemleri-update');
    Route::post('kargo-iptal', 'KargoController@kargoIptal')->name('kargo-iptal');
    Route::post('kargo-guncelle', 'KargoController@kargoIslemleriUpdate')->name('kargo-guncelle');

    // Admin Atama İşlemeri
    Route::post('kullanici-getir', 'KullaniciIslemleriController@fetchUsers')->name('kullanici-getir');
    Route::post('kullanici-ata', 'KullaniciIslemleriController@kullaniciAta')->name('kullanici-ata');

    // Atancak Siparisleri Getir
    Route::post('nakliyeciyeAtanacakSiparisler', 'KullaniciIslemleriController@atancakSiparisler')->name('atancak-siparisler');

    Route::post('atama-kaldir', 'KullaniciIslemleriController@atamaKaldir')->name('atama-kaldir');

    Route::post('create-user', 'KullaniciIslemleriController@createUser')->name('create-user');
    Route::put('update-user', 'KullaniciIslemleriController@updateUser')->name('update-user');
    Route::delete('delete-user', 'KullaniciIslemleriController@deleteUser')->name('delete-user');

    // Chart 
    Route::post('chart-genel-datalar', 'KullaniciIslemleriController@genelDatalar')->name('chart-genel-datalar');

    // Müşteriler 

    Route::post('customers', 'KullaniciIslemleriController@fetchMusteri')->name('musteri-getir');
});


// QR Kod İşlemleri
Route::group(['prefix' => 'qr', 'middleware' => ['auth:sanctum']], function () {
    Route::post('qr-kod-oku', 'QRController@qrKodOku')->name('qr-kod-oku');
});


// Cari Ekstre
Route::group(['prefix' => 'cari'], function () {
    Route::post('/ekstre-getir', 'CariExtreController@cariEkstreGetir')->name('cari-ekstre-getir');
});

Route::post('/sehirler', 'SehirlerController@sehirler')->name('sehirler');
Route::post('/ilceler', 'SehirlerController@ilceler')->name('ilceler');


Route::post('/login', [AuthController::class, 'login']);
Route::post('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');
Route::get('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/register', [AuthController::class, 'register']);
Route::get('/bayilik_onayla/{user_id}', [AuthController::class, 'bayilik_basvurusu_onayla'])->name('bayilik_onayla');
