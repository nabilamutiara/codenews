import React from 'react';
import LoadingSpinner from 'react-spinners-components';
import Marquee from 'react-fast-marquee';
import Link from 'next/link';

const HeadLines = () => {
    const news = [
        { title: 'Presiden Resmikan Tol Baru di Jawa Tengah', slug: 'presiden-resmikan-tol-baru-jawa-tengah' },
        { title: 'Harga Beras Naik, Pemerintah Siapkan Operasi Pasar', slug: 'harga-beras-naik-operasi-pasar' },
        { title: 'Startup Lokal Raih Pendanaan Rp50 Miliar', slug: 'startup-lokal-raih-pendanaan' },
        { title: 'BMKG: Potensi Hujan Lebat di Sejumlah Wilayah Indonesia', slug: 'bmkg-potensi-hujan-lebat' },
        { title: 'Timnas U-23 Lolos ke Final Piala Asia', slug: 'timnas-u23-lolos-final-piala-asia' },
        { title: 'Pemerintah Luncurkan Program AI Nasional', slug: 'pemerintah-luncurkan-program-ai-nasional' },
        { title: 'PLN Targetkan Seluruh Desa Teraliri Listrik Tahun Ini', slug: 'pln-targetkan-listrik-desa' },
        { title: 'KPK Tangkap Pejabat Daerah dalam Operasi Tangkap Tangan', slug: 'kpk-tangkap-pejabat-daerah' },
        { title: 'Festival Budaya Nusantara Digelar di Jakarta', slug: 'festival-budaya-nusantara-jakarta' },
        { title: 'Pendaftaran CPNS 2025 Dibuka Bulan Ini', slug: 'pendaftaran-cpns-2025-dibuka' },
        { title: 'Kementerian Pendidikan Terapkan Kurikulum Digital di Sekolah', slug: 'kurikulum-digital-di-sekolah' },
        { title: 'Gunung Merapi Kembali Erupsi, Warga Diimbau Waspada', slug: 'gunung-merapi-erupsi' }
    ];

    return (
        <div className='bg-white shadow flex h-14 overflow-hidden'>
            <div className='flex w-[170px] bg-[#1e293b] relative after:absolute after:bg-[#1e293b] after:w-[20px] after:left-[160px] after:skew-x-[20deg] after:top-0 after:bottom-0 '>
                <div className='pl-4 w-full h-14 flex items-center gap-x-1'>
                    <span>
                        <LoadingSpinner type='Ripple' colors={['#800000', '#c800000']} size='30px' />
                    </span>
                    <h2 className='text-white font-semibold text-lg'>Headlines</h2>
                </div>
            </div>

            <div className='flex w-[calc(100%-170px)] h-14 overflow-hidden'>
                <Marquee className='flex items-center h-full'>
                    {news.map((n, i) => (
                        <Link
                            key={i}
                            href={`/news/${n.slug}`}
                            className='px-4 text-sm font-medium text-[#1e293b] hover:text-[#800000] whitespace-nowrap'
                        >
                            {n.title}
                        </Link>
                    ))}
                </Marquee>
            </div>
        </div>
    );
};

export default HeadLines;
