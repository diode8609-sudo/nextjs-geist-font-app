"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PlacementDriveFormProps {
  onDriveAdded: (drive: any) => void;
}

export default function PlacementDriveForm({ onDriveAdded }: PlacementDriveFormProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    role: '',
    package: '',
    eligibilityCriteria: '',
    driveDate: '',
    processDetails: '',
    location: '',
    contactPerson: '',
    contactEmail: '',
    additionalInfo: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.role.trim()) {
      newErrors.role = 'Job role is required';
    }

    if (!formData.package.trim()) {
      newErrors.package = 'Package information is required';
    }

    if (!formData.eligibilityCriteria.trim()) {
      newErrors.eligibilityCriteria = 'Eligibility criteria is required';
    }

    if (!formData.driveDate) {
      newErrors.driveDate = 'Drive date is required';
    } else {
      const selectedDate = new Date(formData.driveDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.driveDate = 'Drive date cannot be in the past';
      }
    }

    if (!formData.processDetails.trim()) {
      newErrors.processDetails = 'Selection process details are required';
    }

    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = 'Contact person name is required';
    }

    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Contact email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Clear success message when user starts editing
    if (submitSuccess) {
      setSubmitSuccess(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // Create drive object
      const newDrive = {
        companyName: formData.companyName,
        role: formData.role,
        package: formData.package,
        eligibility: formData.eligibilityCriteria,
        driveDate: formData.driveDate,
        process: formData.processDetails,
        location: formData.location,
        contactPerson: formData.contactPerson,
        contactEmail: formData.contactEmail,
        additionalInfo: formData.additionalInfo
      };

      // Call parent callback
      onDriveAdded(newDrive);

      // Reset form
      setFormData({
        companyName: '',
        role: '',
        package: '',
        eligibilityCriteria: '',
        driveDate: '',
        processDetails: '',
        location: '',
        contactPerson: '',
        contactEmail: '',
        additionalInfo: ''
      });

      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitSuccess && (
        <Alert className="border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">
            ✓ Placement drive created successfully! It has been sent for admin approval.
          </AlertDescription>
        </Alert>
      )}

      {/* Company Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Company Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name *</Label>
            <Input
              id="companyName"
              placeholder="e.g., TechCorp Solutions"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              className={errors.companyName ? 'border-destructive' : ''}
            />
            {errors.companyName && <p className="text-sm text-destructive">{errors.companyName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Job Role *</Label>
            <Input
              id="role"
              placeholder="e.g., Software Developer"
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              className={errors.role ? 'border-destructive' : ''}
            />
            {errors.role && <p className="text-sm text-destructive">{errors.role}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="package">Package *</Label>
            <Input
              id="package"
              placeholder="e.g., ₹12 LPA"
              value={formData.package}
              onChange={(e) => handleInputChange('package', e.target.value)}
              className={errors.package ? 'border-destructive' : ''}
            />
            {errors.package && <p className="text-sm text-destructive">{errors.package}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g., Bangalore, Hybrid"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Drive Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Drive Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="driveDate">Drive Date *</Label>
            <Input
              id="driveDate"
              type="date"
              value={formData.driveDate}
              onChange={(e) => handleInputChange('driveDate', e.target.value)}
              className={errors.driveDate ? 'border-destructive' : ''}
            />
            {errors.driveDate && <p className="text-sm text-destructive">{errors.driveDate}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="eligibilityCriteria">Eligibility Criteria *</Label>
            <Input
              id="eligibilityCriteria"
              placeholder="e.g., CGPA ≥ 7.0, CSE/IT"
              value={formData.eligibilityCriteria}
              onChange={(e) => handleInputChange('eligibilityCriteria', e.target.value)}
              className={errors.eligibilityCriteria ? 'border-destructive' : ''}
            />
            {errors.eligibilityCriteria && <p className="text-sm text-destructive">{errors.eligibilityCriteria}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="processDetails">Selection Process *</Label>
          <Textarea
            id="processDetails"
            placeholder="e.g., Online Test → Technical Interview → HR Round"
            value={formData.processDetails}
            onChange={(e) => handleInputChange('processDetails', e.target.value)}
            className={errors.processDetails ? 'border-destructive' : ''}
            rows={3}
          />
          {errors.processDetails && <p className="text-sm text-destructive">{errors.processDetails}</p>}
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Contact Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contactPerson">Contact Person *</Label>
            <Input
              id="contactPerson"
              placeholder="HR Manager Name"
              value={formData.contactPerson}
              onChange={(e) => handleInputChange('contactPerson', e.target.value)}
              className={errors.contactPerson ? 'border-destructive' : ''}
            />
            {errors.contactPerson && <p className="text-sm text-destructive">{errors.contactPerson}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactEmail">Contact Email *</Label>
            <Input
              id="contactEmail"
              type="email"
              placeholder="hr@company.com"
              value={formData.contactEmail}
              onChange={(e) => handleInputChange('contactEmail', e.target.value)}
              className={errors.contactEmail ? 'border-destructive' : ''}
            />
            {errors.contactEmail && <p className="text-sm text-destructive">{errors.contactEmail}</p>}
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="space-y-2">
        <Label htmlFor="additionalInfo">Additional Information</Label>
        <Textarea
          id="additionalInfo"
          placeholder="Any additional details about the drive, requirements, or instructions..."
          value={formData.additionalInfo}
          onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
          rows={3}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setFormData({
              companyName: '',
              role: '',
              package: '',
              eligibilityCriteria: '',
              driveDate: '',
              processDetails: '',
              location: '',
              contactPerson: '',
              contactEmail: '',
              additionalInfo: ''
            });
            setErrors({});
            setSubmitSuccess(false);
          }}
        >
          Clear Form
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating Drive...' : 'Create Placement Drive'}
        </Button>
      </div>
    </form>
  );
}
