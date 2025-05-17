
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-dark text-white flex flex-col">
      <Header />
      <main className="flex-1 pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link to="/" className="text-gray-400 hover:text-berry flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>

          <div className="prose prose-invert max-w-none">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-gray-300 mb-4">
                Welcome to BustyBerry. These Terms of Service govern your use of our website and services.
                By accessing or using BustyBerry, you agree to be bound by these Terms.
              </p>
              <p className="text-gray-300">
                If you disagree with any part of the terms, you may not access our services.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Definitions</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>
                  <strong>"Service"</strong> refers to the BustyBerry website and platform.
                </li>
                <li>
                  <strong>"Content"</strong> refers to all material uploaded, shared, or displayed through our Service.
                </li>
                <li>
                  <strong>"User"</strong> refers to individuals who access or use our Service.
                </li>
                <li>
                  <strong>"Creator"</strong> refers to users who publish content on the platform.
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Account Registration</h2>
              <p className="text-gray-300 mb-4">
                To use certain features of the Service, you must register for an account. You agree to provide accurate information during registration and to keep your account information updated.
              </p>
              <p className="text-gray-300 mb-4">
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
              </p>
              <p className="text-gray-300">
                You must be at least 18 years old to register for an account and use our Services.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Content Guidelines</h2>
              <p className="text-gray-300 mb-4">
                All content published on BustyBerry must comply with our <Link to="/content-guidelines" className="text-berry hover:underline">Content Guidelines</Link>.
              </p>
              <p className="text-gray-300">
                We reserve the right to remove content that violates our guidelines and to suspend or terminate accounts that repeatedly violate these terms.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Payment and Revenue Sharing</h2>
              <p className="text-gray-300 mb-4">
                BustyBerry operates on a revenue sharing model with creators. Creators receive 95-98% of revenue generated from their content, with BustyBerry receiving a 2-5% platform fee.
              </p>
              <p className="text-gray-300">
                All payments will be processed through the Solana blockchain. Users are responsible for any applicable taxes on earnings.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
              <p className="text-gray-300 mb-4">
                Creators retain ownership of their content. By uploading content to BustyBerry, creators grant us a non-exclusive license to display and distribute their content on the platform.
              </p>
              <p className="text-gray-300">
                Users agree not to infringe on others' intellectual property rights when using our Service.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Limitations of Liability</h2>
              <p className="text-gray-300 mb-4">
                BustyBerry is provided "as is" without warranties of any kind. We are not liable for any damages resulting from your use of our Service.
              </p>
              <p className="text-gray-300">
                We are not responsible for content posted by users and do not endorse any opinions expressed by users.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
              <p className="text-gray-300">
                We may modify these Terms at any time. Continued use of our Service after any modifications constitutes your acceptance of the revised Terms.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
              <p className="text-gray-300">
                If you have any questions about these Terms, please contact us at legal@bustyberry.com.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-400">Last updated: May 17, 2025</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
