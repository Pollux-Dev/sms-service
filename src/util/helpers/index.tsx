import toast from 'react-hot-toast';

export function next(current: number, total: number) {
  return current + 1 <= total - 1 ? current + 1 : 0;
}

export function prev(current: number, total: number) {
  return current - 1 >= 0 ? current - 1 : total - 1;
}

export const formatPhone = (phone: string | number) => {
  if (!phone) {
    toast.error('phone number missing');
    return '-';
  }

  let strPhone = String(phone).replaceAll(' ', '');
  if (strPhone.startsWith('251')) strPhone = strPhone.replace('251', '+251');

  if (strPhone.startsWith('9')) strPhone = strPhone.replace('9', '09');

  return strPhone;
};
