import HeadLines from "@/components/HeadLines";
import Image from "next/image";
import LatestNews from "@/components/news/LatestNews";
import Title from "@/components/Title";
import SimpleNewsCard from "@/components/news/item/SimpleNewsCard";
import PopularNews from "@/components/news/PopularNews";
import DetailsNewsRow from "@/components/news/DetailsNewsRow";
import DetailsNews from "@/components/news/DetailsNews";
import DetailsNewsCol from "@/components/news/DetailsNewsCol";
import NewsCard from "@/components/news/item/NewsCard";
import Footer from '../components/Footer';
import { base_api_url } from "@/config/config";
import Header from '@/components/Header';
import RecentNews from "@/components/news/RecentNews";

const Home = async () => {
  const news_data = await fetch(`${base_api_url}/api/all/news`, {
    next: { revalidate: 5 },
  });

  let news = await news_data?.json();
  news = news.news;

  return (
    <div className="bg-white text-[#212529]">
      <main>
        <div className="fixed top-0 left-0 w-full z-200 bg-white shadow">
          <Header />
          <HeadLines news={news} />
        </div>

        <div className="h-[200px]"></div>

        <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Section: Latest News */}
          <section className="mb-12 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex flex-col gap-6">
              <LatestNews />
            </div>
          </section>

          {/* Section: Teknologi */}
          <section className="mb-12 bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="flex flex-col gap-6">
              <Title title="Teknologi" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {news["Technology"]?.slice(0, 4).map((item, i) => (
                  <SimpleNewsCard item={item} key={i} />
                ))}
              </div>
            </div>
          </section>

          {/* Popular News */}
          <section className="mb-12 border-t pt-8">
            <PopularNews type="Popular News" />
          </section>
        </div>

        {/* ✅ Full Width Section: Bisnis */}
        <section className="w-full bg-sky-900 py-12">
          <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-col gap-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {news["Business"]?.slice(0, 3).map((item, i) => (
                  <SimpleNewsCard item={item} key={i} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Section 1: Sports, Health, Education */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 border-t pt-8">
            <div className="lg:col-span-2 space-y-8">
              <DetailsNewsRow category="Sports" type="details_news" news={news["Sports"]} />
              <DetailsNews category="Health" news={news["Health"]} />
            </div>
            <div>
              <DetailsNewsCol category="Education" news={news["Education"]} />
            </div>
          </section>

          {/* Section 2: International, Travel, Business */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 border-t pt-8">
            <div>
              <DetailsNewsCol category="International" news={news["International"]} />
            </div>
            <div className="lg:col-span-2 space-y-8">
              <DetailsNewsRow category="Travel" news={news["Travel"]} type="details_news" />
              <DetailsNews category="Business" news={news["Business"]} />
            </div>
          </section>
        </div>

        {/* ✅ Full Width Section: Internasional */}
        <section className="w-full bg-sky-900 py-12">
          <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-col gap-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {news["International"]?.slice(0, 3).map((item, i) => (
                  <SimpleNewsCard item={item} key={i} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Section 3: Technology + Recent News */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 border-t pt-8">
            <div className="lg:col-span-2">
              <DetailsNewsRow category="Technology" news={news["Technology"]} type="details_news" />
            </div>
            <div>
              <RecentNews />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
