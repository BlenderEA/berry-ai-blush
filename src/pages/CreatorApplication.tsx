
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const CreatorApplication = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    social: '',
    experience: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Application Submitted",
        description: "Thank you for applying! Our team will review your application and contact you soon.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        social: '',
        experience: '',
        message: '',
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <Header />
      <main className="pt-20 pb-16">
        {/* Hero Section */}
        <section className="py-16 relative">
          {/* Background Effects */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-berry/20 blur-[100px] animate-pulse-slow"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-berry-purple/20 blur-[100px] animate-pulse-slow"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
                <span className="gradient-text">Apply </span> 
                <span className="text-white">as a Creator</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Join BustyBerry and start earning with lower fees, full content ownership, 
                and direct fan relationships on our decentralized adult content platform.
              </p>
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserPlus className="mr-2 h-6 w-6 text-berry" />
                    Creator Application
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-sm font-medium" htmlFor="name">
                        Creator Name / Pseudonym
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-dark-lighter border-dark-border"
                        placeholder="Your creator name"
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium" htmlFor="email">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-dark-lighter border-dark-border"
                        placeholder="email@example.com"
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium" htmlFor="social">
                        Social Media Profiles (Optional)
                      </label>
                      <Input
                        id="social"
                        name="social"
                        value={formData.social}
                        onChange={handleChange}
                        className="bg-dark-lighter border-dark-border"
                        placeholder="Twitter, Instagram, OnlyFans, etc."
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium" htmlFor="experience">
                        Content Creation Experience
                      </label>
                      <Input
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="bg-dark-lighter border-dark-border"
                        placeholder="Beginner, Intermediate, Professional, etc."
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium" htmlFor="message">
                        Why do you want to join BustyBerry?
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="bg-dark-lighter border-dark-border min-h-[100px]"
                        placeholder="Tell us a bit about yourself and your content"
                        required
                      />
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 pt-4">
                      <Button
                        type="submit"
                        className="berry-button flex-1"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                      </Button>
                      <Link to="/creators" className="flex-1">
                        <Button variant="outline" className="secondary-button w-full">
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <div className="mt-8 text-center text-sm text-gray-400">
                <p>
                  By submitting this application, you confirm that you are at least 18 years old and agree to our{" "}
                  <Link to="#" className="text-berry hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="#" className="text-berry hover:underline">
                    Content Guidelines
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Join Section */}
        <section className="py-16 bg-dark-lighter mt-8">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">
                <span className="gradient-text">Why Join BustyBerry?</span>
              </h2>
              <p className="text-lg text-gray-300">
                A decentralized platform built for creator success
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="glass-card hover:border-berry/30 transition-colors">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">Lower Fees</h3>
                  <p className="text-gray-300">
                    Only 2-5% platform fees compared to 20-30% on traditional platforms, enabled by Solana's efficiency.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card hover:border-berry/30 transition-colors">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">Full Ownership</h3>
                  <p className="text-gray-300">
                    Maintain complete control over your content, revenue, and fan relationships with blockchain technology.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card hover:border-berry/30 transition-colors">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">Global Reach</h3>
                  <p className="text-gray-300">
                    Access an international audience with cryptocurrency payments, bypassing traditional payment restrictions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CreatorApplication;
