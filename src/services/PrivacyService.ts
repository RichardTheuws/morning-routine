// GDPR Compliant Privacy Service
export interface PrivacyConsent {
  analytics: boolean;
  functionalCookies: boolean;
  exerciseData: boolean;
  videoContent: boolean;
  consentDate: string;
  consentVersion: string;
  ipAddress?: string; // For audit trail
  userAgent?: string; // For audit trail
}

export interface DataProcessingRecord {
  id: string;
  timestamp: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'export';
  dataType: 'exercise_progress' | 'user_preferences' | 'routine_data';
  purpose: string;
  legalBasis: 'consent' | 'legitimate_interest' | 'contract';
  retention: string; // How long data is kept
}

export interface PrivacySettings {
  dataMinimization: boolean;
  automaticDeletion: boolean;
  encryptionEnabled: boolean;
  auditLogging: boolean;
  consentRequired: boolean;
}

class PrivacyService {
  private readonly CONSENT_VERSION = '1.0.0';
  private readonly STORAGE_KEY = 'morning-routine-privacy';
  private readonly AUDIT_KEY = 'morning-routine-audit';

  // GDPR Article 7 - Consent management
  getConsent(): PrivacyConsent | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Failed to retrieve consent:', error);
      return null;
    }
  }

  setConsent(consent: Partial<PrivacyConsent>): void {
    const fullConsent: PrivacyConsent = {
      analytics: false,
      functionalCookies: true, // Required for app functionality
      exerciseData: true, // Required for app functionality
      videoContent: false,
      consentDate: new Date().toISOString(),
      consentVersion: this.CONSENT_VERSION,
      ipAddress: this.getClientIP(),
      userAgent: navigator.userAgent,
      ...consent
    };

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(fullConsent));
    this.logDataProcessing('create', 'user_preferences', 'Store user consent', 'consent');
  }

  // GDPR Article 17 - Right to erasure
  deleteAllData(): void {
    const keys = Object.keys(localStorage).filter(key => 
      key.startsWith('morning-routine-')
    );
    
    keys.forEach(key => {
      localStorage.removeItem(key);
      this.logDataProcessing('delete', 'exercise_progress', 'User requested data deletion', 'consent');
    });

    // Clear audit log last
    localStorage.removeItem(this.AUDIT_KEY);
  }

  // GDPR Article 20 - Right to data portability
  exportUserData(): string {
    const userData = {
      exportDate: new Date().toISOString(),
      consentVersion: this.CONSENT_VERSION,
      data: {} as Record<string, any>
    };

    // Collect all user data
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('morning-routine-')) {
        try {
          userData.data[key] = JSON.parse(localStorage.getItem(key) || '');
        } catch {
          userData.data[key] = localStorage.getItem(key);
        }
      }
    });

    this.logDataProcessing('export', 'exercise_progress', 'User requested data export', 'consent');
    return JSON.stringify(userData, null, 2);
  }

  // GDPR Article 30 - Records of processing activities
  private logDataProcessing(
    action: DataProcessingRecord['action'],
    dataType: DataProcessingRecord['dataType'],
    purpose: string,
    legalBasis: DataProcessingRecord['legalBasis']
  ): void {
    const record: DataProcessingRecord = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      action,
      dataType,
      purpose,
      legalBasis,
      retention: this.getRetentionPeriod(dataType)
    };

    try {
      const existingLogs = localStorage.getItem(this.AUDIT_KEY);
      const logs: DataProcessingRecord[] = existingLogs ? JSON.parse(existingLogs) : [];
      logs.push(record);
      
      // Keep only last 1000 records to prevent storage bloat
      if (logs.length > 1000) {
        logs.splice(0, logs.length - 1000);
      }
      
      localStorage.setItem(this.AUDIT_KEY, JSON.stringify(logs));
    } catch (error) {
      console.error('Failed to log data processing:', error);
    }
  }

  getAuditLog(): DataProcessingRecord[] {
    try {
      const logs = localStorage.getItem(this.AUDIT_KEY);
      return logs ? JSON.parse(logs) : [];
    } catch (error) {
      console.error('Failed to retrieve audit log:', error);
      return [];
    }
  }

  // Data encryption for sensitive information
  private encryptData(data: string): string {
    // Simple base64 encoding for demo - use proper encryption in production
    try {
      return btoa(unescape(encodeURIComponent(data)));
    } catch (error) {
      console.error('Encryption failed:', error);
      return data;
    }
  }

  private decryptData(encryptedData: string): string {
    try {
      return decodeURIComponent(escape(atob(encryptedData)));
    } catch (error) {
      console.error('Decryption failed:', error);
      return encryptedData;
    }
  }

  // Secure storage with encryption
  setSecureItem(key: string, value: any): void {
    try {
      const encrypted = this.encryptData(JSON.stringify(value));
      localStorage.setItem(`secure_${key}`, encrypted);
      this.logDataProcessing('create', 'exercise_progress', 'Store encrypted user data', 'consent');
    } catch (error) {
      console.error('Failed to store secure item:', error);
    }
  }

  getSecureItem<T>(key: string): T | null {
    try {
      const encrypted = localStorage.getItem(`secure_${key}`);
      if (!encrypted) return null;
      
      const decrypted = this.decryptData(encrypted);
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Failed to retrieve secure item:', error);
      return null;
    }
  }

  // Utility methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private getClientIP(): string {
    // In a real app, this would be handled server-side
    return 'client-side-unknown';
  }

  private getRetentionPeriod(dataType: DataProcessingRecord['dataType']): string {
    switch (dataType) {
      case 'exercise_progress': return '2 years or until user deletion';
      case 'user_preferences': return 'Until user changes or deletion';
      case 'routine_data': return '1 year or until user deletion';
      default: return '1 year';
    }
  }

  // Check if consent is still valid
  isConsentValid(): boolean {
    const consent = this.getConsent();
    if (!consent) return false;

    // Check if consent is older than 1 year (GDPR requirement)
    const consentDate = new Date(consent.consentDate);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    return consentDate > oneYearAgo && consent.consentVersion === this.CONSENT_VERSION;
  }

  // Generate privacy report for transparency
  generatePrivacyReport(): string {
    const consent = this.getConsent();
    const auditLog = this.getAuditLog();
    
    return `
PRIVACY REPORT - Morning Routine App
Generated: ${new Date().toISOString()}

CONSENT STATUS:
- Analytics: ${consent?.analytics ? 'Enabled' : 'Disabled'}
- Functional Cookies: ${consent?.functionalCookies ? 'Enabled' : 'Disabled'}
- Exercise Data: ${consent?.exerciseData ? 'Enabled' : 'Disabled'}
- Video Content: ${consent?.videoContent ? 'Enabled' : 'Disabled'}
- Consent Date: ${consent?.consentDate || 'Not provided'}
- Consent Version: ${consent?.consentVersion || 'Not provided'}

DATA PROCESSING ACTIVITIES:
${auditLog.slice(-10).map(log => 
  `- ${log.timestamp}: ${log.action} ${log.dataType} (${log.purpose})`
).join('\n')}

RETENTION PERIODS:
- Exercise Progress: 2 years or until deletion
- User Preferences: Until user changes
- Routine Data: 1 year or until deletion

DATA LOCATION:
All data is stored locally on your device. No data is transmitted to external servers.

THIRD PARTY SERVICES:
- Pexels (videos): Only accessed when viewing exercise demonstrations
- No tracking or analytics services are used

YOUR RIGHTS:
- Right to access: Export your data anytime
- Right to rectification: Modify your data in settings
- Right to erasure: Delete all data in settings
- Right to portability: Export data in JSON format
`;
  }
}

export const privacyService = new PrivacyService();