
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContentGuidelines = () => {
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
          
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Content Guidelines</h1>

          <div className="prose prose-invert max-w-none">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="text-gray-300 mb-4">
                At BustyBerry, we aim to create a safe, respectful, and engaging platform for adult content creators and their fans. 
                These guidelines outline what content is acceptable on our platform, and what isn't.
              </p>
              <p className="text-gray-300">
                All users must adhere to these guidelines. Failure to comply may result in content removal, account suspension, or termination.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Age Requirements</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>
                  All users, creators, and individuals appearing in content must be 18 years of age or older.
                </li>
                <li>
                  Content featuring minors or suggesting the involvement of minors is strictly prohibited and will be reported to authorities.
                </li>
                <li>
                  Age verification is required for all content creators before they can publish on the platform.
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Prohibited Content</h2>
              <p className="text-gray-300 mb-4">
                The following types of content are strictly prohibited on BustyBerry:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>Content involving minors or individuals who appear to be minors</li>
                <li>Non-consensual content, including revenge porn</li>
                <li>Content depicting or promoting violence, abuse, or harm</li>
                <li>Content depicting illegal activities</li>
                <li>Content featuring animals or bestiality</li>
                <li>Content that promotes hate speech, discrimination, or harassment</li>
                <li>Content that violates the intellectual property rights of others</li>
                <li>Deep fakes or AI-generated content of real people without express permission</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Consent Requirements</h2>
              <p className="text-gray-300 mb-4">
                All individuals appearing in content must have provided informed consent:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>Creators must maintain records of consent for all individuals featured in their content</li>
                <li>Content featuring identifiable individuals other than the creator requires model release forms</li>
                <li>Content filmed in public spaces must respect privacy laws and local regulations</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Content Labeling</h2>
              <p className="text-gray-300 mb-4">
                Content creators are responsible for appropriately labeling their content:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>All content must be categorized appropriately</li>
                <li>Content containing explicit material must be labeled as such</li>
                <li>Content involving specific fetishes should be tagged accordingly</li>
                <li>Content featuring simulated scenarios must be clearly labeled as fantasy/roleplay</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Copyright and Intellectual Property</h2>
              <p className="text-gray-300 mb-4">
                Respect intellectual property rights:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>Only upload content that you own or have the rights to distribute</li>
                <li>Do not use copyrighted music, images, or video without permission</li>
                <li>Properly attribute any creative commons or licensed material</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Reporting Violations</h2>
              <p className="text-gray-300 mb-4">
                If you encounter content that violates these guidelines:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>Use the "Report" feature available on all content</li>
                <li>Include specific details about the violation</li>
                <li>Our moderation team will review reports within 24 hours</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Enforcement</h2>
              <p className="text-gray-300 mb-4">
                BustyBerry reserves the right to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>Remove content that violates these guidelines</li>
                <li>Suspend or terminate accounts that repeatedly violate guidelines</li>
                <li>Report illegal content to appropriate authorities</li>
                <li>Take any necessary action to maintain platform safety and integrity</li>
              </ul>
            </div>

            <div className="mt-8">
              <p className="text-gray-300">
                These guidelines are subject to change. Creators are responsible for staying updated with our content policies.
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

export default ContentGuidelines;
