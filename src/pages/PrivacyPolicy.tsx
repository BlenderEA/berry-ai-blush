
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
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
          
          <div className="flex items-center gap-3 mb-8">
            <Shield className="h-8 w-8 text-berry" />
            <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="text-gray-300 mb-4">
                This Privacy Policy explains how Busty Berry ("we," "our," or "us") collects, uses, shares, and protects your personal information when you use our website, services, or interact with our platform.
              </p>
              <p className="text-gray-300 mb-4">
                We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. By accessing or using our platform, you agree to the terms of this Privacy Policy.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              <p className="text-gray-300 mb-4">
                We collect different types of information to provide and improve our services:
              </p>
              
              <h3 className="text-xl font-medium mb-2">Personal Information</h3>
              <p className="text-gray-300 mb-4">
                When you use our platform, we may collect the following personal information:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>Wallet addresses and blockchain transaction information</li>
                <li>Email address (if provided)</li>
                <li>Username or display name</li>
                <li>Profile information</li>
                <li>Content you create, share, or upload</li>
                <li>Age verification information (we only verify you are of legal age, but do not store identification documents)</li>
              </ul>
              
              <h3 className="text-xl font-medium mt-4 mb-2">Automatically Collected Information</h3>
              <p className="text-gray-300 mb-4">
                When you visit our website or use our platform, we automatically collect certain information, including:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>IP address</li>
                <li>Device and browser information</li>
                <li>Operating system</li>
                <li>Browsing activity and interactions with our platform</li>
                <li>Cookies and similar technologies</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <p className="text-gray-300 mb-4">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>Providing, maintaining, and improving our services</li>
                <li>Processing transactions and managing user accounts</li>
                <li>Verifying your identity and preventing fraud</li>
                <li>Personalizing your experience on our platform</li>
                <li>Communicating with you about updates, changes, or new features</li>
                <li>Responding to your inquiries or requests</li>
                <li>Analyzing usage patterns to improve our website and services</li>
                <li>Complying with legal obligations</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">How We Share Your Information</h2>
              <p className="text-gray-300 mb-4">
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li><strong>Service Providers:</strong> We may share your information with third-party service providers who perform services on our behalf, such as hosting, data analysis, payment processing, and customer service.</li>
                <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests from public authorities.</li>
                <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
                <li><strong>With Your Consent:</strong> We may share your information with third parties when you have provided your consent to do so.</li>
              </ul>
              <p className="text-gray-300 mt-4">
                We do not sell your personal information to third parties.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Blockchain Transactions</h2>
              <p className="text-gray-300 mb-4">
                Please note that blockchain transactions involving $BUSTYBERRY and interactions with our smart contracts are recorded on the Solana blockchain and are publicly visible. This information may include wallet addresses and transaction details. This is inherent to blockchain technology and is not within our control.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Cookies and Similar Technologies</h2>
              <p className="text-gray-300 mb-4">
                We use cookies and similar tracking technologies to track activity on our platform and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. These are sent to your browser and stored on your device.
              </p>
              <p className="text-gray-300 mb-4">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p className="text-gray-300 mb-4">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
              <p className="text-gray-300 mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>The right to access the personal information we have about you</li>
                <li>The right to rectify inaccurate personal information</li>
                <li>The right to erasure of your personal information</li>
                <li>The right to restrict or object to processing of your personal information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p className="text-gray-300 mt-4">
                To exercise these rights, please contact us using the information provided at the end of this policy.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
              <p className="text-gray-300 mb-4">
                Our platform is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us, and we will take steps to remove that information.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-300 mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-gray-300 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <p className="text-gray-300">
                Email: privacy@bustyberry.com
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

export default PrivacyPolicy;
