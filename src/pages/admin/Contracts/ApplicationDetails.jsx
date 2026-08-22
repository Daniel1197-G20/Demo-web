import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Download, Save, CheckCircle2, XCircle, ExternalLink } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Select from '../../../components/ui/Select';
import Textarea from '../../../components/ui/Textarea';
import Button from '../../../components/ui/Button';
import { useToast } from '../../../hooks/useToast';

export default function ApplicationDetails() {
  const { id } = useParams();
  const toast = useToast();

  const [status, setStatus] = useState('UNDER_REVIEW');
  const [feedback, setFeedback] = useState('Candidate possesses strong background in luxury celebration cakes. Proceeding to in-kitchen tasting interview.');

  const handleSave = () => {
    toast.success(`Application status updated to ${status}!`);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link
          to="/admin/contracts/applications"
          className="p-2 rounded-xl bg-white border border-cream-border text-charcoal-700 hover:text-tory-600"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold font-display text-charcoal-900">
            Review Candidate Application
          </h1>
          <p className="text-xs text-charcoal-500">
            Candidate details, resume document, and hiring status controls.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 p-6 space-y-4">
          <h3 className="text-base font-bold font-display text-charcoal-900 border-b border-cream-border pb-2">
            Applicant Information
          </h3>

          <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <span className="text-charcoal-500 block text-xs">Full Name</span>
              <span className="font-bold text-charcoal-900">Tobi Adeleke</span>
            </div>
            <div>
              <span className="text-charcoal-500 block text-xs">Applied Role</span>
              <span className="font-bold text-tory-600">Weekend Event Pastry Chef</span>
            </div>
            <div>
              <span className="text-charcoal-500 block text-xs">Email</span>
              <span className="text-charcoal-900">tobi@example.com</span>
            </div>
            <div>
              <span className="text-charcoal-500 block text-xs">Phone</span>
              <span className="text-charcoal-900">08034567890</span>
            </div>
          </div>

          {/* CV Document Download Block */}
          <div className="p-4 rounded-xl bg-cream-surface border border-cream-border flex items-center justify-between gap-4 mt-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-tory-100 text-tory-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-xs sm:text-sm text-charcoal-900 block">
                  Tobi_Adeleke_Pastry_Chef_Resume.pdf
                </span>
                <span className="text-[11px] text-charcoal-500">2.4 MB • PDF Document</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              icon={Download}
              onClick={() => toast.info('Initiating secure resume download...')}
            >
              Download CV
            </Button>
          </div>

          <div className="pt-2">
            <span className="text-charcoal-500 block text-xs mb-1">Cover Note:</span>
            <p className="text-xs sm:text-sm text-charcoal-700 bg-cream-surface/50 p-3.5 rounded-xl border border-cream-border leading-relaxed">
              I have 3 years of baking experience in Victoria Island, specializing in 3-tier celebration cakes, fruit tartlets, and French buttercream. I am enthusiastic about supporting Tory’s Treats events.
            </p>
          </div>
        </Card>

        {/* Hiring Decision Card */}
        <div className="space-y-4">
          <Card className="p-6 space-y-4">
            <h3 className="text-base font-bold font-display text-charcoal-900 border-b border-cream-border pb-2">
              Hiring Decision
            </h3>

            <Select
              label="Application Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              options={[
                { value: 'SUBMITTED', label: 'Submitted (New)' },
                { value: 'UNDER_REVIEW', label: 'Under Review' },
                { value: 'SHORTLISTED', label: 'Shortlisted for Interview' },
                { value: 'APPROVED', label: 'Approved & Hired' },
                { value: 'REJECTED', label: 'Not Selected (Reject)' },
                { value: 'ARCHIVED', label: 'Archived' },
              ]}
            />

            <Textarea
              label="Admin Feedback Note"
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <Button variant="primary" className="w-full justify-center" onClick={handleSave} icon={Save}>
              Save Decision
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
