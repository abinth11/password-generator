import React from 'react';
import zxcvbn from 'zxcvbn';

interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  const passwordStrength = zxcvbn(password);

  return (
    <div className="mt-4">
      <div className={`bg-gray-200 h-2 rounded-sm relative overflow-hidden`}>
        <div
          className={`strength-fill h-full strength-${passwordStrength.score}`}
          style={{ width: `${(passwordStrength.score / 4) * 100}%` }}
        ></div>
      </div>
      <div className="text-sm font-semibold  mt-2">
        Password Strength: {passwordStrength.score}/4
      </div>
      <div className="text-sm text-red-600">{passwordStrength.feedback.suggestions.join(', ')}</div>
    </div>
  );
};

export default PasswordStrengthIndicator;
