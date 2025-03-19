import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  // Share Options
  showShareOptions = false;
  canShareViaWhatsApp = false;
  canShareViaEmail = false;
  canShareViaSMS = false;
  currentURL = encodeURIComponent(window.location.href);

  // Grant Calculator Fields
  monthlyContribution: number | null = null;
  reserveBalance: number | null = null;
  totalReservePool: number = 1000000; // Example value of R1,000,000 for the Co-op Reserve Pool
  previousGrants: number = 40000; // Example value of R40,000 in previous grants
  calculatedGrant: number | null = null;
  errorMessage: string = '';

  showProjection: boolean = true;  // Flag to toggle visibility of the projected growth container

  // Financial Projections Fields
  initialReservePool: number = 300000;
  initialMemberBase: number = 11;
  monthlyMemberContribution: number = 4545; // Average monthly contribution per member
  annualGrowthRate: number = 0.10; // 10% annual growth rate
  memberGrowthRate: number = 1; // 1 new member per month
  projectionYears: number = 10; // 10 years projection
  financialProjection: any = null;

  constructor() {
    this.detectDevice();
  }

  detectDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|iphone|ipad|ipod/.test(userAgent);
    const isDesktop = !isMobile;

    this.canShareViaWhatsApp = isMobile || isDesktop;
    this.canShareViaEmail = true;
    this.canShareViaSMS = isMobile;
  }

  openShareOptions() {
    this.showShareOptions = !this.showShareOptions;
  }

  shareViaWhatsApp() {
    const whatsappURL = `https://wa.me/?text=${this.currentURL}`;
    window.open(whatsappURL, '_blank');
  }

  shareViaEmail() {
    const mailtoLink = `mailto:?subject=Check%20this%20out&body=${this.currentURL}`;
    window.open(mailtoLink, '_blank');
  }

  shareViaSMS() {
    const smsLink = `sms:?body=${this.currentURL}`;
    window.open(smsLink, '_blank');
  }

  // Grant Calculator Logic
  calculateGrant() {
    this.errorMessage = ''; // Reset error message

    // Ensure values are recalculated each time
    this.calculatedGrant = null;

    // Input validation
    if (
      this.monthlyContribution === null || this.monthlyContribution <= 0 ||
      this.reserveBalance === null || this.reserveBalance <= 0
    ) {
      this.errorMessage = 'Please enter valid numbers greater than 0 for both fields.';
      return;
    }

    // Calculate the maximum grant values
    const maxGrant1 = 4 * this.reserveBalance;  // Individual reserve value (4 times the reserve balance)
    const maxGrant2 = 24 * this.monthlyContribution;  // 24 times the monthly contribution
    const maxGrant3 = 0.1 * this.totalReservePool;  // 10% of total Reserve Pool

    // Determine the minimum of the three grant amounts
    let grantBeforeDeductions = Math.min(maxGrant1, maxGrant2, maxGrant3);

    // Subtract previous grants received
    this.calculatedGrant = Math.max(0, grantBeforeDeductions - this.previousGrants);

    // Show an error if no grant is available
    if (this.calculatedGrant <= 0) {
      this.errorMessage = 'The available grant after deducting previous grants is zero or negative.';
    }
  }

 // Financial Projections Logic
calculateFinancialProjections() {
  let reservePoolScenario1 = this.initialReservePool;
  let reservePoolScenario2 = this.initialReservePool;
  let memberAccountsScenario1 = this.initialMemberBase * this.monthlyMemberContribution * 0.1;
  let memberAccountsScenario2 = this.initialMemberBase * this.monthlyMemberContribution * 0.1;

  // Ensure monthlyContribution is not null and use default value if needed
  const monthlyContribution = this.monthlyContribution ?? 0; // Default to 0 if null

  // Simulate the growth over the projected years (10 years)
  for (let year = 1; year <= this.projectionYears; year++) {
    let newMemberContributions = this.memberGrowthRate * this.monthlyMemberContribution;
    let totalMonthlyContribution = monthlyContribution + newMemberContributions; // Safely use monthlyContribution

    // Scenario 1: No grants paid out
    reservePoolScenario1 += totalMonthlyContribution * 0.9; // 90% to reserve pool
    memberAccountsScenario1 += totalMonthlyContribution * 0.1; // 10% to member accounts
    reservePoolScenario1 *= (1 + this.annualGrowthRate); // Apply annual growth

    // Scenario 2: 50% of reserve pool value granted annually
    reservePoolScenario2 += totalMonthlyContribution * 0.9; // 90% to reserve pool
    memberAccountsScenario2 += totalMonthlyContribution * 0.1; // 10% to member accounts
    reservePoolScenario2 *= (1 + this.annualGrowthRate); // Apply annual growth

    // Apply grants annually (50% of reserve pool)
    if (year % 1 === 0) {
      let annualGrant = reservePoolScenario2 * 0.5;
      reservePoolScenario2 -= annualGrant; // Deduct grants from the reserve pool
    }
  }

  // Store the calculated projections
  this.financialProjection = {
    scenario1: {
      reservePool: reservePoolScenario1,
      memberAccounts: memberAccountsScenario1
    },
    scenario2: {
      reservePool: reservePoolScenario2,
      memberAccounts: memberAccountsScenario2
    }
  };
}
}
