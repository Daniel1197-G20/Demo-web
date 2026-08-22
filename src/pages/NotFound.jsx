import React from 'react';
import { Link } from 'react-router-dom';
import { Cookie, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-tory-100 text-tory-600 flex items-center justify-center mb-6 shadow-tory-sm">
          <Cookie className="w-10 h-10" />
        </div>

        <span className="text-sm font-bold text-tory-500 uppercase tracking-widest">
          404 Page Not Found
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 font-display mt-2 mb-3">
          Looks like that treat crumbled away!
        </h1>

        <p className="text-sm text-charcoal-500 mb-8 max-w-sm">
          The bakery page you are looking for doesn't exist or has been moved to another oven.
        </p>

        <Link to="/">
          <Button variant="primary" icon={ArrowLeft}>
            Return to Bakery Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
