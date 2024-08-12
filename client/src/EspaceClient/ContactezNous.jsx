import { useState } from 'react';
import axios from 'axios';

const ContactezNous = () => {
  const [formData, setFormData] = useState({
    sujet: '',
    message: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5007/api/contact', formData);
      setMessage('Votre message a été envoyé avec succès.');
      setFormData({
        sujet: '',
        message: '',
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      setMessage('Erreur lors de l\'envoi du message.');
    }
  };

  return (
    <div className="bg-[#E9EAEB] shadow-lg rounded-2xl p-6 max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-semibold text-[#00378A] mb-8 border-b-4 border-[#00378A] inline-block pb-1">Contactez-nous</h1>
      <p className="text-lg mb-4 text-[#00378A]">
        Merci de remplir le formulaire ci-dessous afin que notre équipe puisse vous répondre dans les plus brefs délais.
        Vous pouvez également nous contacter :
      </p>
      <p className="text-lg mb-6 text-[#00378A]">
        Par Email via <a href="mailto:info@goodmecano.com" className="text-[#1FA9B6] hover:underline">mecatech@gmail.com</a><br />
        Via notre fenêtre de Chat en bas à droite ;-)
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[#00378A] mb-2 font-medium" htmlFor="sujet">Sujet de la demande *</label>
          <input
            type="text"
            name="sujet"
            value={formData.sujet}
            onChange={handleChange}
            className="w-full p-3 border border-[#00378A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FA9B6]"
            required
          />
        </div>
        <div>
          <label className="block text-[#00378A] mb-2 font-medium" htmlFor="message">Message *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="6"
            className="w-full p-3 border border-[#00378A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FA9B6]"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-[#00378A] text-white py-3 px-6 rounded-lg shadow hover:bg-[#1FA9B6] focus:outline-none focus:ring-2 focus:ring-[#00378A]"
        >
          Envoyer
        </button>
      </form>
      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
  );
};

export default ContactezNous;
