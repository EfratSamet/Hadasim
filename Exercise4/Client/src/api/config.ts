// API Configuration

// Base URL of your API
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://localhost:7112/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Events
  EVENTS: '/events',
  EVENTS_BY_ORGANIZER: (organizerId: string) => `/events/organizer/${organizerId}`,
  EVENTS_BY_DATE_RANGE: '/events/daterange',
  EVENTS_BY_ADDRESS: (address: string) => `/events/address/${encodeURIComponent(address)}`,
  UPCOMING_EVENTS: '/events/upcoming',
  EVENTS_BY_ADDRESS_KEYWORD: (keyword: string) => `/events/address/keyword/${encodeURIComponent(keyword)}`,

  // Groups
  GROUPS: '/groups',
  GROUPS_BY_ORGANIZER: (organizerId: string) => `/groups/organizer/${organizerId}`,
  GROUPS_BY_NAME: (name: string) => `/groups/name/${encodeURIComponent(name)}`,
  GROUPS_BY_GUEST: (guestId: string) => `/groups/guest/${guestId}`,
  TOP_GROUPS: (count: number) => `/groups/top/${count}`,

  // Guests
  GUESTS: '/guests',
  GUESTS_BY_NAME: (name: string) => `/guests/name/${encodeURIComponent(name)}`,
  GUESTS_BY_MAIL: (mail: string) => `/guests/mail/${encodeURIComponent(mail)}`,
  GUESTS_BY_GENDER: (gender: string) => `/guests/gender/${gender}`,

  // GuestInEvent
  GUEST_IN_EVENTS: '/guestinEvents',

  // Organizers
  ORGANIZERS: '/organizers',
  ORGANIZER_GROUPS: (organizerId: string) => `/organizers/${organizerId}/groups`,
  ORGANIZER_EVENTS: (organizerId: string) => `/organizers/${organizerId}/events`,

  // PhotosFromEvent
  PHOTOS: '/photos',
  PHOTOS_BY_GUEST: (guestId: string) => `/photos/guest/${guestId}`,
  PHOTOS_BY_EVENT: (eventId: string) => `/photos/event/${eventId}`,
  PHOTOS_BY_GUEST_AND_EVENT: (guestId: string, eventId: string) => `/photos/guest/${guestId}/event/${eventId}`,
  PHOTOS_WITH_GUEST_AND_EVENT: '/photos/withGuestAndEvent',
  PHOTOS_BY_BLESSING: (blessingText: string) => `/photos/blessing/${encodeURIComponent(blessingText)}`,
  PHOTOS_BY_EVENT_SORTED_BY_GUEST: (eventId: string) => `/photos/event/${eventId}/sortedByGuest`,
  PHOTOS_SORTED_BY_NEWEST: '/photos/newest',
  PHOTOS_PAGED: (skip: number, take: number) => `/photos/paged?skip=${skip}&take=${take}`,
  PHOTOS_EXIST_FOR_EVENT: (eventId: string) => `/photos/existForEvent/${eventId}`,

  // Seating
  SEATINGS: '/seatings',
  
  // SubGuests
  SUBGUESTS: '/subguests',
  SUBGUESTS_BY_GUEST: (guestId: string) => `/subguests/guest/${guestId}`,
  SUBGUESTS_BY_NAME: (name: string) => `/subguests/name/${encodeURIComponent(name)}`,
  SUBGUESTS_BY_GENDER: (gender: string) => `/subguests/gender/${gender}`
};

// Common request headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

// Error handling
export class ApiError extends Error {
  status: number;
  data: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'ApiError';
  }
}
