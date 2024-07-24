'use client';
import { useState } from 'react';
import SignUp from '../../../../components/login-signup/SignUp';
import SelectMember from '@/components/login-signup/SelectMember';

export type StepType = '회원유형' | '회원가입' | '완료';

const UrrSignUp = () => {
  const [step, setStep] = useState<StepType>('회원유형');
  return (
    <>
      {step === '회원유형' && <SelectMember setStep={setStep} />}
      {step === '회원가입' && <SignUp setStep={setStep} />}
    </>
  );
};

export default UrrSignUp;
