import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Upload, Briefcase, FileText, CheckCircle2 } from 'lucide-react';
import PageContainer from '../../components/common/PageContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Card from '../../components/ui/Card';
import { useToast } from '../../hooks/useToast';

export default function ContractApply() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    portfolioUrl: '',
    coverLetter: '',
    fileName: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Application submitted successfully!', 'Application Received');
      navigate('/contracts/application-success');
    }, 1200);
  };

  return (
    <PageContainer size="sm">
      <div className="mb-6">
        <Link
          to={`/contracts/${slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal-500 hover:text-brand-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Role Details</span>
        </Link>
      </div>

      <SectionHeading
        tag="Application Portal"
        title="Apply for Contract Opportunity"
        subtitle="Submit your details and CV. Our culinary management team will review your application within 48 hours."
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold font-display text-charcoal-900 border-b border-cream-border pb-3">
            1. Applicant Profile
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              required
              placeholder="e.g. Tobi Adeleke"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
            <Input
              label="Phone Number"
              type="tel"
              required
              placeholder="08034567890"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <div className="sm:col-span-2">
              <Input
                label="Email Address"
                type="email"
                required
                placeholder="tobi@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold font-display text-charcoal-900 border-b border-cream-border pb-3">
            2. Qualifications & Resume
          </h3>

          <Input
            label="Portfolio / Instagram / Cake Photos Link (Optional)"
            placeholder="https://instagram.com/tobis_bakes or Google Drive folder"
            value={formData.portfolioUrl}
            onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
          />

          {/* File Upload Zone */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-charcoal-700 block">
              Curriculum Vitae / Resume (PDF or DOCX) <span className="text-brand-700">*</span>
            </label>
            <div className="border-2 border-dashed border-brand-200 hover:border-brand-700 rounded-2xl p-6 text-center bg-brand-50/30 transition-colors cursor-pointer flex flex-col items-center justify-center">
              <Upload className="w-8 h-8 text-brand-700 mb-2" />
              <span className="text-sm font-semibold text-charcoal-900">
                {formData.fileName || 'Click to select or drag and drop your CV file'}
              </span>
              <span className="text-xs text-charcoal-500 mt-1">PDF, DOCX up to 10MB</span>
              <input
                type="file"
                accept=".pdf,.docx,.doc"
                className="hidden"
                id="cv-upload"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFormData({ ...formData, fileName: e.target.files[0].name });
                  }
                }}
              />
              <label htmlFor="cv-upload" className="mt-3">
                <Button variant="outline" size="sm" type="button" asChild>
                  <span>Select Document</span>
                </Button>
              </label>
            </div>
          </div>

          <Textarea
            label="Brief Cover Letter / Why are you excited to join Tory's Treats?"
            placeholder="Tell us about your baking style, availability, and specialty flavors..."
            rows={4}
            value={formData.coverLetter}
            onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
          />
        </Card>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          icon={Briefcase}
          className="w-full justify-center"
        >
          Submit Contract Application
        </Button>
      </form>
    </PageContainer>
  );
}
