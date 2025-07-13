"use client";

import React, { useContext, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

import { base_url } from "../../config/config";
import storeContext from "../../context/storeContext";

const Adminindex = () => {
  const [start, setStart] = useState({
    totalNews: 0,
    pendingNews: 0,
    activeNews: 0,
    deactiveNews: 0,
    totalWriters: 0,
  });

  const { store } = useContext(storeContext);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const { data } = await axios.get(`${base_url}/api/news-statistics`);
        setStart(data);
      } catch (error) {
        console.log(error);
      }
    };

    const getNews = async () => {
      try {
        const { data } = await axios.get(`${base_url}/api/news`, {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        });
        setNews(data.news);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStars();
    getNews();
  }, [store.token]);

  const sortedData = useMemo(() => {
    return [...news]
      .filter(n => typeof n.count === 'number') // pastikan ada count
      .sort((a, b) => b.count - a.count) // urut dari count terbesar
      .slice(0, 20) // ambil 20 berita teratas
      .map(n => ({
        name: n.title.length > 15 ? n.title.slice(0, 15) + "..." : n.title,
        value: n.count,
      }));
  }, [news]);

  return (
    <div className="mt-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-5 gap-6">
        {[
          { title: "Total News", value: start.totalNews },
          { title: "Pending News", value: start.pendingNews },
          { title: "Active News", value: start.activeNews },
          { title: "Deactive News", value: start.deactiveNews },
          { title: "Writers", value: start.totalWriters },
        ].map((item, i) => (
          <div
            key={i}
            className="p-8 bg-white rounded-lg shadow-md flex flex-col items-center gap-2"
          >
            <span className="text-4xl font-bold text-gray-800">
              {item.value}
            </span>
            <span className="text-md font-semibold text-gray-600">
              {item.title}
            </span>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center pb-4 border-b border-gray-500">
          <h2 className="text-xl font-bold text-gray-600">
            Top 20 Most Viewed News
          </h2>
        </div>
        <div className="overflow-x-auto mt-6 select-none focus:outline-none"
        style={{ userSelect: "none", outline: "none", cursor: "default" }}
>
          <div style={{ padding: '10px' }}>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart
                  data={sortedData}
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                >
                  
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#38bdf8" radius={[10, 10, 0, 0]}>
                    <LabelList dataKey="value" position="top" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Recent News Table */}
      <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center pb-4 border-b border-gray-500">
          <h2 className="text-xl font-bold text-gray-600">Recent News</h2>
          <Link
            to="/news"
            className="text-blue-500 hover:text-blue-800 font-semibold transition duration-300"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto mt-6">
          <table className="w-full table-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="py-4 px-6 text-left">No</th>
                <th className="py-4 px-6 text-left">Title</th>
                <th className="py-4 px-6 text-left">Image</th>
                <th className="py-4 px-6 text-left">Category</th>
                <th className="py-4 px-6 text-left">Date</th>
                <th className="py-4 px-6 text-left">Status</th>
                <th className="py-4 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {news.slice(0, 5).map((n, index) => (
                <tr key={index}>
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6">
                    {n.title.length > 15 ? n.title.slice(0, 15) + "..." : n.title}
                  </td>
                  <td className="py-4 px-6">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={n.image}
                      alt="news"
                    />
                  </td>
                  <td className="py-4 px-6">{n.category}</td>
                  <td className="py-4 px-6">{n.date}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-[2px] rounded-md text-xs ${
                        n.status === "pending"
                          ? "bg-blue-200 text-blue-800"
                          : n.status === "active"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {n.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-3 text-gray-500">
                      <Link
                        to="#"
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-800"
                      >
                        <FaEye />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Adminindex;
