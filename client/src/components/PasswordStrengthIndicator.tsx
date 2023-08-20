import React from 'react';
import zxcvbn from 'zxcvbn';

interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  const passwordStrength = zxcvbn(password);
  const strengthClass = [
    'h-2',
    'bg-gray-200',
    'rounded-sm',
    'relative',
    'overflow-hidden',
  ].join(' ');

  const fillWidth = (passwordStrength.score + 1) * 20; // Convert score to width percentage

  return (
    <div className="mt-4">
      <div className={strengthClass}>
        <div
          className={`h-full strength-fill bg-blue-500`}
          style={{ width: `${fillWidth}%` }}
        ></div>
      </div>
      <div className="text-sm font-semibold mt-2">
        Password Strength: {passwordStrength.score}/4
      </div>
      <div className="text-sm text-red-600">{passwordStrength.feedback.suggestions.join(', ')}</div>
      <div className="text-sm mt-2">
        Estimated time to crack: {passwordStrength.crack_times_display.offline_slow_hashing_1e4_per_second}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
