# tokoaku
tokoAku adalah platform e-commerce yang menawarkan pengalaman berbelanja online yang lengkap dan memuaskan bagi para pelanggan. Dengan koleksi barang yang beragam dan layanan yang terpercaya, tokoaku memungkinkan pengguna untuk menemukan dan membeli berbagai macam barang dengan mudah dan nyaman.

## Setup
Berikut merupakan tech stack yang digunakan dalam final project tokoaku:
### Client
> - npm install
> - npm start

### Server
> - npm install
> - npx sequelize-cli db:create
> - npx sequelize-cli db:migrate
> - npm start

## Tech Stack
Berikut merupakan tech stack yang digunakan dalam final project tokoaku:
* Front-end - ReactJs, Redux, dan Material UI
* Back-end - NodeJs, ExpressJs, dan Midtrans
* Database - MySql, Sequelize, dan Redis

![tokoaku](https://github.com/raihanputro/tokoaku/assets/87045526/e6dd0e8d-5c4a-4f3c-9ec6-581079b21991)
###

## Pages
### HOME
Pada halaman home, pelanggan dapat melihat list dari barang dan juga kategori barang. Pelanggan juga dapat mencari barang melalui button kategori ataupun search bar di navbar.
###
![image](https://github.com/raihanputro/tokoaku/assets/87045526/9865b150-234c-40cc-a0e0-5b733e76543f)
### Register
Pada halaman register, pelanggan dapat membuat akun dengan mengisi data-data seperti email, username, password, dan confirm password.
###
![image](https://github.com/raihanputro/tokoaku/assets/87045526/7a35540b-67b3-4418-bd53-ac8148a420b1)
### Login
Pada halaman login, pelanggan masuk ke dalam aplikasi untuk berbelanja menggunakan akun yang sudah dibuat di halaman register.
###
![image](https://github.com/raihanputro/tokoaku/assets/87045526/2906457c-4b29-41b1-a044-82e244dd4827)
### Search
Pada halaman search, pelanggan dapat mencari barang dengan memasukkan nama barang di searchbar di navbar dan juga kategori.
###
![image](https://github.com/raihanputro/tokoaku/assets/87045526/b89b7567-055c-438a-93f3-13d1c84c2c99)
### Item Detail
Pada halaman item detail, pelanggan dapat melihat informasi barang serta memasukkan barang ke keranjang.
###
![image](https://github.com/raihanputro/tokoaku/assets/87045526/8d484471-6777-497f-88fb-7baf97a57f73)
### Wishlist
Pada halaman wishlist, pelanggan dapat melihat daftar barang yang ingin dibeli.
###
![image](https://github.com/raihanputro/tokoaku/assets/87045526/09bd3c65-d8e6-4bf3-b18c-50dd6ce1010b)

### Cart
Pada halaman cart, pelanggan dapat mengatur jumlah barang yang ingin dibeli.
###
![image](https://github.com/raihanputro/tokoaku/assets/87045526/b16aeeb8-65b1-4cc3-be32-ee798ecfb755)
### Checkout
Pada halaman checkout, pelanggan dapat mengisi alamat dan layanan pengiriman. Lalu selanjutnya pelanggan melihat review total harga belanjaan yang dibeli. dan Yang terakhir akan ada informasi bahwa pesanan berhasil dibuat.
###
![image](https://github.com/raihanputro/tokoaku/assets/87045526/e6e50417-303b-47e1-a9ae-6b8360837813)
![image](https://github.com/raihanputro/tokoaku/assets/87045526/404be507-5816-420a-bc66-364031b7254d)
### Order
Pada halaman order, pelanggan dapat melihat daftar dari pesanan yang pelanggan lakukan.
###
![image](https://github.com/raihanputro/tokoaku/assets/87045526/f5290dd0-5f6e-46f4-8c2f-1e21a4bd6b9a)
### Order Detail
Pada halaman order detail, pelanggan dapat melihat informasi mengenai pemesan dan juga barang yang dibeli. Lalu pelanggan dapat melakukan pembayaran dengan mengklik tombol bayar.
###
![image](https://github.com/raihanputro/tokoaku/assets/87045526/506fc906-1739-435b-bcc8-51f167338942)
### Payment
Setelah pelanggan mengklik tombol bayar, maka akan muncul pop up dari midtrans untuk melakukan pembayaran.
###
![image](https://github.com/raihanputro/tokoaku/assets/87045526/c020239b-a73d-49f2-85e7-8ad46ba076ef)
### Review
Setelah pembayaran berhasil, pelanggan dapat melakukan review dari transaksi tersebut
###
![image](https://github.com/raihanputro/tokoaku/assets/87045526/0039e0b4-b688-433f-a786-b2aaa3c0d244)
### My Profile
Pada halaman my profile, pelanggan dapat mengatur biodata pelanggan.
###
![image](https://github.com/raihanputro/tokoaku/assets/87045526/43cd1c12-cd93-479a-b384-f156a82c5e02)
### Change Password
Pada halaman change password, pelanggan dapat mengubah password.
###
![image](https://github.com/raihanputro/tokoaku/assets/87045526/59b83b4f-b2c3-420d-9c96-1bf2b6c14e36)
### Dashboard Admin
Pada halaman dashboard admin, admin dapat melihat informasi mengenai pendapatan, jumlah admin, julah pelanggan, 5 transaksi terbaru dan 5 pelanggan terbaru.
###
![image](https://github.com/raihanputro/tokoaku/assets/87045526/99e6c0ca-7fae-4297-b99e-aab5c478cf1a)
### User Data
Pada halaman user data, admin dapat melihat informasi mengenai user, dan juga dapat menambahkan admin.
###![image](https://github.com/raihanputro/tokoaku/assets/87045526/d7003705-6336-46de-847c-2908b0669501)
### Item Data
Pada halaman item data, admin dapat melihat list barang, tambah, update, dan juga hapus barang.
![image](https://github.com/raihanputro/tokoaku/assets/87045526/12aed1f1-a63d-4510-8b04-14c591d02dd8)
### Category Data
Pada halaman category data, admin dapat melihat list kategori barang, tambah, update, dan juga hapus kategori.
![image](https://github.com/raihanputro/tokoaku/assets/87045526/0fbe72bd-7041-4c40-a286-4435a9b87464)

### Transaction Data
Pada halaman transaction data, admin dapat mengupdate status transaksi dari pelanggan.
![image](https://github.com/raihanputro/tokoaku/assets/87045526/7dee5f5a-bb50-4cef-bfec-e470c09dd329)













  





