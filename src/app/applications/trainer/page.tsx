'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function TrainerApplication() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    discordId: '',
    inGameId: '',
    trainingExperience: '',
    rulesExplanation: '',
    handlingMistakes: '',
    handlingArguments: '',
    mediatingConflicts: '',
    maintainingProfessionalism: '',
    assessmentMethods: '',
    trainingIdeas: '',
    availability: '',
    recordKeeping: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the form data to your backend
      console.log('Submitting form:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to thank you page or show success message
      alert('Application submitted successfully!');
      router.push('/');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800/50 border-b border-gray-700 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-12 relative">
              <Image
                src="/logo/logo.png"
                alt="Florida State Roleplay"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Trainer Application
            </h1>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700/50">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="discordId" className="block text-sm font-medium mb-2 text-gray-300">
                Discord ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="discordId"
                name="discordId"
                value={formData.discordId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                placeholder="e.g., username#1234"
              />
            </div>
            
            <div>
              <label htmlFor="inGameId" className="block text-sm font-medium mb-2 text-gray-300">
                In-Game ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="inGameId"
                name="inGameId"
                value={formData.inGameId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                placeholder="Your in-game username"
              />
            </div>
          </div>
        </div>


        <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700/50">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Training Skills
          </h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="trainingExperience" className="block text-sm font-medium mb-1">
                Have you ever trained someone before? If yes, how did it go? *
              </label>
              <textarea
                id="trainingExperience"
                name="trainingExperience"
                value={formData.trainingExperience}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200 min-h-[120px]"
                placeholder="Share your experience with training others..."
              />
            </div>
            
            <div>
              <label htmlFor="rulesExplanation" className="block text-sm font-medium mb-1">
                How would you explain the rules to a new moderator with no prior experience? *
              </label>
              <textarea
                id="rulesExplanation"
                name="rulesExplanation"
                value={formData.rulesExplanation}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="handlingMistakes" className="block text-sm font-medium mb-1">
                If a trainee keeps making the same mistake, how would you address it? *
              </label>
              <textarea
                id="handlingMistakes"
                name="handlingMistakes"
                value={formData.handlingMistakes}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Leadership & Communication</h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="handlingArguments" className="block text-sm font-medium mb-1">
                How would you handle a situation where a trainee argues with you during training? *
              </label>
              <textarea
                id="handlingArguments"
                name="handlingArguments"
                value={formData.handlingArguments}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="mediatingConflicts" className="block text-sm font-medium mb-1">
                If two trainees are not getting along, how would you mediate the situation? *
              </label>
              <textarea
                id="mediatingConflicts"
                name="mediatingConflicts"
                value={formData.mediatingConflicts}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="maintainingProfessionalism" className="block text-sm font-medium mb-1">
                Can you maintain a calm and professional demeanor, even when dealing with difficult individuals? *
              </label>
              <textarea
                id="maintainingProfessionalism"
                name="maintainingProfessionalism"
                value={formData.maintainingProfessionalism}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Testing & Evaluation</h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="assessmentMethods" className="block text-sm font-medium mb-1">
                How would you assess whether a trainee is ready to become a full moderator? *
              </label>
              <textarea
                id="assessmentMethods"
                name="assessmentMethods"
                value={formData.assessmentMethods}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="trainingIdeas" className="block text-sm font-medium mb-1">
                Do you have any ideas for training sessions or mock scenarios to help evaluate their skills? *
              </label>
              <textarea
                id="trainingIdeas"
                name="trainingIdeas"
                value={formData.trainingIdeas}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Reliability</h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="availability" className="block text-sm font-medium mb-1">
                Are you active enough to train moderators on a regular basis? *
              </label>
              <textarea
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="recordKeeping" className="block text-sm font-medium mb-1">
                Would you be able to keep accurate records of who has been trained and who has not? *
              </label>
              <textarea
                id="recordKeeping"
                name="recordKeeping"
                value={formData.recordKeeping}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-700/50">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 rounded-lg font-medium text-gray-300 hover:text-white bg-gray-700/50 hover:bg-gray-700 transition-colors duration-200"
          >
            Go Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-3 rounded-lg font-medium text-white transition-all duration-200 ${
              isSubmitting
                ? 'bg-blue-700 cursor-not-allowed opacity-80'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-lg hover:shadow-blue-500/20'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : 'Submit Application'}
          </button>
        </div>
          </form>
        </div>
      </main>

      <footer className="bg-gray-900/50 border-t border-gray-800 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Florida State Roleplay. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}