import toast from 'react-hot-toast';

function toasts() {
  const succes = (message: string) => toast.success(message, {
    id: 'successToast',
  });
  const fail = (error: any) => toast.error(error.toString(), {
    id: 'failToast',
  });
  return {
    succesToast: succes,
    failToast: fail,
  };
}

export default toasts;
