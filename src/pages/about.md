---
title: Tentang Yajmaa
layout: layouts/post.njk
date: 2019-01-08
permalink: /about/index.html
excerpt: Yajmaa adalah
eleventyNavigation:
  key: Tentang
  order: 1
---
Aku membuat template ini sebagai media untuk belajar membuat website sederhana dengan peralatan javascript modern. Dalam beberapa tahun ini, dunia pengembangan web berubah drastis. Aku yang berencana terjun ke bidang ini menjadi merasa, _wew_, terkejut dan tertantang. Karena itu aku mulai belajar sedikit javascript di [freeCodeCamp](https://www.freecodecamp.org/learn) dan belajar React melalui tutorial daring di Udemy.

Sejujurnya aku merasa kurang *sreg* untuk latihan dengan membuat aplikasi tic-tac-toe atau notes karena rasanya kurang berfaedah. Sehingga terbersit ide untuk membuat proyek open source kecil yang bisa digunakan untuk latihan, dari situ lah muncul template Yajmaa.

Tapi setelah dipikir lagi, akhirnya aku sama sekali tidak menggunakan React untuk membuat Yajmaa, dengan pertimbangan mengedepankan performa dan prinsip KISS. Alih-alih membuat blog dengan basis react (Gatsby), aku mengunakan static site generator Eleventy, dan sedikit belajar Vue untuk membuat bagian website yang interaktif. 

Walau demikian, aku merasa tetap belajar banyak dari proyek ini, terlebih lagi mengerjakan proyeknya terasa asyik dan menghasilkan situs web dengan performa yang menakjubkan. Dengan membuat template ini, aku belajar menggunakan git untuk mengontrol versi, mengelola NPM *dependency*, praprosesi gambar, menggunakan gulp sebagai *task runner*, praprosesi dan pascaprosesi CSS dan menggunakan Eleventy sebagai SSG yang keren dan simpel.

Untuk Eleventy, aku berencana untuk membuat plugin favicon untuk eleventy. Aku juga mungkin akan mencoba berkontribusi untuk gulp-responsive.


## Untuk siapa template ini?

Aku buat template ini untuk organisasi atau pribadi yang ingin melakukan penggalangan dana dengan media website. Terinsipirasi dari website kitabisa.com dan website sejenis.

## Kenapa menggunakan Yajmaa?

Kamu bisa menggunakan yajmaa untuk membuat website penggalangan dana yang dikelola secara mandiri, kelebihannya adalah:

- Website dikelola sendiri, dengan *branding* sendiri dan tidak tercampur penggalangan dana lain
- Keuangan dikelola sendiri, tanpa perantara
- Open-source
- Gratis hosting + CDN dengan bandwidth 100GB/bulan dan gratis setting custom domain di Netlify.
- Cepat dan ringan. Lighthouse dan Pagespeed >= 90 out of the box
- Teknologi mengedepankan prinsip keep it simple stupid (KISS).

Jika kamu tertarik menggunakan template website ini, silahkan fork di [Github]({{ pkg.repository.url }}) atau klik:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/zulvkr/yajmaa&stack=cms).

Kalau mau kontribusi juga *mangga* buat PR. Maaf kalau kodenya berantakan, maklum, nubi.