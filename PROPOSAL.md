# CASSAFAST

web pinjaman uang online yang terdaftar di ojk

# SPESIFIKASI

1. website dengan mobile-first UI
2. gunakan css module sesuai penggunaan di next.js
3. gunakan data dummy JSON (statis tanpa database/external API)
4. zero dependencies / agnostic as possible
5. pages: Home, keuangan, dan pengajuan pinjaman
6. gunakan bahasa indonesia
7. buat dengan acuan website pinjaman online akulaku (versi mobile)
8. sederhana saja, tidak perlu kompleks
9. icon gunkan lucide react

# MOTIVATIONS

website ini dibutuhkan untuk "properti" film, jadi yang penting tampil di layar dengan proper, sederhana

# CONSTRAINT

1. tidak perlu jauh dan kompleks,gunakan css sederhana, dan data statis dengan JSON saja
2. bahasa indonesia
3. mobile-first UI

# IMPLEMENTATION NOTES

1. gunakan `pnpm fix` jika menemukan error saat `pnpm lint` (manfaatkan auto fix dari eslint)
2. gunakan `pnpm format` untuk format code

# REVISI

1. gunakan gaya, system design dari aplikasi akulaku (mobile). lebih mirip lebih bagus, hanya saja nama akulaku kita ganti jadi CASSAFAST
2. gua butuh skenario di mana skenario pertama itu pasti berhasil (pengajuan diterima) lalu untuk skenario ke-dua itu dibuat gagal (pengajuan ditolak) tolong buat tampilan loading ketika menekan tombol ajukan sekarang, dan tampilkan pop up "pengajuan pinjaman sedang di tinjau, dana akan masuk dalam 1x24 jam" (jika pengajuan diterima), dan ketika tombol ajukan sekarang diklik lagi tolong buat tampilan loading ketika menekan tombol ajukan sekarang, dan tampilkan pop up "pengajuan pinjaman gagal, silahkan ajukan pinjaman kembali" (jika pengajuan ditolak).
3. simpan skenario ini di local storage agar bisa diakses kembali. dan tambahkan logic tolong tampilkan button "ajukan lagi" ketika pengajuan gagal, dan ketika button "ajukan lagi" diklik maka kembalikan ke halaman awal.
4. buat pola ketika mengajukan itu selang seling. contoh : pengajuan pertama berhasil, pengajuan kedua gagal, pengajuan ketiga berhasil, dst.
5. lakukan pola seperti ini : Skenario 1 (pengajuan pertama) di bagian home : 1. Limit Pinjaman 3000000 2. Tagihan 0 di bagian pengajuan : 1. pengajuan diterima (tampilkan animasi loading dengan text "pengajuan pinjaman sedang di tinjau, dana akan masuk dalam 1x24 jam") Skenario 2 (pengajuan kedua) 1. di bagian home : 1. limit pinjaman 750000 2. tagihan 785000 2. di bagian pengajuan : 1. pengajuan ditolak (tampilkan animasi loading dengan text "pengajuan pinjaman gagal, silahkan ajukan pinjaman kembali") 3. setelah skenario 2 dilakukan, kembalikan user ke halaman home. dan kembali ke skenario 1
6. lanjutkan pola ini
