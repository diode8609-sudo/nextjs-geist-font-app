"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Drive {
  id: number;
  companyName: string;
  role: string;
  package: string;
  eligibility: string;
  driveDate: string;
  process: string;
  isEligible: boolean;
  hasApplied: boolean;
}

interface DriveCardProps {
  drive: Drive;
  onApply: () => void;
}

export default function DriveCard({ drive, onApply }: DriveCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = () => {
    if (drive.hasApplied) {
      return <Badge variant="default">Applied</Badge>;
    }
    if (!drive.isEligible) {
      return <Badge variant="destructive">Not Eligible</Badge>;
    }
    return <Badge variant="secondary">Eligible</Badge>;
  };

  const getButtonState = () => {
    if (drive.hasApplied) {
      return { text: "Applied", disabled: true, variant: "secondary" as const };
    }
    if (!drive.isEligible) {
      return { text: "Not Eligible", disabled: true, variant: "destructive" as const };
    }
    return { text: "Apply Now", disabled: false, variant: "default" as const };
  };

  const buttonState = getButtonState();

  return (
    <Card className={`transition-all duration-200 ${drive.isEligible && !drive.hasApplied ? 'hover:shadow-md border-primary/20' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-lg">{drive.companyName}</CardTitle>
            <CardDescription className="text-base font-medium text-foreground">
              {drive.role}
            </CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Package and Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Package</p>
            <p className="text-lg font-semibold text-green-600">{drive.package}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Drive Date</p>
            <p className="text-sm">{formatDate(drive.driveDate)}</p>
          </div>
        </div>

        <Separator />

        {/* Eligibility */}
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">Eligibility Criteria</p>
          <p className="text-sm">{drive.eligibility}</p>
        </div>

        {/* Process */}
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">Selection Process</p>
          <p className="text-sm">{drive.process}</p>
        </div>

        <Separator />

        {/* Action Button */}
        <div className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            {drive.hasApplied && "✓ Application submitted successfully"}
            {!drive.isEligible && "You don't meet the eligibility criteria"}
            {drive.isEligible && !drive.hasApplied && "You are eligible to apply"}
          </div>
          <Button
            onClick={onApply}
            disabled={buttonState.disabled}
            variant={buttonState.variant}
            size="sm"
          >
            {buttonState.text}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
