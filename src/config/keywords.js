// eslint-disable-next-line import/no-anonymous-default-export
export default {
  tr: {
    required: 'Bu alanın doldurulması gereklidir',
    min: (par) => `Bu alan için minimum ${par} karakter gereklidir`,
    max: (par) => `Bu alana  max ${par} karakter girilebilir`,
    kargom_var: {
      basarili:
        'Kargo Bilgileriniz Başarıyla Alınmıştır. Kargonuzun Durumunu Kargolarım Menüsünden Takip Edebilirsiniz.',
      hata: 'Kargo Bilgileriniz Kayıt Edilirken Bir Hata Oluştu. Lütfen Tekrar Deneyin.',
    },
    kargom_guncelleme: {
      basarili: 'Kargo Bilgileriniz Başarıyla Güncellenmiştir.',
      hata: 'Kargo Bilgileriniz Güncellenirken Bir Hata Oluştu. Lütfen Tekrar Deneyin.',
    },
    kargo_onaylama: {
      basarili: 'Kargonuz Başarıyla Onaylanmıştır.',
      hata: 'Kargonuz Onaylanırken Hata Oluştu. Lütfen Tekrar Deneyin.',
    },
    kargo_iptal: {
      basarili: 'Kargonuz Başarıyla İptal Edilmiştir.',
      hata: 'Kargonuz İptal Edilirken Hata Oluştu. Lütfen Tekrar Deneyin.',
    },
  },
}
