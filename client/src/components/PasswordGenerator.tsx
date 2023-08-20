import React, { useState } from "react";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import { toast } from "react-toastify";

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);

  const generatePassword = async () => {
    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSpecialChars) charset += "!@#$%^&*()_+";

    let newPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }

    const promise = new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(newPassword);
      }, 1000);
    });

    try {
      setPassword(newPassword);
      toast.promise(
        promise,
        {
          pending: "Generating your password...",
          success: "Password generated successfully... 👌",
          error: "Password generation failed rejected 🤯",
        },
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      );
    } catch (error) {
      toast.error("Error generating password", {
        position: "bottom-right",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast.success("Copied to clipboard", {
      position: "bottom-right",
    });
  };

  return (
    <div className='w-1/2 text-white p-8 rounded-lg shadow-md bg-gradient-to-r from-indigo-950 to-indigo-900'>
      <h2 className='text-2xl font-semibold mb-4'>Password Generator</h2>
      <div className='mb-4 flex '>
        <label htmlFor='password-length' className='block mb-1'>
          Password Length:
        </label>
        <input
          id='password-length'
          type='number'
          value={passwordLength}
          onChange={(e) => setPasswordLength(parseInt(e.target.value))}
          className='w-20 ml-3 px-2 py-1 bg-gray-700 border rounded focus:outline-none focus:ring focus:border-blue-300'
        />
      </div>
      <label className='flex items-center mb-2'>
        <input
          type='checkbox'
          checked={includeUppercase}
          onChange={() => setIncludeUppercase(!includeUppercase)}
          className='form-checkbox mr-2 cursor-pointer'
        />
        Include Uppercase
      </label>
      <label className='flex items-center mb-2 cursor-pointer'>
        <input
          type='checkbox'
          checked={includeLowercase}
          onChange={() => setIncludeLowercase(!includeLowercase)}
          className='form-checkbox mr-2 cursor-pointer'
        />
        Include Lowercase
      </label>
      <label className='flex items-center mb-2 cursor-pointer'>
        <input
          type='checkbox'
          checked={includeNumbers}
          onChange={() => setIncludeNumbers(!includeNumbers)}
          className='form-checkbox mr-2 cursor-pointer'
        />
        Include Numbers
      </label>
      <label className='flex items-center mb-2 cursor-pointer'>
        <input
          type='checkbox'
          checked={includeSpecialChars}
          onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
          className='form-checkbox mr-2 cursor-pointer'
        />
        Include Special Characters
      </label>
      <PasswordStrengthIndicator password={password} />
      <button
        onClick={generatePassword}
        className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none'
      >
        Generate Password
      </button>
      <button
        onClick={copyToClipboard}
        className='ml-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 focus:outline-none'
      >
        Copy to Clipboard
      </button>
      <div className='mt-4'>
        <strong>Generated Password:</strong> {password}
      </div>
    </div>
  );
};

export default PasswordGenerator;
