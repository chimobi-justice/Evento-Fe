import { toast } from 'react-toastify';
import AuthInstance from './AuthInstance';
import React from 'react';
import { UserProfile as UserProfile3 } from './settingsapi';
import axios from 'axios';

export interface UserProfile2 {
  userID?: string;
  email?: string;
  bio?: string;

  profileImage?: string | Blob | File;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  slug?: string;
  role?: string;
  location?: string;
}

export interface UserProfile {
  userID: string;
  email: string;
  bio: string;
  coverImage?: string;

  profileImage: string;
  displayName: string;
  firstName: string;
  lastName: string;
  slug: string;
  role: string;
  location: string;
}
export interface socialLinks {
  facebookURL?: string;
  instagramURL?: string;
  twitterURL?: string;
  websiteURL?: string;
}

export type participantType = {
  userID: string;
  email: string;
  profileImage: string | null;
  firstName: string;
  lastName: string;
};

export type eventType = {
  eventID?: string;
  title?: string;
  description?: string;
  imageURL?: string;
  startDate: string;
  endDate?: string;
  time?: string;
  location?: string;
  locationType: string;
  capacity?: number;
  entranceFee?: number;
  eventType?: string;
  organizerID: string;
  categoryCategoryID?: string;
  participants?: participantType[];
};

const BaseUrl = 'https://evento-qo6d.onrender.com/api/v1';
// const BaseUrl = 'http://localhost:3000/api/v1/';

//evento-qo6d.onrender.com/api/v1
const $AuthHttp = AuthInstance(BaseUrl);

export const getAuthToken = () => {
  // rewrite to fetch id instead
  const authToken = localStorage.getItem('authToken');
  ('');
  return authToken;
};
export const getUserId = () => {
  // rewrite to fetch id instead
  const userID = localStorage.getItem('userId');
  ('');
  return userID;
};

export const getUserProfile = async (setData: React.Dispatch<React.SetStateAction<UserProfile>>) => {
  const authToken = getAuthToken();
  const userId = getUserId();
  console.log(authToken);
  console.log(userId);

  try {
    const getUserData = await $AuthHttp.get(`/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    setData(getUserData?.data.data);
    // console.log(getUserData?.data.data);

    // return getUserData?.data;
  } catch (e: any) {
    toast.error('An error occured while fetching user profile');

    throw e?.response?.data || { message: e.message };
  }
};

export const getSocialLinks = async (setData: React.Dispatch<React.SetStateAction<socialLinks>>) => {
  // console.log('fetching user socials');
  const authToken = getAuthToken();
  const userId = getUserId();

  try {
    const getUserSocials = await $AuthHttp.get(`/user/${userId}/social/`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    // console.log(getUserSocials?.data.data);
    setData(getUserSocials?.data.data);

    return getUserSocials?.data.data;
  } catch (e: any) {
    toast.error('An error occured while fetching user socials');

    throw e?.response?.data || { message: e.message };
  }
};

export const editUserProfile = async (data: UserProfile2, successCallback: () => void) => {
  const authToken = getAuthToken();
  const userId = getUserId();

  try {
    const editUserData = await $AuthHttp.patch(`/user/${userId}/`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    // console.log(editUserData.data.data);

    if (editUserData.status === 200) {
      toast.success('profile updated');
      successCallback();
      return editUserData;
    }
  } catch (err: any) {
    toast.error(err.message);
  }
};

export const editSocialLinks = async (data: socialLinks) => {
  const authToken = getAuthToken();
  const userId = getUserId();
  // user/profile/social/add/
  try {
    const editUserData = await $AuthHttp.post(`/user/${userId}/social`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    // console.log(editUserData.data.data);

    if (editUserData.status === 200) {
      // toast.success('profile updated');

      return editUserData;
    }
  } catch (err: any) {}
};

function convertImageToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result;
      resolve(base64String);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

export const postProfilePicture = async (localImage: File) => {
  const authToken = getAuthToken();
  const userId = getUserId();
  // const image = convertImageToBase64(localImage);
  // console.log(image);
  const image = new FormData();
  image.append('file', localImage);

  try {
    const response = await $AuthHttp.post(`/user/${userId}/image/`, image, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });

    if (response.status === 200) {
      // Image successfully uploaded
      console.log('Image uploaded successfully!');
    } else {
      // Handle other status codes
      console.error('Error uploading image:', response.status, response.statusText);
    }
  } catch (error) {
    // Handle network error
    toast.error(`Network error: ${error}`);
  }
};

export const postCoverPicture = async (localImage: File) => {
  const authToken = getAuthToken();
  const userId = getUserId();
  // const image = convertImageToBase64(localImage);
  // console.log(image);
  const image = new FormData();
  image.append('file', localImage);

  try {
    const response = await $AuthHttp.post(`/user/${userId}/cover`, image, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });
    console.log(response);

    if (response.status === 200) {
      // Image successfully uploaded
      console.log('Cover Image uploaded successfully!');
    } else {
      // Handle other status codes

      console.log('Error uploading image:', response.status, response.statusText);
    }
  } catch (error) {
    // Handle network error
    toast.error(`Network error: ${error}`);
  }
};

export const getUserCreatedEvents = async (setEvents: React.Dispatch<React.SetStateAction<eventType[]>>) => {
  const authToken = getAuthToken();
  const userId = getUserId();

  try {
    const response = await $AuthHttp.get(`/events/`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const events = response.data.data;
    console.log(events);

    // const filteredEvents = events.filter((event: any) => event.organizerID === 'ab73f292-9267-4167-81f2-d85e9bd950d3');
    const filteredEvents = events.filter((event: any) => event.organizerID === userId);

    console.log(filteredEvents);
    setEvents(filteredEvents);
    if (response.status === 200) {
      // Image successfully uploaded
      console.log('Events gotten successfully');
    } else {
      // Handle other status codes
      console.error('Error fetching events', response.status, response.statusText);
    }
  } catch (error) {
    // Handle network error
    // toast.error(`Network error: ${error}`);
  }
};

export const editProfile = async (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  profileData: UserProfile3,
  socialData: socialLinks,
  successCallback: () => void,
) => {
  const authToken = getAuthToken();
  const userId = getUserId();
  try {
    setLoading(true);
    const editUserData = await $AuthHttp.patch(`/user/${userId}/`, profileData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const editUserSocials = await $AuthHttp.post(`/user/${userId}/social`, socialData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    setLoading(false);
    if (editUserData.status === 200 && editUserSocials.status === 200) {
      toast.success('profile updated');
      successCallback();
    }
  } catch (err: any) {
    console.log(err);
    setLoading(false);
    toast.error(err.message);
  }
};
