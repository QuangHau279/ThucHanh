import 'react-native-get-random-values';
import { v4 } from 'uuid';
interface Contact {
  name: { first: string; last: string };
    picture: { large: string };
    phone: string;
    cell: string;
    email: string;
}

// const mapContact = ({contact}:{contact:Contact}) => { (khong dung duoc vi api ko co cau truc { contact: {...} })
const mapContact = (contact: Contact) => {
  const {
    name, picture, phone, cell, email,
  } = contact;
  return {
    id: v4(),
    name: name.first + " " + name.last,
    avatar: picture.large,
    phone,
    cell,
    email,
    favorite: Math.random() >= 0.5, // randomly generate favorite contacts
  };
};

// const fetchContacts = async () => {
//   const response = await fetch('https://randomuser.me/api/?results=100&seed=fullstackio');
//   const contactData = await response.json();
//   return contactData.results.map(mapContact);
// };
// utility/api.ts
const fetchContacts = async () => {
  try {
    const response = await fetch('https://randomuser.me/api/?results=100&seed=fullstackio');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('API Raw Data:', data);
    if (!data.results || !Array.isArray(data.results)) {
      throw new Error('Invalid API response: "results" is missing or not an array');
    }
    return data.results; // Trả về dữ liệu gốc
  } catch (error) {
    console.error('Fetch Contacts Error:', error);
    throw error;
  }
};

const fetchUserContact = async () => {
  const response = await fetch('https://randomuser.me/api/?seed=fullstackio');
  const userData = await response.json();
  return mapContact(userData.results[0]);
};

const fetchRandomContact = async () => {
  const response = await fetch('https://randomuser.me/api/');
  const userData = await response.json();
  return mapContact(userData.results[0]);
};

export { fetchContacts, fetchUserContact, fetchRandomContact };
