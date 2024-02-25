import React, { useState } from 'react';
import Button from '@ui/NewButton';
import Modal from '@/components/ui/Modal';
import { Input } from '@ui/NewInput';
import { loginUser } from '@/http/authapi';
import { useRouter } from 'next/navigation';
import { Eye, EyeSlash, CloseCircle } from 'iconsax-react';
import ForgetPassword from './forgetPassword';
import { handleMouseEnter } from '@/utils/text-effect';

function SignIn({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [modOpen, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const isClose = () => setOpen(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [defaultInpType, setDefaultInpType] = useState<'password' | 'text'>('password');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) =>
      type === 'checkbox' ? { ...prevFormData, [name]: checked } : { ...prevFormData, [name]: value },
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password } = formData;

    try {
      setLoading(true);
      const response = await loginUser({ email, password });
      if (response && response.status === 200) {
        router.push('/dashboard');
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal closeOnOverlayClick isOpen={isOpen} closeModal={onClose} size="sm" isCloseIconPresent={false}>
      <div className="p-4">
        <button onClick={onClose} className="absolute top-[30px] right-9">
          <CloseCircle size="30" color="#000000" />
        </button>
        <div>
          <h2
            className="text-2xl font-semibold mb-6 text-gray-800"
            data-value="Sign In"
            onMouseEnter={handleMouseEnter}
          >
            Sign In
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email:
              </label>
              <Input
                placeholder="Enter Email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border text-black-main font-medium rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Password:
              </label>
              <Input
                type={defaultInpType}
                placeholder="Enter Password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                rightIcon={
                  defaultInpType === 'text' ? (
                    <Eye color="#777" onClick={() => setDefaultInpType('password')} />
                  ) : (
                    <EyeSlash color="#777" onClick={() => setDefaultInpType('text')} />
                  )
                }
                className="mt-1 p-2 w-full font-medium text-black-main border rounded-md"
                required
              />
            </div>
            <div className="mb-6 flex justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChanged}
                  className="mr-2   accent-primary-100"
                />
                <span className="text-md font-medium text-gray-600">Remember Me</span>
              </label>
              <button
                className="text-orange-600 text-base  hover:underline font-normal leading-normal"
                onClick={onOpen}
              >
                Forgot password?
              </button>
            </div>
            <div>
              <Button
                type="submit"
                isLoading={loading}
                className={`$ bg-primary-100 w-full font-bold text-white-100 p-2 rounded-md hover:bg-orange-500 transition-all`}
                disabled={!isChecked}
              >
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </div>
      <ForgetPassword isOpen={modOpen} onClose={isClose} />
    </Modal>
  );
}

export default SignIn;
