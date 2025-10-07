// Reviews.tsx
import React from 'react';
import { Quote } from 'lucide-react';

const Reviews = () => {
  const reviews = [
    {
      text: "Infyniq has transformed the ease and speed in which I can use our data. Other BI and dashboard tools were simply just too complex and time intensive to get answers, but with Infyniq, it's like having a personal data analyst at my fingertips.",
      name: "Dan Calzone",
      position: "Director of Growth at Plex",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
    },
    {
      text: "The insights we've gained from Infyniq have been game-changing for our business strategy. What used to take our team weeks to analyze now takes minutes. The natural language interface makes data accessible to everyone on our team.",
      name: "Sarah Mitchell",
      position: "VP of Analytics at TechCorp",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
    },
    {
      text: "I've tried countless analytics platforms, but Infyniq stands out for its intuitive approach. It's like having a conversation with your data. The visualizations are beautiful and the speed is incredible. This tool has become indispensable.",
      name: "Michael Chen",
      position: "Chief Data Officer at InnovateLabs",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
    }
  ];

  return (
    <section className="bg-white text-gray-900 product-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Product+Sans&display=swap');
  
        .product-sans {
          font-family: 'Product Sans', sans-serif;
        }
      `}</style>
      
      <div className="container mx-auto px-4 py-20 sm:py-32 max-w-7xl">
        <p className="text-purple-600 font-semibold text-center mb-2 text-sm">
          Reviews
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4 tracking-tight">
          People love using Infyniq
        </h2>
        <p className="max-w-3xl mx-auto text-center text-lg text-gray-600 mb-20">
          Ask Infyniq any data-related question and Infyniq will interpret the question and respond
          with a comprehensive answer supported by relevant visualizations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 rounded-3xl shadow-lg p-8 flex flex-col justify-between hover:shadow-xl transition-shadow"
            >
              <div className="mb-8">
                <Quote className="text-purple-400 w-8 h-8 mb-4" />
                <p className="text-base leading-relaxed text-gray-700">
                  {review.text}
                </p>
              </div>

              <div className="flex items-center space-x-4 mt-auto">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <img 
                    src={review.image} 
                    alt={review.name}
                    className="object-cover w-full h-full" 
                  />
                </div>
                <div>
                  <p className="font-bold text-base text-gray-900">
                    {review.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {review.position}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;