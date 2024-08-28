import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';

const RatingForm = ({ reservationId, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = {
      reservationId,
      stars: rating,
      comment,
    };

    try {
      await axios.post('http://localhost:3007/api/ratings', data);
      setSubmitSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting rating:', error);
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <div className="text-green-500 text-5xl mb-4">✔</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
        <p className="text-gray-600">Your rating has been submitted successfully.</p>
      </div>
    );
  }

  return (
    <form className="bg-white p-8 rounded-lg shadow-md w-96" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Rate Your Experience</h2>
      
     
      
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Your Rating</label>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              size={32}
              className={`cursor-pointer transition-colors duration-200 ${
                rating > i || hover > i ? 'text-yellow-400' : 'text-gray-300'
              }`}
              onClick={() => setRating(i + 1)}
              onMouseEnter={() => setHover(i + 1)}
              onMouseLeave={() => setHover(0)}
            />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Your Comments</label>
        <textarea
          className="w-full h-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Share your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default RatingForm;