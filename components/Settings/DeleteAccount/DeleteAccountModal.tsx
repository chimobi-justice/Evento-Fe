import Input from '@/components/UserProfile/Input';
import Modal from '../Modal';
import useDisclosure from '@/hooks/useDisclosure';
import { Montserrat, Nunito } from 'next/font/google';
import React from 'react';
import Button from '@/components/ui/Button';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});

function DeleteAccountModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal isOpen={isOpen} closeModal={onClose} isCloseIconPresent={true} size="xl">
      <div className={`${nunito.className}`}>
        <div className="space-y-2">
          <h4 className={`${montserrat.className} text-Errors-E300 text-[2rem] font-semibold`}>Delete Account</h4>
          <p className="text-Grey-G100">
            This action will permanently delete your account from our server and all saved data will be erased
          </p>
        </div>
        <div className="mt-7">
          <Input label="Reason (optional)" textArea inputHeight="h-[6.5rem]" backgroundColor="bg-white-N0" />
          <p className="text-Grey-G100 mt-1">If there is any crucial reason for this please let us know</p>
        </div>
        <div className="mt-16 flex items-center justify-end gap-4">
          <Button
            type="button"
            title="cancel"
            styles="bg-transparent border border-primary-100 text-primary-100 font-bold text-sm w-[150px] py-3"
            handleClick={onClose}
          >
            Cancel
          </Button>
          <Button type="button" title="delete" styles="text-white-N0 font-bold text-sm px-4 py-3">
            Delete Account
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteAccountModal;
