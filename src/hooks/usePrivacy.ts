import { useState, useEffect } from 'react';
import { privacyService, PrivacyConsent } from '../services/PrivacyService';

export const usePrivacy = () => {
  const [consent, setConsent] = useState<PrivacyConsent | null>(null);
  const [isConsentValid, setIsConsentValid] = useState(false);
  const [showConsentDialog, setShowConsentDialog] = useState(false);

  useEffect(() => {
    const storedConsent = privacyService.getConsent();
    const isValid = privacyService.isConsentValid();
    
    setConsent(storedConsent);
    setIsConsentValid(isValid);
    setShowConsentDialog(!isValid);
  }, []);

  const updateConsent = (newConsent: Partial<PrivacyConsent>) => {
    privacyService.setConsent(newConsent);
    const updatedConsent = privacyService.getConsent();
    setConsent(updatedConsent);
    setIsConsentValid(true);
    setShowConsentDialog(false);
  };

  const revokeConsent = () => {
    privacyService.deleteAllData();
    setConsent(null);
    setIsConsentValid(false);
    setShowConsentDialog(true);
  };

  const exportData = () => {
    const data = privacyService.exportUserData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `morning-routine-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generatePrivacyReport = () => {
    return privacyService.generatePrivacyReport();
  };

  return {
    consent,
    isConsentValid,
    showConsentDialog,
    updateConsent,
    revokeConsent,
    exportData,
    generatePrivacyReport,
    hasAnalyticsConsent: consent?.analytics || false,
    hasVideoConsent: consent?.videoContent || false,
    hasFunctionalConsent: consent?.functionalCookies || false
  };
};