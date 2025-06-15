'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ModerationApplication() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    age: '',
    timezone: '',
    robloxDiscord: '',
    membershipDuration: '',
    previousExperience: '',
    interestReason: '',
    skillsQualities: '',
    handlingStress: '',
    handlingAccusations: '',
    reportingAbuse: '',
    weeklyHours: '',
    meetingCommitment: '',
    additionalInfo: '',
    rulesAgreement: '',
    melonlyAwareness: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

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
      console.log('Submitting moderation application:', formData);
      
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
              Staff Application
            </h1>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-center">Staff Application</h1>
          <p className="text-gray-300 text-center mb-4">
            Thank you for your interest in joining the FSRP Staff Team! We're seeking active, professional, and dedicated individuals to help maintain a positive community, enforce rules, and assist players. Please answer all questions honestly and thoroughly. Incomplete applications may not be considered.
          </p>
          <p className="text-gray-300 text-center mb-6 font-medium">
            Good luck, and we look forward to reviewing your application!
          </p>
          <p className="text-sm text-gray-400 text-center mb-6 italic">
            Your discord profile is shared with application reviewers
          </p>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">How old are you?</label>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="Your answer"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">What timezone are you in?</label>
                <input
                  type="text"
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="Your answer"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">What is your Roblox username and Discord username?</label>
                <input
                  type="text"
                  name="robloxDiscord"
                  value={formData.robloxDiscord}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="Your answer"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">How long have you been a member of FSRP?</label>
                <input
                  type="text"
                  name="membershipDuration"
                  value={formData.membershipDuration}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="Your answer"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Have you had any previous staff experience?</label>
                <textarea
                  name="previousExperience"
                  value={formData.previousExperience}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white min-h-[100px]"
                  placeholder="Your answer"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Why are you interested in becoming staff for FSRP?</label>
                <textarea
                  name="interestReason"
                  value={formData.interestReason}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white min-h-[100px]"
                  placeholder="Your answer"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">What skills or qualities do you have that would make you a good staff member?</label>
                <textarea
                  name="skillsQualities"
                  value={formData.skillsQualities}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white min-h-[100px]"
                  placeholder="Your answer"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">How would you handle stressful or high-pressure situations?</label>
                <textarea
                  name="handlingStress"
                  value={formData.handlingStress}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white min-h-[100px]"
                  placeholder="Your answer"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">A player is accusing another player of breaking the rules, but there's no solid evidence. How would you handle this situation?</label>
                <textarea
                  name="handlingAccusations"
                  value={formData.handlingAccusations}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white min-h-[100px]"
                  placeholder="Your answer"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">If a staff member abuses their power, how would you report or handle this issue?</label>
                <textarea
                  name="reportingAbuse"
                  value={formData.reportingAbuse}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white min-h-[100px]"
                  placeholder="Your answer"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">How many hours can you dedicate to FSRP each week?</label>
                <input
                  type="text"
                  name="weeklyHours"
                  value={formData.weeklyHours}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="Your answer"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Are you willing to attend staff meetings and stay active in the community?</label>
                <input
                  type="text"
                  name="meetingCommitment"
                  value={formData.meetingCommitment}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="Your answer"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Is there anything else you'd like us to know about you?</label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white min-h-[100px]"
                  placeholder="Your answer"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Do you agree to follow all FSRP rules and staff guidelines if selected?</label>
                <input
                  type="text"
                  name="rulesAgreement"
                  value={formData.rulesAgreement}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="Your answer"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Do you know that you are required to join the melonly?</label>
                <input
                  type="text"
                  name="melonlyAwareness"
                  value={formData.melonlyAwareness}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="Your answer"
                  required
                />
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-400 mb-4">
                  By submitting this application, you acknowledge that all information provided is accurate to the best of your knowledge.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : 'Submit Application'}
                </button>
                <p className="text-xs text-gray-500 mt-3">
                  You'll receive a response via Discord regarding your application status.
                </p>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
