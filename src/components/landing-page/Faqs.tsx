import React from 'react';
import AnimatedGradientText from '../ui/animated-gradient-text';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

const faqsList = [
  {
    question: 'How does Pictoria AI work?',
    answer:
      'Pictoria AI uses advanced machine learning algorithms to analyze and understand your photos. It then generates new images based on your features and the scenarios you choose, creating realistic and personalized results.',
  },
  {
    question: 'Is my data safe with Pictoria AI?',
    answer:
      'Yes, we take data privacy very seriously. All uploaded photos and generated images are encrypted and stored securely. We never share your personal data or images with third parties without your explicit consent.',
  },
  {
    question: 'How many photos do I need to upload for best results?',
    answer:
      'For optimal results, we recommend uploading at least 10-20 diverse photos of yourself. This helps our AI model better understand your features and expressions, leading to more accurate and realistic generated images.',
  },
  {
    question: 'Can I use Pictoria AI for commercial purposes?',
    answer:
      'Yes, our Pro and Enterprise plans include commercial usage rights for the images you generate. However, please note that you should always respect copyright and privacy laws when using AI-generated images.',
  },
  {
    question: 'How often do you update the AI model?',
    answer:
      'We continuously work on improving our AI model. Major updates are typically released quarterly, with minor improvements and optimizations happening more frequently. All users benefit from these updates automatically.',
  },
  {
    question: 'What are the differences between the free and paid plans?',
    answer:
      'The free plan allows you to generate up to 5 images per day. The Pro plan includes unlimited image generation, higher resolution output, and access to additional features. The Enterprise plan is tailored for businesses and offers custom integrations and dedicated support.',
  },
];
const Question = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  return (
    <AccordionItem value={question}>
      <AccordionTrigger className="text-left">{question}</AccordionTrigger>
      <AccordionContent className="text-muted-foreground">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
};
const Faqs = () => {
  return (
    <section
      id="faqs"
      className="w-full py-32 px-6 xs:px-8 sm:px-0 sm:mx-8 lg:mx-auto flex flex-col items-center justify-center overflow-hidden"
    >
      <AnimatedGradientText className="bg-background backdrop-blur-0">
        <span
          className={cn(
            `inline anime-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
          )}
        >
          FAQs
        </span>
      </AnimatedGradientText>
      <h2 className="subHeading mt-4">Frequently Asked Questions</h2>
      <p className="subText mt-4 text-center">
        Here are some of the most frequently asked questions about our product.
      </p>
      <Accordion
        type="single"
        collapsible
        className="w-full max-w-4xl mx-auto mt-16"
      >
        {faqsList.map((faq) => {
          return <Question key={faq.question} {...faq} />;
        })}
      </Accordion>
    </section>
  );
};

export default Faqs;
