import React, { useState, useEffect, useContext } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import storeContext from '../../context/storeContext';
import { base_url } from '../../config/config';
import axios from 'axios';
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



const Comment = () => {
  const { store } = useContext(storeContext);
  const [news, setNews] = useState([]);
  const [parPage, setParPage] = useState(5);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);
  const [sentimentResults, setSentimentResults] = useState({});

  const analyzeSentiment = async (text) => {
  try {
    const response = await axios.post(`${base_url}/api/sentiment`, {
      text,
    }, {
      headers: {
        Authorization: `Bearer ${store.token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Sentiment error:", error);
    return { label: "UNKNOWN", score: 0 };
  }
};


  const get_news = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/news`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });

      const filtered = data.news.filter((item) => item.comments && item.comments.length > 0);
      setNews(filtered);
      await fetchSentiments(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSentiments = async (newsList) => {
    const results = {};

    for (const newsItem of newsList) {
      const sentimentPromises = newsItem.comments.map(async (comment) => {
        const result = await analyzeSentiment(comment.comment);
        return {
          ...comment,
          sentiment: result.label,
          score: result.score,
        };
      });

      const sentiments = await Promise.all(sentimentPromises);
      results[newsItem._id] = sentiments;
    }

    setSentimentResults(results);
  };

  const sentimentSummary = { POSITIVE: 0, NEGATIVE: 0, NEUTRAL: 0 };
  Object.values(sentimentResults).forEach((comments) => {
    comments.forEach((comment) => {
      const label = comment.sentiment.toUpperCase();
      if (sentimentSummary[label] !== undefined) {
        sentimentSummary[label]++;
      }
    });
  });

  useEffect(() => {
    get_news();
  }, []);

  useEffect(() => {
    if (news.length > 0) {
      const calculate_page = Math.ceil(news.length / parPage);
      setPages(calculate_page);
    }
  }, [news, parPage]);

  const total = sentimentSummary.POSITIVE + sentimentSummary.NEGATIVE + sentimentSummary.NEUTRAL;

  const barData = {
  labels: ['Positive', 'Negative', 'Neutral'],
  datasets: [
    {
      label: 'Number of Comments',
      data: [
        sentimentSummary.POSITIVE,
        sentimentSummary.NEGATIVE,
        sentimentSummary.NEUTRAL,
      ],
      backgroundColor: ['#4ade80', '#f87171', '#facc15'],
      barThickness: 60, // kecilkan lebar bar
    },
  ],
};

const pieData = {
  labels: ['Positive', 'Negative', 'Neutral'],
  datasets: [
    {
      data: [
        ((sentimentSummary.POSITIVE / total) * 100).toFixed(2),
        ((sentimentSummary.NEGATIVE / total) * 100).toFixed(2),
        ((sentimentSummary.NEUTRAL / total) * 100).toFixed(2),
      ],
      backgroundColor: ['#4ade80', '#f87171', '#facc15'],
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
            <div className="bg-gray-50 n p-6">
        <div className="flex items-center gap-6">
          {/* Pie Chart di sebelah kiri */}
          <div style={{ width: '400px', height: '400px' }}>
            <Pie
              data={pieData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }}
            />
          </div>

          {/* Bar Chart di sebelah kanan */}
          <div className="flex-1">
            <Bar data={barData} options={options} />
          </div>
        </div>
      </div>


      <div className='overflow-x-auto mt-6'>
        <table className='w-full table-auto bg-white shadow-lg rounded-lg overflow-hidden'>
          <thead className='bg-gray-100 text-gray-700 uppercase text-sm'>
            <tr>
              <th className='py-4 px-6 text-left'>No</th>
              <th className='py-4 px-6 text-left'>Title</th>
              <th className='py-4 px-6 text-left'>Category</th>
              <th className='py-4 px-6 text-left'>Comment</th>
            </tr>
          </thead>
          <tbody className='text-gray-600'>
            {news.length > 0 &&
              news.slice((page - 1) * parPage, page * parPage).map((n, i) => (
                <tr key={n._id} className='border border-gray-200 hover:bg-gray-50'>
                  <td className='py-4 px-6 align-top'>{(page - 1) * parPage + i + 1}</td>
                  <td className='py-4 px-6 align-top'>{n.title.slice(0, 40)}...</td>
                  <td className='py-4 px-6 align-top'>{n.category}</td>
                  <td className='py-4 px-6'>
                    <ul className='space-y-2'>
                      {n.comments.map((comment) => {
                        const sentimentData = sentimentResults[n._id]?.find(
                          (c) => c._id === comment._id
                        );

                        return (
                          <li key={comment._id} className='p-2 rounded bg-sky-100'>
                            <p className='font-semibold'>{comment.name}</p>
                            <p className='text-sm text-gray-700'>{comment.comment}</p>
                            <p className='text-xs text-gray-500'>
                              {new Date(comment.createdAt).toLocaleString()}
                            </p>
                            {sentimentData && (
                              <div className='text-xs text-gray-500 mt-1'>
                                Sentimen: {sentimentData.sentiment} (
                                {(sentimentData.score * 100).toFixed(1)}%)
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className='flex justify-between items-center py-6'>
        <div className='flex items-center gap-4'>
          <label className='text-sm font-semibold'>News Per Page</label>
          <select
            value={parPage}
            onChange={(e) => {
              setParPage(parseInt(e.target.value));
              setPage(1);
            }}
            className='px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none'
          >
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='15'>15</option>
            <option value='20'>20</option>
          </select>
        </div>
        <div className='flex items-center gap-4 text-sm text-gray-600'>
          <span className='font-bold'>
            {(page - 1) * parPage + 1}/{news.length} - {pages}
          </span>
          <div className='flex gap-2'>
            <IoIosArrowBack
              onClick={() => {
                if (page > 1) setPage(page - 1);
              }}
              className='w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-800'
            />
            <IoIosArrowForward
              onClick={() => {
                if (page < pages) setPage(page + 1);
              }}
              className='w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-800'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
