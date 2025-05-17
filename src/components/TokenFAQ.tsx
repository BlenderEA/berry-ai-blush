
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Info } from 'lucide-react';

const TokenFAQ = () => {
  const faqs = [
    {
      question: "What is $BUSTYBERRY?",
      answer: "$BUSTYBERRY is the official utility token of the BustyBerry platform, built on the Solana blockchain. It provides holders with access to premium AI features, governance rights, and exclusive content."
    },
    {
      question: "How do I buy $BUSTYBERRY?",
      answer: "You can purchase $BUSTYBERRY by connecting your Solana wallet to a decentralized exchange like Jupiter or Raydium, then swapping SOL for $BUSTYBERRY using the token contract address."
    },
    {
      question: "What benefits do $BUSTYBERRY holders receive?",
      answer: "Holders gain access to premium AI chat personalities, early access to new features, governance voting rights on future development, and potential staking rewards in the future."
    },
    {
      question: "Is the $BUSTYBERRY contract audited?",
      answer: "Yes, the $BUSTYBERRY smart contract has undergone a full security audit by Solana security experts to ensure that it's safe and free from vulnerabilities."
    },
    {
      question: "What's the total supply of $BUSTYBERRY?",
      answer: "The total supply of $BUSTYBERRY is capped at 1,000,000,000 (1 billion) tokens. This fixed supply ensures scarcity and can't be increased."
    },
    {
      question: "Where can I see the current price of $BUSTYBERRY?",
      answer: "You can view the current price and trading activity on DEXScreener, Birdeye, or by connecting directly to Jupiter or Raydium DEXs."
    }
  ];

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5 text-berry" />
          Frequently Asked Questions
        </CardTitle>
        <CardDescription>
          Common questions about the $BUSTYBERRY token
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default TokenFAQ;
