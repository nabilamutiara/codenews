import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import storeContext from '../../context/storeContext';
import {base_url} from '../../config/config';
import axios from 'axios'
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {convert} from 'html-to-text'
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const HoaxNews = () => {
    const [predictions, setPredictions] = useState({})
    const [clickbaitPredictions, setClickbaitPredictions] = useState({})
    const {store} = useContext(storeContext)
    const [news,setNews] = useState([])
    const [all_news, set_all_news] = useState([])
    const [parPage, setParPage] = useState(5)
    const [pages, setPages] = useState(0)
    const [page,setPage] = useState(1)
    
    // Initialize news summary counts
    const [newsSummary, setNewsSummary] = useState({
        FAKE: 0,
        REAL: 0,
    });

    const [clickbaitSummary, setClickbaitSummary] = useState({
        CLICKBAIT: 0,
        NORMAL: 0,
    });

    const get_news = async () => {
        try {
            const {data} = await axios.get(`${base_url}/api/news`,{
                headers: {
                    'Authorization' : `Bearer ${store.token}`
                }
            })
            set_all_news(data.news)
            setNews(data.news)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchPredictions = async () => {
            const newPredictions = {};
            let fakeCount = 0;
            let realCount = 0;

            for (let item of news) {
                try {
                    const { data } = await axios.post('http://localhost:5000/api/fakenews', {
                        text: item.title + ' ' + convert(item.description || '', { wordwrap: false })
                    });
                    const prediction = data.label || "UNKNOWN";
                    newPredictions[item._id] = prediction;
                    
                    // Update counts based on prediction
                    if (prediction === "FAKE") fakeCount++;
                    else realCount++;
                    
                } catch (err) {
                    console.error("Prediction error:", err.message);
                }
            }

            setPredictions(newPredictions);
            setNewsSummary({
                FAKE: fakeCount,
                REAL: realCount,
            });
        };

        const fetchClickbaitPredictions = async () => {
            const newPredictions = {};
            let clickbaitCount = 0;
            let normalCount = 0;

            for (let item of news) {
                try {
                    const { data } = await axios.post('http://localhost:5000/api/clickbait', {
                        text: item.title
                    });
                    const prediction = data.label || "UNKNOWN";
                    newPredictions[item._id] = prediction;
                    
                    // Update counts based on prediction
                    if (prediction === "CLICKBAIT") clickbaitCount++;
                    else normalCount++;
                    
                } catch (err) {
                    console.error("Clickbait prediction error:", err.message);
                    newPredictions[item._id] = "UNKNOWN";
                }
            }

            setClickbaitPredictions(newPredictions);
            setClickbaitSummary({
                CLICKBAIT: clickbaitCount,
                NORMAL: normalCount,
            });
        };

        if (news.length > 0) {
            fetchPredictions();
            fetchClickbaitPredictions();
        }
    }, [news]);

    useEffect(()=>{
        get_news()
    },[])

    useEffect(()=> {
        if (news.length > 0) {
            const calculate_page = Math.ceil(news.length/parPage)
            setPages(calculate_page)
        }
    },[news,parPage])

    const search_news = (e) => {
        const tempNews = all_news.filter(n => n.title.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)
        setNews(tempNews)
        setPage(1)
        setParPage(5)
    }

    const type_filter = (e) => {
        if (e.target.value=== '') {
            setNews(all_news)
            setPage(1)
            setParPage(5)
        } else {
            const tempNews = all_news.filter(n => n.status === e.target.value)
            setNews(tempNews)
            setPage(1)
            setParPage(5)
        }
    }

    const totalNews = newsSummary.FAKE + newsSummary.REAL;
    const totalClickbait = clickbaitSummary.CLICKBAIT + clickbaitSummary.NORMAL;

    // Fake/Real News Charts Data
    const barDataNews = {
        labels: ['Fake News', 'Real News'],
        datasets: [
            {
                label: 'Jumlah Berita',
                data: [newsSummary.FAKE, newsSummary.REAL],
                backgroundColor: ['#f87171', '#4ade80'],
                barThickness: 60,
            },
        ],
    };

    const pieDataNews = {
        labels: ['Fake News', 'Real News'],
        datasets: [
            {
                data: [
                    totalNews > 0 ? ((newsSummary.FAKE / totalNews) * 100).toFixed(2) : 0,
                    totalNews > 0 ? ((newsSummary.REAL / totalNews) * 100).toFixed(2) : 0,
                ],
                backgroundColor: ['#f87171', '#4ade80'],
            },
        ],
    };

    // Clickbait/Normal News Charts Data
    const barDataClickbait = {
        labels: ['Clickbait', 'Normal'],
        datasets: [
            {
                label: 'Jumlah Berita',
                data: [clickbaitSummary.CLICKBAIT, clickbaitSummary.NORMAL],
                backgroundColor: ['#fbbf24', '#60a5fa'],
                barThickness: 60,
            },
        ],
    };

    const pieDataClickbait = {
        labels: ['Clickbait', 'Normal'],
        datasets: [
            {
                data: [
                    totalClickbait > 0 ? ((clickbaitSummary.CLICKBAIT / totalClickbait) * 100).toFixed(2) : 0,
                    totalClickbait > 0 ? ((clickbaitSummary.NORMAL / totalClickbait) * 100).toFixed(2) : 0,
                ],
                backgroundColor: ['#fbbf24', '#60a5fa'],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className='bg-gray-50 min-h-screen p-6'>
            <div className="flex items-center gap-4 mb-6">
                <select onChange={type_filter} name="status" className='w-48 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 shadow-none focus:shadow-none appearance-none'>
                    <option value="">--- Select Status ---</option>
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="deactive">Deactive</option>
                </select>
                <input onChange={search_news} type="text" placeholder='Search News' className='w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none'/>
            </div>

            {/* Fake/Real News Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Fake/Real News Distribution (Count)</h3>
                    <Bar data={barDataNews} options={options} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Fake/Real News Distribution (Percentage)</h3>
                    <div className="w-80 h-80 mx-auto">
                        <Pie data={pieDataNews} options={options} />
                    </div>
                </div>
            </div>

            {/* Clickbait/Normal News Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Clickbait/Normal Distribution (Count)</h3>
                    <Bar data={barDataClickbait} options={options} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Clickbait/Normal Distribution (Percentage)</h3>
                    <div className="w-80 h-80 mx-auto">
                        <Pie data={pieDataClickbait} options={options} />
                    </div>
                </div>
            </div>
            <div className='overflow-x auto'>
                <table className='w-full table-auto bg-white shadow-lg rounded-lg overflow-hidden'>
                    <thead className='bg-gray-100 text-gray-700 uppercase text-sm'>
                        <tr>
                            <th className='py-4 px-6 text-left'>No</th>
                            <th className='py-4 px-6 text-left'>Title</th>
                            <th className='py-4 px-6 text-left'>Category</th>
                            <th className='py-4 px-6 text-left'>Fake News Status</th>
                            <th className='py-4 px-6 text-left'>Clickbait Status</th>
                        </tr>
                    </thead>
                    <tbody className='text-gray-600'>
                        {news.length> 0 && news.slice((page - 1 ) * parPage, page * parPage).map((n,i)=>(
                            <tr key={i} className=''>
                                <td className='py-4 px-6'>{i+1}</td>
                                <td className='py-4 px-6'>{n.title.slice(0,200)}...</td>
                                <td className='py-4 px-6'>{n.category}</td>
                                <td className='py-4 px-6'>
                                    {predictions[n._id] ? (
                                    predictions[n._id] === "FAKE" ? (
                                        <span className="text-red-600 font-semibold">FAKE</span>
                                    ) : (
                                        <span className="text-green-600 font-semibold">REAL</span>
                                    )
                                    ) : (
                                    <span className="text-gray-400 italic">Checking...</span>
                                    )}
                                </td>
                                <td className='py-4 px-6'>
                                    {clickbaitPredictions[n._id] ? (
                                        clickbaitPredictions[n._id] === "CLICKBAIT" ? (
                                            <span className="text-yellow-600 font-semibold">CLICKBAIT</span>
                                        ) : (
                                            <span className="text-green-600 font-semibold">NORMAL</span>
                                        )
                                    ) : (
                                        <span className="text-gray-400 italic">Checking...</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='flex justify-between items-center py-6'>
                <div className='flex items-center gap-4'>
                    <label className='text-sm font-semibold'>News Per Page</label>
                    <select value={parPage} onChange={(e)=>{
                        setParPage(parseInt(e.target.value))
                        setPage(1)
                    }} name="category" id="category" className='px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none'>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <div className='flex item-center gap-4 text-sm text-gray-600'>
                    <span className='font-bold'>{(page - 1) * parPage + 1}/{news.length} - {pages}</span>
                    <div className='flex gap-2'>
                        <IoIosArrowBack onClick={()=> {
                            if (page > 1) setPage(page -1)
                        }} className='w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-800'/>
                        <IoIosArrowForward onClick={()=> {
                            if (page < pages) setPage(page +1)
                        }} className='w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-800'/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HoaxNews;